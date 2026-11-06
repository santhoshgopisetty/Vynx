import { useState, useEffect } from 'react';
import { useNavigate, useSearchParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Hash, User } from 'lucide-react';
import Card from '../components/common/Card';
import Button from '../components/common/Button';
import Input from '../components/common/Input';
import PasswordInput from '../components/common/PasswordInput';
import toast from 'react-hot-toast';

export default function JoinRoom() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    code: searchParams.get('code') || '',
    password: '',
    displayName: '',
  });
  const [errors, setErrors] = useState({});

  const updateForm = (field, value) => {
    setForm(prev => ({ ...prev, [field]: value }));
    if (errors[field]) setErrors(prev => ({ ...prev, [field]: '' }));
  };

  const validate = () => {
    const newErrors = {};
    if (!form.code.trim()) newErrors.code = 'Room code or link is required';
    if (!form.displayName.trim()) newErrors.displayName = 'Display name is required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleJoin = () => {
    if (!validate()) return;
    setLoading(true);

    setTimeout(() => {
      // Simulate room verification
      const code = form.code.trim().split('/').pop();
      const validCodes = ['RM-DEMO', 'RM-TEST'];

      if (!validCodes.includes(code.toUpperCase()) && !code.startsWith('RM-')) {
        setErrors({ code: 'Invalid room code. Please check and try again.' });
        setLoading(false);
        toast.error('Room not found');
        return;
      }

      toast.success('Joining room...');
      setLoading(false);
      navigate(`/room/${code.toUpperCase()}`);
    }, 1500);
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md"
      >
        <Link to="/" className="inline-flex items-center gap-2 text-sm text-text-muted hover:text-text-primary transition-colors mb-6">
          <ArrowLeft size={16} /> Back to Home
        </Link>

        <Card>
          <h1 className="text-2xl font-bold text-text-primary mb-1">Join a Room</h1>
          <p className="text-sm text-text-secondary mb-6">Enter a room code or invitation link to join.</p>

          <div className="space-y-4">
            <Input
              label="Room Code or Invitation Link"
              placeholder="RM-XXXX or paste invite link"
              icon={Hash}
              value={form.code}
              onChange={(e) => updateForm('code', e.target.value)}
              error={errors.code}
            />

            <PasswordInput
              label="Room Password (if required)"
              placeholder="Enter room password"
              value={form.password}
              onChange={(e) => updateForm('password', e.target.value)}
              error={errors.password}
            />

            <Input
              label="Display Name"
              placeholder="How should others see you?"
              icon={User}
              value={form.displayName}
              onChange={(e) => updateForm('displayName', e.target.value)}
              error={errors.displayName}
            />
          </div>

          <Button fullWidth size="lg" onClick={handleJoin} loading={loading} className="mt-6">
            Join Room
          </Button>
        </Card>
      </motion.div>
    </div>
  );
}

