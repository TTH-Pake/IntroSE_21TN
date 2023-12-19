import { useNavigate } from "react-router-dom";
import menuIcon from "/src/assets/menu.png";
import PropTypes from "prop-types";

const Menu = ({ showMenu, setShowMenu, onClick }) => {
  const navigate = useNavigate();
  const navigateToPage = (page) => {
    setShowMenu(true);
    navigate(page);
  };

  return (
    <div className="page-menu-actions relative ml-4">
      <img
        src={menuIcon}
        alt="Menu"
        onClick={onClick}
        className="w-7 h-7 cursor-pointer transition duration-300 ease-in-out bg-white"
      />

      {showMenu && (
        <div className="page-menu absolute right-0 mt-2 w-40 bg-white text-black rounded shadow-lg z-10 transition duration-300">
          <button
            onClick={() => navigateToPage("/about-us")}
            className="block w-full px-4 py-2 text-middle rounded hover:bg-gray-200"
          >
            About Us
          </button>
          <button
            onClick={() => navigateToPage("/tips-and-tricks")}
            className="block w-full px-4 py-2 border-t border-b text-middle hover:bg-gray-200"
          >
            Tips and Tricks
          </button>
          <button
            onClick={() => navigateToPage("/blog")}
            className="block w-full px-4 py-2 text-middle border-b hover:bg-gray-200"
          >
            Blog
          </button>
          <button
            onClick={() => navigateToPage("/feedback")}
            className="block w-full px-4 py-2 text-middle border-b hover:bg-gray-200"
          >
            FeedBack
          </button>
          <button
            onClick={() => navigateToPage("/others")}
            className="block w-full px-4 py-2 text-middle rounded hover:bg-gray-200"
          >
            Khác
          </button>

        </div>
      )}
    </div>
  );
};

Menu.propTypes = {
  showMenu: PropTypes.bool.isRequired,
  setShowMenu: PropTypes.func.isRequired,
  onClick: PropTypes.func.isRequired,
};

export default Menu;
