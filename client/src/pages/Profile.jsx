import { User } from 'lucide-react';
import EmptyState from '../components/common/EmptyState';

export default function Profile() {
  return (
    <EmptyState
      icon={User}
      title="Profile"
      description="This screen will be fully implemented in Phase 8."
    />
  );
}

