import React, { useState } from 'react';
import uploadIcon from "/src/assets/photo.png";
import emotionIcon from "/src/assets/happy.png";
import locationIcon from "/src/assets/location.png";
import { handleCreateBlog } from "../../action/blogAction";

const CreateBlog = ({ onCancel, currentUser, onSubmit }) => {
    const [content, setContent] = useState('');

    const handleSubmit = async () => {
        try {
            const content = document.getElementById('blogText').value;
            const result = await handleCreateBlog(content, currentUser.user_id);
            onSubmit(result);
        } catch (error) {
            console.error('Failed to create blog:', error.message);
        }
    };

    return (
        <div className="w-1/2 h-full mx-auto mb-3 bg-gray-100 rounded-lg shadow-md pb-2">
            <div className="flex justify-between items-center pt-2 pl-4 pr-4">
                <div className="flex items-center text-gray-600 text-sm">
                    <img
                        className="h-12 w-12 rounded-full object-cover border-2"
                        src="https://cdn.alongwalk.info/vn/wp-content/uploads/2022/10/31171151/300-hinh-nen-dien-thoai-cute-ngau-cuc-dep-duoc-tai-nhieu1667185911.jpg"
                        alt=""
                    />
                    <div className="ml-2 items-center">
                        <div className="flex flex-row space-x-2 items-center">
                            <h1 className="text-base font-semibold text-black">{currentUser.name}</h1>
                        </div>
                        <h1>TP Hồ Chí Minh, Việt Nam</h1>
                    </div>
                </div>
            </div>
            <div className="flex justify-between items-center pt-2 pl-4 pr-4">
                <textarea
                    className="flex w-full p-2 bg-gray-100 outline-none"
                    placeholder="What are you thinking?"
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    id="blogText"
                />

            </div>
            <div className="flex justify-between bg-blue-200 rounded-full items-center p-1.5 w-11/12 mx-auto">
                <div className="flex items-center text-gray-600 text-sm space-x-2">
                    <img
                        className="h-8 w-8 cursor-pointer ml-10"
                        src={uploadIcon} alt=""
                    />
                    <span className="flex-shrink-0 font-semibold">Upload photo</span>
                </div>
            </div>
            <div className="flex justify-between bg-blue-200 rounded-full items-center p-1.5 w-11/12 mx-auto mt-2">
                <div className="flex items-center text-gray-600 text-sm space-x-2">
                    <img
                        className="h-8 w-8 cursor-pointer ml-10"
                        src={emotionIcon} alt=""
                    />
                    <span className="flex-shrink-0 font-semibold">Add emotion</span>
                </div>
            </div>
            <div className="flex justify-between bg-blue-200 rounded-full items-center p-1.5 w-11/12 mx-auto mt-2">
                <div className="flex items-center text-gray-600 text-sm space-x-2">
                    <img
                        className="h-8 w-8 cursor-pointer ml-10"
                        src={locationIcon} alt=""
                    />
                    <span className="flex-shrink-0 font-semibold">Add your location</span>
                </div>
            </div>
            <div className="flex mx-auto w-4/12 items-center justify-center p-2 mt-2 space-x-2">
                <button className="bg-red-300 w-1/2 items-center justify-center rounded-full p-2" onClick={handleSubmit}>
                    Submit
                </button>
                <button className="bg-red-300 w-1/2 items-center justify-center rounded-full p-2"
                    onClick={onCancel}>
                    Cancel
                </button>
            </div>
        </div >
    );
}
export default CreateBlog;