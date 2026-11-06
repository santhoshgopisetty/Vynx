import { useState } from 'react';
import { motion } from 'framer-motion';
import { Check, Copy, Clock, Users, Shield, ArrowRight } from 'lucide-react';
import Card from '../common/Card';
import Button from '../common/Button';
import toast from 'react-hot-toast';

export default function RoomInvitation({ room, onEnter }) {
  const [copiedCode, setCopiedCode] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);

  const inviteUrl = `${window.location.origin}/join-room?code=${room.code}`;

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
      toast.success(type === 'code' ? 'Room code copied!' : 'Invite link copied!');
    } catch {
      toast.error('Failed to copy to clipboard');
    }
  };

  return (
    <Card className="text-center w-full max-w-md mx-auto">
      {/* Icon & Title */}
      <div className="w-14 h-14 rounded-2xl bg-success/15 border border-success/30 flex items-center justify-center mx-auto mb-4">
        <Check size={28} className="text-success" />
      </div>

      <h2 className="text-xl font-bold text-text-primary mb-1">Room Created!</h2>
      <p className="text-sm text-text-secondary mb-6 font-medium">{room.name}</p>

      {/* Room Code Card */}
      <div className="bg-bg-input border border-border rounded-xl p-4 mb-3 text-left">
        <span className="text-xs text-text-muted uppercase tracking-wider font-semibold block mb-1">
          Room Code
        </span>
        <div className="flex items-center justify-between">
          <span className="text-xl font-mono font-bold text-accent tracking-wider">
            {room.code}
          </span>
          <button
            type="button"
            onClick={() => copyToClipboard(room.code, 'code')}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-bg-card hover:bg-border text-text-secondary hover:text-text-primary text-xs font-medium transition-colors cursor-pointer"
            aria-label="Copy room code"
          >
            {copiedCode ? (
              <>
                <Check size={14} className="text-success" />
                <span className="text-success">Copied</span>
              </>
            ) : (
              <>
                <Copy size={14} />
                <span>Copy Code</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Invitation Link Card */}
      <div className="bg-bg-input border border-border rounded-xl p-4 mb-5 text-left">
        <span className="text-xs text-text-muted uppercase tracking-wider font-semibold block mb-1">
          Invitation Link
        </span>
        <div className="flex items-center justify-between gap-2">
          <span className="text-xs text-text-secondary font-mono truncate select-all">
            {inviteUrl}
          </span>
          <button
            type="button"
            onClick={() => copyToClipboard(inviteUrl, 'link')}
            className="shrink-0 flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-bg-card hover:bg-border text-text-secondary hover:text-text-primary text-xs font-medium transition-colors cursor-pointer"
            aria-label="Copy invite link"
          >
            {copiedLink ? (
              <>
                <Check size={14} className="text-success" />
                <span className="text-success">Copied</span>
              </>
            ) : (
              <>
                <Copy size={14} />
                <span>Copy Link</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Room Parameters Pills */}
      <div className="flex items-center justify-center gap-3 text-xs text-text-muted mb-6 bg-bg-main/50 py-2.5 px-4 rounded-xl border border-border/50">
        <span className="flex items-center gap-1">
          <Clock size={13} className="text-accent" /> {room.expirationLabel || '1 hour'}
        </span>
        <span>•</span>
        <span className="flex items-center gap-1">
          <Users size={13} className="text-accent" /> Max {room.maxParticipants}
        </span>
        {room.password && (
          <>
            <span>•</span>
            <span className="flex items-center gap-1 text-amber-400">
              <Shield size={13} /> Password Protected
            </span>
          </>
        )}
      </div>

      {/* Enter Room Action */}
      <Button
        fullWidth
        size="lg"
        onClick={onEnter}
        icon={ArrowRight}
        iconPosition="right"
      >
        Enter Room Now
      </Button>
    </Card>
  );
}

