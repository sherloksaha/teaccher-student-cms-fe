import { Suspense } from 'react';
import AuthPage from '../../src/views/AuthPage';

export default function SignupPage() {
  return (
    <Suspense fallback={null}>
      <AuthPage />
    </Suspense>
  );
}
