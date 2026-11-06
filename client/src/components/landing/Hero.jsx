import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

export default function Hero() {
  return (
    <motion.div
      initial={{ opacity: 0, x: -30 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className="flex flex-col justify-center"
    >
      {/* Logo */}
      <div className="flex items-center gap-2.5 mb-8">
        <div className="w-9 h-9 rounded-xl bg-accent/10 flex items-center justify-center">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M21 11.5a8.38 8.38 0 01-.9 3.8 8.5 8.5 0 01-7.6 4.7 8.38 8.38 0 01-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 01-.9-3.8 8.5 8.5 0 014.7-7.6 8.38 8.38 0 013.8-.9h.5a8.48 8.48 0 018 8v.5z" stroke="#8CCFFF" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>
        <span className="text-lg font-semibold text-text-primary tracking-tight">PrivateTalk</span>
      </div>

      {/* Heading */}
      <h1 className="text-4xl md:text-5xl lg:text-[3.4rem] font-bold leading-tight mb-5 tracking-tight">
        <span className="text-text-primary">Private </span>
        <span className="text-accent">conversations</span>
        <span className="text-text-primary">,</span>
        <br />
        <span className="text-text-primary">made </span>
        <span className="text-accent">simple</span>
        <span className="text-text-primary">.</span>
      </h1>

      {/* Description */}
      <p className="text-text-secondary text-base md:text-lg leading-relaxed max-w-md mb-8">
        Create a temporary room or connect privately with someone. No unnecessary distractions. Just private conversations.
      </p>

      {/* Links */}
      <div className="flex items-center gap-6">
        <Link
          to="/about"
          className="text-sm text-text-muted hover:text-accent transition-colors duration-200"
        >
          About
        </Link>
        <Link
          to="/privacy"
          className="text-sm text-text-muted hover:text-accent transition-colors duration-200"
        >
          Privacy
        </Link>
      </div>
    </motion.div>
  );
}
