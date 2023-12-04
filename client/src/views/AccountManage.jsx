import React, { useState } from "react";
import NavBar from "../components/modules/Navbar";
import Footer from "../components/modules/Footer";
import changePWImage from "../assets/changePW.png";
import banImage from "../assets/ban.png";
import searchIcon from "../assets/loupe.png";

const users = [
  {
    _id: { $oid: "654212917f30fd5536019238" },
    user_id: { $numberInt: "5" },
    password: "123",
    email: "d@gmail.com",
    name: "Dương Quá",
    gender: "male",
    age: 20,
    is_admin: 0,
  },
  {
    _id: { $oid: "654212917f30fd5536019235" },
    user_id: { $numberInt: "2" },
    password: "123",
    email: "a@gmail.com",
    name: "A Kha",
    gender: "female",
    age: 20,
    is_admin: 0,
  },
  {
    _id: { $oid: "654212917f30fd5536019234" },
    user_id: { $numberInt: "1" },
    password: "123",
    email: "tanhiep@gmail.com",
    name: "Tô Tấn Hiệp",
    gender: "male",
    age: 20,
    is_admin: 1,
  },
  {
    _id: { $oid: "654212917f30fd5536019237" },
    user_id: { $numberInt: "4" },
    password: "123",
    email: "c@gmail.com",
    name: "Chu Chỉ Nhược",
    gender: "female",
    age: 20,
    is_admin: 0,
  },
  {
    _id: { $oid: "654212917f30fd5536019236" },
    user_id: { $numberInt: "3" },
    password: "123",
    email: "b@gmail.com",
    name: "Trương Vô Kỵ",
    gender: "male",
    age: 20,
    is_admin: 0,
  },
];

const AccountManage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [foundUser, setFoundUser] = useState(null);

  const handleSearch = () => {
    const foundUser = users.find(
      (user) => user.email.toLowerCase() === searchTerm.toLowerCase()
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

  const handleDeleteUser = (userId) => {
    console.log(`Xóa người dùng với ID: ${userId}`);
  };

  return (
    <div className="home-wrapper h-screen overflow-y-auto">
      <NavBar />
      <div className="text-lg mt-8 mx-24 mb-10">
        <h2 className="text-xl font-bold mb-4">Danh sách người dùng</h2>
        <div className="flex items-center mb-4 h-full">
          <div className="flex-none mr-4 h-full">
            <p className="bg-green-500 text-white px-4 py-2 rounded-md text-base h-full flex items-center">
              Tổng số người dùng: {users.length}
            </p>
          </div>
          <div className="flex-1 relative h-full">
            <input
              type="text"
              placeholder="Tìm kiếm người dùng theo email..."
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
            <h3 className="text-lg font-semibold mb-2">Thông tin người dùng</h3>
            <table className="min-w-full bg-gray-200 border-none">
              <thead>
                <tr className="bg-blue-600 text-white">
                  <th className="p-2">Tên</th>
                  <th className="p-2">Email</th>
                  <th className="p-2">Giới tính</th>
                  <th className="p-2">Tuổi</th>
                  <th className="p-2">Vai trò</th>
                  <th className="">Password</th>
                  <th className="whitespace-no-wrap text-center">
                    Đổi Password
                  </th>
                  <th className="whitespace-no-wrap text-center">Xóa</th>
                </tr>
              </thead>
              <tbody>
                <tr key={foundUser._id.$oid} className="">
                  <td className="p-2">{foundUser.name}</td>
                  <td className="p-2">{foundUser.email}</td>
                  <td className="p-2">{foundUser.gender}</td>
                  <td className="p-2">{foundUser.age}</td>
                  <td className="p-2">
                    {foundUser.is_admin ? "Admin" : "User"}
                  </td>
                  <td className="">{foundUser.password}</td>
                  <td className="whitespace-no-wrap text-center">
                    <button className="text-white px-2 py-1 rounded max-w-[50px]">
                      <img
                        src={changePWImage}
                        alt="Change Password"
                        className="w-7 h-auto"
                      />
                    </button>
                  </td>
                  <td className="whitespace-no-wrap text-center">
                    <button
                      onClick={() => handleDeleteUser(foundUser._id.$oid)}
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
                <th className="p-2">Tên</th>
                <th className="p-2">Email</th>
                <th className="p-2">Giới tính</th>
                <th className="p-2">Tuổi</th>
                <th className="p-2">Vai trò</th>
                <th className="">Password</th>
                <th className="whitespace-no-wrap text-center">Đổi Password</th>
                <th className="whitespace-no-wrap text-center">Xóa</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user._id.$oid} className="">
                  <td className="p-2">{user.name}</td>
                  <td className="p-2">{user.email}</td>
                  <td className="p-2">{user.gender}</td>
                  <td className="p-2">{user.age}</td>
                  <td className="p-2">{user.is_admin ? "Admin" : "User"}</td>
                  <td className="">{user.password}</td>
                  <td className="whitespace-no-wrap text-center">
                    <button className="text-white px-2 py-1 rounded max-w-[50px]">
                      <img
                        src={changePWImage}
                        alt="Change Password"
                        className="w-7 h-auto"
                      />
                    </button>
                  </td>
                  <td className="whitespace-no-wrap text-center">
                    <button
                      onClick={() => handleDeleteUser(user._id.$oid)}
                      className="text-white px-2 py-1 rounded max-w-[50px]"
                    >
                      <img src={banImage} alt="Delete" className="w-8 h-auto" />
                    </button>
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

export default AccountManage;
