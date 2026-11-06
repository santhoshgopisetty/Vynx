import { motion } from 'framer-motion';

export default function Card({
  children,
  className = '',
  hover = false,
  padding = 'p-6',
  ...props
}) {
  const Component = hover ? motion.div : 'div';
  const hoverProps = hover ? {
    whileHover: { scale: 1.01 },
    transition: { duration: 0.2 },
  } : {};

  return (
    <Component
      className={`
        bg-bg-card border border-border rounded-2xl
        ${padding}
        ${className}
      `}
      {...hoverProps}
      {...props}
    >
      {children}
    </Component>
  );
}
