'use client';

import {
  Building2,
  BriefcaseBusiness,
  CalendarDays,
  GraduationCap,
  LogOut,
  Mail,
  MapPin,
  Phone,
  School,
  ShieldCheck,
  Star,
} from 'lucide-react';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Button from '../components/Button';
import { useAuth } from '../context/AuthContext';
import { formatLocationSubtitle, formatLocationTitle } from '../utils/locationData';

function formatJoinedDate(value) {
  return new Date(value).toLocaleDateString(undefined, {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });
}

const dashboardConfig = {
  student: {
    eyebrow: 'Student Dashboard',
    summaryTitle: 'Saved student details at a glance',
    intro: 'This dashboard shows the student account details saved during signup.',
    metrics: (user) => [
      { label: 'Class / Grade', value: user.classLevel || 'Not provided', icon: GraduationCap },
      { label: 'School Name', value: user.schoolName || 'Not provided', icon: School },
      { label: 'Town', value: user.town || 'Not provided', icon: Building2 },
      { label: 'Joined', value: formatJoinedDate(user.joinedAt), icon: CalendarDays },
    ],
    summary: (user) => [
      ['Student Name', user.name],
      ['School', user.schoolName || 'Not provided'],
      ['Class', user.classLevel || 'Not provided'],
      ['Town', user.town || 'Not provided'],
      ['Address', user.address || 'Not provided'],
      ['Pincode', user.pincode || 'Not provided'],
      ['Phone', user.phone || 'Not provided'],
    ],
  },
  teacher: {
    eyebrow: 'Teacher Dashboard',
    summaryTitle: 'Saved teacher details at a glance',
    intro: 'This dashboard shows the teacher profile details saved during signup.',
    metrics: (user) => [
      { label: 'Expertise', value: user.expertise || 'Not provided', icon: Star },
      { label: 'Experience', value: user.experienceYears ? `${user.experienceYears} years` : 'Not provided', icon: GraduationCap },
      { label: 'Town', value: user.town || 'Not provided', icon: Building2 },
      { label: 'Joined', value: formatJoinedDate(user.joinedAt), icon: CalendarDays },
    ],
    summary: (user) => [
      ['Teacher Name', user.name],
      ['Expertise', user.expertise || 'Not provided'],
      ['Experience', user.experienceYears ? `${user.experienceYears} years` : 'Not provided'],
      ['Town', user.town || 'Not provided'],
      ['Address', user.address || 'Not provided'],
      ['Pincode', user.pincode || 'Not provided'],
      ['Phone', user.phone || 'Not provided'],
    ],
  },
  'super-user': {
    eyebrow: 'Super User Dashboard',
    summaryTitle: 'Saved super user details at a glance',
    intro: 'This dashboard shows the super user account details saved during signup.',
    metrics: (user) => [
      { label: 'Department', value: user.department || 'Not provided', icon: BriefcaseBusiness },
      { label: 'Access Level', value: 'Platform Super User', icon: ShieldCheck },
      { label: 'Town', value: user.town || 'Not provided', icon: Building2 },
      { label: 'Joined', value: formatJoinedDate(user.joinedAt), icon: CalendarDays },
    ],
    summary: (user) => [
      ['Super User Name', user.name],
      ['Department', user.department || 'Not provided'],
      ['Access', 'Platform Super User'],
      ['Town', user.town || 'Not provided'],
      ['Address', user.address || 'Not provided'],
      ['Pincode', user.pincode || 'Not provided'],
      ['Phone', user.phone || 'Not provided'],
    ],
  },
};

export default function DashboardPage() {
  const router = useRouter();
  const { currentUser, isReady, logout } = useAuth();

  const user = currentUser;

  useEffect(() => {
    if (isReady && !currentUser) {
      router.push('/auth');
    }
  }, [currentUser, isReady, router]);

  if (!isReady || !user) {
    return null;
  }

  const config = dashboardConfig[user.role] || dashboardConfig.student;
  const savedLocationTitle =
    formatLocationTitle(user.location) || user.locationLabel || 'Not selected';
  const savedLocationSubtitle = formatLocationSubtitle(user.location);

  const handleLogout = () => {
    logout();
    router.push('/');
  };

  return (
    <section className="dashboard-page">
      <div className="section-shell dashboard-page__inner">
        <div className="dashboard-page__hero">
          <div className="dashboard-page__hero-row">
            <div className="dashboard-page__hero-copy-wrap">
              <p className="dashboard-page__eyebrow">{config.eyebrow}</p>
              <h1 className="dashboard-page__hero-title">Welcome back, {user.name}</h1>
              <p className="dashboard-page__hero-copy">{config.intro}</p>
            </div>
            <button type="button" onClick={handleLogout} className="dashboard-page__logout">
              <LogOut />
              Log Out
            </button>
          </div>
        </div>

        <div className="dashboard-page__metrics">
          {config.metrics(user).map((item) => {
            const Icon = item.icon;

            return (
              <article key={item.label} className="glass-card dashboard-page__metric">
                <div className="dashboard-page__metric-icon">
                  <Icon />
                </div>
                <p className="dashboard-page__metric-label">{item.label}</p>
                <p className="dashboard-page__metric-value">{item.value}</p>
              </article>
            );
          })}
        </div>

        <div className="dashboard-page__details">
          <article className="glass-card dashboard-page__detail-card">
            <div className="dashboard-page__detail-row">
              <div className="dashboard-page__detail-icon">
                <Mail />
              </div>
              <div>
                <p className="dashboard-page__detail-label">Account Email</p>
                <h2 className="dashboard-page__detail-title">{user.email}</h2>
              </div>
            </div>

            <div className="dashboard-page__summary-grid">
              <div className="dashboard-page__detail-row">
                <div className="dashboard-page__detail-icon">
                  <Phone />
                </div>
                <div>
                  <p className="dashboard-page__detail-label">Phone Number</p>
                  <h2 className="dashboard-page__detail-title">
                    {user.phone ? `+91 ${user.phone}` : 'Not provided'}
                  </h2>
                </div>
              </div>

              <div className="dashboard-page__detail-row">
                <div className="dashboard-page__detail-icon">
                  <Building2 />
                </div>
                <div>
                  <p className="dashboard-page__detail-label">Town & Address</p>
                  <h2 className="dashboard-page__detail-title">{user.town || 'Not provided'}</h2>
                  {user.address ? (
                    <p className="dashboard-page__detail-copy">{user.address}</p>
                  ) : null}
                  {user.pincode ? (
                    <p className="dashboard-page__detail-copy">Pincode: {user.pincode}</p>
                  ) : null}
                </div>
              </div>
            </div>

            {user.location ? (
              <div className="dashboard-page__summary-grid">
                <div className="dashboard-page__detail-row">
                  <div className="dashboard-page__detail-icon">
                    <MapPin />
                  </div>
                  <div>
                    <p className="dashboard-page__detail-label">
                      {user.role === 'teacher' ? 'Service Area' : 'Saved Location'}
                    </p>
                    <h2 className="dashboard-page__detail-title">{savedLocationTitle}</h2>
                    {savedLocationSubtitle ? (
                      <p className="dashboard-page__detail-copy">{savedLocationSubtitle}</p>
                    ) : null}
                  </div>
                </div>

                <a
                  href={`https://www.openstreetmap.org/?mlat=${user.location.lat}&mlon=${user.location.lng}#map=16/${user.location.lat}/${user.location.lng}`}
                  target="_blank"
                  rel="noreferrer"
                  className="dashboard-page__map-link"
                >
                  View on Map
                </a>
              </div>
            ) : (
              <div className="dashboard-page__admin-note">
                <ShieldCheck />
                <div>
                  <p className="dashboard-page__detail-label">Access Summary</p>
                  <h2 className="dashboard-page__detail-title">
                    {user.department || 'General Platform Operations'}
                  </h2>
                  <p className="dashboard-page__detail-copy">
                    This super user account does not require a mapped service location.
                  </p>
                </div>
              </div>
            )}
          </article>

          <article className="dashboard-page__summary-card">
            <p className="dashboard-page__summary-eyebrow">{config.eyebrow}</p>
            <h2 className="dashboard-page__summary-title">{config.summaryTitle}</h2>
            <div className="dashboard-page__summary-grid">
              {config.summary(user).map(([label, value]) => (
                <div key={label} className="dashboard-page__summary-item">
                  <p className="dashboard-page__summary-label">{label}</p>
                  <p className="dashboard-page__summary-value">{value}</p>
                </div>
              ))}
            </div>

            <div className="dashboard-page__actions">
              <Button to="/about">Learn More</Button>
              <Button to="/" variant="secondary">
                Back to Home
              </Button>
            </div>
          </article>
        </div>
      </div>
    </section>
  );
}
