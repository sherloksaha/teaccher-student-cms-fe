import { Suspense } from 'react';
import AuthPage from '../../src/views/AuthPage';

export default function Auth() {
  return (
    <Suspense fallback={null}>
      <AuthPage />
    </Suspense>
  );
}
