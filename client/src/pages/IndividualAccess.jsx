import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, KeyRound, ShieldCheck, UserCheck, AlertCircle } from 'lucide-react';
import Card from '../components/common/Card';
import Button from '../components/common/Button';
import Input from '../components/common/Input';
import PasswordInput from '../components/common/PasswordInput';
import Loader from '../components/common/Loader';
import toast from 'react-hot-toast';

export default function IndividualAccess() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState('idle'); // idle | verifying | found | pending | granted | error
  const [form, setForm] = useState({
    secretCode: '',
    password: '',
  });
  const [errors, setErrors] = useState({});
  const [foundUser, setFoundUser] = useState(null);

  const updateForm = (field, value) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) setErrors((prev) => ({ ...prev, [field]: '' }));
    if (status === 'error') setStatus('idle');
  };

  const validate = () => {
    const newErrors = {};
    if (!form.secretCode.trim()) newErrors.secretCode = 'Secret code is required';
    if (!form.password.trim()) newErrors.password = 'Conversation password is required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleContinue = (e) => {
    e?.preventDefault();
    if (!validate()) return;
    setLoading(true);
    setStatus('verifying');

    setTimeout(() => {
      const code = form.secretCode.trim().toUpperCase();

      // Mock valid codes from specification
      if (code === 'SAN-82X9-KL') {
        setFoundUser({ name: 'Santhosh', code });
        if (form.password === 'chat123') {
          setStatus('granted');
          toast.success('Access granted! Entering conversation...');
          setTimeout(() => navigate('/individual/chat/conv-001'), 600);
        } else {
          setStatus('error');
          setErrors({ password: 'Incorrect conversation password. (Hint: chat123)' });
          toast.error('Incorrect conversation password');
        }
      } else if (code === 'RAH-91PQ-MN') {
        setFoundUser({ name: 'Rahul', code });
        if (form.password === 'chat456') {
          setStatus('granted');
          toast.success('Access granted! Entering conversation...');
          setTimeout(() => navigate('/individual/chat/conv-002'), 600);
        } else {
          setStatus('error');
          setErrors({ password: 'Incorrect conversation password. (Hint: chat456)' });
          toast.error('Incorrect conversation password');
        }
      } else {
        setStatus('error');
        setErrors({ secretCode: 'Invalid secret code. No user found. (Try SAN-82X9-KL or RAH-91PQ-MN)' });
        toast.error('User not found');
      }
      setLoading(false);
    }, 1000);
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
              <ShieldCheck size={20} className="text-accent" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-text-primary">Private Conversation</h1>
              <p className="text-xs text-text-secondary">Direct 1-on-1 encrypted access</p>
            </div>
          </div>

          <p className="text-xs text-text-muted mb-5 mt-2">
            Use the person's unique secret code to access your private conversation.
          </p>

          {status === 'verifying' ? (
            <div className="py-8">
              <Loader text="Verifying secret code & conversation credentials..." />
            </div>
          ) : (
            <form onSubmit={handleContinue} className="space-y-4">
              <Input
                label="Secret Code"
                placeholder="e.g. SAN-82X9-KL or RAH-91PQ-MN"
                icon={KeyRound}
                value={form.secretCode}
                onChange={(e) => updateForm('secretCode', e.target.value)}
                error={errors.secretCode}
                helperText="Demo codes: SAN-82X9-KL or RAH-91PQ-MN"
                autoFocus
              />

              <PasswordInput
                label="Conversation Password"
                placeholder="Enter conversation password"
                value={form.password}
                onChange={(e) => updateForm('password', e.target.value)}
                error={errors.password}
                helperText="Demo passwords: 'chat123' (for SAN) or 'chat456' (for RAH)"
              />

              {foundUser && status !== 'error' && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  className="bg-success/10 border border-success/20 rounded-xl p-3 flex items-center gap-2"
                >
                  <UserCheck size={18} className="text-success shrink-0" />
                  <p className="text-xs text-success font-medium">
                    User found: <span className="font-bold">{foundUser.name}</span> ({foundUser.code})
                  </p>
                </motion.div>
              )}

              <div className="space-y-2.5 pt-2">
                <Button
                  type="submit"
                  fullWidth
                  size="lg"
                  loading={loading}
                  disabled={status === 'verifying'}
                >
                  Continue to Chat
                </Button>

                <Button
                  variant="secondary"
                  fullWidth
                  size="lg"
                  onClick={() => navigate('/register')}
                >
                  Create Account
                </Button>

                <Button
                  variant="ghost"
                  fullWidth
                  size="md"
                  onClick={() => navigate('/')}
                >
                  Back to Home
                </Button>
              </div>
            </form>
          )}
        </Card>
      </motion.div>
    </div>
  );
}
