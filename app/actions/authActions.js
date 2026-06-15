'use server';

import { cookies } from 'next/headers';
import { mockCreateAccount, mockLogin } from '../../lib/mockAuthApi';

const AUTH_COOKIE_NAME = 'jwt_token';

function persistJwt(token) {
  if (!token) {
    return;
  }

  cookies().set(AUTH_COOKIE_NAME, token, {
    sameSite: 'lax',
    secure: process.env.NODE_ENV === 'production',
    path: '/',
  });
}

function clearJwt() {
  cookies().delete(AUTH_COOKIE_NAME);
}

function buildActionResponse(result) {
  if (!result.ok) {
    return {
      ok: false,
      status: result.status,
      message: result.message,
    };
  }

  persistJwt(result.token);

  return {
    ok: true,
    status: result.status,
    message: result.message,
    account: result.account,
    token: result.token,
  };
}

export async function createAccountAction(payload) {
  const result = await mockCreateAccount(payload);

  return buildActionResponse(result);
}

export async function loginAction(payload) {
  const result = await mockLogin(payload);

  return buildActionResponse(result);
}

export async function logoutAction() {
  clearJwt();

  return {
    ok: true,
    message: 'Logged out successfully.',
  };
}
