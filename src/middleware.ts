import { NextRequest, NextResponse } from 'next/server';

// Content Security Policy 설정
const CSP_HEADER = `
  default-src 'self';
  script-src 'self' 'unsafe-eval' 'unsafe-inline' https://apis.google.com https://www.google-analytics.com;
  style-src 'self' 'unsafe-inline' https://fonts.googleapis.com;
  img-src 'self' data: https: blob:;
  font-src 'self' https://fonts.gstatic.com;
  connect-src 'self' https://api.github.com https://www.google-analytics.com;
  media-src 'self' https:;
  object-src 'none';
  child-src 'self';
  worker-src 'self' blob:;
  frame-ancestors 'none';
  form-action 'self';
  base-uri 'self';
  manifest-src 'self';
`.replace(/\s{2,}/g, ' ').trim();

// Rate Limiting 설정
const rateLimitMap = new Map();

function rateLimit(request: NextRequest): boolean {
  const ip = request.headers.get('X-Forwarded-For') ?? 
            request.headers.get('X-Real-IP') ?? 
            'unknown';
  const now = Date.now();
  const windowMs = 15 * 60 * 1000; // 15분
  const maxRequests = 100; // 15분당 최대 요청 수

  if (!rateLimitMap.has(ip)) {
    rateLimitMap.set(ip, { requests: 1, resetTime: now + windowMs });
    return true;
  }

  const userLimit = rateLimitMap.get(ip);
  
  if (now > userLimit.resetTime) {
    // 시간 윈도우가 만료됨, 카운터 리셋
    userLimit.requests = 1;
    userLimit.resetTime = now + windowMs;
    return true;
  }

  if (userLimit.requests >= maxRequests) {
    return false; // 한도 초과
  }

  userLimit.requests += 1;
  return true;
}

export function middleware(request: NextRequest) {
  // Rate Limiting 체크
  if (!rateLimit(request)) {
    return new NextResponse('Too Many Requests', { 
      status: 429,
      headers: {
        'Retry-After': '900' // 15분 후 재시도
      }
    });
  }

  // 응답 생성
  const response = NextResponse.next();

  // Security Headers 설정
  response.headers.set('Content-Security-Policy', CSP_HEADER);
  response.headers.set('X-DNS-Prefetch-Control', 'false');
  response.headers.set('X-Frame-Options', 'DENY');
  response.headers.set('X-Content-Type-Options', 'nosniff');
  response.headers.set('Referrer-Policy', 'origin-when-cross-origin');
  response.headers.set('Permissions-Policy', 
    'camera=(), microphone=(), geolocation=(), interest-cohort=()'
  );
  
  // HSTS (HTTPS Strict Transport Security)
  if (process.env.NODE_ENV === 'production') {
    response.headers.set('Strict-Transport-Security', 
      'max-age=63072000; includeSubDomains; preload'
    );
  }

  // Cross-Origin 정책
  response.headers.set('Cross-Origin-Embedder-Policy', 'require-corp');
  response.headers.set('Cross-Origin-Opener-Policy', 'same-origin');
  response.headers.set('Cross-Origin-Resource-Policy', 'same-origin');

  // API 보안을 위한 추가 헤더
  if (request.nextUrl.pathname.startsWith('/api/')) {
    response.headers.set('Cache-Control', 'no-store, no-cache, must-revalidate');
    response.headers.set('X-Robots-Tag', 'noindex, nofollow');
  }

  // 정적 파일 캐싱 최적화
  if (request.nextUrl.pathname.startsWith('/_next/static/') || 
      request.nextUrl.pathname.match(/\.(jpg|jpeg|png|gif|svg|ico|css|js|woff|woff2)$/)) {
    response.headers.set('Cache-Control', 'public, max-age=31536000, immutable');
  }

  return response;
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api/auth (authentication routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!api/auth|_next/static|_next/image|favicon.ico).*)',
  ],
};