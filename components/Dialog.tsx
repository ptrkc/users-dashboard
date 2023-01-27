import { MouseEventHandler, PropsWithChildren, useState } from 'react';
import { Button } from './Button';

export function Dialog({
  children,
  title,
  description,
  action,
  actionText,
}: PropsWithChildren<{
  title: string;
  description: string;
  actionText: string;
  action: () => void;
}>) {
  const [isOpen, setIsOpen] = useState(false);

  const handleOverlayClick: MouseEventHandler<HTMLDivElement> = (event) => {
    const target = event.target as HTMLDivElement;
    if (target.id === 'overlay') setIsOpen(false);
  };

  const onAction = () => {
    action();
    setIsOpen(false);
  };
  return (
    <div>
      <div onClick={() => setIsOpen(true)}>{children}</div>
      {isOpen && (
        <div
          id="overlay"
          onClick={handleOverlayClick}
          className="fixed top-0 bottom-0 left-0 right-0 bg-gray-500/50 flex justify-center items-center p-2"
        >
          <div className="bg-white p-2 rounded-lg flex flex-col gap-4">
            <h3 className="font-bold">{title}</h3>
            <p>{description}</p>
            <div className="flex justify-end gap-5 items-center">
              <Button color="white" onClick={() => setIsOpen(false)}>
                Cancel
              </Button>
              <Button color="red" onClick={onAction}>
                {actionText}
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
