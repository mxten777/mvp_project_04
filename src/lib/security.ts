import { NextRequest, NextResponse } from 'next/server';
import Joi from 'joi';

// API Rate Limiting 맵
const apiRateLimitMap = new Map();

// Input Validation 스키마들
export const schemas = {
  contact: Joi.object({
    name: Joi.string().min(2).max(50).required().pattern(/^[a-zA-Z가-힣\s]+$/),
    email: Joi.string().email().required(),
    company: Joi.string().min(2).max(100).optional(),
    message: Joi.string().min(10).max(1000).required()
  }),
  
  auth: Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().min(8).max(128).pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/).required()
  }),
  
  cms: Joi.object({
    title: Joi.string().min(3).max(200).required(),
    content: Joi.string().min(10).max(10000).required(),
    type: Joi.string().valid('hero', 'service', 'portfolio', 'about', 'contact').required(),
    tags: Joi.array().items(Joi.string().max(20)).max(10).optional()
  })
};

// API Rate Limiting 함수
export function apiRateLimit(request: NextRequest, maxRequests: number = 20, windowMs: number = 60000): boolean {
  const ip = request.headers.get('X-Forwarded-For') ?? 
            request.headers.get('X-Real-IP') ?? 
            'unknown';
  const endpoint = request.nextUrl.pathname;
  const key = `${ip}-${endpoint}`;
  
  const now = Date.now();

  if (!apiRateLimitMap.has(key)) {
    apiRateLimitMap.set(key, { requests: 1, resetTime: now + windowMs });
    return true;
  }

  const userLimit = apiRateLimitMap.get(key);
  
  if (now > userLimit.resetTime) {
    userLimit.requests = 1;
    userLimit.resetTime = now + windowMs;
    return true;
  }

  if (userLimit.requests >= maxRequests) {
    return false;
  }

  userLimit.requests += 1;
  return true;
}

// Input Sanitization 함수
export function sanitizeInput(input: string): string {
  // HTML 태그 제거
  let sanitized = input.replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '');
  sanitized = sanitized.replace(/<[^>]*>/g, '');
  
  // SQL Injection 패턴 제거
  const sqlPatterns = [
    /(\b(SELECT|INSERT|UPDATE|DELETE|DROP|CREATE|ALTER|EXEC|EXECUTE)\b)/gi,
    /(\b(UNION|OR|AND)\s+\d+\s*=\s*\d+)/gi,
    /(--|\*\/|\/\*)/g,
    /('|(\\')|('')|(\%27)|(\%2527))/g
  ];
  
  sqlPatterns.forEach(pattern => {
    sanitized = sanitized.replace(pattern, '');
  });
  
  // XSS 패턴 제거
  sanitized = sanitized.replace(/javascript:/gi, '');
  sanitized = sanitized.replace(/on\w+\s*=/gi, '');
  
  return sanitized.trim();
}

// CSRF 토큰 생성
export function generateCSRFToken(): string {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let result = '';
  for (let i = 0; i < 32; i++) {
    result += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return result;
}

// API 응답 래퍼
export function apiResponse(data: unknown, status: number = 200, message?: string) {
  return NextResponse.json(
    {
      success: status >= 200 && status < 300,
      data,
      message,
      timestamp: new Date().toISOString()
    },
    { status }
  );
}

// 에러 응답 래퍼
export function apiError(message: string, status: number = 400, code?: string) {
  return NextResponse.json(
    {
      success: false,
      error: {
        message: sanitizeInput(message),
        code,
        timestamp: new Date().toISOString()
      }
    },
    { status }
  );
}

// API 미들웨어 래퍼
export function withApiSecurity(
  handler: (req: NextRequest, context?: { params: Record<string, string> }) => Promise<NextResponse>,
  options: {
    rateLimit?: { maxRequests: number; windowMs: number };
    validation?: { schema: Joi.ObjectSchema; validateBody?: boolean };
    requireAuth?: boolean;
  } = {}
) {
  return async (req: NextRequest, context?: { params: Record<string, string> }) => {
    try {
      // Rate Limiting 체크
      if (options.rateLimit) {
        const { maxRequests, windowMs } = options.rateLimit;
        if (!apiRateLimit(req, maxRequests, windowMs)) {
          return apiError('Too Many Requests', 429, 'RATE_LIMIT_EXCEEDED');
        }
      }

      // CSRF 토큰 검증 (POST, PUT, DELETE 요청시)
      if (['POST', 'PUT', 'DELETE'].includes(req.method)) {
        const csrfToken = req.headers.get('X-CSRF-Token');
        if (!csrfToken) {
          return apiError('CSRF token required', 403, 'CSRF_TOKEN_MISSING');
        }
      }

      // 입력 검증
      if (options.validation && (options.validation.validateBody !== false)) {
        try {
          const body = await req.json().catch(() => ({}));
          
          // 입력 값 정리
          const sanitizedBody = Object.keys(body).reduce((acc, key) => {
            const value = body[key];
            acc[key] = typeof value === 'string' ? sanitizeInput(value) : value;
            return acc;
          }, {} as Record<string, unknown>);

          // 스키마 검증
          const { error, value } = options.validation.schema.validate(sanitizedBody);
          if (error) {
            return apiError(`Validation Error: ${error.details[0].message}`, 400, 'VALIDATION_ERROR');
          }

          // 검증된 데이터를 req에 추가
          (req as NextRequest & { validatedData?: unknown }).validatedData = value;
        } catch {
          return apiError('Invalid JSON format', 400, 'INVALID_JSON');
        }
      }

      // 인증 체크
      if (options.requireAuth) {
        const authHeader = req.headers.get('Authorization');
        if (!authHeader || !authHeader.startsWith('Bearer ')) {
          return apiError('Authentication required', 401, 'AUTH_REQUIRED');
        }

        const token = authHeader.substring(7);
        if (!isValidToken(token)) {
          return apiError('Invalid or expired token', 401, 'INVALID_TOKEN');
        }
      }

      // 실제 핸들러 실행
      return await handler(req, context);

    } catch (error) {
      console.error('API Error:', error);
      return apiError('Internal Server Error', 500, 'INTERNAL_ERROR');
    }
  };
}

// 토큰 검증 함수 (실제로는 JWT 라이브러리 사용)
function isValidToken(token: string): boolean {
  try {
    // Mock 토큰 검증 - 실제로는 JWT 검증
    const parts = token.split('.');
    if (parts.length !== 3) return false;
    
    const payload = JSON.parse(atob(parts[1]));
    const now = Math.floor(Date.now() / 1000);
    
    return payload.exp > now;
  } catch {
    return false;
  }
}

// Content Security Policy 헤더 생성
export function getCSPHeader(): string {
  return `
    default-src 'self';
    script-src 'self' 'unsafe-eval' 'unsafe-inline';
    style-src 'self' 'unsafe-inline';
    img-src 'self' data: https: blob:;
    font-src 'self';
    connect-src 'self';
    media-src 'self';
    object-src 'none';
    child-src 'self';
    worker-src 'self' blob:;
    frame-ancestors 'none';
    form-action 'self';
    base-uri 'self';
  `.replace(/\s+/g, ' ').trim();
}

// 보안 헤더 설정
export function setSecurityHeaders(response: NextResponse): NextResponse {
  response.headers.set('X-Content-Type-Options', 'nosniff');
  response.headers.set('X-Frame-Options', 'DENY');
  response.headers.set('X-XSS-Protection', '1; mode=block');
  response.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin');
  response.headers.set('Content-Security-Policy', getCSPHeader());
  
  if (process.env.NODE_ENV === 'production') {
    response.headers.set('Strict-Transport-Security', 'max-age=31536000; includeSubDomains');
  }
  
  return response;
}