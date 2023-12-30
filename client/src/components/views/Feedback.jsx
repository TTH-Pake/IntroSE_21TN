import React, { useState } from "react";
import NavBar from "../modules/Navbar";
import Footer from "../modules/Footer";
import FeedbackIcon from "../../assets/feedback.png";

const SuccessNotification = ({ onClose }) => (
  <div className="fixed top-0 left-0 right-0 bottom-0 flex items-center justify-center bg-black bg-opacity-50">
    <div className="bg-white p-8 rounded-lg text-center">
      <p className="text-green-600 font-semibold">
        Feedback sent successfully! Thank you for contributing to us ❤️❤️❤️
      </p>
      <button
        onClick={onClose}
        className="mt-4 bg-blue-500 text-white px-3 py-1 rounded-3xl hover:bg-blue-700 focus:outline-none focus:shadow-outline-blue"
      >
        Close
      </button>
    </div>
  </div>
);

const FeedBack = () => {
  const [form, setForm] = useState({
    name: "",
    address: "",
    phoneNumber: "",
    email: "",
    title: "",
    feedback: "",
    satisfaction: "",
  });

  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Đã gửi dữ liệu:", form);

    setForm({
      name: "",
      address: "",
      phoneNumber: "",
      email: "",
      title: "",
      feedback: "",
      satisfaction: "",
    });

    setIsSubmitted(true);
  };

  const handleCloseNotification = () => {
    setIsSubmitted(false);
  };

  return (
    <div className="home-wrapper h-screen overflow-y-auto">
      <NavBar />

      <div className="feedback-page flex mt-16 ml-32 mr-32 space-x-10">
        <div className="w-2/5 flex flex-col items-center justify-center font-bold">
          <h1 className="text-5xl text-left text-blue-400">
            Feel free to drop us your feedback
          </h1>
          <img src={FeedbackIcon} alt="" className="w-3/4 h-2/4 mt-10" />
        </div>

        <div className="w-3/5">
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Your full name<span className="text-red-500">*</span>:
              </label>
              <input
                type="text"
                name="name"
                value={form.name}
                onChange={handleChange}
                className="border-2 border-gray-500 rounded p-2 w-full"
                required
              />
            </div>

            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Address:
              </label>
              <input
                type="text"
                name="address"
                value={form.address}
                onChange={handleChange}
                className="border-2 border-gray-500 rounded p-2 w-full"
              />
            </div>

            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Phone number:
              </label>
              <input
                type="tel"
                name="phoneNumber"
                value={form.phoneNumber}
                onChange={handleChange}
                className="border-2 border-gray-500 rounded p-2 w-full"
              />
            </div>

            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Email<span className="text-red-500">*</span>:
              </label>
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                className="border-2 border-gray-500 rounded p-2 w-full"
                required
              />
            </div>

            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Title<span className="text-red-500">*</span>:
              </label>
              <input
                type="text"
                name="title"
                value={form.title}
                onChange={handleChange}
                className="border-2 border-gray-500 rounded p-2 w-full"
                required
              />
            </div>

            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Feedback<span className="text-red-500">*</span>:
              </label>
              <textarea
                name="feedback"
                value={form.feedback}
                onChange={handleChange}
                className="h-32 border-2 border-gray-500 rounded p-1 w-full"
                required
              />
            </div>

            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Satisfaction level<span className="text-red-500">*</span>:
              </label>
              <select
                name="satisfaction"
                value={form.satisfaction}
                onChange={handleChange}
                className="border-2 border-gray-500 rounded p-2 w-full"
                required
              >
                <option value="satisfied">Satisfied</option>
                <option value="neutral">Normal</option>
                <option value="dissatisfied">Unsatisfied</option>
              </select>
            </div>

            <button
              type="submit"
              className="w-full bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700"
            >
              Submit
            </button>
          </form>
        </div>
      </div>
      {isSubmitted && <SuccessNotification onClose={handleCloseNotification} />}
      <Footer />
    </div>
  );
};

export default FeedBack;