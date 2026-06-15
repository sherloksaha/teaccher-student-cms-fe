import HomePage from '../src/views/HomePage';
import { navLinks } from '../lib/staticData';

export default function Page() {
  return <HomePage navLinks={navLinks} />;
}
