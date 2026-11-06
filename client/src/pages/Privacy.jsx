import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';
import Card from '../components/common/Card';

const sections = [
  { title: 'Data Collection', content: 'PrivateTalk collects only the minimum information necessary for operation. Temporary room messages are never stored permanently.' },
  { title: 'Account Information', content: 'Registered users provide a username, email, and password. Passwords are securely hashed and never stored in plain text.' },
  { title: 'Message Privacy', content: 'Messages in temporary rooms are deleted when the room expires. Individual conversations are private between participants only.' },
  { title: 'No Tracking', content: 'PrivateTalk does not use third-party analytics, advertising trackers, or social media integrations.' },
  { title: 'Data Sharing', content: 'Your data is never sold to third parties. We do not share personal information with advertisers or data brokers.' },
  { title: 'Your Rights', content: 'You can delete your account and all associated data at any time through the settings page.' },
];

export default function Privacy() {
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

        <h1 className="text-3xl font-bold text-text-primary mb-2">Privacy Policy</h1>
        <p className="text-text-secondary mb-8">Last updated: November 2026</p>

        <div className="space-y-4">
          {sections.map((s, i) => (
            <Card key={i} padding="p-5">
              <h3 className="text-base font-semibold text-text-primary mb-2">{s.title}</h3>
              <p className="text-sm text-text-secondary leading-relaxed">{s.content}</p>
            </Card>
          ))}
        </div>
      </motion.div>
    </div>
  );
}

