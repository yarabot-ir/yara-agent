import { Button } from 'primereact/button';
import { Ripple } from 'primereact/ripple';
import { classNames } from 'primereact/utils';

interface IBtnProps {
  children?: React.ReactNode;
  rootClassName?: string;
  handleClick?: () => void;
  type?: 'button' | 'submit' | 'reset' | undefined;
  disabled?: boolean;
}

export default function IPrimaryBtn({
  children,
  rootClassName,
  handleClick,
  type = 'button',
  disabled = false,
}: IBtnProps) {
  return (
    <Button
      className="focus:ring-offset-0"
      unstyled={true}
      disabled={disabled}
      type={type}
      pt={{
        root: {
          className: classNames(
            'f-jc-ic rounded-md transition-all gap-x-2 focus:shadow-none dark:focus:shadow-none  focus:!ring-0 dark:focus:!ring-0  text-sm  !border-2 h-10 w-full p-ripple !border-primary-700   !bg-primary-600  lg:hover:!bg-primary-500 dark:!bg-primary-100 lg:!bg-primary-400 lg:dark:!bg-primary-400 dark:hover:!border-primary-800 hover:!border-primary-500 lg:hover:!border-primary-800 dark:!border-primary-50  lg:dark:!border-primary-600  hover:!bg-primary-400 lg:!border-primary-600 dark:hover:!bg-primary-300 lg:dark:hover:!bg-primary-800  lg:dark:hover:!border-primary-900',
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
