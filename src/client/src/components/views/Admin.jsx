import { message } from "antd";
import axios from "axios";
import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { handleGetAllUsers } from "../../action/userAction";
import { Toast_Container } from "../../toast";
import Footer from "../modules/Footer";
import NavBar from "../modules/Navbar";
import banImage from "/src/assets/ban.png";
import changePWImage from "/src/assets/changePW.png";
import searchIcon from "/src/assets/loupe.png";

import ConfirmDialog from "../modules/ConfirmDialog";

const Admin = () => {
  const [users, setUsers] = useState([]);
  const [newPassword, setNewPassword] = useState("");
  const [showChangePassword, setShowChangePassword] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [foundUser, setFoundUser] = useState(null);
  const [showDialog, setShowDialog] = useState(false);

  const [cookies, setCookie, removeCookie] = useCookies(["accessToken"]);
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await handleGetAllUsers(cookies.accessToken);
        if (response.success) {
          setUsers(response.users);
        } else {
          const errorMessage =
            response && response.data
              ? response.data.message
              : "Response is undefined";
          console.error("Error fetching users:", errorMessage);
        }
      } catch (error) {
        console.error("Error fetching users:", error.message);
      }
    };

    fetchUsers();
  }, [users]);

  const handleShowChangePassword = (userId) => {
    setShowChangePassword(true);
    setSelectedUserId(userId);
  };

  const handleChangePasswordClick = async (accessToken) => {
    try {
      if (!newPassword) {
        message.error("Password is invalid.");
        return;
      }
      // Gửi yêu cầu đổi mật khẩu trực tiếp
      const response = await axios.post(
        "https://127.0.0.1:8000/users/admin/changepassword",
        {
          userId: selectedUserId,
          newPassword: newPassword,
        },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      // Kiểm tra phản hồi từ server và xử lý nếu cần
      if (response.data.success) {
        const updatedUsers = users.map((user) =>
          user.user_id === selectedUserId
            ? { ...user, account: { ...user.account, password: newPassword } }
            : user
        );

        // Cập nhật state
        setUsers(updatedUsers);
        // Đặt lại trạng thái để ẩn input và reset dữ liệu
        setShowChangePassword(false);
        setSelectedUserId(null);
        setNewPassword("");

        message.success("Password changed successfully!");
      } else {
        console.error("Error changing password:", response.data.message);
      }
    } catch (error) {
      console.error("Error changing password:", error.message);
    }
  };

  const handleBanClick = async () => {
    setShowDialog(true);
  };

  const handleConfirm = async (userId,accessToken) => {
    setShowDialog(false);
      try {
        // Call API to update user's "ban" status
        const response = await axios.post(
          "https://127.0.0.1:8000/users/admin/deleteUser",
          {
            userId: userId,
          },
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );
  
        // Handle response from server
        if (response.data.success) {
          message.success("User deleted successfully!");
          // Update user's status in state or component
        } else {
          console.error("Error deleting user:", response.data.message);
        }
      } catch (error) {
        console.error("Error deleting user:", error.message);
      }

  }

  const handleCancel = () => {
    setShowDialog(false);
  }

  const handleSearch = () => {
    
    const foundUser = users.find(
      (user) => user.account.email.toLowerCase().includes(searchTerm.toLowerCase())
    );
    

    if (foundUser) {
      setFoundUser(foundUser);
    } else {
      setFoundUser(null);
    }
  };

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      handleSearch();
    }
  };

  
  return (
    <div className="home-wrapper h-screen overflow-y-auto">
      <NavBar />
      <div className="text-lg mt-8 mx-24 mb-10">
        <h1 className="text-4xl font-bold text-center mt-4 pb-4">
          User Management
        </h1>
        <div className="flex items-center mb-4 h-full">
          <div className="flex-none mr-4 h-full">
            <p className="bg-green-500 text-white px-4 py-2 rounded-md text-base h-full flex items-center">
              Total number of users: {users.length}
            </p>
          </div>
          <div className="flex-1 relative h-full">
            <input
              type="text"
              placeholder="Search users by email..."
              className="px-4 py-2 border border-gray-300 rounded w-full h-full"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onKeyPress={handleKeyPress}
            />
            <img
              src={searchIcon}
              alt="Search"
              className="absolute right-4 top-1/2 transform -translate-y-1/2 w-5 h-5 cursor-pointer"
              onClick={handleSearch}
            />
          </div>
        </div>

        {foundUser ? (
          // Hiển thị thông tin của người dùng nếu tìm thấy
          <div>
            <h3 className="text-lg font-semibold mb-2">Users information</h3>
            <table className="min-w-full bg-gray-200 border-none">
              <thead>
                <tr className="bg-blue-600 text-white">
                  <th className="p-2">Full name</th>
                  <th className="p-2">Email</th>
                  <th className="p-2">Gender</th>
                  <th className="p-2">Age</th>
                  <th className="p-2">Role</th>
                  {/* <th className="">Password</th> */}
                  <th className="whitespace-no-wrap text-center">
                    Change Password
                  </th>
                  <th className="whitespace-no-wrap text-center">Delete</th>
                </tr>
              </thead>
              <tbody>
                <tr key={foundUser._id.$oid} className="">
                  <td className="p-2">
                    {foundUser.account.google_id
                      ? "[G] "
                      : foundUser.account.facebook_id
                      ? "[F] "
                      : "" + foundUser.name}
                  </td>
                  <td className="p-2">{foundUser.account.email}</td>
                  <td className="p-2">{foundUser.gender}</td>
                  <td className="p-2">{foundUser.age}</td>
                 
                  <td className="whitespace-no-wrap text-center">
                    {!foundUser.account.google_id &&
                    !foundUser.account.facebook_id ? (
                      showChangePassword &&
                      selectedUserId === foundUser.user_id ? (
                        <div className="flex justify-center items-center ">
                          <input
                            type="password"
                            value={newPassword}
                            onChange={(e) => setNewPassword(e.target.value)}
                            className="border p-1 mr-1.5 rounded max-w-[180px]"
                            placeholder="New password..."
                          />
                          <button
                            onClick={() => {
                              handleChangePasswordClick(cookies.accessToken);
                            }}
                            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1.5 px-3 rounded"
                          >
                            Save
                          </button>
                        </div>
                      ) : (
                        <button
                          onClick={() =>
                            handleShowChangePassword(foundUser.user_id)
                          }
                          className="text-white px-2 py-1 rounded max-w-[50px]"
                        >
                          <img
                            src={changePWImage}
                            alt="Change Password"
                            className="w-7 h-auto"
                          />
                        </button>
                      )
                    ) : (
                      "Can't change password"
                    )}
                   
                  </td>

                  <td className="whitespace-no-wrap text-center">
                    <button
                      onClick={() => {
                        handleBanClick(foundUser.user_id, cookies.accessToken);
                      }}
                      className="text-white px-2 py-1 rounded max-w-[50px]"
                    >
                      <img src={banImage} alt="Delete" className="w-8 h-auto" />
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        ) : (
          // Hiển thị toàn bộ danh sách nếu không tìm thấy
          <table className="min-w-full bg-gray-200 border-none">
            <thead>
              <tr className="bg-blue-600 text-white">
                <th className="p-2">Full name</th>
                <th className="p-2">Email</th>
                <th className="p-2">Gender</th>
                <th className="p-2">Age</th>
                <th className="p-2">Role</th>
                {/* <th className="">Password</th> */}
                <th className="whitespace-no-wrap text-center">
                  Change Password
                </th>
                <th className="whitespace-no-wrap text-center">Delete</th>
              </tr>
            </thead>
            <tbody>
              {users &&
                users.map((user,index) => (
                  <tr key={index} className="">
                    <td className="p-2">
                      {user?.account?.google_id
                        ? "[G] "
                        : user?.account?.facebook_id
                        ? "[F] "
                        : "" + user.name}
                    </td>
                    <td className="p-2">{user.account.email}</td>
                    <td className="p-2">{user.gender}</td>
                    <td className="p-2">{user.age}</td>
                    <td className="p-2">{user.is_admin ? "Admin" : "User"}</td>
                    
                    <td className="whitespace-no-wrap text-center">
                      {!user.account.google_id && !user.account.facebook_id ? (
                        showChangePassword &&
                        selectedUserId === user.user_id ? (
                          <div className="flex justify-center items-center ">
                            <input
                              type="password"
                              value={newPassword}
                              onChange={(e) => setNewPassword(e.target.value)}
                              className="border p-1 mr-1.5 rounded max-w-[180px]"
                              placeholder="New password..."
                            />
                            <button
                              onClick={() => {
                                handleChangePasswordClick(cookies.accessToken);
                              }}
                              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1.5 px-3 rounded"
                            >
                              Save
                            </button>
                          </div>
                        ) : (
                          <button
                            onClick={() =>
                              handleShowChangePassword(user.user_id)
                            }
                            className="text-white px-2 py-1 rounded max-w-[50px]"
                          >
                            <img
                              src={changePWImage}
                              alt="Change Password"
                              className="w-7 h-auto"
                            />
                          </button>
                        )
                      ) : (
                        "Can't change password"
                      )}
                      <Toast_Container />
                    </td>
                    <td className="whitespace-no-wrap text-center">
                      <button
                        onClick={() => {
                          handleBanClick();
                        }}
                        className="text-white px-2 py-1 rounded max-w-[50px]"
                      >
                        <img
                          src={banImage}
                          alt="Delete"
                          className="w-8 h-auto"
                        />
                      </button>
                      {
                        showDialog && <ConfirmDialog 
                        message="Are you sure you want to delete this user?"
                        onConfirm={() => handleConfirm(user.user_id,cookies.accessToken)}
                        onCancel={handleCancel}
                        />
                       }

                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default Admin;
