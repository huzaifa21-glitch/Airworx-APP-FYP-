import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import CustomCard from "../components/Card";
import Earthquake from "../assets/earthquake.jpg";
import Flood from "../assets/flood.jpg";
import Fire from "../assets/fire.jpg";
import Survive from "../assets/survivors.jpeg";
export const Home = () => {
  const [showCard, setShowCard] = useState(false);
  const [name, setName] = useState("");
  const [showProfile, setShowProfile] = useState(false);
  const [showLogout, setShowLogout] = useState(false);

  const navigate = useNavigate();

  const earthQuakeCard = () => {
    navigate("/earthquake");
  };
  const floodCard = () => {
    navigate("/flood");
  };
  const fireCard = () => {
    navigate("/fire");
  };
  const survivorsCard = () => {
    navigate("/survivors");
  }

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("email");
    navigate("/");
  }

  const toogleCard = () => {
    setShowCard(true);
  };
  useEffect(() => {
    const email = localStorage.getItem("email");
    const arr = email.split("@");
    setName(arr[0]);
  }, []);

  useEffect(() => {
    if (showCard) {
      setTimeout(() => {
        // Scroll to the bottom of the page smoothly
        window.scrollTo({
          top: document.body.scrollHeight,
          behavior: "smooth",
        });
      }, 500);
    }
  }, [showCard]);

  return (
    <>
      <div className="relative h-screen overflow-hidden">
        {/* Video Background */}
        <video
          className="absolute top-0 left-0 object-cover h-full w-full z-0"
          autoPlay
          loop
          muted
        >
          <source src={require("../background.mp4")} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        <div
          className="absolute top-4 right-4 pr-4 bg-black/50 cursor-pointer text-white text-lg font-semibold"
          style={{ zIndex: 30 }}
          onClick={() => {
            setShowProfile(!showProfile);
            setShowLogout(!showLogout);
          }}
        >
          <span className="flex items-center flex-row gap-1">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            width="20"
            height="20"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M19 9l-7 7-7-7"
            />
          </svg>
          Welcome {name}
          </span>
         
          {showProfile && (
            <div className="flex flex-col absolute top-8 right-0 bg-gray-800 p-2 rounded-md">
              {/* <button
                className="text-white"
                onClick={() => {
                  // Handle profile option click
                }}
              >
                Profile
              </button> */}
              <button
                className="text-white"
                onClick={() => {
                  logout();
                }}
              >
                Logout
              </button>
            </div>
          )}
        </div>

        <div className="absolute top-0 left-0 h-full w-full bg-black opacity-80 z-10"></div>

        <div className="flex justify-center items-center h-screen gap-4 flex-col text-white relative z-20">
          <span className="text-9xl font-extrabold">AIRWORKX</span>
          <span className="mt-4 text-3xl h-12 font-medium animate-typing overflow-hidden whitespace-nowrap border-r-white text-white">
            Let's give you the complete information about every disaster
          </span>
          <button
            className="bg-gray-800 text-[20px] w-[180px] h-[50px] rounded-lg text-white font-medium"
            onClick={toogleCard}
          >
            Get Started
          </button>
        </div>
      </div>
      {showCard && (
        <div className="bg-black flex flex-col gap-5 items-center justify-center h-screen overflow-hidden">
          <span className="mt-4 text-3xl h-12 font-medium  text-white">
            Choose the disaster for Uploading the video
          </span>
          <div className="flex flex-row flex-wrap gap-16 ">
            <CustomCard
              image={Earthquake}
              title="Earthquake"
              description="An earthquake is the shaking of the surface of the Earth resulting from a sudden release of energy in the Earth's lithosphere that creates seismic waves."
              onClickFunction={earthQuakeCard}
            />
            <CustomCard
              image={Flood}
              title="Flood"
              description="A flood is an overflow of water that submerges land that is usually dry. In the sense of 'flowing water', the word may also be applied to the inflow of the tide."
              onClickFunction={floodCard}
            />
            <CustomCard
              image={Fire}
              title="Fire"
              description="Fire is the rapid oxidation of a material in the exothermic chemical process of combustion, releasing heat, light, and various reaction products."
              onClickFunction={fireCard}
            />
            <CustomCard
              image={Survive}
              title="Survivors"
              description="Survivors are people who have survived a disaster or other traumatic event. In the context of human evolution, certain populations have developed increased ability to survive in particular environments."
              onClickFunction={survivorsCard}
            />
          </div>
        </div>
      )}
    </>
  );
};
