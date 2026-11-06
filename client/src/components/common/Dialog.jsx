import Modal from './Modal';
import Button from './Button';

export default function Dialog({
  isOpen,
  onClose,
  title,
  description,
  children,
  size = 'sm',
}) {
  return (
    <Modal isOpen={isOpen} onClose={onClose} title={title} size={size}>
      {description && (
        <p className="text-sm text-text-secondary mb-4">{description}</p>
      )}
      {children}
    </Modal>
  );
}
