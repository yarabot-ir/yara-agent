import Tailwind from 'primereact/passthrough/tailwind';
import { classNames } from 'primereact/utils';

export const theme = {
  ...Tailwind,

  iconfield: {
    root: {
      className: classNames(
        'relative border   bg-white border-secondary-300 dark:border-secondary-400 h-10 text-sm  hover:bg-secondary-300/30 dark:hover:bg-red-500   dark:!bg-secondary-150 rounded-md'
      ),
    },
  },
  inputicon: {
    root: ({ context }: any) => ({
      className: classNames('absolute top-1/2 -mt-2', {
        'left-2': context.iconPosition === 'left',
        'right-2': context.iconPosition === 'right',
      }),
    }),
  },

  // For each input wrapped with IconField you will need to add styling.
  //  The following is an example for InputText
  inputtext: {
    root: {
      className: classNames(
        // Extend the root stylings with the following:
        {
          // 'pl-8': context.iconPosition === 'left',
          // 'pr-8': props.iconPosition === 'right',
          'h-10 text-sm  hover:bg-secondary-300/30 dark:hover:bg-secondary-400 dark:border-secondary-400  dark:bg-secondary-150 rounded-md ':
            true,
        }
      ),
    },
  },
};
