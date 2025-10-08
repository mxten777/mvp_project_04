import { NextRequest, NextResponse } from 'next/server';

// Contact form API
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    // 간단한 유효성 검증
    if (!body.name || !body.email || !body.message) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // 실제로는 이메일 서비스나 데이터베이스에 저장
    console.log('Contact form submission:', body);
    
    // 성공 응답
    return NextResponse.json({
      id: Date.now().toString(),
      status: 'received',
      message: 'Your message has been received successfully'
    });

  } catch (error) {
    console.error('Contact form error:', error);
    return NextResponse.json(
      { error: 'Failed to process your message' },
      { status: 500 }
    );
  }
}

export async function GET() {
  return NextResponse.json(
    { error: 'Method not allowed' },
    { status: 405 }
  );
}