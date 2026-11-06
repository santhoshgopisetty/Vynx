import { forwardRef, useState } from 'react';

const Input = forwardRef(({
  label,
  error,
  helperText,
  icon: Icon,
  rightIcon: RightIcon,
  onRightIconClick,
  className = '',
  containerClassName = '',
  ...props
}, ref) => {
  const [focused, setFocused] = useState(false);

  return (
    <div className={`w-full ${containerClassName}`}>
      {label && (
        <label className="block text-sm font-medium text-text-secondary mb-1.5">
          {label}
        </label>
      )}
      <div className={`
        relative flex items-center rounded-xl
        bg-bg-input border transition-all duration-200
        ${error ? 'border-error' : focused ? 'border-accent' : 'border-border'}
      `}>
        {Icon && (
          <span className="pl-3 text-text-muted">
            <Icon size={18} />
          </span>
        )}
        <input
          ref={ref}
          onFocus={(e) => {
            setFocused(true);
            props.onFocus?.(e);
          }}
          onBlur={(e) => {
            setFocused(false);
            props.onBlur?.(e);
          }}
          className={`
            w-full bg-transparent px-4 py-2.5 text-sm
            text-text-primary placeholder:text-text-muted
            focus:outline-none
            ${Icon ? 'pl-2' : ''}
            ${RightIcon ? 'pr-10' : ''}
            ${className}
          `}
          {...props}
        />
        {RightIcon && (
          <button
            type="button"
            onClick={onRightIconClick}
            className="absolute right-3 text-text-muted hover:text-text-primary transition-colors cursor-pointer"
            tabIndex={-1}
          >
            <RightIcon size={18} />
          </button>
        )}
      </div>
      {error && (
        <p className="mt-1 text-xs text-error">{error}</p>
      )}
      {helperText && !error && (
        <p className="mt-1 text-xs text-text-muted">{helperText}</p>
      )}
    </div>
  );
});

Input.displayName = 'Input';
export default Input;
