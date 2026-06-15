import { NextResponse } from 'next/server';

export async function POST() {
  return NextResponse.json(
    {
      message: 'Use /api/auth/signup or /api/auth/login.',
    },
    { status: 400 }
  );
}

export async function GET() {
  return NextResponse.json({
    message: 'Mock auth API is available.',
    endpoints: ['/api/auth/signup', '/api/auth/login'],
  });
}
