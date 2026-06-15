const mockAuthStore = globalThis.__FETUTOR_MOCK_AUTH_STORE__ || new Map();

globalThis.__FETUTOR_MOCK_AUTH_STORE__ = mockAuthStore;

function normalizeRole(role) {
  if (role === 'tutor') {
    return 'teacher';
  }

  if (role === 'admin') {
    return 'super-user';
  }

  return role || 'student';
}

function sanitizeValue(value) {
  return typeof value === 'string' ? value.trim() : value || '';
}

function buildAccount(payload) {
  const role = normalizeRole(payload.role);
  const now = new Date().toISOString();

  return {
    id: payload.id || `mock-${role}-${Date.now()}`,
    role,
    name: sanitizeValue(payload.name) || 'Mock User',
    email: sanitizeValue(payload.email).toLowerCase(),
    phone: sanitizeValue(payload.phone),
    town: sanitizeValue(payload.town),
    address: sanitizeValue(payload.address),
    landmark: sanitizeValue(payload.landmark),
    pincode: sanitizeValue(payload.pincode),
    profileImage: payload.profileImage || '',
    classLevel: sanitizeValue(payload.classLevel),
    schoolName: sanitizeValue(payload.schoolName),
    expertise: sanitizeValue(payload.expertise),
    experienceYears: sanitizeValue(payload.experienceYears),
    department: sanitizeValue(payload.department),
    location: payload.location || null,
    locationLabel: sanitizeValue(payload.locationLabel),
    joinedAt: payload.joinedAt || now,
    updatedAt: now,
  };
}

function createMockJwt(account) {
  const encodedPayload = Buffer.from(
    JSON.stringify({
      sub: account.id,
      email: account.email,
      role: account.role,
      mock: true,
    })
  ).toString('base64url');

  return `mock.${encodedPayload}.token`;
}

function validateSignupPayload(payload) {
  if (!payload?.name || !payload?.email || !payload?.password || !payload?.phone) {
    return 'Name, email, password, and phone are required.';
  }

  if (!payload.email.includes('@') || !payload.email.includes('.')) {
    return 'Please enter valid email id.';
  }

  if (!/^\d{10}$/.test(payload.phone)) {
    return 'Phone number must be exactly 10 digits.';
  }

  if (!/^\d{6}$/.test(payload.pincode || '')) {
    return 'Pincode must be exactly 6 digits.';
  }

  return '';
}

export async function mockCreateAccount(payload) {
  const errorMessage = validateSignupPayload(payload);

  if (errorMessage) {
    return {
      ok: false,
      status: 400,
      message: errorMessage,
    };
  }

  const account = buildAccount(payload);
  const existingRecord = mockAuthStore.get(account.email);

  if (existingRecord) {
    return {
      ok: false,
      status: 409,
      message: 'An account with this email already exists.',
    };
  }

  mockAuthStore.set(account.email, {
    account,
    password: payload.password,
  });

  return {
    ok: true,
    status: 201,
    message: 'Account created successfully.',
    account,
    token: createMockJwt(account),
  };
}

export async function mockLogin(payload) {
  const email = sanitizeValue(payload?.email).toLowerCase();
  const password = payload?.password || '';

  if (!email || !password) {
    return {
      ok: false,
      status: 400,
      message: 'Email and password are required.',
    };
  }

  const storedRecord = mockAuthStore.get(email);

  if (storedRecord && storedRecord.password !== password) {
    return {
      ok: false,
      status: 401,
      message: 'Invalid email or password.',
    };
  }

  const account =
    storedRecord?.account ||
    buildAccount({
      role: payload.role || 'student',
      name: email.split('@')[0] || 'Mock User',
      email,
      phone: '9876543210',
      town: 'Dhubri',
      address: 'Mock address',
      pincode: '783301',
      classLevel: '8 to 10',
      schoolName: 'Mock School',
    });

  return {
    ok: true,
    status: 200,
    message: 'Logged in successfully.',
    account,
    token: createMockJwt(account),
  };
}
