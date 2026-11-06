import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Clock, Users, Copy, Check, ExternalLink, Lock } from 'lucide-react';
import Card from '../components/common/Card';
import Button from '../components/common/Button';
import Input from '../components/common/Input';
import PasswordInput from '../components/common/PasswordInput';
import Dropdown from '../components/common/Dropdown';
import toast from 'react-hot-toast';

const expirationOptions = [
  { value: '30', label: '30 minutes' },
  { value: '60', label: '1 hour' },
  { value: '180', label: '3 hours' },
  { value: '360', label: '6 hours' },
  { value: '720', label: '12 hours' },
  { value: '1440', label: '24 hours' },
];

const participantOptions = [
  { value: '2', label: '2 participants' },
  { value: '5', label: '5 participants' },
  { value: '10', label: '10 participants' },
  { value: '20', label: '20 participants' },
];

export default function CreateRoom() {
  const navigate = useNavigate();
  const [step, setStep] = useState('form'); // 'form' | 'success'
  const [loading, setLoading] = useState(false);
  const [copiedCode, setCopiedCode] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);
  const [form, setForm] = useState({
    name: '',
    password: '',
    expiration: '60',
    maxParticipants: '10',
  });
  const [errors, setErrors] = useState({});
  const [roomData, setRoomData] = useState(null);

  const updateForm = (field, value) => {
    setForm(prev => ({ ...prev, [field]: value }));
    if (errors[field]) setErrors(prev => ({ ...prev, [field]: '' }));
  };

  const validate = () => {
    const newErrors = {};
    if (!form.name.trim()) newErrors.name = 'Room name is required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleCreate = () => {
    if (!validate()) return;
    setLoading(true);
    setTimeout(() => {
      const code = `RM-${Math.random().toString(36).substring(2, 6).toUpperCase()}`;
      setRoomData({
        code,
        name: form.name,
        link: `${window.location.origin}/room/${code}`,
        expiration: expirationOptions.find(o => o.value === form.expiration)?.label,
        maxParticipants: form.maxParticipants,
      });
      setStep('success');
      setLoading(false);
      toast.success('Room created successfully!');
    }, 1200);
  };

  const copyToClipboard = async (text, type) => {
    try {
      await navigator.clipboard.writeText(text);
      if (type === 'code') {
        setCopiedCode(true);
        setTimeout(() => setCopiedCode(false), 2000);
      } else {
        setCopiedLink(true);
        setTimeout(() => setCopiedLink(false), 2000);
      }
      toast.success('Copied to clipboard!');
    } catch {
      toast.error('Failed to copy');
    }
  };

  if (step === 'success' && roomData) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="w-full max-w-md"
        >
          <Card className="text-center">
            <div className="w-14 h-14 rounded-2xl bg-success/10 flex items-center justify-center mx-auto mb-4">
              <Check size={28} className="text-success" />
            </div>
            <h2 className="text-xl font-bold text-text-primary mb-2">Room Created!</h2>
            <p className="text-sm text-text-secondary mb-6">{roomData.name}</p>

            {/* Room Code */}
            <div className="bg-bg-input rounded-xl p-4 mb-3">
              <p className="text-xs text-text-muted mb-1">Room Code</p>
              <div className="flex items-center justify-between">
                <span className="text-lg font-mono font-bold text-accent">{roomData.code}</span>
                <button
                  onClick={() => copyToClipboard(roomData.code, 'code')}
                  className="p-2 hover:bg-bg-card rounded-lg transition-colors cursor-pointer"
                  aria-label="Copy room code"
                >
                  {copiedCode ? <Check size={16} className="text-success" /> : <Copy size={16} className="text-text-muted" />}
                </button>
              </div>
            </div>

            {/* Invite Link */}
            <div className="bg-bg-input rounded-xl p-4 mb-6">
              <p className="text-xs text-text-muted mb-1">Invitation Link</p>
              <div className="flex items-center justify-between">
                <span className="text-sm text-text-secondary truncate mr-2">{roomData.link}</span>
                <button
                  onClick={() => copyToClipboard(roomData.link, 'link')}
                  className="p-2 hover:bg-bg-card rounded-lg transition-colors shrink-0 cursor-pointer"
                  aria-label="Copy invitation link"
                >
                  {copiedLink ? <Check size={16} className="text-success" /> : <Copy size={16} className="text-text-muted" />}
                </button>
              </div>
            </div>

            {/* Room Details */}
            <div className="flex items-center justify-center gap-4 text-xs text-text-muted mb-6">
              <span className="flex items-center gap-1"><Clock size={12} /> {roomData.expiration}</span>
              <span className="flex items-center gap-1"><Users size={12} /> Max {roomData.maxParticipants}</span>
            </div>

            <Button fullWidth size="lg" onClick={() => navigate(`/room/${roomData.code}`)}>
              Enter Room
            </Button>
          </Card>
        </motion.div>
      </div>
    );
  }

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
          <h1 className="text-2xl font-bold text-text-primary mb-1">Create a Room</h1>
          <p className="text-sm text-text-secondary mb-6">Set up a temporary private chat room.</p>

          <div className="space-y-4">
            <Input
              label="Room Name"
              placeholder="My Private Room"
              value={form.name}
              onChange={(e) => updateForm('name', e.target.value)}
              error={errors.name}
            />

            <PasswordInput
              label="Room Password (Optional)"
              placeholder="Leave empty for no password"
              value={form.password}
              onChange={(e) => updateForm('password', e.target.value)}
            />

            <div className="relative">
              <Dropdown
                label="Room Expiration"
                options={expirationOptions}
                value={form.expiration}
                onChange={(val) => updateForm('expiration', val)}
              />
            </div>

            <div className="relative">
              <Dropdown
                label="Maximum Participants"
                options={participantOptions}
                value={form.maxParticipants}
                onChange={(val) => updateForm('maxParticipants', val)}
              />
            </div>
          </div>

          <div className="flex gap-3 mt-6">
            <Button variant="secondary" onClick={() => navigate('/')} className="flex-1">
              Cancel
            </Button>
            <Button onClick={handleCreate} loading={loading} className="flex-1">
              Create Room
            </Button>
          </div>
        </Card>
      </motion.div>
    </div>
  );
}

