'use client';

import {
  BriefcaseBusiness,
  ChevronDown,
  Eye,
  EyeOff,
  GraduationCap,
  LayoutDashboard,
  ShieldCheck,
  UserCog,
} from 'lucide-react';
import { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Button from '../components/Button';
import { useAuth } from '../context/AuthContext';

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
  address: '',
  landmark: '',
  pincode: '',
  classLevel: '',
  schoolName: '',
  profileImage: '',
  expertise: '',
  experienceYears: '',
  department: '',
};

const emptyLoginState = {
  email: '',
  password: '',
};

const CLASS_OPTIONS = ['1 to 3', '4 to 7', '8 to 10', '11 to 12'];
const TOWN_OPTIONS = ['Dhubri', 'Gauripur'];
const LANDMARK_OPTIONS = ['D.K Road', 'Mission Road', 'BoroBazar', 'AM Co Road', 'Jhagrapar'];

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
    title: 'Register teachers with expertise, area, and contact details',
    copy:
      'Teachers can create an account with their subject expertise and profile details, then log in to land on a teacher dashboard.',
    signupTitle: 'Create Teacher Account',
    fields: [
      { name: 'expertise', label: 'Subject Expertise' },
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

function SelectDropdown({ value, options, placeholder, label, onSelect, isOpen, onToggle, onClose }) {
  useEffect(() => {
    if (!isOpen) {
      return undefined;
    }

    const handlePointerDown = (event) => {
      if (!event.target.closest('.auth-page__dropdown')) {
        onClose();
      }
    };

    const handleEscape = (event) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    document.addEventListener('mousedown', handlePointerDown);
    document.addEventListener('keydown', handleEscape);

    return () => {
      document.removeEventListener('mousedown', handlePointerDown);
      document.removeEventListener('keydown', handleEscape);
    };
  }, [isOpen, onClose]);

  return (
    <div className={`auth-page__dropdown${isOpen ? ' auth-page__dropdown--open' : ''}`}>
      <button
        type="button"
        className="auth-page__dropdown-trigger"
        onClick={onToggle}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
      >
        <span className={`auth-page__dropdown-value${value ? '' : ' auth-page__dropdown-value--placeholder'}`}>
          {value || placeholder}
        </span>
        <ChevronDown className="auth-page__dropdown-icon" />
      </button>

      {isOpen ? (
        <div className="auth-page__dropdown-menu" role="listbox" aria-label={label}>
          {options.map((option) => (
            <button
              key={option}
              type="button"
              role="option"
              aria-selected={value === option}
              className={`auth-page__dropdown-option${value === option ? ' auth-page__dropdown-option--active' : ''}`}
              onClick={() => onSelect(option)}
            >
              {option}
            </button>
          ))}
        </div>
      ) : null}
    </div>
  );
}

function SignupRoleFields({
  role,
  signupForm,
  onChange,
  isClassDropdownOpen,
  onClassDropdownToggle,
  onClassSelect,
  onClassDropdownClose,
  isTownDropdownOpen,
  onTownDropdownToggle,
  onTownSelect,
  onTownDropdownClose,
}) {
  if (role === 'student') {
    return (
      <>
        <label className="auth-page__field">
          Class / Grade
          <SelectDropdown
            value={signupForm.classLevel}
            options={CLASS_OPTIONS}
            placeholder="Select class"
            label="Class / Grade"
            isOpen={isClassDropdownOpen}
            onToggle={onClassDropdownToggle}
            onSelect={onClassSelect}
            onClose={onClassDropdownClose}
          />
        </label>
        <label className="auth-page__field">
          Student Image
          <label className="auth-page__upload">
            <input
              type="file"
              accept="image/*"
              className="auth-page__upload-input"
              onChange={onChange}
              name="profileImage"
            />
            <span className="auth-page__upload-copy">
              {signupForm.profileImage ? 'Image selected' : 'Upload image'}
            </span>
          </label>
        </label>
        <label className="auth-page__field auth-page__field--full">
          School Name
          <input
            type="text"
            name="schoolName"
            value={signupForm.schoolName}
            onChange={onChange}
            required
            className="auth-page__input"
          />
        </label>
      </>
    );
  }

  if (role === 'teacher') {
    return (
      <>
        <label className="auth-page__field">
          Subject Expertise
          <input
            type="text"
            name="expertise"
            value={signupForm.expertise}
            onChange={onChange}
            required
            className="auth-page__input"
          />
        </label>
        <label className="auth-page__field">
          Experience (Years)
          <input
            type="text"
            name="experienceYears"
            value={signupForm.experienceYears}
            onChange={onChange}
            required
            className="auth-page__input"
          />
        </label>
      </>
    );
  }

  return (
    <label className="auth-page__field">
      Department / Access Area
      <input
        type="text"
        name="department"
        value={signupForm.department}
        onChange={onChange}
        required
        className="auth-page__input"
      />
    </label>
  );
}

export default function AuthPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { currentUser, login, signup } = useAuth();
  const [activeTab, setActiveTab] = useState('signup');
  const [signupForm, setSignupForm] = useState(emptySignupState);
  const [loginForm, setLoginForm] = useState(emptyLoginState);
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [isSignupPasswordVisible, setIsSignupPasswordVisible] = useState(false);
  const [isLoginPasswordVisible, setIsLoginPasswordVisible] = useState(false);
  const [isClassDropdownOpen, setIsClassDropdownOpen] = useState(false);
  const [isTownDropdownOpen, setIsTownDropdownOpen] = useState(false);
  const [isLandmarkDropdownOpen, setIsLandmarkDropdownOpen] = useState(false);

  const currentSignupRole = signupForm.role;
  const currentRoleContent = roleContent[currentSignupRole];

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
    setIsLandmarkDropdownOpen(false);
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
    setSignupForm((current) => ({
      ...current,
      town: value,
    }));
    setIsTownDropdownOpen(false);
  };

  const handleLandmarkSelect = (value) => {
    setSignupForm((current) => ({
      ...current,
      landmark: value,
    }));
    setIsLandmarkDropdownOpen(false);
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

    if (signupForm.pincode.length !== 6) {
      setErrorMessage('Pincode must be exactly 6 digits.');
      return;
    }

    try {
      const account = await signup(signupForm);

      setSuccessMessage('Account created. Log in to open the dashboard.');
      setActiveTab('login');
      setLoginForm({
        email: account.email,
        password: '',
      });
      setSignupForm((current) => ({
        ...emptySignupState,
        role: current.role,
      }));
    } catch (error) {
      setErrorMessage(error.message);
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
              <div className="auth-page__alert auth-page__alert--error">{errorMessage}</div>
            ) : null}

            {successMessage ? (
              <div className="auth-page__alert auth-page__alert--success">{successMessage}</div>
            ) : null}

            {activeTab === 'signup' ? (
              <form className="auth-page__form" onSubmit={handleSignupSubmit}>
                <div className="auth-page__role-switcher">
                  {ROLE_OPTIONS.map((role) => (
                    <button
                      key={role.value}
                      type="button"
                      className={`auth-page__role-chip${signupForm.role === role.value ? ' auth-page__role-chip--active' : ''}`}
                      onClick={() => handleSignupRoleChange(role.value)}
                    >
                      {role.label}
                    </button>
                  ))}
                </div>

                <div className="auth-page__form-grid">
                  <label className="auth-page__field">
                    {signupForm.role === 'super-user'
                      ? 'Super User Name'
                      : signupForm.role === 'teacher'
                        ? 'Teacher Name'
                        : 'Student Name'}
                    <input
                      type="text"
                      name="name"
                      value={signupForm.name}
                      onChange={handleSignupChange}
                      required
                      className="auth-page__input"
                    />
                  </label>
                  <label className="auth-page__field">
                    Email
                    <input
                      type="email"
                      name="email"
                      value={signupForm.email}
                      onChange={handleSignupChange}
                      required
                      className="auth-page__input"
                    />
                  </label>
                  <label className="auth-page__field">
                    Password
                    <div className="auth-page__password-field">
                      <input
                        type={isSignupPasswordVisible ? 'text' : 'password'}
                        name="password"
                        value={signupForm.password}
                        onChange={handleSignupChange}
                        required
                        className="auth-page__input auth-page__input--password"
                      />
                      <button
                        type="button"
                        className="auth-page__password-toggle"
                        onClick={() => setIsSignupPasswordVisible((current) => !current)}
                        aria-label={isSignupPasswordVisible ? 'Hide password' : 'Show password'}
                        aria-pressed={isSignupPasswordVisible}
                      >
                        {isSignupPasswordVisible ? <EyeOff /> : <Eye />}
                      </button>
                    </div>
                  </label>
                  <label className="auth-page__field">
                    Phone Number
                    <div className="auth-page__phone-field">
                      <span className="auth-page__phone-prefix">+91</span>
                      <input
                        type="tel"
                        name="phone"
                        value={signupForm.phone}
                        onChange={handleSignupChange}
                        required
                        inputMode="numeric"
                        maxLength={10}
                        minLength={10}
                        pattern="[0-9]{10}"
                        placeholder="9876543210"
                        className="auth-page__input auth-page__input--phone"
                      />
                    </div>
                  </label>
                  <label className="auth-page__field auth-page__field--full">
                    Address
                    <input
                      type="text"
                      name="address"
                      value={signupForm.address}
                      onChange={handleSignupChange}
                      required
                      className="auth-page__input"
                    />
                  </label>
                  <label className="auth-page__field">
                    Landmark (Optional)
                    <SelectDropdown
                      value={signupForm.landmark}
                      options={LANDMARK_OPTIONS}
                      placeholder="Select landmark"
                      label="Landmark"
                      isOpen={isLandmarkDropdownOpen}
                      onToggle={() => setIsLandmarkDropdownOpen((current) => !current)}
                      onSelect={handleLandmarkSelect}
                      onClose={() => setIsLandmarkDropdownOpen(false)}
                    />
                  </label>
                  <label className="auth-page__field">
                    Town
                    <SelectDropdown
                      value={signupForm.town}
                      options={TOWN_OPTIONS}
                      placeholder="Select town"
                      label="Town"
                      isOpen={isTownDropdownOpen}
                      onToggle={() => setIsTownDropdownOpen((current) => !current)}
                      onSelect={handleTownSelect}
                      onClose={() => setIsTownDropdownOpen(false)}
                    />
                  </label>
                  <label className="auth-page__field">
                    Pincode
                    <input
                      type="text"
                      name="pincode"
                      value={signupForm.pincode}
                      onChange={handleSignupChange}
                      required
                      inputMode="numeric"
                      maxLength={6}
                      placeholder="700001"
                      className="auth-page__input"
                    />
                  </label>
                  <SignupRoleFields
                    role={signupForm.role}
                    signupForm={signupForm}
                    onChange={handleSignupChange}
                    isClassDropdownOpen={isClassDropdownOpen}
                    onClassDropdownToggle={() => setIsClassDropdownOpen((current) => !current)}
                    onClassDropdownClose={() => setIsClassDropdownOpen(false)}
                    onClassSelect={handleClassSelect}
                    isTownDropdownOpen={isTownDropdownOpen}
                    onTownDropdownToggle={() => setIsTownDropdownOpen((current) => !current)}
                    onTownDropdownClose={() => setIsTownDropdownOpen(false)}
                    onTownSelect={handleTownSelect}
                  />
                </div>

                <div className="auth-page__admin-note">
                  <BriefcaseBusiness />
                  <p>After signup, each user can log in and move directly to the dashboard.</p>
                </div>

                <Button type="submit" className="button--full-width auth-page__submit">
                  {currentRoleContent.signupTitle}
                </Button>
              </form>
            ) : (
              <form className="auth-page__form" onSubmit={handleLoginSubmit}>
                <label className="auth-page__field">
                  Email
                  <input
                    type="email"
                    name="email"
                    value={loginForm.email}
                    onChange={handleLoginChange}
                    required
                    className="auth-page__input"
                  />
                </label>

                <label className="auth-page__field">
                  Password
                  <div className="auth-page__password-field">
                    <input
                      type={isLoginPasswordVisible ? 'text' : 'password'}
                      name="password"
                      value={loginForm.password}
                      onChange={handleLoginChange}
                      required
                      className="auth-page__input auth-page__input--password"
                    />
                    <button
                      type="button"
                      className="auth-page__password-toggle"
                      onClick={() => setIsLoginPasswordVisible((current) => !current)}
                      aria-label={isLoginPasswordVisible ? 'Hide password' : 'Show password'}
                      aria-pressed={isLoginPasswordVisible}
                    >
                      {isLoginPasswordVisible ? <EyeOff /> : <Eye />}
                    </button>
                  </div>
                </label>

                <Button type="submit" className="button--full-width auth-page__submit">
                  Log In
                </Button>
              </form>
            )}
          </div>
        </div>
      </section>

    </>
  );
}
