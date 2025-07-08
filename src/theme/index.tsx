import Tailwind from 'primereact/passthrough/tailwind';
import { classNames } from 'primereact/utils';
const TRANSITIONS = {
  overlay: {
    enterFromClass: 'opacity-0 scale-75',
    enterActiveClass:
      'transition-transform transition-opacity duration-150 ease-in',
    leaveActiveClass: 'transition-opacity duration-150 ease-linear',
    leaveToClass: 'opacity-0',
  },
};

const hexToRgba = (hex: string, alpha: number) => {
  const bigint = parseInt(hex.replace('#', ''), 16);
  const r = (bigint >> 16) & 255;
  const g = (bigint >> 8) & 255;
  const b = bigint & 255;
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
};

const prefString = localStorage.getItem('preferences');
const preferences = prefString ? JSON.parse(prefString) : null;
const color = preferences?.header_color || '#3AC0A0';
const AgenttextColor = preferences?.agent_text_response_color;

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
  dropdown: {
    root: ({ props }: any) => ({
      className: classNames(
        `cursor-pointer inline-flex relative select-none`,
        ' border border-gray-400 transition-colors duration-200 ease-in-out rounded-md',
        'dark:bg-gray-900 dark:border-blue-900/40 dark:hover:border-blue-300',
        'w-full md:w-56',
        'hover:border-blue-500 focus:outline-none focus:outline-offset-0 ',
        {
          'opacity-60 select-none pointer-events-none cursor-default':
            props.disabled,
        }
      ),
      style: {
        backgroundColor: color,
      },
    }),
    input: ({ props }: any) => ({
      className: classNames(
        'cursor-pointer block flex flex-auto overflow-hidden overflow-ellipsis whitespace-nowrap relative',
        'bg-transparent border-0',
        'p-3 transition duration-200 bg-transparent rounded appearance-none font-sans',
        'focus:outline-none focus:shadow-none',
        { 'pr-7': props.showClear }
      ),
      style: {
        color: AgenttextColor,
      },
    }),
    trigger: {
      className: classNames(
        'flex items-center justify-center shrink-0',
        'bg-transparent w-12 rounded-tr-lg rounded-br-lg'
      ),
      style: {
        color: AgenttextColor,
      },
    },
    wrapper: {
      className: classNames(
        'max-h-[200px] overflow-auto',
        'bg-white text-gray-700 border-0 rounded-md shadow-lg',
        'dark:bg-gray-900 dark:text-white/80'
      ),
    },
    list: 'py-3 list-none m-0',
    item: ({ context }: any) => {
      const isActive = context.selected;

      const baseClass = classNames(
        'cursor-pointer font-normal overflow-hidden relative whitespace-nowrap',
        'm-0 p-3 border-0 transition-shadow duration-200 rounded-none',
        'dark:text-white/80 dark:hover:bg-gray-800',
        'hover:text-gray-700'
      );

      const textColor = context.disabled
        ? 'opacity-60 select-none pointer-events-none cursor-default'
        : context.focused && context.selected
        ? `text-[${AgenttextColor}] dark:text-white/80`
        : context.focused && !context.selected
        ? 'text-gray-700 dark:text-white/80 dark:bg-gray-800/90'
        : !context.focused && context.selected
        ? 'text-[${AgenttextColor}] dark:text-white/80'
        : 'text-gray-700';

      const style = {
        backgroundColor: isActive ? color : undefined,
        color: AgenttextColor,
      };

      const hoverStyle = isActive
        ? {
            '--hover-bg': hexToRgba(color, 0.3),
          }
        : {};

      return {
        className: classNames(baseClass, textColor),
        style: { ...style, ...hoverStyle } as React.CSSProperties,
        onMouseEnter: (e: any) => {
          if (isActive) {
            e.currentTarget.style.backgroundColor = hexToRgba(color, 0.7);
          }
        },
        onMouseLeave: (e: any) => {
          if (isActive) e.currentTarget.style.backgroundColor = color;
        },
      };
    },
    itemgroup: {
      className: classNames(
        'm-0 p-3 text-gray-800 bg-white font-bold',
        'dark:bg-gray-900 dark:text-white/80',
        'cursor-auto'
      ),
    },
    header: {
      className: classNames(
        'p-3 border-b border-gray-300 text-gray-700 bg-gray-100 mt-0 rounded-tl-lg rounded-tr-lg',
        'dark:bg-gray-800 dark:text-white/80 dark:border-blue-900/40'
      ),
    },
    filtercontainer: 'relative',
    filterinput: {
      className: classNames(
        'pr-7 -mr-7',
        'w-full',
        'font-sans text-base text-gray-700 bg-white py-3 px-3 border border-gray-300 transition duration-200 rounded-lg appearance-none',
        'dark:bg-gray-900 dark:border-blue-900/40 dark:hover:border-blue-300 dark:text-white/80',
        'hover:border-blue-500 focus:outline-none focus:outline-offset-0'
      ),
    },
    filtericon: '-mt-2 absolute top-1/2',
    clearicon: 'text-gray-500 right-12 -mt-2 absolute top-1/2',
    transition: TRANSITIONS.overlay,
  },
};
