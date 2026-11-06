import { LogIn } from 'lucide-react';
import EmptyState from '../components/common/EmptyState';

export default function Login() {
  return (
    <EmptyState
      icon={LogIn}
      title="Login"
      description="This screen will be fully implemented in Phase 7."
    />
  );
}

