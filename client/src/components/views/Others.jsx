import { useNavigate } from "react-router-dom";
import NavBar from "../modules/Navbar";
import Footer from "../modules/Footer";

const Others = () => {
  const navigate = useNavigate();

  const handleNavigate = (path) => {
    navigate(path);
  };

  return (
    <div className="flex flex-col h-screen">
      <NavBar />
      <div className="flex-grow flex items-center justify-center bg-white">
        <div className="text-center font-semibold flex flex-col gap-4">
          <button
            className="bg-yellow-300 hover:bg-yellow-400 text-black py-3 px-48 rounded-full"
            // onClick={() => handleNavigate('/register-vip')}
          >
            Đăng kí VIP
          </button>
          <button
            className="bg-yellow-300 hover:bg-yellow-400 text-black py-3 px-48 rounded-full"
            // onClick={() => handleNavigate('/change-password')}
          >
            Đổi mật khẩu
          </button>
          <button
            className="bg-yellow-300 hover:bg-yellow-400 text-black py-3 px-48 rounded-full"
            onClick={() => handleNavigate("/about-us")}
          >
            About us
          </button>
          <button
            className="bg-yellow-300 hover:bg-yellow-400 text-black py-3 px-48 rounded-full"
            // onClick={() => handleNavigate('/feedback')}
          >
            Góp ý
          </button>
        </div>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Others;
