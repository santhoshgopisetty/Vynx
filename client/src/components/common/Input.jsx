import { forwardRef, useState } from 'react';

const sizeClasses = {
  sm: 'h-9 text-xs',
  md: 'h-11 text-sm',
  lg: 'h-12 text-sm',
};

const Input = forwardRef(({
  label,
  error,
  helperText,
  size = 'md',
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
        <label className="block text-xs font-medium text-text-secondary mb-1.5 uppercase tracking-wider">
          {label}
        </label>
      )}
      <div className={`
        relative flex items-center rounded-xl w-full
        bg-bg-input border transition-all duration-200
        ${sizeClasses[size]}
        ${error ? 'border-error focus-within:border-error' : focused ? 'border-accent shadow-sm' : 'border-border hover:border-text-muted/40'}
      `}>
        {Icon && (
          <span className="pl-3.5 pr-2 text-text-muted flex items-center justify-center shrink-0 select-none">
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
            w-full h-full bg-transparent text-text-primary placeholder:text-text-muted
            focus:outline-none rounded-xl
            ${Icon ? 'pl-0 pr-3.5' : 'px-3.5'}
            ${RightIcon ? 'pr-10' : ''}
            ${className}
          `}
          {...props}
        />
        {RightIcon && (
          <button
            type="button"
            onClick={onRightIconClick}
            className="absolute right-2.5 top-1/2 -translate-y-1/2 w-7 h-7 flex items-center justify-center text-text-muted hover:text-text-primary transition-colors cursor-pointer rounded-lg hover:bg-bg-card/50"
            tabIndex={-1}
            aria-label="Input action"
          >
            <RightIcon size={17} />
          </button>
        )}
      </div>
      {error && (
        <p className="mt-1.5 text-xs text-error font-medium">{error}</p>
      )}
      {helperText && !error && (
        <p className="mt-1.5 text-xs text-text-muted">{helperText}</p>
      )}
    </div>
  );
});

Input.displayName = 'Input';
export default Input;
