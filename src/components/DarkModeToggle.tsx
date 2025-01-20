import { useDarkMode } from '../context/DarkModeContext';
import clsx from 'clsx';

function DarkModeToggle({
  className,
  wrapperClass,
}: {
  className?: string;
  wrapperClass?: string;
}) {
  const { isDarkMode, toggleDarkMode } = useDarkMode();

  return (
    <button className={clsx('!f-jc-ic', wrapperClass)} onClick={toggleDarkMode}>
      {isDarkMode ? (
        // <span className="w-full h-auto cursor-pointer text-secondary-400 hover:text-primary-800">
        <i
          className={clsx(
            'pi pi-moon  text-secondary-400 hover:!text-primary-600  !text-[1.5rem] ',
            className
          )}
        ></i>
      ) : (
        // </span>
        <i
          className={clsx(
            'pi pi-sun  text-secondary-800 hover:!text-primary-600  !text-[1.5rem] ',
            className
          )}
        ></i>
      )}
    </button>
  );
}
export default DarkModeToggle;
