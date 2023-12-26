import { useState, useEffect } from "react";
import NavBar from "../modules/Navbar.jsx";
import Footer from "../modules/Footer";
import { handleGetAllUsers } from "../../action/userAction";
import axios from "axios";
import { message } from "antd";
import banIcon from "/src/assets/ban.png";
import { notify_success, notify_fail, Toast_Container } from "../../toast";
import { useCookies } from "react-cookie";

const Admin = () => {
  const [users, setUsers] = useState([]);
  const [newPassword, setNewPassword] = useState("");
  const [showChangePassword, setShowChangePassword] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState(null);

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
        "http://127.0.0.1:8000/users/admin/changepassword",
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

        notify_success("Password changed successfully!");
      } else {
        console.error("Error changing password:", response.data.message);
      }
    } catch (error) {
      console.error("Error changing password:", error.message);
    }
  };

  const handleBanClick = async (userId, accessToken) => {
    try {
      // Gọi API để cập nhật trạng thái "ban" của người dùng
      const response = await axios.post(
        "http://127.0.0.1:8000/users/admin/deleteUser",
        {
          userId: userId,
        },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      // Xử lý phản hồi từ server
      if (response.data.success) {
        notify_success("User deleted successfully!");
        // Cập nhật trạng thái của người dùng trong state hoặc component
      } else {
        console.error("Error deleting user:", response.data.message);
      }
    } catch (error) {
      console.error("Error deleting user:", error.message);
    }
  };

  return (
    <div>
      <NavBar />
      <h1 className="text-4xl font-bold text-center mt-4">User Management</h1>
      {users && users.length > 0 ? (
        <div className="w-full overflow-x-auto p-5">
          <table className="w-full text-center table-auto">
            <thead className="bg-green-200">
              <tr>
                <th className="border px-4 py-2">ID</th>
                <th className="border px-4 py-2">Email</th>
                <th className="border px-4 py-2">Full name</th>
                <th className="border px-4 py-2">Role</th>
                <th className="border px-4 py-2">Password</th>
                <th className="border px-4 py-2">Change password</th>
                <th className="border px-4 py-2">Delete</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user.user_id}>
                  <td className="border px-4 py-2">{user.user_id}</td>
                  <td className="border px-4 py-2">
                    {user.account
                      ? user.account.email
                      : user.google_id
                        ? "Google Account"
                        : user.facebook_id
                          ? "Facebook Account"
                          : "Cant find email"}
                  </td>
                  <td className="border px-4 py-2">{user.name}</td>
                  <td className="border px-4 py-2">
                    {user.is_admin ? "ADMIN" : "USER"}
                  </td>
                  <td className="border px-4 py-2">
                    {user.account ? user.account.password : "No password"}
                  </td>
                  <td className="border px-4 py-2">
                    {user.account ? (
                      showChangePassword && selectedUserId === user.user_id ? (
                        <div className="flex justify-center items-center">
                          <input
                            type="password"
                            value={newPassword}
                            onChange={(e) => setNewPassword(e.target.value)}
                            className="border p-1 mr-2 rounded"
                            placeholder="New password"
                          />
                          <button
                            onClick={() => {
                              handleChangePasswordClick(cookies.accessToken);
                            }}
                            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                          >
                            Save
                          </button>
                        </div>
                      ) : (
                        <button
                          onClick={() => handleShowChangePassword(user.user_id)}
                          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                        >
                          Change password
                        </button>
                      )
                    ) : (
                      "Can't change password"
                    )}
                    <Toast_Container />
                  </td>
                  <td className="border px-4 py-2">
                    <img
                      src={banIcon}
                      alt="Ban Icon"
                      className="w-8 h-8 mx-auto cursor-pointer hover:opacity-80 transition duration-300"
                      onClick={() => {
                        handleBanClick(user.user_id, cookies.accessToken);
                      }}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p>No users found.</p>
      )}
      <Footer />
    </div>
  );
};

export default Admin;
