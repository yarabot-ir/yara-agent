import { LoadingIcon } from '../../../public/icons';
import './index.module.css';

function Loading() {
  return (
    // <div className="relative flex flex-col items-center gap-2 scale-[1.2] ">
    //   <div className="absolute flex flex-col items-center w-24 -top-2 gap-1">
    //     <img src={loading} alt="loading icon" />
    //     <p className="text-gray-500 text-nowrap">در حال بارگزاری ...</p>
    //   </div>
    //   <div className="relative w-12 h-12 ripple">
    //     <div className="absolute w-full h-full rounded-full border-4 border-ring_loading opacity-0 animate-ripple" />
    //     <div className="absolute w-full h-full rounded-full border-4 border-ring_loading opacity-0 animate-ripple delay-150" />
    //   </div>
    // </div>

    <div className="flex items-center justify-center h-full w-screen relative overflow-hidden">
      <div className="absolute shadow-2xl  w-[20rem] h-[20rem] rounded-full bg-secondary-400/5 opacity-5 animate-wave ">
        {' '}
      </div>
      <div className="absolute shadow-2xl w-[16.5rem] h-[16.5rem] rounded-full bg-secondary-400/15 opacity-5 animate-wave  "></div>
      <div className="absolute shadow-2xl w-52 h-52 rounded-full bg-secondary-400/15 opacity-5 animate-wave  "></div>
      <div className="absolute shadow-2xl w-40 h-40 rounded-full bg-secondary-400/15 opacity-5 animate-wave  "></div>
      <div className="absolute shadow-2xl w-28 h-28 rounded-full bg-secondary-400/15 opacity-5 animate-wave  ]"></div>

      <div className=" flex flex-col items-center justify-center">
        {' '}
        <img className="!w-12" src={LoadingIcon} alt="loading icon" />{' '}
        <p className="mt-2 text-secondary-400 text-sm">در حال بارگذاری ...</p>
      </div>
    </div>
  );
}

export default Loading;
