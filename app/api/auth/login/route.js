import { NextResponse } from 'next/server';
import { mockLogin } from '../../../../lib/mockAuthApi';

export async function POST(request) {
  const payload = await request.json();
  const result = await mockLogin(payload);

  return NextResponse.json(result, { status: result.status });
}
