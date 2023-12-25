import React, { useState } from 'react';
import NavBar from "../modules/Navbar";
import Footer from "../modules/Footer";
import FeedbackIcon from "../../assets/feedback.png";
const FeedBack = () => {
    const [form, setForm] = useState({
        name: '',
        email: '',
        feedback: '',
        satisfaction: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm({ ...form, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(form);
    };

    return (
        <div className="home-wrapper h-screen overflow-y-auto">
            <NavBar />

            <div className="feedback-page flex mt-16 ml-32 mr-32 space-x-10">

                <div className="w-2/5 flex flex-col items-center justify-center font-bold">
                    <h1 className="text-5xl text-left text-blue-400">Feel free to drop us your feedback</h1>
                    <img src={FeedbackIcon} alt="" className="w-3/4 h-3/4 mt-10" />
                </div>

                <div className="w-3/5">
                    <form onSubmit={handleSubmit}>
                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2">
                                Your full name:
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
                                Email:
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
                                Feedback:
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
                                Satisfaction level:
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
            <Footer />
        </div>
    );
};

export default FeedBack;
