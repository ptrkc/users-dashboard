import { ChangeEventHandler } from 'react';
import { MagnifyingIcon, XIcon } from '@/components/Icons';

export function SearchInput({
  value,
  setValue,
}: {
  value: string;
  setValue: (newValue: string) => void;
}) {
  const onChange: ChangeEventHandler<HTMLInputElement> = (event) =>
    setValue(event.target.value);
  const clearInput = () => setValue('');
  return (
    <div className="relative">
      <input
        className="bg-white text-sm font-semibold rounded-xl shadow-hard h-14 pl-14 pr-12 w-full max-w-xs"
        placeholder="Search for a user"
        value={value}
        onChange={onChange}
      />
      <div className="h-6 w-6 absolute left-4 top-4">
        <MagnifyingIcon />
      </div>
      {value.length > 0 && (
        <button
          onClick={clearInput}
          className="h-7 w-7 absolute right-4 top-[15px] rounded-full bg-gray-200 p-1"
        >
          <XIcon />
        </button>
      )}
    </div>
  );
}
