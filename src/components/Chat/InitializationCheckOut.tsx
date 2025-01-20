import { useEffect, useState } from 'react';
import {
  AcceptIcon,
  BadIcon,
  PinIcon,
  SecretIcon,
  SendIcon,
  StopIcon,
  TargetIcon,
  TickIcon,
} from '../../../public/icons';
import { useForm } from 'react-hook-form';
import IPrimaryBtn from '../IPrimaryBtn';
import IBtn from '../IBtn';
import EndScroller from '../../utils/endScroller';

function InitializationCheckOut({ ClickHandler, name, setName }: any) {
  const [next, setNext] = useState(0);
  // const [error, setError] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const rule1 = [
    {
      content:
        'من یک زبان هوش مصنوعی برای کمک به شما هستم و خط‌مشی اخلاقی استفاده از من را برای آسیب، مانند تولید محتوای خشونت‌آمیز، توهین‌آمیز یا فریبنده ممنوع می‌کند.',
      imageSrc: StopIcon,
    },
    {
      content:
        'خط‌مشی اخلاقی به طور منظم مکالماتی را که توسط تشخیص خودکار سوء استفاده ما پرچم گذاری شده است مرور می کند و ممکن است از آنها برای بهبود سیستم های ایمنی ما استفاده کند.',
      imageSrc: SecretIcon,
    },
  ];

  const rule2 = [
    {
      content:
        'ممکن است گهگاه اطلاعات نادرست یا گمراه کننده تولید کند یا محتوای توهین آمیز یا مغرضانه تولید کند.',
      imageSrc: BadIcon,
    },
    {
      content:
        ' هدف من ارائه مشاوره از جمله مشاوره حقوقی، مالی و پزشکی نیست. بدون انجام تحقیقات مستقل خود به گفتگوی ما به تنهایی تکیه نکنید.',
      imageSrc: TargetIcon,
    },
    {
      content:
        'با یادگیری بیشتر، ممکن است محدودیت‌های استفاده، عملکرد یا خط‌مشی‌ها را تغییر دهد. برای دسترسی بیشتر به ویژگی های من می توانید طرح خود را ارتقا دهید.',
      imageSrc: PinIcon,
    },
  ];

  const checkName = (e: any) => {
    const { name } = e;

    setName(name.trim());
    setNext(1);
  };

  useEffect(() => {
    if (next === 2) {
      EndScroller();
    }
  }, [next]);

  return (
    <div className="slide-up  flex flex-col  flex-1 w-full h-full max-w-screen-md ">
      <div className="relative container flex flex-col items-center justify-start  w-full h-full gap-y-5">
        <div className=" f-jc-is w-full  sm:px- sm:w-3/4   mt-44   mx-auto  flex-col  md:w-3/5  ">
          <div className=" !mb-8 text-4xl font-semibold text-secondary-900 ">
            سلام، من یارا هستم.
          </div>
          <div className=" text-lg font-semibold text-secondary-600/85 dark:text-secondary-600 ">
            <div>من یک دستیار قدرتمند کاملا فارسی زبان هستم.</div>
            <div>
              به وسیله هوش مصنوعی یاد گرفتم تا به عنوان یک ابزار مهم در کنار شما
              باشم. با من سریع‌تر و هوشمندانه‌تر میتونی کار کنی.
            </div>
            <div className="!mt-6">
              دوست دارم کمی بیشتر همدیگه رو بشناسیم. لطفاً بهم بگو با چه نامی
              میتونم صدات کنم؟
            </div>
          </div>
        </div>
        {next === 0 && (
          <div className="absolute lg:relative bottom-0 mb-4 w-full max-w-screen-md ">
            <form
              onSubmit={handleSubmit(checkName)}
              className=" h-12 md:h-16 flex flex-1  relative w-full border-2 bg-white dark:!bg-secondary-150  border-primary-150 dark:border-primary-300 rounded-lg overflow-hidden  "
            >
              <input
                autoComplete="false"
                className="w-full px-2.5 bg-transparent text-base placeholder-secondary-600 dark:placeholder-secondary-550  text-secondary-700 dark:!text-secondary-600/85 "
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    checkName(e);
                  }
                }}
                {...register('name', { required: true })}
                // onChange={(e) => setName(e.target.value)}
                placeholder="لطفا نام کامل خود را وارد کنید"
              />

              <button
                type="submit"
                className="absolute  p-2.5 z-20 left-0 h-full !w-10 hover:scale-[1.09] cursor-pointer"
              >
                <img className="!w-5  md:ml-2 h-full" src={SendIcon} alt="" />
              </button>
            </form>
            <span className=" absolute lg:-bottom-16 bottom-7 md:bottom-12 right-2 h-5 mb-5  text-red-500">
              {errors?.name ? 'وارد کردن این فیلد اجباری است' : ''}
            </span>
          </div>
        )}
        {next >= 1 && (
          <div className=" h-20 border relative !border-primary-300  flex justify-between items-center w-full px-3 py-2 rounded-lg">
            <span className="f-jc-ic gap-x-3 ">
              <div className="!w-11 h-11 f-jc-ic font-bold text-xl bg-white dark:!bg-secondary-150 rounded-full text-secondary-600 dark:!text-secondary-600 ">
                {name[0]}
              </div>
              <span className=" font-bold text-lg !text-primary-700">
                {name}
              </span>
              {/* <span className=" font-bold text-lg !text-primary-700">{name}</span> */}
            </span>
            <img
              src={AcceptIcon}
              width={24}
              height={24}
              className=" !w-6 h-6  "
              alt="accept icon"
              style={{ cursor: 'pointer' }}
            />
          </div>
        )}
        {next >= 1 && (
          <span className="w-full slide-up text-secondary-600/85 dark:text-secondary-600 ">
            <span className="  flex w-full mb-3 font-bold text-base  ">
              از دیدنت خوشحالم، {name.split(' ')[0]} عزیز.
            </span>
            <div className="w-full flex flex-col gap-y-5 border-2 p-3 border-secondary-300 rounded-lg text-secondary-600/85 dark:text-secondary-600 ">
              <span className="text-base ">
                قبل از شروع، چند نکته رو باید بدونی...
              </span>
              {rule1?.map((e, idx) => {
                return (
                  <div key={idx} className=" f-js-ic gap-x-3 rounded-lg ">
                    <div className="min-w-12 max-w-12  min-h-12 max-h-12 f-jc-ic !bg-primary-50 rounded-lg  ">
                      <img src={e.imageSrc} className=" !w-6  h-6" alt="icon" />
                    </div>
                    <div className="">{e.content}</div>
                  </div>
                );
              })}
            </div>
            <span className="flex w-full  justify-center lg:justify-start mt-4">
              {next === 1 ? (
                <IPrimaryBtn
                  rootClassName=" absolute bottom-0 w-full lg:!w-72 "
                  handleClick={() => setNext(2)}
                >
                  تایید و ادامه
                </IPrimaryBtn>
              ) : (
                <IBtn rootClassName="w-full  lg:!w-72  text-center  !bg-secondary-150 lg:dark:!bg-Background cursor-pointer">
                  <span className="relative w-full flex justify-center items-center">
                    <span className="w-full text-secondary-600 ">
                      تایید شده
                    </span>
                    <img
                      className="absolute left-0 -ml-2   "
                      src={TickIcon}
                      width={20}
                      height={20}
                      alt="tick icon"
                    />
                  </span>
                </IBtn>
              )}
            </span>
          </span>
        )}
        {next === 2 && (
          <span className="w-full slide-up text-secondary-600/85 dark:text-secondary-600 p- ">
            <span className=" w-full flex mb-3 font-bold text-base  ">
              و در نهایت، در حالی که من سعی می کنم در هر مکالمه بهترین کار را
              انجام دهم، کامل نیستم.
            </span>
            <div className="w-full flex flex-col gap-y-5 border-2 p-3 border-secondary-300 rounded-lg text-secondary-600/85 dark:text-secondary-600 ">
              <span>باید چند نکته را در نظر داشته باشید:</span>
              {rule2?.map((e, idx) => {
                return (
                  <div key={idx} className=" f-js-ic gap-x-3 rounded-lg ">
                    <div className="min-w-12 max-w-12  min-h-12 max-h-12 f-jc-ic !bg-primary-50 rounded-lg  ">
                      <img src={e.imageSrc} width={24} height={24} alt="icon" />
                    </div>
                    <div className="">{e.content}</div>
                  </div>
                );
              })}
            </div>
            <div className="flex w-full  justify-center lg:justify-start my-4">
              <IPrimaryBtn
                handleClick={() => ClickHandler()}
                rootClassName="w-full lg:!w-72"
              >
                خب ، بزن بریم!
              </IPrimaryBtn>
            </div>
          </span>
        )}
      </div>
    </div>
  );
}

export default InitializationCheckOut;
