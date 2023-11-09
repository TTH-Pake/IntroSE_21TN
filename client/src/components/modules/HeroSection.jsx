// import Slider from 'react-slick';
// import "slick-carousel/slick/slick.css";
// import "slick-carousel/slick/slick-theme.css";
// import slide_1 from "/src/assets/slide_1.png";
// import slide_2 from "/src/assets/slide_2.png";
// import slide_3 from "/src/assets/slide_3.png";


// const slides = [
//     { imageUrl: slide_1 },
//     { imageUrl: slide_2 },
//     { imageUrl: slide_3 },
// ];

// const HeroSection = () => {
//     // Slider settings
//     const settings = {
//         arrows: false,
//         infinite: true,
//         speed: 1000,
//         slidesToShow: 1,
//         slidesToScroll: 1,
//         autoplay: true,
//     };

//     return (
//         <div className="flex flex-row items-center bg-gray-200 ">
//             <div className="w-1/2 p-10">
//                 <h1 className="text-5xl font-bold mb-5 hover:text-blue-400 hover:text-shadow transition duration-300 ease-in-out transform hover:scale-105 hover:italic cursor-pointer" style={{ textShadow: '2px 2px 2px rgba(0, 0, 0, 0.25)' }}>
//                     TÌM KIẾM HƯƠNG VỊ MỚI MỖI NGÀY
//                 </h1>
//                 <p className="mb-6">Hãy bắt đầu hành trình ẩm thực đầy màu sắc với những công thức nấu ăn được chế biến tỉ mỉ. Ngay từ gian bếp của bạn, khám phá thế giới hương vị đa dạng sẽ nâng tầm trải nghiệm nấu ăn tại nhà.</p> {/* More margin-bottom */}
//                 <button className="bg-red-600 text-white py-3 px-6 rounded-full mr-3">Tìm Kiếm Món Ngon Mỗi Ngày</button>
//                 <button className="bg-transparent text-red-600 py-3 px-6 rounded-full border">Tham Gia Học Nấu Ăn</button>
//             </div>
//             <div className="w-1/2 h-auto">
//                 <Slider {...settings}>
//                     {slides.map((slide, index) => (
//                         <div key={index} className="h-auto overflow-hidden">
//                             <img src={slide.imageUrl} alt={`Slide ${index}`} className="w-full object-cover rounded-lg mt-1" style={{ height: '500px' }} />
//                         </div>
//                     ))}
//                 </Slider>
//             </div>
//         </div>
//     );
// };

// export default HeroSection;

// Assuming you have imported the images somewhere in your project

import slide_1 from "/src/assets/slide_1.png";
import slide_2 from "/src/assets/slide_2.png";
import slide_3 from "/src/assets/slide_3.png";



const HeroSection = () => {

    return (
        <div className="flex flex-row items-center justify-center bg-green-300 ">

            <div className="w-1/2 relative bg-yellow-300 text-center py-24 h-96">
                <h1 className="text-6xl font-bold text-orange-600 hover:scale-110 transition transform duration-300 ease-in-out mb-4">
                    Đổi gió bữa sáng
                </h1>
                <p className="text-3xl font-semibold mb-10">NẤU NƯỚNG DỄ DÀNG</p>
                <button className="bg-red-600 text-white py-2.5 px-4 rounded-full mr-3">Tìm Kiếm Món Ngon Mỗi Ngày</button>
                <button className="bg-transparent text-red-600 py-2.5 px-6 rounded-full">Cộng đồng nấu ăn</button>
            </div>
            <div className="w-1/2 flex justify-center space-x-4 mt-6">
                <div className="w-1/4 hover:scale-110 transition transform duration-300 ease-in-out">
                    <img src={slide_1} alt="Dish 1" className="rounded-lg" />
                </div>
                <div className="w-1/4 hover:scale-110 transition transform duration-300 ease-in-out">
                    <img src={slide_2} alt="Dish 2" className="rounded-lg" />
                </div>
                <div className="w-1/4 hover:scale-110 transition transform duration-300 ease-in-out">
                    <img src={slide_3} alt="Dish 3" className="rounded-lg" />
                </div>
            </div>

        </div>

    );
};

export default HeroSection;

