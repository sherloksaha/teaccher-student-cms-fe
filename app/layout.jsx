import 'leaflet/dist/leaflet.css';
import '../src/index.css';
import '../src/views/HomePage.css';
import '../src/views/AuthPage.css';
import '../src/views/ServicesPage.css';
import '../src/views/AboutPage.css';
import '../src/views/DashboardPage.css';
import '../src/components/Button.css';
import '../src/components/FeatureCard.css';
import '../src/components/SectionHeading.css';
import '../src/components/SubjectCard.css';
import '../src/components/TestimonialCard.css';
import '../src/components/TeamCard.css';
import '../src/components/Navbar.css';
import '../src/components/Footer.css';
import '../src/components/location/LocationPicker.css';
import { AuthProvider } from '../src/context/AuthContext';
import Navbar from '../src/components/Navbar';
import Footer from '../src/components/Footer';

export const metadata = {
  title: 'Home Tutor',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <AuthProvider>
          <Navbar />
          {children}
          <Footer />
        </AuthProvider>
      </body>
    </html>
  );
}
