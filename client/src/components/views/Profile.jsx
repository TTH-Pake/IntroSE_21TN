import React, { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { Link } from "react-router-dom";
import {
  handleGetCurrentUser,
  updateUserProfile,
} from "../../action/userAction";
import {
  BlogIcon,
  EditIcon,
  FavoriteIcon,
  KeyIcon,
  NotiIcon,
  ProfileIcon,
  RecipeIcon,
  fbIcon,
  instaIcon,
  twIcon,
} from "../../assets";
import Footer from "../modules/Footer";
import Loading from "../modules/Loading";
import NavBar from "../modules/Navbar";

const Profile = () => {
  const [cookies, setCookie, removeCookie] = useCookies(["accessToken"]);
  const [userProfile, setUserProfile] = useState(null);
  const [editingProfile, setEditingProfile] = useState({
    name: "",
    gender: "",
    age: 0,
  });
  const [showEditProfile, setShowEditProfile] = useState(false);

  const handleEditProfileChange = (field, value) => {
    setEditingProfile((prevProfile) => ({
      ...prevProfile,
      [field]: value,
    }));
  };

  const handleSaveProfile = async () => {
    try {
      await updateUserProfile(
        editingProfile,
        userProfile.user_id,
        cookies.accessToken
      );
      const profile = await handleGetCurrentUser(cookies.accessToken);
      setUserProfile(profile);
      setShowEditProfile(false);
    } catch (error) {
      console.error("Error updating profile:", error.message);
    }
  };

  const handleCancel = () => {
    setShowEditProfile(false);
  };

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const profile = await handleGetCurrentUser(cookies.accessToken);
        setUserProfile(profile);
        setEditingProfile({
          name: profile.name,
          gender: profile.gender,
          age: profile.age,
        });
      } catch (error) {
        console.error("Error fetching user profile:", error.message);
      }
    };

    fetchUserProfile();
  }, []);

  if (!userProfile) {
    return (
      <div className="absolute top-1/2 left-1/2">
        <Loading />;
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen bg-red-100 ">
      <NavBar />
      <div className=" bg-red-100 py-6 flex flex-col sm:flex-row justify-center space-x-6 mt-3 ml-4 mr-4">
        {/* Column 1 */}
        <div className="flex-grow h-full w-1/5 py-10 bg-green-300 shadow-lg sm:rounded-3xl">
          <div className="text-base space-y-4 text-gray-700 sm:text-lg ">
            <nav className="flex text-center">
              <div className="max-w-md mx-auto font-bold">
                <div className="flex items-center justify-center space-x-3 ">
                  <img className="h-5 w-5" src={ProfileIcon} alt="" />
                  <a
                    href="/users/profile"
                    className="flex-grow bg-green-400 text-black p-2.5 my-2 rounded-r-full transition duration-300 ease-in-out hover:bg-green-500 shadow-md"
                  >
                    Profile
                  </a>
                </div>

                <div className="flex items-center justify-center space-x-3">
                  <img className="h-5 w-5" src={RecipeIcon} alt="" />
                  <a
                    href="/users/recipe-manager"
                    className="flex-grow bg-green-400 text-black p-2.5 my-2 rounded-r-full transition duration-300 ease-in-out hover:bg-green-500 shadow-md"
                  >
                    Your recipes
                  </a>
                </div>

                <div className="flex items-center justify-center space-x-3">
                  <img className="h-5 w-5" src={FavoriteIcon} alt="" />
                  <a
                    href="/users/favourites"
                    className="flex-grow bg-green-400 text-black p-2.5 my-2 rounded-r-full transition duration-300 ease-in-out hover:bg-green-500 shadow-md"
                  >
                    Favorite recipes
                  </a>
                </div>

                <div className="flex items-center justify-center space-x-3">
                  <img className="h-5 w-5" src={BlogIcon} alt="" />
                  <a
                    href="/users/blogManager"
                    className="flex-grow bg-green-400 text-black p-2.5 my-2 rounded-r-full transition duration-300 ease-in-out hover:bg-green-500 shadow-md"
                  >
                    Your blogs
                  </a>
                </div>

                <div className="flex items-center justify-center space-x-3">
                  <img className="h-5 w-5" src={NotiIcon} alt="" />
                  <a
                    href="/notifications"
                    className="flex-grow bg-green-400 text-black p-2.5 my-2 rounded-r-full transition duration-300 ease-in-out hover:bg-green-500 shadow-md"
                  >
                    Notifications
                  </a>
                </div>
              </div>
            </nav>
          </div>
        </div>

        {/* Column 2 */}
        <div className="sm:w-2/5 relative py-3 sm:max-w-xl sm:mx-auto flex items-center">
          <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-light-blue-500 shadow-lg transform -skew-y-6 sm:skew-y-0 sm:-rotate-6 sm:rounded-3xl"></div>
          <div className="relative px-5 bg-green-300 shadow-lg sm:rounded-3xl sm:p-20 mx-auto w-full border-none">
            <div className="max-w-md mx-auto">
              <div>
                <img
                  className="h-36 w-36 rounded-full object-cover border-2 mx-auto"
                  src="https://cdn.alongwalk.info/vn/wp-content/uploads/2022/10/31171151/300-hinh-nen-dien-thoai-cute-ngau-cuc-dep-duoc-tai-nhieu1667185911.jpg"
                  alt="Mc Scofild"
                />
              </div>
              <div className="divide-y divide-gray-200">
                <div className="py-8 text-base leading-6 space-y-4 text-gray-700 sm:text-lg sm:leading-7 text-center">
                  <h2 className="text-2xl leading-9 font-bold text-gray-900">
                    {userProfile.name}
                  </h2>
                  <div className="flex justify-center items-center space-x-4">
                    <p className="text-gray-600">{userProfile.followers}</p>
                  </div>
                  <p className="text-gray-600">
                    Email : {userProfile.account.email}
                  </p>
                  <p className="text-gray-600">
                    Telephone : +84 {userProfile.phone}
                  </p>
                </div>

                <div className="flex justify-center border-none pt-2">
                  <a
                    href="https://www.facebook.com"
                    className="text-gray-600"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <img src={fbIcon} alt="Facebook" className="h-6 w-6" />
                  </a>
                  <a
                    href="https://www.instagram.com"
                    className="text-gray-600 mx-4"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <img src={instaIcon} alt="Instagram" className="h-6 w-6" />
                  </a>
                  <a
                    href="https://www.twitter.com"
                    className="text-gray-600"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <img src={twIcon} alt="Twitter" className="h-6 w-6" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Column 3 */}
        <div className="sm:w-2/5 h-full py-10 bg-blue-100 shadow-lg sm:rounded-3xl mr-10">
          <div className="max-w-md mx-auto">
            <div className="divide-y divide-gray-200">
              <div className="py-8 text-base text-center leading-6 space-y-4 text-gray-700 sm:text-lg sm:leading-7">
                <h2 className="text-2xl text-center leading-9 font-bold text-gray-900">
                  Personal information
                </h2>

                <dl className="bg-green-300 p-5 rounded shadow-md grid grid-cols-2 mt-4">
                  <div className="font-bold text-black">
                    <dt>Full name:</dt>
                    <dt>Gender:</dt>
                    <dt>Age:</dt>
                  </div>
                  <div className="text-left">
                    <dd>{userProfile.name}</dd>
                    <dd>{userProfile.gender}</dd>
                    <dd>{userProfile.age}</dd>
                  </div>
                </dl>
              </div>
              <div className="flex flex-col items-center justify-center pt-6 leading-6 sm:leading-7">
                <div className="flex space-x-3 items-center justify-center mt-3">
                  <img className="h-6 w-6" src={EditIcon} alt="" />
                  <button
                    className="bg-blue-300 text-gray-800 rounded-full font-semibold text-sm hover:bg-blue-400 px-4 py-2.5 w-1/2 sm:w-full"
                    onClick={() => setShowEditProfile(true)}
                  >
                    Edit personal information
                  </button>

                  {showEditProfile && (
                    <div className="flex flex-col space-y-2 text-base">
                      <input
                        type="text"
                        value={editingProfile.name}
                        onChange={(e) =>
                          handleEditProfileChange("name", e.target.value)
                        }
                        className="bg-white rounded-full p-2 text-center"
                      />
                      <input
                        type="text"
                        value={editingProfile.gender}
                        onChange={(e) =>
                          handleEditProfileChange("gender", e.target.value)
                        }
                        className="bg-white rounded-full p-2 text-center"
                      />
                      <input
                        type="number"
                        value={editingProfile.age}
                        onChange={(e) =>
                          handleEditProfileChange("age", e.target.value)
                        }
                        className="bg-white rounded-full p-2 text-center"
                      />
                      <div className="flex flex-row items-center justify-center space-x-3">
                        <button
                          className="w-1/2 p-1 bg-red-300 rounded-full text-gray-800 text-base"
                          onClick={() => handleSaveProfile()}
                        >
                          Save
                        </button>
                        <button
                          className="w-1/2 p-1 bg-red-300 rounded-full text-gray-800 text-base"
                          onClick={() => handleCancel()}
                        >
                          Cancel
                        </button>
                      </div>
                    </div>
                  )}
                </div>

                <div className="flex items-center justify-center space-x-3 mt-3">
                  <img className="h-6 w-6" src={KeyIcon} alt="" />
                  <button className=" bg-blue-300 text-gray-800 rounded-full hover:font-semibold hover:bg-blue-400 px-4 py-1.5 w-full sm:w-full">
                    <Link
                      to="/reset-password"
                      className="text-gray-700 font-semibold text-sm"
                    >
                      Change password
                    </Link>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Profile;
