import React from "react";
import Loading from "../modules/Loading";
import { handleGetUser } from "../../action/accountAction";
import { useEffect, useState } from "react";
import {
  Clock,
  chatIcon,
  avatarIcon,
  SendIcon,
  Bookmark,
  Share,
  ProfileIcon,
  NotiIcon,
  KeyIcon,
  EditIcon,
  RecipeIcon,
  BlogIcon,
  FavoriteIcon,
  fbIcon,
  instaIcon,
  twIcon,
} from "../../assets";
import NavBar from "../modules/Navbar";
import Footer from "../modules/Footer";
import { Link } from "react-router-dom";

const Profile = () => {
  const [userProfile, setUserProfile] = useState(null);

  useEffect(() => {
    const fetchUserProfile = async () => {
      const profile = await handleGetUser();
      setUserProfile(profile);
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
                    href="/users/recipeManager"
                    className="flex-grow bg-green-400 text-black p-2.5 my-2 rounded-r-full transition duration-300 ease-in-out hover:bg-green-500 shadow-md"
                  >
                    Your recipes
                  </a>
                </div>

                <div className="flex items-center justify-center space-x-3">
                  <img className="h-5 w-5" src={FavoriteIcon} alt="" />
                  <a
                    href="/favorites"
                    className="flex-grow bg-green-400 text-black p-2.5 my-2 rounded-r-full transition duration-300 ease-in-out hover:bg-green-500 shadow-md"
                  >
                    Favorite recipes
                  </a>
                </div>

                <div className="flex items-center justify-center space-x-3">
                  <img className="h-5 w-5" src={BlogIcon} alt="" />
                  <a
                    href="/blog"
                    className="flex-grow bg-green-400 text-black p-2.5 my-2 rounded-r-full transition duration-300 ease-in-out hover:bg-green-500 shadow-md"
                  >
                    Blogs
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
                    <p className="text-gray-600">35K Followers</p>
                    <p className="text-gray-600">11K Following</p>
                  </div>
                  <p className="text-gray-600">TP Hồ Chí Minh, Việt Nam</p>
                  <p className="text-gray-600">{userProfile.account.email}</p>
                  <p className="text-gray-600">+88 01749-565659</p>

                  <button className="mt-4 bg-blue-300 text-gray-800 rounded-full hover:font-semibold hover:bg-blue-400 px-4 py-1.5 w-full sm:w-auto">
                    Verify account
                  </button>
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
              <div className="flex flex-col items-center justify-center pt-6 text-base leading-6 sm:text-lg sm:leading-7">
                <div className="flex space-x-3 items-center justify-center mt-3">
                  <img className="h-6 w-6" src={EditIcon} alt="" />
                  <button className=" bg-blue-300 text-gray-800 rounded-full hover:font-semibold hover:bg-blue-400 px-4 py-1.5 w-1/2 sm:w-full">
                    Edit personal information
                  </button>
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
