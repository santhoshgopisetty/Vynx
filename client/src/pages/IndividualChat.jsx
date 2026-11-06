import { MessageCircle } from 'lucide-react';
import EmptyState from '../components/common/EmptyState';

export default function IndividualChat() {
  return (
    <EmptyState
      icon={MessageCircle}
      title="Individual Chat"
      description="This screen will be fully implemented in Phase 5."
    />
  );
}

