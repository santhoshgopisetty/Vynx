import { Settings as SettingsIcon } from 'lucide-react';
import EmptyState from '../components/common/EmptyState';

export default function Settings() {
  return (
    <EmptyState
      icon={SettingsIcon}
      title="Settings"
      description="This screen will be fully implemented in Phase 8."
    />
  );
}

