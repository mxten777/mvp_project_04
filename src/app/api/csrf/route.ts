import { NextResponse } from 'next/server';
import crypto from 'crypto';

// CSRF token generation endpoint
export async function GET() {
  try {
    // Generate CSRF token
    const token = crypto.randomBytes(32).toString('hex');
    
    return NextResponse.json({
      csrfToken: token
    });

  } catch (error) {
    console.error('CSRF token generation error:', error);
    return NextResponse.json(
      { error: 'Failed to generate CSRF token' },
      { status: 500 }
    );
  }
}

export async function POST() {
  return NextResponse.json(
    { error: 'Method not allowed' },
    { status: 405 }
  );
}