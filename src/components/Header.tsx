import logo from '../../public/icons/logo.svg';

function Header() {
  return (
    <div className=" w-full  py-5 sm:py-12 ">
      <div className="f-jc-ic  gap-x-1 ">
        <img src={logo} alt="logo icon" />
        <span className="font-bold text-2xl text-secondary-700 ">یارابات</span>
      </div>
    </div>
  );
}

export default Header;
