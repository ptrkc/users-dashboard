import { forwardRef, InputHTMLAttributes } from 'react';

type InputProps = InputHTMLAttributes<HTMLInputElement> & {
  label: string;
};

export const FormInput = forwardRef<HTMLInputElement, InputProps>(
  ({ label, ...rest }, ref) => (
    <label className="flex flex-col gap-2 w-full max-w-xs focus-within:text-shadow transition-all">
      <span className="capitalize text-[#9FA3B9] font-semibold text-sm">
        {label}
      </span>
      <input
        ref={ref}
        className="placeholder:text-[#9FA3B9] w-full bg-white h-12 p-3 rounded-md border-2 border-[rgba(143,146,161,0.2)] focus:shadow-hard transition-all "
        {...rest}
      />
    </label>
  )
);

FormInput.displayName = 'FormInput';
