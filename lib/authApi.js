import { api } from './apiClient';

function splitFullName(name = '') {
  const parts = name.trim().split(/\s+/).filter(Boolean);
  const firstName = parts.shift() || '';
  const lastName = parts.join(' ') || firstName;

  return {
    firstName,
    lastName,
  };
}

function compactPayload(payload) {
  return Object.fromEntries(
    Object.entries(payload).filter(([, value]) => value !== undefined && value !== null && value !== '')
  );
}

export function buildRegisterPayload(signupData) {
  const { firstName, lastName } = splitFullName(signupData.name);

  return compactPayload({
    email: signupData.email.trim().toLowerCase(),
    password: signupData.password,
    firstName,
    lastName,
    phone: signupData.phone.trim(),
    role: signupData.role === 'teacher' ? 'teacher' : 'student',
    town: signupData.town?.trim(),
    cityId: signupData.cityId,
    area: signupData.area?.trim(),
    areaId: signupData.areaId,
    landmark: signupData.area?.trim(),
    pincode: signupData.pincode?.trim(),
    classLevel: signupData.classLevel?.trim(),
    schoolName: signupData.schoolName?.trim(),
    // profileImage: signupData.profileImage,
    experienceYears: signupData.experienceYears?.trim(),
  });
}

export async function registerUser(signupData) {
  return api.post('/auth/register', buildRegisterPayload(signupData));
}
