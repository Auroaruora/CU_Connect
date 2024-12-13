import React from "react";
import { useNavigate } from "react-router-dom";
import columbiaLion from "./assets/columbia-lion.png";

const WelcomePage = () => {
  const navigate = useNavigate();
  return (
    <div
      className="min-h-screen flex flex-col px-8 font-['Outfit'] pb-8"
      style={{
        background:
          "linear-gradient(135deg, #75B2DD 0%, #9CC7E5 50%, #EFF6FB 100%)",
      }}
    >
      {/* Spacer */}
      <div className="flex-1" />

      {/* Main Content Card */}
      <div className="max-w-2xl w-full mx-auto">
        <div className="bg-white/90 backdrop-blur-sm p-6 rounded-3xl shadow-lg">
          <h1 className="text-[#002B7F] text-4xl font-bold text-center mb-3 tracking-tight">
            Welcome to Campus Connect!
          </h1>
          <p className="text-gray-700 text-xl text-center font-medium mb-3">
            Discover Columbia University, one club at a time! ✨
          </p>

          {/* Dividing Line */}
          <div className="w-full h-[1px] bg-gray-200 my-3"></div>

          <div className="mb-4">
            <div className="bg-[#F8FAFC] py-2 px-4 rounded-xl mb-2">
              <p className="text-gray-700 text-center">
                💖 Tap the heart to save clubs to your Favorites and build your
                personalized list of communities, accessible at any time!
              </p>
            </div>

            <div className="bg-[#F8FAFC] py-2 px-4 rounded-xl">
              <p className="text-gray-700 text-center">
                ✖️ Tap the X to skip clubs that don't interest you.
              </p>
            </div>
          </div>

          {/* Lion Logo */}
          <div className="flex justify-center">
            <img
              src={columbiaLion}
              alt="Columbia University Lion Logo"
              className="w-16 h-16 object-contain"
            />
          </div>
        </div>
      </div>

      {/* Flex spacer */}
      <div className="flex-1" />

      {/* Buttons */}
      <div className="max-w-2xl w-full mx-auto grid grid-cols-2 gap-4 mb-4">
        <button
          className="w-full bg-[#002B7F] text-white py-3 rounded-xl shadow-md hover:bg-[#001D5F] transform hover:-translate-y-1 hover:shadow-lg transition-all duration-300 font-semibold"
          onClick={() => navigate("/quiz")}
        >
          Take Quiz
        </button>
        <button
          className="w-full bg-white text-[#002B7F] py-3 rounded-xl shadow-md border border-[#002B7F] hover:bg-gray-50 transform hover:-translate-y-1 hover:shadow-lg transition-all duration-300 font-semibold"
          onClick={() => navigate("/home")}
        >
          Skip Quiz
        </button>
      </div>

      {/* Description */}
      <div className="max-w-2xl w-full mx-auto">
        <p className="text-center text-gray-400 bg-white/80 backdrop-blur-sm p-3 rounded-xl shadow-sm text-sm font-light">
          Take this optional quiz if you want your gender and/or race taken into
          consideration when finding clubs. If not, click skip quiz to see all
          clubs, regardless of identity.
        </p>
      </div>

      {/* Spacer */}
      <div className="flex-1" />
    </div>
  );
};

export default WelcomePage;