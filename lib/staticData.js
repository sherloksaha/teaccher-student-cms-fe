import {
  BadgeCheck,
  BookOpen,
  CalendarRange,
  CircleDollarSign,
  GraduationCap,
  Handshake,
  HeartHandshake,
  MonitorSmartphone,
  NotebookPen,
  Sparkles,
  Target,
  Users,
} from 'lucide-react';

export const navLinks = [
  { label: 'Home', href: '/' },
  { label: 'About Us', href: '/about' },
  { label: 'Contact', href: '#contact' },
];

export const features = [
  {
    title: 'Verified Tutors',
    description: 'Every tutor is screened for academic quality, conduct, and teaching readiness.',
    icon: BadgeCheck,
  },
  {
    title: 'Personalized Learning',
    description: 'Learning plans are tailored around your child’s pace, syllabus, and confidence level.',
    icon: BookOpen,
  },
  {
    title: 'Flexible Scheduling',
    description: 'Morning, evening, weekday, and weekend sessions that work around your routine.',
    icon: CalendarRange,
  },
  {
    title: 'Affordable Fees',
    description: 'Transparent pricing with options that suit both short-term support and long-term guidance.',
    icon: CircleDollarSign,
  },
];

export const steps = [
  {
    title: 'Tell Us Your Need',
    description: 'Share class level, school name, phone number, and location in a simple form.',
    icon: NotebookPen,
  },
  {
    title: 'Get Matched Fast',
    description: 'We shortlist qualified tutors based on subject expertise, location, and teaching style.',
    icon: Sparkles,
  },
  {
    title: 'Start Trial Sessions',
    description: 'Meet the tutor, assess comfort and teaching fit, and move forward with confidence.',
    icon: Handshake,
  },
  {
    title: 'Track Progress',
    description: 'Regular updates help parents stay informed about improvement, attendance, and milestones.',
    icon: Target,
  },
];

export const subjects = [
  { name: 'Mathematics', description: 'Strong fundamentals, problem solving, and exam confidence.' },
  { name: 'Science', description: 'Concept-led support for Physics, Chemistry, and Biology.' },
  { name: 'English', description: 'Grammar, reading, writing, and spoken confidence.' },
  { name: 'Computer', description: 'Coding basics, digital skills, and school computer subjects.' },
  { name: 'Social Studies', description: 'Structured explanations that make theory easier to retain.' },
  { name: 'Exam Prep', description: 'Focused revision plans for boards, Olympiads, and entrance tests.' },
];

export const chooseUsPoints = [
  'Parent-first communication with transparent tutor matching',
  'Safe, dependable, and quality-focused tutoring experiences',
  'One-on-one attention that improves confidence and consistency',
  'Support across school curriculum, homework, and exam preparation',
];

export const testimonials = [
  {
    name: 'Priya Sharma',
    role: 'Parent of Class 8 Student',
    quote:
      'The tutor was patient, punctual, and genuinely invested in my son’s progress. His math confidence improved within weeks.',
    image:
      'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=500&q=80',
  },
  {
    name: 'Aarav Mehta',
    role: 'Class 10 Student',
    quote:
      'Lessons felt easier to follow at home, and I could ask questions without hesitation. My science scores improved noticeably.',
    image:
      'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=500&q=80',
  },
  {
    name: 'Neha Gupta',
    role: 'Parent of Class 5 Student',
    quote:
      'We appreciated how carefully Home Tutor matched us with a teacher who understood both academics and my child’s temperament.',
    image:
      'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=500&q=80',
  },
];

export const teamMembers = [
  {
    name: 'Ananya Sen',
    role: 'Academic Director',
    bio: 'Leads curriculum quality and tutor mentoring with 12+ years in school education.',
    image:
      'https://images.unsplash.com/photo-1488426862026-3ee34a7d66df?auto=format&fit=crop&w=500&q=80',
  },
  {
    name: 'Rahul Verma',
    role: 'Senior Math Tutor',
    bio: 'Known for simplifying complex topics and building strong exam strategies for senior classes.',
    image:
      'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=500&q=80',
  },
  {
    name: 'Farah Khan',
    role: 'Student Success Lead',
    bio: 'Coordinates parent communication, progress tracking, and tutor-family support.',
    image:
      'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=500&q=80',
  },
];

export const stats = [
  { label: 'Students Taught', value: '2,500+' },
  { label: 'Tutors Onboarded', value: '350+' },
  { label: 'Parent Satisfaction', value: '96%' },
  { label: 'Success Rate', value: '91%' },
];

export const values = [
  {
    title: 'Trust',
    description: 'We build every parent relationship on transparency, safety, and accountability.',
    icon: HeartHandshake,
  },
  {
    title: 'Excellence',
    description: 'We invest in tutor quality, subject mastery, and meaningful learning outcomes.',
    icon: GraduationCap,
  },
  {
    title: 'Accessibility',
    description: 'We work to make personalized education flexible and approachable for more families.',
    icon: MonitorSmartphone,
  },
  {
    title: 'Partnership',
    description: 'Parents, students, and tutors move forward together through regular communication.',
    icon: Users,
  },
];

export const footerLinks = {
  quickLinks: [
    { label: 'Home', href: '/' },
    { label: 'About Us', href: '/about' },
    { label: 'Contact', href: '/#contact' },
  ],
  socialLinks: ['Facebook', 'Instagram', 'LinkedIn'],
};
