import { useState, useEffect } from "react";
import { handleResetPassword } from "../../action/accountAction";
import { useNavigate, useLocation } from "react-router-dom";
import Logo from "../../assets/logo-recipe.png";
import { message } from "antd";

export default function OTPConfirm() {
  const [otp, setOTP] = useState("");
  const [countdown, setCountdown] = useState(60);
  const [isCounting, setIsCounting] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const action = queryParams.get("action");

  const onSubmit = (e) => {
    e.preventDefault();
    const userData = {
      email: email,
      password: password,
      verifyPassword: verifyPassword,
    };

    if (otp === "") {
      message.error("Please enter OTP");
      return;
    }

    const user = {
      email: email,
      password: password,
      otp: otp,
    };

    if (handleResetPassword(user)) {
      navigate("/login");
    }
  };

  useEffect(() => {
    let countdownTimer;

    if (isCounting && countdown > 0) {
      countdownTimer = setInterval(() => {
        setCountdown((prev) => prev - 1);
      }, 1000);
    } else {
      setIsCounting(false);
    }

    return () => clearInterval(countdownTimer);
  }, [isCounting, countdown]);

  const handleResendOTP = () => {
    setCountdown(60);
    setIsCounting(true);
  };

  return (
    <div className="flex items-center justify-center h-full bg-green-400">
      <div className="login-container flex relative flex-col items-center justify-around w-[500px] h-auto bg-green-300 rounded-3xl p-4">
        <img
          className="w-24 h-24 rounded-full object-cover"
          src={Logo}
          alt="Logo"
        />

        <div className="login-form w-[350px] py-1">
          <form
            className="flex flex-col justify-around w-full"
            onSubmit={onSubmit}
          >
            {/* ... Existing code ... */}
            <div className="bg-green-300 text-black text-base text-center p-2 px-4 my-1 mx-auto w-[300px]">
              Chúng tôi đã gửi mã OTP gồm 4 chữ số đến email của bạn. Nếu chưa
              nhận được tin nhắn xin vui lòng nhấn
              <span className="font-bold"> gửi lại OTP</span>.
            </div>
            <input
              type="text"
              name="otp"
              onChange={(e) => {
                setOTP(e.target.value);
              }}
              className="border px-3 py-2 rounded-5 focus:outline-none focus:ring-2 focus:ring-cyan-300 w-[100%] bg-white text-center"
              placeholder="Enter OTP..."
            />

            <button
              type="submit"
              className="btn w-[50%] py-2 rounded-full mt-4 text-black text-base text-center cursor-pointer mx-auto bg-red-400 hover:bg-red-500 hover:font-semibold hover:shadow-lg transition duration-300"
            >
              Change Password
            </button>

            <div className="flex justify-center items-center mt-2">
              {countdown > 0 ? (
                <span className="text-sm text-gray-600">
                  Resend OTP in {countdown}s
                </span>
              ) : (
                <button
                  type="button"
                  className="text-blue-500 underline text-sm font-bold ml-2"
                  onClick={handleResendOTP}
                >
                  Resend OTP
                </button>
              )}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
