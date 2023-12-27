/* eslint-disable no-unused-vars */
import PropTypes from "prop-types";
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import avatar from "/src/assets/user.png";
import { handleGetCurrentUser } from "../../action/userAction";
import { handleLogout } from "../../action/accountAction";
import { useCookies } from "react-cookie";

const Avatar = ({ showLoginForm, setShowLoginForm, onClick }) => {
  const [cookies, setCookie, removeCookie] = useCookies(["accessToken"]);
  const [user, setUser] = useState(null);

  const getUser = async () => {
    const accessToken = cookies.accessToken;
    if (!accessToken) {
      setUser(null);
    } else setUser(await handleGetCurrentUser(accessToken));
  };

  useEffect(() => {
    getUser();
  }, [cookies.accessToken]);

  const navigate = useNavigate();

  const navigateToLogout = () => {
    handleLogout(removeCookie);
    navigate("/login");
  };

  const navigateToLogin = () => {
    // setShowLoginForm(true);
    handleLogout(removeCookie);
    navigate("/login");
  };

  const navigateToAdmin = () => {
    navigate("/users/admin");
  };

  const navigateToRecipesManager = () => {
    navigate("/users/recipe-manager");
  };

  const navigateToBlogManager = () => {
    navigate("/users/blogManager");
  };

  const navigateToProfile = () => {
    navigate("/users/profile");
  };

  return (
    <div className="auth-actions relative rounded-full">
      <img
        src={avatar}
        alt="Avatar"
        onClick={onClick}
        className="w-10 h-10 object-cover rounded-full cursor-pointer transition duration-300 ease-in-out bg-white"
      />

      {showLoginForm && (
        <div className="auth-menu absolute transform -translate-x-1/2 mt-2 w-36 bg-white text-black border-gray-300 rounded shadow-lg z-10 transition duration-300">
          {user ? (
            <>
              {user.is_admin ? (
                <>
                  <button
                    onClick={navigateToAdmin}
                    className="block w-full px-4 py-2 text-center rounded hover:bg-gray-200"
                  >
                    User Management
                  </button>

                  <button
                    onClick={navigateToRecipesManager}
                    className="block w-full px-4 py-2 text-center rounded hover:bg-gray-200"
                  >
                    Recipes Management
                  </button>

                  <button
                    onClick={navigateToBlogManager}
                    className="block w-full px-4 py-2 text-center rounded hover:bg-gray-200"
                  >
                    Blogs Management
                  </button>

                  <button
                    onClick={navigateToProfile}
                    className="block w-full px-4 py-2 text-center rounded hover:bg-gray-200"
                  >
                    Profile
                  </button>
                </>
              ) : (
                <button
                  onClick={navigateToProfile}
                  className="block w-full px-4 py-2 text-center rounded hover:bg-gray-200"
                >
                  Profile
                </button>
              )}

              <button
                onClick={navigateToLogout}
                className="block w-full px-4 py-2 text-center rounded hover:bg-gray-200"
              >
                Logout
              </button>
            </>
          ) : (
            <button
              onClick={navigateToLogin}
              className="block w-full px-4 py-2 text-center rounded hover:bg-gray-200"
            >
              Login
            </button>
          )}
        </div>
      )}
    </div>
  );
};

Avatar.propTypes = {
  showLoginForm: PropTypes.bool.isRequired,
  setShowLoginForm: PropTypes.func.isRequired,
  onClick: PropTypes.func.isRequired,
};

export default Avatar;
