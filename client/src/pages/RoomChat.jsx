import { Users } from 'lucide-react';
import EmptyState from '../components/common/EmptyState';

export default function RoomChat() {
  return (
    <EmptyState
      icon={Users}
      title="Room Chat"
      description="This screen will be fully implemented in Phase 6."
    />
  );
}

