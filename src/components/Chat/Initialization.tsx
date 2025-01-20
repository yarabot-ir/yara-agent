import { CompanyIcon, HappyIcon, TeamIcon } from '../../../public/icons';

import React from 'react';

interface InitializationProps {
  ClickHandler: (system: string) => void;
}

const Initialization: React.FC<InitializationProps> = ({ ClickHandler }) => {
  const data = [
    {
      title: 'شرکتی یا سازمان بزرگ',
      description: 'یک مجموعه بزرگ هستیم و برای استفاده در سرویس های شرکتی',
      logo: CompanyIcon,
      logoName: 'company',
      system: 'enterprise',
    },
    {
      title: 'به صورت تیم و گروهی',
      description:
        'به دنبال استفاده با محدودیت کمتر و استفاده از تمام ویژگی های محصول هستیم',
      logo: TeamIcon,
      logoName: 'team',
      system: 'team',
    },
    {
      title: 'تست و استفاده فردی',
      description:
        'به دنبال کشف ماجرا ، بررسی ، تحقیقات و یا اهداف آموزشی هستم و میخوام یاد بگیرم',
      logo: HappyIcon,
      logoName: 'happy',
      system: 'personal',
    },
  ];

  return (
    <div className="slide-up container min-w-90 w-full  h-screen  f-jc-ic flex-col  ">
      <div className="f-js-ic flex-col    gap-y-4 ">
        <span className=" text-center text-base  md:text-base font-semibold text-secondary-700 ">
          خب، ممنون که مارو انتخاب کردی و به یارابات خوش اومدی
        </span>
        <span className=" text-center text-lg  md:text-4xl font-bold text-secondary-700">
          به چه منظور میخوای از این سیستم استفاده کنی؟
        </span>
      </div>

      <div className="  flex flex-col cursor-pointer  sm:flex-row-reverse gap-x-4 justify-center gap-y-3 mt-4">
        {data.map((item, idx) => (
          <div
            key={idx}
            className="   w-full  sm:max-w-52 h-32   sm:h-60 md:h-56 hover:scale-[1.006] transition-all ease-in-out flex  items-center sm:flex-col  gap-3 border-2  border-primary-100 dark:!border-primary-600 bg-[#EFFAF8] dark:bg-primary-800 rounded-xl  !p-3.5 "
            onClick={() => ClickHandler(item.system)}
          >
            <div className="w-16 h-16 flex items-center justify-center">
              <img src={item.logo} alt={`${item.logoName} icon`} />
            </div>
            <div className=" w-full f-jc-is sm:f-jc-ic gap-y-2.5 flex-col">
              <div className=" w-full text-start sm:text-center text-lg font-medium  text-secondary-700">
                {item.title}
              </div>
              <div className="w-full text-start sm:text-center text-sm text-secondary-500 leading-5">
                {item.description}
              </div>
            </div>
            {/* <Button
              className="mt-auto w-full  border-none "
              onClick={() => ClickHandler(item.system)}
              label="انتخاب کنید"
            /> */}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Initialization;

// function Initialization({ ClickHandler }: any) {
//   const data = [
//     {
//       title: "استفاده شخصی",
//       description:
//         "به دنبال کشف و ماجراجویی هستم. میخوام سرعت انجام کارام رو بیشتر کنم.   ",
//       logo: HappyIcon,
//       logoName: "happy",
//       system: "owne",
//     },
//     {
//       title: "تیمی یا کسب‌و‌کار کوچک",
//       description:
//         "به دنبال افزایش کارایی برای تیم هستم. میخوام فرآیندهای کاریمون رو خودکار کنم.  ",
//       logo: TeamIcon,
//       logoName: "team",
//       system: "team",
//     },
//     {
//       title: "شرکتی یا سازمان بزرگ",
//       description:
//         "به دنبال بهینه سازی فرآیندها، افزایش بهره‌وری و ارتقای خدمات سازمانی هستم.  ",
//       logo: CompanyIcon,
//       logoName: "company",
//       system: "company",
//     },
//   ];

//   return (
//     <Grid size={{ xs: 12, lg: 6 }} pt={"150px"} className="slide-up">
//       <Grid container justifyContent={"center"} rowGap={2}>
//         <Grid size={{ xs: 12, md: 9 }}>
//           <Typography
//             color="text_logo"
//             fontSize={{ md: "18px", xs: "15px" }}
//             fontWeight={"bold"}
//           >
//             خوش اومدی و ممنون که ما رو انتخاب کردی...
//           </Typography>
//         </Grid>
//         <Grid size={{ xs: 12, md: 9 }}>
//           <Typography
//             color="text_logo"
//             fontWeight={"bold"}
//             fontSize={{ md: "36px", xs: "25px" }}
//           >
//             لطفا بگو یارابات چه کمکی میتونه بهت بکنه؟
//           </Typography>
//         </Grid>
//       </Grid>

//       <Grid container justifyContent={"center"} gap={4} mt={5}>
//         {data?.map((item, idx) => {
//           return (
//             <Grid key={idx} item column={{ xs: 12, md: 3 }}>
//               <Button
//                 onClick={() => ClickHandler(item.system)}
//                 sx={{
//                   bgcolor: "option_system",
//                   borderColor: "border_option_system",
//                   height: "206px",
//                   width: "190px",
//                   display: "flex",
//                   flexDirection: "column",
//                   borderRadius: "8px",
//                   gap: "8px",
//                   padding: "10px",
//                 }}
//               >
//                 <Grid
//                   width={"64px"}
//                   height={"64px"}
//                   display={"flex"}
//                   alignItems={"center"}
//                   justifyContent={"center"}
//                 >
//                   <img src={item.logo} alt={`${item.logoName} icon`} />
//                 </Grid>
//                 <Typography
//                   fontWeight={500}
//                   fontSize={"18px"}
//                   color="text_option_system"
//                 >
//                   {item.title}
//                 </Typography>
//                 <Typography
//                   fontWeight={400}
//                   fontSize={"14px"}
//                   lineHeight={"21.7px"}
//                   color="dis_text_option_system"
//                   textAlign={"center"}
//                 >
//                   {item.description}
//                 </Typography>
//               </Button>
//             </Grid>
//           );
//         })}
//       </Grid>
//     </Grid>
//   );
// }

// export default Initialization;
