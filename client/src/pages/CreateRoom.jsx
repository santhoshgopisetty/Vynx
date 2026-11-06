import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, Clock, Users, Shield, PlusCircle } from 'lucide-react';
import Card from '../components/common/Card';
import Button from '../components/common/Button';
import Input from '../components/common/Input';
import PasswordInput from '../components/common/PasswordInput';
import Dropdown from '../components/common/Dropdown';
import RoomInvitation from '../components/room/RoomInvitation';
import useRoomStore from '../store/roomStore';
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
  const createRoomInStore = useRoomStore((state) => state.createRoom);

  const [step, setStep] = useState('form'); // 'form' | 'success'
  const [loading, setLoading] = useState(false);
  const [createdRoom, setCreatedRoom] = useState(null);

  const [form, setForm] = useState({
    name: '',
    password: '',
    expiration: '60',
    maxParticipants: '10',
  });
  const [errors, setErrors] = useState({});

  const updateForm = (field, value) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) setErrors((prev) => ({ ...prev, [field]: '' }));
  };

  const validate = () => {
    const newErrors = {};
    if (!form.name.trim()) newErrors.name = 'Room name is required';
    if (form.name.trim().length > 50) newErrors.name = 'Room name cannot exceed 50 characters';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleCreate = (e) => {
    e?.preventDefault();
    if (!validate()) return;

    setLoading(true);

    // Realistic UI simulation delay
    setTimeout(() => {
      const selectedExp = expirationOptions.find((o) => o.value === form.expiration);
      const room = createRoomInStore({
        name: form.name.trim(),
        password: form.password.trim() || null,
        expiration: form.expiration,
        expirationLabel: selectedExp?.label,
        maxParticipants: form.maxParticipants,
      });

      setCreatedRoom(room);
      setStep('success');
      setLoading(false);
      toast.success('Room created successfully!');
    }, 800);
  };

  return (
    <div className="min-h-screen bg-bg-main flex items-center justify-center p-4 sm:p-6">
      <div className="w-full max-w-md">
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-sm text-text-muted hover:text-text-primary transition-colors mb-6 font-medium"
        >
          <ArrowLeft size={16} /> Back to Home
        </Link>

        <AnimatePresence mode="wait">
          {step === 'form' ? (
            <motion.div
              key="create-form"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.98 }}
              transition={{ duration: 0.25 }}
            >
              <Card>
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-10 h-10 rounded-xl bg-accent/10 border border-accent/20 flex items-center justify-center">
                    <PlusCircle size={20} className="text-accent" />
                  </div>
                  <div>
                    <h1 className="text-xl font-bold text-text-primary">Create a Room</h1>
                    <p className="text-xs text-text-secondary">Temporary, private, distraction-free</p>
                  </div>
                </div>

                <form onSubmit={handleCreate} className="space-y-4 mt-5">
                  <Input
                    label="Room Name"
                    placeholder="e.g. Design Sync, Quick Catchup"
                    value={form.name}
                    onChange={(e) => updateForm('name', e.target.value)}
                    error={errors.name}
                    autoFocus
                  />

                  <PasswordInput
                    label="Room Password (Optional)"
                    placeholder="Leave empty for open room"
                    value={form.password}
                    onChange={(e) => updateForm('password', e.target.value)}
                    helperText="Require participants to enter a password to join."
                  />

                  <Dropdown
                    label="Room Expiration"
                    options={expirationOptions}
                    value={form.expiration}
                    onChange={(val) => updateForm('expiration', val)}
                  />

                  <Dropdown
                    label="Maximum Participants"
                    options={participantOptions}
                    value={form.maxParticipants}
                    onChange={(val) => updateForm('maxParticipants', val)}
                  />

                  <div className="flex items-center gap-3 pt-3">
                    <Button
                      variant="secondary"
                      onClick={() => navigate('/')}
                      className="flex-1"
                      disabled={loading}
                    >
                      Cancel
                    </Button>
                    <Button
                      type="submit"
                      loading={loading}
                      className="flex-1"
                    >
                      Create Room
                    </Button>
                  </div>
                </form>
              </Card>
            </motion.div>
          ) : (
            <motion.div
              key="create-success"
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3 }}
            >
              <RoomInvitation
                room={createdRoom}
                onEnter={() => navigate(`/room/${createdRoom.code}`)}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
