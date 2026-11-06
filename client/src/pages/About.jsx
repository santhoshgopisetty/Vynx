import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Shield, MessageCircle, Lock, Zap } from 'lucide-react';
import Card from '../components/common/Card';

const features = [
  { icon: MessageCircle, title: 'Temporary Rooms', desc: 'Create disposable chat rooms that expire automatically. No sign-up required.' },
  { icon: Lock, title: 'Private Conversations', desc: 'Connect with anyone using unique secret codes. End-to-end private.' },
  { icon: Shield, title: 'Privacy First', desc: 'No social feeds, no public profiles, no tracking. Just private conversations.' },
  { icon: Zap, title: 'Real-time', desc: 'Instant messaging with typing indicators, read receipts, and reactions.' },
];

export default function About() {
  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-2xl"
      >
        <Link to="/" className="inline-flex items-center gap-2 text-sm text-text-muted hover:text-text-primary transition-colors mb-6">
          <ArrowLeft size={16} /> Back to Home
        </Link>

        <h1 className="text-3xl font-bold text-text-primary mb-2">About PrivateTalk</h1>
        <p className="text-text-secondary mb-8 max-w-lg">
          PrivateTalk is a private messaging application focused entirely on secure, distraction-free communication.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {features.map((f, i) => (
            <Card key={i} padding="p-5">
              <div className="w-10 h-10 rounded-xl bg-accent/10 flex items-center justify-center mb-3">
                <f.icon size={20} className="text-accent" />
              </div>
              <h3 className="text-base font-semibold text-text-primary mb-1">{f.title}</h3>
              <p className="text-sm text-text-secondary">{f.desc}</p>
            </Card>
          ))}
        </div>
      </motion.div>
    </div>
  );
}

