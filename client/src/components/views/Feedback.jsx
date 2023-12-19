import React, { useState } from "react";
import Navbar from "../modules/Navbar";
import Footer from "../modules/Footer";
import { message } from "antd";

const SuccessNotification = ({ onClose }) => (
  <div className="fixed top-0 left-0 right-0 bottom-0 flex items-center justify-center bg-black bg-opacity-50">
    <div className="bg-white p-8 rounded-lg text-center">
      <p className="text-green-600 font-semibold">
        Gửi ý kiến thành công! Cảm ơn bạn đã đóng góp cho chúng mình nha ❤️❤️❤️
      </p>
      <button
        onClick={onClose}
        className="mt-4 bg-blue-500 text-white px-3 py-1 rounded-3xl hover:bg-blue-700 focus:outline-none focus:shadow-outline-blue"
      >
        Đóng
      </button>
    </div>
  </div>
);

const Feedback = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    address: "",
    phoneNumber: "",
    email: "",
    title: "",
    content: "",
  });

  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Kiểm tra các ô bắt buộc
    const requiredFields = ["fullName", "email", "title", "content"];

    const hasEmptyFields = requiredFields.some(
      (field) => !formData[field].trim()
    );

    if (hasEmptyFields) {
      // Nếu có ô bắt buộc rỗng, hiển thị thông báo và không thực hiện gửi
      message.warning("Vui lòng điền đầy đủ thông tin");
      return;
    }

    // Xử lý logic gửi dữ liệu lên server hoặc làm những thao tác khác ở đây
    console.log("Đã gửi dữ liệu:", formData);
    setIsSubmitted(true);
  };

  const handleCloseNotification = () => {
    setIsSubmitted(false);
  };

  return (
    <div className="bg-white">
      <Navbar />
      <div className="container mx-auto mt-8 flex justify-center items-center h-screen">
        <div className="max-w-2xl p-8 rounded-lg w-[200%]">
          <div className="bg-gray-200 p-3 rounded-md mb-4">
            <h2 className="text-xl font-semibold text-center text-gray-800 m-0">
              Gửi ý kiến đóng góp tới chúng mình bên dưới nhé!
            </h2>
          </div>
          <p className="text-base text-left text-black">
            Những vị trí có dấu (<span className="text-red-500">*</span>) là bắt
            buộc phải có.
          </p>
          <form onSubmit={handleSubmit}>
            <table className="w-full">
              <tbody>
                <tr>
                  <td className="bg-[#e6f6ff] text-gray-800 p-2 font-bold">
                    Họ và tên<span className="text-red-500">*</span>
                  </td>
                  <td className="bg-[#ade2ff] p-2 text-base">
                    <input
                      type="text"
                      id="fullName"
                      name="fullName"
                      value={formData.fullName}
                      onChange={handleChange}
                      className="w-full p-2 border rounded-md"
                      required
                    />
                  </td>
                </tr>
                <tr>
                  <td className="bg-[#e6f6ff] text-gray-800 p-2 font-bold">
                    Địa chỉ
                  </td>
                  <td className="bg-[#ade2ff] p-2 text-base">
                    <input
                      type="text"
                      id="address"
                      name="address"
                      value={formData.address}
                      onChange={handleChange}
                      className="w-full p-2 border rounded-md"
                    />
                  </td>
                </tr>
                <tr>
                  <td className="bg-[#e6f6ff] text-gray-800 p-2 font-bold">
                    Số điện thoại
                  </td>
                  <td className="bg-[#ade2ff] p-2 text-base">
                    <input
                      type="tel"
                      id="phoneNumber"
                      name="phoneNumber"
                      value={formData.phoneNumber}
                      onChange={handleChange}
                      className="w-full p-2 border rounded-md"
                    />
                  </td>
                </tr>
                <tr>
                  <td className="bg-[#e6f6ff] text-gray-800 p-2 font-bold">
                    Email<span className="text-red-500">*</span>
                  </td>
                  <td className="bg-[#ade2ff] p-2 text-base">
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full p-2 border rounded-md"
                      required
                    />
                  </td>
                </tr>
                <tr>
                  <td className="bg-[#e6f6ff] text-gray-800 p-2 font-bold">
                    Tiêu đề<span className="text-red-500">*</span>
                  </td>
                  <td className="bg-[#ade2ff] p-2 text-base">
                    <input
                      type="text"
                      id="title"
                      name="title"
                      value={formData.title}
                      onChange={handleChange}
                      className="w-full p-2 border rounded-md"
                      required
                    />
                  </td>
                </tr>
                <tr>
                  <td className="bg-[#e6f6ff] text-gray-800 p-2 font-bold">
                    Nội dung<span className="text-red-500">*</span>
                  </td>
                  <td className="bg-[#ade2ff] p-2 text-base">
                    <textarea
                      id="content"
                      name="content"
                      value={formData.content}
                      onChange={handleChange}
                      className="w-full p-2 border rounded-md"
                      required
                    ></textarea>
                  </td>
                </tr>
              </tbody>
            </table>
          </form>
          <div className="mt-4 text-center">
            <button
              type="submit"
              onClick={handleSubmit}
              className="bg-[#ff8f76] text-white px-8 py-1 rounded-3xl text-lg hover:bg-[#ff7d5f] hover:text-bold focus:outline-none focus:shadow-outline-blue"
            >
              Gửi
            </button>
          </div>
        </div>
      </div>
      {isSubmitted && <SuccessNotification onClose={handleCloseNotification} />}
      <Footer />
    </div>
  );
};

export default Feedback;
