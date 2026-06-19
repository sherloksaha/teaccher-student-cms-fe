'use client';

import {
  GraduationCap,
  LayoutDashboard,
  ShieldCheck,
  UserCog,
} from 'lucide-react';
import { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useAuth } from '../context/AuthContext';
import { fetchAreas, fetchTowns } from '../../lib/locationsApi';
import SignupSection from './AuthPage/SignupSection';
import LoginSection from './AuthPage/LoginSection';

const ROLE_OPTIONS = [
  { value: 'student', label: 'Student' },
  { value: 'teacher', label: 'Teacher' },
  { value: 'super-user', label: 'Super User' },
];

const emptySignupState = {
  role: 'student',
  name: '',
  email: '',
  password: '',
  phone: '',
  town: '',
  cityId: '',
  area: '',
  areaId: '',
  pincode: '',
  classLevel: '',
  schoolName: '',
  profileImage: '',
  experienceYears: '',
  department: '',
};

const emptyLoginState = {
  email: '',
  password: '',
};

function isValidEmail(value) {
  const email = value.trim();

  return email.includes('@') && email.includes('.');
}

const roleContent = {
  student: {
    eyebrow: 'Student Access',
    title: 'Create a student account and move straight into the dashboard',
    copy:
      'Students can save class details, school information, and profile details, then log in anytime to continue from the dashboard.',
    signupTitle: 'Create Student Account',
    fields: [
      { name: 'classLevel', label: 'Class / Grade' },
      { name: 'schoolName', label: 'School Name' },
    ],
  },
  teacher: {
    eyebrow: 'Teacher Access',
    title: 'Register teachers with area and contact details',
    copy:
      'Teachers can create an account with their service area and profile details, then log in to land on a teacher dashboard.',
    signupTitle: 'Create Teacher Account',
    fields: [
      { name: 'experienceYears', label: 'Experience (Years)' },
    ],
  },
  'super-user': {
    eyebrow: 'Super User Access',
    title: 'Create a super user account for platform oversight',
    copy:
      'Super users can register with core contact details and department information, then log in to a platform dashboard.',
    signupTitle: 'Create Super User Account',
    fields: [{ name: 'department', label: 'Department / Access Area' }],
  },
};





export default function AuthPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { currentUser, login, signup } = useAuth();
  const [activeTab, setActiveTab] = useState('signup');
  const [signupForm, setSignupForm] = useState(emptySignupState);
  const [loginForm, setLoginForm] = useState(emptyLoginState);
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [isSignupSubmitting, setIsSignupSubmitting] = useState(false);
  const [isSignupPasswordVisible, setIsSignupPasswordVisible] = useState(false);
  const [isLoginPasswordVisible, setIsLoginPasswordVisible] = useState(false);
  const [isClassDropdownOpen, setIsClassDropdownOpen] = useState(false);
  const [isTownDropdownOpen, setIsTownDropdownOpen] = useState(false);
  const [isAreaDropdownOpen, setIsAreaDropdownOpen] = useState(false);
  const [towns, setTowns] = useState([]);
  const [areas, setAreas] = useState([]);
  const [isTownsLoading, setIsTownsLoading] = useState(false);
  const [isAreasLoading, setIsAreasLoading] = useState(false);

  const currentSignupRole = signupForm.role;
  const currentRoleContent = roleContent[currentSignupRole];
  const townOptions = towns.map((town) => town.name);
  const areaOptions = areas.map((area) => area.name);

  useEffect(() => {
    if (!errorMessage && !successMessage) {
      return undefined;
    }

    const timeoutId = window.setTimeout(() => {
      setErrorMessage('');
      setSuccessMessage('');
    }, 4000);

    return () => window.clearTimeout(timeoutId);
  }, [errorMessage, successMessage]);

  useEffect(() => {
    let isMounted = true;

    async function loadTowns() {
      try {
        setIsTownsLoading(true);
        const townList = await fetchTowns();

        if (isMounted) {
          setTowns(townList);
        }
      } catch (error) {
        if (isMounted) {
          setErrorMessage(error.message || 'Unable to load towns.');
        }
      } finally {
        if (isMounted) {
          setIsTownsLoading(false);
        }
      }
    }

    void loadTowns();

    return () => {
      isMounted = false;
    };
  }, []);

  useEffect(() => {
    let isMounted = true;

    async function loadAreas() {
      if (!signupForm.cityId) {
        setAreas([]);
        return;
      }

      try {
        setIsAreasLoading(true);
        const areaList = await fetchAreas(signupForm.cityId);

        if (isMounted) {
          setAreas(areaList);
        }
      } catch (error) {
        if (isMounted) {
          setErrorMessage(error.message || 'Unable to load areas.');
        }
      } finally {
        if (isMounted) {
          setIsAreasLoading(false);
        }
      }
    }

    void loadAreas();

    return () => {
      isMounted = false;
    };
  }, [signupForm.cityId]);

  useEffect(() => {
    const requestedRole = searchParams.get('role');

    if (!requestedRole || !ROLE_OPTIONS.some((role) => role.value === requestedRole)) {
      return;
    }

    setActiveTab('signup');
    setSignupForm((current) => ({
      ...current,
      role: requestedRole,
    }));
    setErrorMessage('');
    setSuccessMessage('');
  }, [searchParams]);

  const resetMessages = () => {
    setErrorMessage('');
    setSuccessMessage('');
  };

  const handleSignupChange = (event) => {
    const { name, value, files, type } = event.target;

    if (type === 'file') {
      const file = files?.[0];

      if (!file) {
        setSignupForm((current) => ({
          ...current,
          [name]: '',
        }));
        return;
      }

      const reader = new FileReader();
      reader.onload = () => {
        setSignupForm((current) => ({
          ...current,
          [name]: typeof reader.result === 'string' ? reader.result : '',
        }));
      };
      reader.readAsDataURL(file);
      return;
    }

    const nextValue =
      name === 'phone'
        ? value.replace(/\D/g, '').slice(0, 10)
        : name === 'pincode'
          ? value.replace(/\D/g, '').slice(0, 6)
          : value;

    setSignupForm((current) => ({
      ...current,
      [name]: nextValue,
    }));
  };

  const handleSignupRoleChange = (role) => {
    setSignupForm((current) => ({
      ...emptySignupState,
      role,
      name: current.name,
      email: current.email,
      password: current.password,
      phone: current.phone,
    }));
    setIsClassDropdownOpen(false);
    setIsTownDropdownOpen(false);
    setIsAreaDropdownOpen(false);
    resetMessages();
  };

  const handleClassSelect = (value) => {
    setSignupForm((current) => ({
      ...current,
      classLevel: value,
    }));
    setIsClassDropdownOpen(false);
  };

  const handleTownSelect = (value) => {
    const selectedTown = towns.find((town) => town.name === value);

    setSignupForm((current) => ({
      ...current,
      town: value,
      cityId: selectedTown?.id || '',
      area: '',
      areaId: '',
    }));
    setIsTownDropdownOpen(false);
    setIsAreaDropdownOpen(false);
  };

  const handleAreaSelect = (value) => {
    const selectedArea = areas.find((area) => area.name === value);

    setSignupForm((current) => ({
      ...current,
      area: value,
      areaId: selectedArea?.id || '',
    }));
    setIsAreaDropdownOpen(false);
  };

  const handleLoginChange = (event) => {
    const { name, value } = event.target;

    setLoginForm((current) => ({
      ...current,
      [name]: value,
    }));
  };

  const handleSignupSubmit = async (event) => {
    event.preventDefault();
    resetMessages();

    if (!isValidEmail(signupForm.email)) {
      setErrorMessage('Please enter valid email id.');
      return;
    }

    if (signupForm.phone.length !== 10) {
      setErrorMessage('Phone number must be exactly 10 digits.');
      return;
    }

    if (!signupForm.town) {
      setErrorMessage('Please select town.');
      return;
    }

    if (!signupForm.area) {
      setErrorMessage('Please select area.');
      return;
    }

    if (signupForm.pincode && signupForm.pincode.length !== 6) {
      setErrorMessage('Pincode must be exactly 6 digits.');
      return;
    }

    try {
      setIsSignupSubmitting(true);
      await signup(signupForm);

      setSuccessMessage('Registration completed successfully.');
      setLoginForm(emptyLoginState);
      setSignupForm((current) => ({
        ...emptySignupState,
        role: current.role,
      }));
    } catch (error) {
      setErrorMessage(error.message);
    } finally {
      setIsSignupSubmitting(false);
    }
  };

  const handleLoginSubmit = async (event) => {
    event.preventDefault();
    resetMessages();

    if (!isValidEmail(loginForm.email)) {
      setErrorMessage('Please enter valid email id.');
      return;
    }

    try {
      await login(loginForm);
      router.push('/dashboard');
    } catch (error) {
      setErrorMessage(error.message);
    }
  };

  useEffect(() => {
    if (currentUser) {
      router.replace('/dashboard');
    }
  }, [currentUser, router]);

  if (currentUser) {
    return null;
  }

  return (
    <>
      <section className="auth-page__hero">
        <div className="auth-page__backdrop" />
        <div className="section-shell auth-page__grid">
          <div className="auth-page__promo">
            <p className="auth-page__eyebrow">{currentRoleContent.eyebrow}</p>
            <h1 className="auth-page__title">{currentRoleContent.title}</h1>
            <p className="auth-page__copy">{currentRoleContent.copy}</p>

            <div className="auth-page__benefits">
              {[
                {
                  title: 'Role based access',
                  description: 'Separate access for students, teachers, and super users.',
                  icon: ShieldCheck,
                },
                {
                  title: 'Fast onboarding',
                  description: 'Only the fields each user type actually needs.',
                  icon: GraduationCap,
                },
                {
                  title: 'Dashboard after login',
                  description: 'Every login opens the right dashboard instantly.',
                  icon: LayoutDashboard,
                },
                {
                  title: 'Super user ready',
                  description: 'Super user setup works without student or teacher-only fields.',
                  icon: UserCog,
                },
              ].map((item) => {
                const Icon = item.icon;

                return (
                  <article key={item.title} className="auth-page__benefit">
                    <div className="auth-page__benefit-row">
                      <div className="auth-page__benefit-icon">
                        <Icon />
                      </div>
                      <div>
                        <h2 className="auth-page__benefit-title">{item.title}</h2>
                        <p className="auth-page__benefit-copy">{item.description}</p>
                      </div>
                    </div>
                  </article>
                );
              })}
            </div>
          </div>

          <div className="glass-card auth-page__panel">
            <div className="auth-page__tabs">
              <button
                type="button"
                className={`auth-page__tab${activeTab === 'signup' ? ' auth-page__tab--active' : ''}`}
                onClick={() => {
                  setActiveTab('signup');
                  resetMessages();
                }}
              >
                Sign Up
              </button>
              <button
                type="button"
                className={`auth-page__tab${activeTab === 'login' ? ' auth-page__tab--active' : ''}`}
                onClick={() => {
                  setActiveTab('login');
                  resetMessages();
                }}
              >
                Log In
              </button>
            </div>

            {errorMessage ? (
              <div className="auth-page__toast auth-page__toast--error" role="alert">{errorMessage}</div>
            ) : null}

            {successMessage ? (
              <div className="auth-page__toast auth-page__toast--success" role="status">{successMessage}</div>
            ) : null}

            {activeTab === 'signup' ? (
              <SignupSection
                roleOptions={ROLE_OPTIONS}
                signupForm={signupForm}
                currentRoleContent={currentRoleContent}
                isSignupSubmitting={isSignupSubmitting}
                isSignupPasswordVisible={isSignupPasswordVisible}
                isClassDropdownOpen={isClassDropdownOpen}
                isTownDropdownOpen={isTownDropdownOpen}
                isAreaDropdownOpen={isAreaDropdownOpen}
                townOptions={townOptions}
                areaOptions={areaOptions}
                isTownsLoading={isTownsLoading}
                isAreasLoading={isAreasLoading}
                onSubmit={handleSignupSubmit}
                onChange={handleSignupChange}
                onRoleChange={handleSignupRoleChange}
                onSignupPasswordToggle={() => setIsSignupPasswordVisible((current) => !current)}
                onClassDropdownToggle={() => setIsClassDropdownOpen((current) => !current)}
                onClassDropdownClose={() => setIsClassDropdownOpen(false)}
                onClassSelect={handleClassSelect}
                onTownDropdownToggle={() => setIsTownDropdownOpen((current) => !current)}
                onTownDropdownClose={() => setIsTownDropdownOpen(false)}
                onTownSelect={handleTownSelect}
                onAreaDropdownToggle={() => setIsAreaDropdownOpen((current) => !current)}
                onAreaDropdownClose={() => setIsAreaDropdownOpen(false)}
                onAreaSelect={handleAreaSelect}
              />
            ) : (
              <LoginSection
                loginForm={loginForm}
                isLoginPasswordVisible={isLoginPasswordVisible}
                onSubmit={handleLoginSubmit}
                onChange={handleLoginChange}
                onLoginPasswordToggle={() => setIsLoginPasswordVisible((current) => !current)}
              />
            )}
          </div>
        </div>
      </section>

    </>
  );
}
