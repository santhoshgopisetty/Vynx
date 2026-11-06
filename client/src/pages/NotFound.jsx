import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import Button from '../components/common/Button';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-bg-main flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center"
      >
        <h1 className="text-7xl font-bold text-accent mb-4">404</h1>
        <h2 className="text-2xl font-semibold text-text-primary mb-2">Page Not Found</h2>
        <p className="text-text-secondary mb-8">The page you're looking for doesn't exist or has been moved.</p>
        <Link to="/">
          <Button size="lg">Back to Home</Button>
        </Link>
      </motion.div>
    </div>
  );
}

