import Slider from 'react-slick';
import { useState } from "react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const slides = [
    { imageUrl: "https://img.freepik.com/fotos-premium/vista-elevada-desayuno-saludable-sobre-fondo-blanco_23-2147907031.jpg?w=1380" },
    { imageUrl: "https://static.wixstatic.com/media/c38925_64f7ce3ae9e8450e9324841bcc2dda99~mv2.jpg/v1/fill/w_1900,h_626,al_c,q_85,usm_0.66_1.00_0.01,enc_auto/c38925_64f7ce3ae9e8450e9324841bcc2dda99~mv2.jpg" },
    { imageUrl: "https://assets.vogue.com/photos/5f0d17ab044e5271727d5f03/master/w_1920,c_limit/Omsom06.jpg" },
];

const HeroSection = () => {
    const [isHovered, setIsHovered] = useState(false);

    const settings = {
        arrows: false,
        infinite: true,
        speed: 900,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        pauseOnHover: false,
    };

    return (
        <div className="flex flex-row items-center justify-center align-middle bg-white">
            <div className="w-full h-500 relative">
                <Slider {...settings}>
                    {slides.map((slide, index) => (
                        <div
                            key={index}
                            className="h-full overflow-hidden relative group"
                            onMouseEnter={() => setIsHovered(true)}
                            onMouseLeave={() => setIsHovered(false)}
                        >
                            <img
                                src={slide.imageUrl}
                                alt={`Slide ${index}`}
                                className={`w-full object-cover rounded-lg transition-opacity duration-300 ${isHovered ? 'opacity-70' : 'opacity-100'}`}
                                style={{ height: '500px', filter: isHovered ? 'brightness(60%)' : 'brightness(100%)' }}
                            />
                            <div className="absolute inset-0 flex items-center justify-center">
                                {isHovered && (
                                    <>
                                        <h1 className="text-7xl font-bold text-orange-600 hover:scale-105 transition transform duration-300 ease-in-out mb-1 mr-10">
                                            LOVE COOKING
                                        </h1>
                                        <h2 className="text-4xl font-semibold hover:scale-105 transition transform duration-300 ease-in-out">
                                            LOVE YOU
                                        </h2>
                                    </>
                                )}
                            </div>
                        </div>
                    ))}
                </Slider>
            </div>
        </div>
    );
};

export default HeroSection;
