import { forwardRef, useState } from 'react';
import { Eye, EyeOff, Lock } from 'lucide-react';
import Input from './Input';

const PasswordInput = forwardRef(({ label = 'Password', ...props }, ref) => {
  const [visible, setVisible] = useState(false);

  return (
    <Input
      ref={ref}
      type={visible ? 'text' : 'password'}
      label={label}
      icon={Lock}
      rightIcon={visible ? EyeOff : Eye}
      onRightIconClick={() => setVisible(!visible)}
      {...props}
    />
  );
});

PasswordInput.displayName = 'PasswordInput';
export default PasswordInput;
