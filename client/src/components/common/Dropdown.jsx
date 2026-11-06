import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';

const sizeClasses = {
  sm: 'h-9 text-xs',
  md: 'h-11 text-sm',
  lg: 'h-12 text-sm',
};

export default function Dropdown({
  label,
  options = [],
  value,
  onChange,
  size = 'md',
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

  const selectedOption = options.find((o) => o.value === value);

  return (
    <div className={`w-full relative ${className}`} ref={ref}>
      {label && (
        <label className="block text-xs font-medium text-text-secondary mb-1.5 uppercase tracking-wider">
          {label}
        </label>
      )}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className={`
          w-full flex items-center justify-between px-3.5
          bg-bg-input border rounded-xl transition-all duration-200 cursor-pointer select-none
          ${sizeClasses[size]}
          ${error ? 'border-error' : isOpen ? 'border-accent shadow-sm' : 'border-border hover:border-text-muted/40'}
          ${selectedOption ? 'text-text-primary' : 'text-text-muted'}
        `}
      >
        <span className="truncate">{selectedOption?.label || placeholder}</span>
        <ChevronDown
          size={16}
          className={`text-text-muted transition-transform duration-200 shrink-0 ml-2 ${isOpen ? 'rotate-180 text-accent' : ''}`}
        />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -4, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -4, scale: 0.98 }}
            transition={{ duration: 0.15 }}
            className="absolute z-30 mt-1.5 w-full bg-bg-card border border-border rounded-xl shadow-2xl overflow-hidden py-1"
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
                  w-full px-3.5 py-2.5 text-sm text-left transition-colors cursor-pointer flex items-center justify-between
                  hover:bg-bg-input
                  ${value === option.value ? 'text-accent bg-bg-input/60 font-medium' : 'text-text-primary'}
                `}
              >
                <span>{option.label}</span>
                {value === option.value && (
                  <span className="w-1.5 h-1.5 rounded-full bg-accent" />
                )}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
      {error && <p className="mt-1.5 text-xs text-error font-medium">{error}</p>}
    </div>
  );
}
