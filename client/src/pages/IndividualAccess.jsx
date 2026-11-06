import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, KeyRound, ShieldCheck } from 'lucide-react';
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
    setForm(prev => ({ ...prev, [field]: value }));
    if (errors[field]) setErrors(prev => ({ ...prev, [field]: '' }));
    if (status === 'error') setStatus('idle');
  };

  const validate = () => {
    const newErrors = {};
    if (!form.secretCode.trim()) newErrors.secretCode = 'Secret code is required';
    if (!form.password.trim()) newErrors.password = 'Conversation password is required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleContinue = () => {
    if (!validate()) return;
    setLoading(true);
    setStatus('verifying');

    setTimeout(() => {
      const code = form.secretCode.trim().toUpperCase();

      // Mock valid codes
      if (code === 'SAN-82X9-KL') {
        setFoundUser({ name: 'Santhosh', code });
        if (form.password === 'chat123') {
          setStatus('granted');
          toast.success('Access granted!');
          setTimeout(() => navigate('/individual/chat/conv-001'), 800);
        } else {
          setStatus('error');
          setErrors({ password: 'Incorrect conversation password' });
          toast.error('Incorrect password');
        }
      } else if (code === 'RAH-91PQ-MN') {
        setFoundUser({ name: 'Rahul', code });
        if (form.password === 'chat456') {
          setStatus('granted');
          toast.success('Access granted!');
          setTimeout(() => navigate('/individual/chat/conv-002'), 800);
        } else {
          setStatus('error');
          setErrors({ password: 'Incorrect conversation password' });
          toast.error('Incorrect password');
        }
      } else {
        setStatus('error');
        setErrors({ secretCode: 'Invalid secret code. No user found.' });
        toast.error('User not found');
      }
      setLoading(false);
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
          <div className="flex items-center gap-3 mb-1">
            <div className="w-10 h-10 rounded-xl bg-accent/10 flex items-center justify-center">
              <ShieldCheck size={20} className="text-accent" />
            </div>
            <h1 className="text-2xl font-bold text-text-primary">Enter a Private Conversation</h1>
          </div>
          <p className="text-sm text-text-secondary mb-6 mt-2">
            Use the person's unique secret code to access your private conversation.
          </p>

          {status === 'verifying' ? (
            <Loader text="Verifying access..." />
          ) : (
            <div className="space-y-4">
              <Input
                label="Secret Code"
                placeholder="e.g. SAN-82X9-KL"
                icon={KeyRound}
                value={form.secretCode}
                onChange={(e) => updateForm('secretCode', e.target.value)}
                error={errors.secretCode}
              />

              <PasswordInput
                label="Conversation Password"
                placeholder="Enter conversation password"
                value={form.password}
                onChange={(e) => updateForm('password', e.target.value)}
                error={errors.password}
              />

              {foundUser && status !== 'error' && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  className="bg-success/10 border border-success/20 rounded-xl p-3"
                >
                  <p className="text-sm text-success">
                    User found: <span className="font-semibold">{foundUser.name}</span>
                  </p>
                </motion.div>
              )}
            </div>
          )}

          <div className="space-y-3 mt-6">
            <Button fullWidth size="lg" onClick={handleContinue} loading={loading} disabled={status === 'verifying'}>
              Continue to Chat
            </Button>
            <Button variant="secondary" fullWidth onClick={() => navigate('/register')}>
              Create Account
            </Button>
            <Button variant="ghost" fullWidth onClick={() => navigate('/')}>
              Back to Home
            </Button>
          </div>
        </Card>
      </motion.div>
    </div>
  );
}

