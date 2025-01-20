import { Button } from 'primereact/button';
import { Ripple } from 'primereact/ripple';
import { classNames } from 'primereact/utils';

interface IBtnProps {
  children: React.ReactNode;
  rootClassName?: string;
  handleClick?: () => void;
  type?: 'button' | 'submit' | 'reset' | undefined;
}

export default function IBtn({
  children,
  rootClassName,
  handleClick,
  type = 'button',
}: IBtnProps) {
  return (
    <Button
      className="focus:ring-offset-0"
      unstyled={true}
      type={type}
      pt={{
        root: {
          className: classNames(
            ' f-jc-ic rounded-md transition-all duration-200 bg-white h-10 w-full  border p-ripple border-1.5 focus:shadow-none dark:focus:shadow-none  dark:border-secondary-400  py-2.5  gap-x-2   focus:ring-offset-0 !border-secondary-300 hover:!border-secondary-300   dark:!border-secondary-200 dark:hover:!border-secondary-200  text-sm  dark:!bg-secondary-150 hover:!bg-secondary-300/30 dark:hover:!bg-secondary-200/70',
            rootClassName
          ),
        },
      }}
      onClick={handleClick}
    >
      <Ripple pt={{ root: { className: 'dark:!bg-secondary-100/5' } }} />
      {children}
    </Button>
  );
}
