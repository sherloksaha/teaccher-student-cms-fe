'use client';

import { createContext, useContext, useEffect, useState } from 'react';
import { formatLocationTitle, normalizeStoredLocation } from '../utils/locationData';
import { api } from '../../lib/apiClient';
import { registerUser } from '../../lib/authApi';
import { loginAction, logoutAction } from '../../app/actions/authActions';

const AuthContext = createContext(null);

const CURRENT_USER_KEY = 'offcampus-current-user';
const LEGACY_CURRENT_STUDENT_KEY = 'offcampus-current-student';

function readStorage(key, fallback) {
  try {
    const value = window.localStorage.getItem(key);
    return value ? JSON.parse(value) : fallback;
  } catch {
    return fallback;
  }
}

function writeStorage(key, value) {
  window.localStorage.setItem(key, JSON.stringify(value));
}

function normalizeAccount(account) {
  const normalizedRole =
    account.role === 'tutor'
      ? 'teacher'
      : account.role === 'admin'
        ? 'super-user'
        : account.role || 'student';
  const normalizedLocation = normalizeStoredLocation(account.location, account.locationLabel);

  return {
    ...account,
    role: normalizedRole,
    phone: account.phone?.trim() || '',
    town: account.town?.trim() || '',
    address: account.address?.trim() || '',
    landmark: account.landmark?.trim() || '',
    pincode: account.pincode?.trim() || '',
    profileImage: account.profileImage || '',
    classLevel: account.classLevel?.trim() || '',
    schoolName: account.schoolName?.trim() || '',
    expertise: account.expertise?.trim() || '',
    experienceYears: account.experienceYears?.trim() || '',
    department: account.department?.trim() || '',
    location: normalizedLocation,
    locationLabel: normalizedLocation
      ? account.locationLabel || formatLocationTitle(normalizedLocation)
      : '',
  };
}

function handleAuthResult(result) {
  if (!result.ok) {
    throw new Error(result.message || 'Request failed.');
  }

  if (result.token) {
    api.setToken(result.token);
  }

  return result;
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const storedUser =
      readStorage(CURRENT_USER_KEY, null) || readStorage(LEGACY_CURRENT_STUDENT_KEY, null);

    if (storedUser) {
      const normalizedUser = normalizeAccount(storedUser);
      writeStorage(CURRENT_USER_KEY, normalizedUser);
      setCurrentUser(normalizedUser);
    }

    setIsReady(true);
  }, []);

  const signup = async (signupData) => {
    const data = await registerUser(signupData);
    const account = data.account || data.user || data.data?.account || data.data?.user || data.data || data;

    return normalizeAccount({
      ...signupData,
      ...account,
      name:
        account.name ||
        [account.firstName, account.lastName].filter(Boolean).join(' ') ||
        signupData.name,
      role: account.role || signupData.role,
    });
  };

  const login = async ({ email, password, role }) => {
    const data = handleAuthResult(await loginAction({ email, password, role }));

    const normalizedAccount = normalizeAccount(data.account);
    writeStorage(CURRENT_USER_KEY, normalizedAccount);
    setCurrentUser(normalizedAccount);

    return normalizedAccount;
  };

  const logout = () => {
    window.localStorage.removeItem(CURRENT_USER_KEY);
    window.localStorage.removeItem(LEGACY_CURRENT_STUDENT_KEY);
    api.clearToken();
    void logoutAction();
    setCurrentUser(null);
  };

  const value = {
    currentUser,
    currentStudent: currentUser?.role === 'student' ? currentUser : null,
    isReady,
    login,
    logout,
    signup,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider.');
  }

  return context;
}
