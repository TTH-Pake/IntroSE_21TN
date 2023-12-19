import NavBar from "../modules/Navbar";
import Namdua from "../../assets/5dua.jpg";
import Footer from "../modules/Footer";

const AboutUs = () => {
  return (
    <div className="home-wrapper h-screen overflow-y-auto">
      <NavBar />
      <div className="text-center italic text-lg mt-8 mx-24 mb-10">
        <p>
        We are group 9. This website was created for the first purpose of completing schoolwork. The second reason we chose to create a recipe sharing website is 
        because we have a passion for cooking and want to share it with many people. Hope everyone will find their favorite recipes on this website. Thank you everyone for visiting.
        </p>
      </div>
      <div
        className="w-full h-50 mx-0 bg-no-repeat bg-center"
        style={{
          backgroundImage: `url(${Namdua})`,
        }}
      ></div>

      <h1 className="text-center text-2xl font-bold italic text-black mt-4">
      Group members
      </h1>

      <div className="container mt-5">
        <div className="row text-center">
          <div className="col-md-4 font-semibold mb-10">
            <div className="member-card flex flex-col items-center">
              <img
                src={Namdua}
                alt="Member 1"
                className="w-100 h-100 rounded-full transform transition-transform hover:scale-105"
              />
              <p className="mt-4">Tô Tấn Hiệp</p>
            </div>
          </div>
          <div className="col-md-4 font-semibold mb-10">
            <div className="member-card flex flex-col items-center">
              <img
                src={Namdua}
                alt="Member 2"
                className="w-100 h-100 rounded-full transform transition-transform hover:scale-105"
              />
              <p className="mt-4">Nguyễn Minh Nhật</p>
            </div>
          </div>
          <div className="col-md-4 font-semibold mb-10">
            <div className="member-card flex flex-col items-center">
              <img
                src={Namdua}
                alt="Member 3"
                className="w-100 h-100 rounded-full transform transition-transform hover:scale-105"
              />
              <p className="mt-4">Nguyễn Duy Khang</p>
            </div>
          </div>
          <div className="flex justify-center space-x-6">
            <div className="col-md-4 font-semibold mb-20">
              <div className="member-card flex flex-col items-center">
                <img
                  src={Namdua}
                  alt="Member 4"
                  className="w-100 h-100 rounded-full transform transition-transform hover:scale-105"
                />
                <p className="mt-4">Nguyễn Ngọc Thiên Ân</p>
              </div>
            </div>
            <div className="col-md-4 font-semibold mb-20">
              <div className="member-card flex flex-col items-center">
                <img
                  src={Namdua}
                  alt="Member 5"
                  className="w-100 h-100 rounded-full transform transition-transform hover:scale-105"
                />
                <p className="mt-4">Nguyễn Tuấn Phong</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default AboutUs;
