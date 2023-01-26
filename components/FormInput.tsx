import { InputHTMLAttributes } from 'react';

export function FormInput({
  label,
  ...rest
}: InputHTMLAttributes<HTMLInputElement> & { label: string }) {
  return (
    <label className="flex flex-col gap-2 w-full max-w-xs focus-within:text-shadow transition-all">
      <span className="capitalize text-[#9FA3B9] font-semibold text-sm">
        {label}
      </span>
      <input
        className="placeholder:text-[#9FA3B9] w-full bg-white h-12 p-3 rounded-md border-2 border-[rgba(143,146,161,0.2)] focus:shadow-hard transition-all "
        {...rest}
      />
    </label>
  );
}
