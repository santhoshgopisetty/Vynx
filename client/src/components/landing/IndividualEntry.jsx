import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Lock } from 'lucide-react';
import Button from '../common/Button';

export default function IndividualEntry() {
  const navigate = useNavigate();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.4 }}
      className="mt-6 pt-6 border-t border-border"
    >
      {/* Section Label */}
      <div className="flex items-center gap-2 mb-3">
        <div className="w-2 h-2 rounded-full bg-violet-500" />
        <span className="text-xs font-medium text-text-muted uppercase tracking-wider">Individual Private Chat</span>
      </div>

      <p className="text-sm text-text-secondary mb-4 leading-relaxed">
        Connect with someone using their unique secret code.
      </p>

      <Button
        variant="secondary"
        fullWidth
        size="lg"
        icon={Lock}
        onClick={() => navigate('/individual')}
      >
        Start Private Chat
      </Button>
    </motion.div>
  );
}
