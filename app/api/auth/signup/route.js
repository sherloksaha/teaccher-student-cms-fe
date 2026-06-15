import { NextResponse } from 'next/server';
import { mockCreateAccount } from '../../../../lib/mockAuthApi';

export async function POST(request) {
  const payload = await request.json();
  const result = await mockCreateAccount(payload);

  return NextResponse.json(result, { status: result.status });
}
