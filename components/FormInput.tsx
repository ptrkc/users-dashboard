import { cn } from '@/utils/classnames';
import { forwardRef, InputHTMLAttributes } from 'react';

type InputProps = InputHTMLAttributes<HTMLInputElement> & {
  label: string;
  disabled?: boolean;
};

export const FormInput = forwardRef<HTMLInputElement, InputProps>(
  ({ label, disabled, ...rest }, ref) => (
    <label className="flex flex-col gap-2 w-full max-w-xs focus-within:text-shadow transition-all">
      <span className="capitalize text-[#9FA3B9] font-semibold text-sm">
        {label}
      </span>
      <input
        ref={ref}
        disabled={disabled}
        className={cn(
          'placeholder:text-[#9FA3B9] w-full bg-white h-12 p-3 rounded-md border-2 border-[rgba(143,146,161,0.2)] focus:shadow-hard transition-all',
          disabled && 'bg-gray-300 text-gray-300'
        )}
        {...rest}
      />
    </label>
  )
);

FormInput.displayName = 'FormInput';
