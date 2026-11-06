import { useState, useEffect } from 'react';
import { useNavigate, useSearchParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Hash, User, ShieldAlert, LogIn } from 'lucide-react';
import Card from '../components/common/Card';
import Button from '../components/common/Button';
import Input from '../components/common/Input';
import PasswordInput from '../components/common/PasswordInput';
import useRoomStore from '../store/roomStore';
import toast from 'react-hot-toast';

export default function JoinRoom() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const rooms = useRoomStore((state) => state.rooms);
  const setGuestName = useRoomStore((state) => state.setGuestName);

  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    code: searchParams.get('code') || '',
    password: '',
    displayName: '',
  });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    const codeParam = searchParams.get('code');
    if (codeParam) {
      setForm((prev) => ({ ...prev, code: codeParam }));
    }
  }, [searchParams]);

  const updateForm = (field, value) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) setErrors((prev) => ({ ...prev, [field]: '' }));
  };

  // Helper to extract clean room code from URL or input
  const extractCode = (input) => {
    if (!input) return '';
    const clean = input.trim();
    if (clean.includes('/')) {
      const parts = clean.split('/');
      return parts[parts.length - 1].replace(/[^a-zA-Z0-9-]/g, '');
    }
    return clean;
  };

  const validate = () => {
    const newErrors = {};
    const code = extractCode(form.code);

    if (!code) {
      newErrors.code = 'Room code or invitation link is required';
    }
    if (!form.displayName.trim()) {
      newErrors.displayName = 'Display name is required for anonymous guests';
    } else if (form.displayName.trim().length > 25) {
      newErrors.displayName = 'Display name must be 25 characters or fewer';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleJoin = (e) => {
    e?.preventDefault();
    if (!validate()) return;

    setLoading(true);

    setTimeout(() => {
      const rawCode = extractCode(form.code).toUpperCase();
      
      // Look for the room in store or allow standard mock codes
      const targetRoom = rooms.find((r) => r.code.toUpperCase() === rawCode);

      if (!targetRoom && !rawCode.startsWith('RM-')) {
        setErrors({
          code: 'Room not found. Please verify the code or link and try again.',
        });
        setLoading(false);
        toast.error('Invalid room code');
        return;
      }

      // Check room password if room is password protected
      if (targetRoom && targetRoom.password) {
        if (!form.password) {
          setErrors({
            password: 'This room is password-protected. Please enter the password.',
          });
          setLoading(false);
          toast.error('Password required');
          return;
        }

        if (form.password !== targetRoom.password) {
          setErrors({
            password: 'Incorrect room password. Please try again.',
          });
          setLoading(false);
          toast.error('Incorrect password');
          return;
        }
      }

      // Save display name for room participation
      setGuestName(form.displayName.trim());

      toast.success(`Entering room ${targetRoom ? targetRoom.name : rawCode}...`);
      setLoading(false);
      navigate(`/room/${rawCode}`);
    }, 700);
  };

  return (
    <div className="min-h-screen bg-bg-main flex items-center justify-center p-4 sm:p-6">
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md"
      >
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-sm text-text-muted hover:text-text-primary transition-colors mb-6 font-medium"
        >
          <ArrowLeft size={16} /> Back to Home
        </Link>

        <Card>
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-xl bg-accent/10 border border-accent/20 flex items-center justify-center">
              <LogIn size={20} className="text-accent" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-text-primary">Join a Room</h1>
              <p className="text-xs text-text-secondary">No registration required. Join instantly.</p>
            </div>
          </div>

          <form onSubmit={handleJoin} className="space-y-4 mt-5">
            <Input
              label="Room Code or Invitation Link"
              placeholder="e.g. RM-DEMO or paste full link"
              icon={Hash}
              value={form.code}
              onChange={(e) => updateForm('code', e.target.value)}
              error={errors.code}
              helperText="Tip: Try 'RM-DEMO' for the demo room"
            />

            <PasswordInput
              label="Room Password (if protected)"
              placeholder="Enter room password if set"
              value={form.password}
              onChange={(e) => updateForm('password', e.target.value)}
              error={errors.password}
            />

            <Input
              label="Your Display Name"
              placeholder="How other participants will see you"
              icon={User}
              value={form.displayName}
              onChange={(e) => updateForm('displayName', e.target.value)}
              error={errors.displayName}
            />

            <div className="pt-2">
              <Button
                type="submit"
                fullWidth
                size="lg"
                loading={loading}
              >
                Join Room
              </Button>
            </div>
          </form>
        </Card>
      </motion.div>
    </div>
  );
}
