import { useState } from "react";
import { Link } from "react-router-dom";
import SearchBar from "./searchbar";
import LogoIcon from "./LogoIcon";
import Avatar from "./Avatar";
import Menu from "./Menu";

const NavBar = () => {
  const [showLoginForm, setShowLoginForm] = useState(false);
  const [showMenu, setShowMenu] = useState(false);

  const handleAvatarClick = () => {
    setShowLoginForm(!showLoginForm);
    setShowMenu(false);
  };

  const handleMenuClick = () => {
    setShowMenu(!showMenu);
    setShowLoginForm(false);
  };

  return (
    <nav className="navbar flex flex-col relative items-center justify-center align-middle px-6 h-[80px] bg-white border-b">
      <Link to="/home">
        <LogoIcon className="flex-shrink-0" />
      </Link>

      <SearchBar className="flex-grow mx-2" />

      <div className="flex-shrink-0 flex items-center space-x-6 bg-white">
        <Avatar
          showLoginForm={showLoginForm}
          setShowLoginForm={setShowLoginForm}
          onClick={handleAvatarClick}
        />
        <Menu
          showMenu={showMenu}
          setShowMenu={setShowMenu}
          onClick={handleMenuClick}
        />
      </div>
    </nav>
  );
};

export default NavBar;
