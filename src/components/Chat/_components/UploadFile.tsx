import clsx from 'clsx';
import { TrashDarkIcon, TrashIcon } from '../../../../public/icons';
import { useDarkMode } from '../../../context/DarkModeContext';
interface UploadFileProps {
  file?: any;
  className?: string;
}
function UploadFile({ file, className }: UploadFileProps) {
  const { isDarkMode } = useDarkMode();

  return (
    <div
      className={clsx(
        'w-full f-js-ic gap-x-2 bg-secondary-200 dark:bg-secondary-150 p-2 pl-3 rounded-md  ',
        className
      )}
    >
      <span className=" f-jc-ic !w-10 h-10 !bg-IBlue rounded-md !p-1 text-xs text-white ">
        .{String(file[0].name).split('.')[1]}
        {/* {file.format} */}
      </span>
      <div className="f-jc-is  flex-col ">
        <span className="text-xs text-secondary-500">
          حجم: {(file[0].size / 1024).toFixed(2)} کیلوبایت
        </span>
        <span className="text-xs text-secondary-500">{file[0]?.name}</span>
      </div>
      <button className="f-jc-ic ">
        <img
          src={isDarkMode ? TrashDarkIcon : TrashIcon}
          alt="TrashIcon"
          className="!w-5 h-5"
        />
      </button>
    </div>
  );
}

export default UploadFile;
