import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import Button from '../common/Button';
import toast from 'react-hot-toast';

export default function RoomEntry() {
  const [roomInput, setRoomInput] = useState('');
  const navigate = useNavigate();

  const handleCreateRoom = () => {
    navigate('/create-room');
  };

  const handleJoinRoom = () => {
    if (!roomInput.trim()) {
      toast.error('Please enter a room code or invite link');
      return;
    }
    // Extract room code from input (could be a full URL or just the code)
    const code = roomInput.trim().split('/').pop();
    navigate(`/join-room?code=${encodeURIComponent(code)}`);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleJoinRoom();
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
    >
      {/* Section Label */}
      <div className="flex items-center gap-2 mb-4">
        <div className="w-2 h-2 rounded-full bg-accent" />
        <span className="text-xs font-medium text-text-muted uppercase tracking-wider">Room Chat</span>
      </div>

      {/* Create Room Button */}
      <Button
        fullWidth
        size="lg"
        onClick={handleCreateRoom}
        className="mb-4"
      >
        Create Room
      </Button>

      {/* Join Room Input */}
      <div className="flex items-center gap-2">
        <div className="flex-1 relative">
          <input
            type="text"
            value={roomInput}
            onChange={(e) => setRoomInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Room Code or Invite Link"
            className="
              w-full bg-bg-input border border-border rounded-xl
              px-4 py-2.5 text-sm text-text-primary
              placeholder:text-text-muted
              focus:outline-none focus:border-accent
              transition-colors duration-200
            "
            aria-label="Room code or invite link"
          />
        </div>
        <button
          onClick={handleJoinRoom}
          className="
            w-10 h-10 rounded-xl bg-bg-input border border-border
            flex items-center justify-center
            text-text-muted hover:text-accent hover:border-accent
            transition-all duration-200 cursor-pointer shrink-0
          "
          aria-label="Join room"
        >
          <ArrowRight size={18} />
        </button>
      </div>
    </motion.div>
  );
}
