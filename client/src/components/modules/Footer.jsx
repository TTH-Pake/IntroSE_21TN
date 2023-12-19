import fbIcon from "/src/assets/facebook.png";
import instaIcon from "/src/assets/instagram.png";
import twIcon from "/src/assets/twitter.png";
import logo from "/src/assets/logo-recipe.png"; // Đường dẫn đến logo của bạn

const Footer = () => {
    return (
        <footer className="bg-white p-2 border-t mt-5 text-gray-600">
            <div className="container mt-3">
                <div className="flex justify-center flex-wrap">

                    <div className="sm:w-1/3 mb-2 flex flex-col justify-center items-center sm:items-start">
                        <img src={logo} alt="LookCook Logo" className="h-20 rounded-full mx-auto" />
                        <p className="text-sm text-center mx-auto mt-3">Explore the art of cooking with LoveCook, a platform dedicated to sharing delightful recipes. Join us in creating mouthwatering dishes together!</p>
                    </div>

                    <div className="sm:w-1/6 ml-20 mb-7 sm:mb-0">
                        <h5 className="text-lg font-bold mb-4">Company</h5>
                        <ul className="text-sm">
                            <li className="mb-2"><a href="/home">Home</a></li>
                            <li className="mb-2"><a href="/about-us">About us</a></li>
                            <li><a href="/activity">Activity</a></li>
                        </ul>
                    </div>

                    <div className="sm:w-1/6 mb-7 sm:mb-0">
                        <h5 className="text-lg font-bold mb-4">Source</h5>
                        <ul className="text-sm">
                            <li className="mb-2"><a href="/blog">Blog</a></li>
                            <li className="mb-2"><a href="/use-cases">Use Cases</a></li>
                            <li><a href="/insights">Insights</a></li>
                        </ul>
                    </div>

                    <div className="sm:w-1/4 flex flex-col items-start">
                        <img src={logo} alt="LookCook Logo" className="h-16 mb-3 rounded-full" />
                        <div className="flex flex-col mb-3">
                            <h5 className="text-sm">Receive updates on the latest recipes</h5>
                            <h5 className="text-sm">Enter your email here.</h5>
                        </div>
                        <div className="flex w-full sm:max-w-xs border rounded overflow-hidden">
                            <input type="email" className="p-2 text-sm text-gray-700 flex-grow" placeholder="Your email" />
                            <button className="bg-green-500 text-white px-4">Send</button>
                        </div>
                    </div>
                </div>
                <div className="flex justify-center pt-2 mt-3 border-t">
                    <a href="https://www.facebook.com" className="text-gray-600" target="_blank" rel="noopener noreferrer">
                        <img src={fbIcon} alt="Facebook" className="h-6 w-6" />
                    </a>
                    <a href="https://www.instagram.com" className="text-gray-600 mx-4" target="_blank" rel="noopener noreferrer">
                        <img src={instaIcon} alt="Instagram" className="h-6 w-6" />
                    </a>
                    <a href="https://www.twitter.com" className="text-gray-600" target="_blank" rel="noopener noreferrer">
                        <img src={twIcon} alt="Twitter" className="h-6 w-6" />
                    </a>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
