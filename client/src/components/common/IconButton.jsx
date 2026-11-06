import { forwardRef } from 'react';
import { motion } from 'framer-motion';
import Tooltip from './Tooltip';

const variants = {
  default: 'text-text-muted hover:text-text-primary hover:bg-bg-input',
  accent: 'text-accent hover:bg-accent/10',
  danger: 'text-error hover:bg-error/10',
};

const sizes = {
  sm: 'w-8 h-8',
  md: 'w-10 h-10',
  lg: 'w-12 h-12',
};

const IconButton = forwardRef(({
  icon: Icon,
  tooltip,
  variant = 'default',
  size = 'md',
  disabled = false,
  className = '',
  onClick,
  ...props
}, ref) => {
  const button = (
    <motion.button
      ref={ref}
      type="button"
      whileHover={!disabled ? { scale: 1.05 } : {}}
      whileTap={!disabled ? { scale: 0.95 } : {}}
      disabled={disabled}
      onClick={onClick}
      className={`
        inline-flex items-center justify-center rounded-xl
        transition-colors duration-200 cursor-pointer
        disabled:opacity-50 disabled:cursor-not-allowed
        ${variants[variant]}
        ${sizes[size]}
        ${className}
      `}
      {...props}
    >
      <Icon size={size === 'sm' ? 16 : size === 'lg' ? 22 : 18} />
    </motion.button>
  );

  if (tooltip) {
    return <Tooltip content={tooltip}>{button}</Tooltip>;
  }

  return button;
});

IconButton.displayName = 'IconButton';
export default IconButton;
