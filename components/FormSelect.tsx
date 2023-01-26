import { SelectHTMLAttributes, forwardRef } from 'react';

type SelectProps = SelectHTMLAttributes<HTMLSelectElement> & { label: string };

export const FormSelect = forwardRef<HTMLSelectElement, SelectProps>(
  ({ label, children, ...rest }, ref) => (
    <label className="flex flex-col gap-2 w-full max-w-xs focus-within:text-shadow  transition-all">
      <span className="capitalize text-[#9FA3B9] font-semibold text-sm">
        {label}
      </span>
      <select
        ref={ref}
        className="w-full bg-white h-12 p-3 rounded-md border-2 border-[rgba(143,146,161,0.2)] focus:shadow-hard transition-all"
        {...rest}
      >
        {children}
      </select>
    </label>
  )
);

FormSelect.displayName = 'FormSelect';
