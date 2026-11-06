import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';

export default function Dropdown({
  label,
  options = [],
  value,
  onChange,
  placeholder = 'Select...',
  error,
  className = '',
}) {
  const [isOpen, setIsOpen] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    function handleClickOutside(e) {
      if (ref.current && !ref.current.contains(e.target)) {
        setIsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const selectedOption = options.find(o => o.value === value);

  return (
    <div className={`w-full ${className}`} ref={ref}>
      {label && (
        <label className="block text-sm font-medium text-text-secondary mb-1.5">
          {label}
        </label>
      )}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className={`
          w-full flex items-center justify-between px-4 py-2.5
          bg-bg-input border rounded-xl text-sm transition-all duration-200 cursor-pointer
          ${error ? 'border-error' : isOpen ? 'border-accent' : 'border-border'}
          ${selectedOption ? 'text-text-primary' : 'text-text-muted'}
        `}
      >
        <span>{selectedOption?.label || placeholder}</span>
        <ChevronDown
          size={16}
          className={`text-text-muted transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
        />
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            transition={{ duration: 0.15 }}
            className="absolute z-20 mt-1 w-full bg-bg-card border border-border rounded-xl shadow-xl overflow-hidden"
            style={{ maxWidth: ref.current?.offsetWidth }}
          >
            {options.map((option) => (
              <button
                key={option.value}
                type="button"
                onClick={() => {
                  onChange(option.value);
                  setIsOpen(false);
                }}
                className={`
                  w-full px-4 py-2.5 text-sm text-left transition-colors cursor-pointer
                  hover:bg-bg-input
                  ${value === option.value ? 'text-accent bg-bg-input' : 'text-text-primary'}
                `}
              >
                {option.label}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
      {error && <p className="mt-1 text-xs text-error">{error}</p>}
    </div>
  );
}
