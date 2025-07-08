function Header() {
  const prefString = localStorage.getItem('preferences');
  const preferences = prefString ? JSON.parse(prefString) : null;
  const logo = preferences?.logo_url;

  return (
    <div className=" w-full  py-5 sm:py-12 ">
      <div className="f-jc-ic  gap-x-1 ">
        <img src={logo} alt="logo icon" />
      </div>
    </div>
  );
}

export default Header;
