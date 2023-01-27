import { cn } from '@/utils/classnames';
import { MouseEventHandler, PropsWithChildren } from 'react';
import { SpinnerIcon } from './Icons';

const colors = {
  green: 'bg-[#52D8B0] disabled:bg-[#9fe4cf] text-white',
  red: ' bg-red-400 disabled:bg-red-300 text-white',
  white: 'bg-white border disabled:bg-gray-300 text-black',
};

export function Button({
  onClick,
  isLoading,
  color,
  disabled,
  children,
}: PropsWithChildren<{
  onClick?: MouseEventHandler<HTMLButtonElement>;
  isLoading?: boolean;
  disabled?: boolean;
  color: keyof typeof colors;
}>) {
  return (
    <button
      onClick={onClick}
      disabled={isLoading || disabled}
      className={cn(
        'disabled:cursor-wait hover:shadow-hard hover:-translate-y-1 transition-all px-4 py-3 rounded-xl font-semibold text-sm flex gap-2 justify-center items-center',
        colors[color]
      )}
    >
      {isLoading && (
        <span className="h-4 w-4">
          <SpinnerIcon />
        </span>
      )}
      {children}
    </button>
  );
}
