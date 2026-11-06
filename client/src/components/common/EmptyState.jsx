import { motion } from 'framer-motion';
import Button from './Button';

export default function EmptyState({
  icon: Icon,
  title,
  description,
  action,
  onAction,
  className = '',
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={`flex flex-col items-center justify-center py-16 px-4 text-center ${className}`}
    >
      {Icon && (
        <div className="w-16 h-16 rounded-2xl bg-bg-input flex items-center justify-center mb-4">
          <Icon size={28} className="text-text-muted" />
        </div>
      )}
      {title && (
        <h3 className="text-lg font-semibold text-text-primary mb-2">{title}</h3>
      )}
      {description && (
        <p className="text-sm text-text-secondary max-w-sm mb-6">{description}</p>
      )}
      {action && onAction && (
        <Button onClick={onAction} size="sm">{action}</Button>
      )}
    </motion.div>
  );
}
