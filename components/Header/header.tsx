import Navbar from "./navbar";

const Header = () => {
  return (
    <header className="sticky top-0 z-50 bg-slate-900/95 backdrop-blur-md border-b border-slate-800 text-white dir-rtl">
      <Navbar />
    </header>
  );
};

export default Header;
