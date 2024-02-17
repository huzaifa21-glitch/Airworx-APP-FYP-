

import React, { useState, useEffect } from "react";
import floodBackground from "../assets/floodbackground.jpg";
import axios from "axios";
import CardWithPieChart from "../components/Piecard";
import CardWithBarChart from "../components/Barcard";
import CardWithLineChart from "../components/Linecard";
import DisasterInfoCard from "../components/Table";
import { ThreeCircles } from "react-loader-spinner";
import History from "../components/History";

export const Flood = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [floodData, setFloodData] = useState(null);
  const [city , setCity] = useState("Karachi");
  const [historyData, setHistoryData] = useState(null);
  const [isLoadingVideo, setIsLoadingVideo] = useState(false);
  const [isLoadingImage, setIsLoadingImage] = useState(false);

  const handleImageChange = (event) => {
    setSelectedImage(event.target.files[0]);
    // console.log("FILE "+JSON.stringify(event.target.files[0]));
  };

  const handleVideoChange = (event) => {
    setSelectedVideo(event.target.files[0]);
  };

  useEffect(() => {
    if (selectedImage) {
      handleImageUpload();
    }
  }, [selectedImage]);

  useEffect(() => {
    if (selectedVideo) {
      handleVideoUpload();
    }
  }, [selectedVideo]);

  const handleImageUpload = () => {
    if (selectedImage) {
      const formData = new FormData();
      setIsLoadingImage(true);
      formData.append("image", selectedImage);

      axios
        .post(
          `http://127.0.0.1:5000/flood/image?email=${localStorage.getItem(
            "email"
          )}&city=${city}`,
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        )
        .then((response) => {
          console.log("Image uploaded successfully", response.data);
          setIsLoadingImage(false);
          setFloodData(response.data);
        })
        .catch((error) => {
          console.error("Error uploading image:", error);
        });
    }
  };

  const handleViewHistory = () => {
    // Fetch history data via Axios
    axios
      .get(
        `http://127.0.0.1:5000/flooddata?email=${localStorage.getItem(
          "email"
        )}&city=${city}`
      )
      .then((response) => {
        setHistoryData(response.data);
      })
      .catch((error) => {
        console.error("Error fetching history data:", error);
      });
  };

  const cityOptions = [
   
    'Lahore',
    'Faisalabad',
    'Rawalpindi',
    'Islamabad',
    'Gujranwala',
    'Peshawar',
    'Multan',
    'Gaza'
];

  const handleCityChange = (event) => {


    setCity(event.target.value);
  };


  const handleVideoUpload = () => {
    if (selectedVideo) {
      const formData = new FormData();
      setIsLoadingVideo(true);
      formData.append("video", selectedVideo);

      axios
        .post(
          `http://127.0.0.1:5000/flood/video?email=${localStorage.getItem(
            "email"
          )}&city=${city}`,
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        )
        .then((response) => {
          console.log("Video uploaded successfully", response.data);
          setIsLoadingVideo(false);
          setFloodData(response.data);
        })
        .catch((error) => {
          console.error("Error uploading video:", error);
        });
    }
  };

  return (
    <div className="relative h-screen overflow-hidden">
      <img
        className="absolute top-0 left-0 object-cover h-full w-full z-0"
        src={floodBackground}
        alt="flood Background"
      />

      <div className="absolute top-0 left-0 h-full w-full bg-black opacity-80 z-10"></div>

      <div className="flex justify-center items-center h-screen gap-8 flex-col text-white relative z-20">
        <span className="text-6xl font-extrabold">
          AeroVision flood Detection
        </span>
        <span className="mt-4 text-3xl h-20 font-medium animate-typing overflow-hidden whitespace-nowrap border-r-white text-white">
          Let's give you the complete information about Flood
        </span>
        {floodData ? (
          <div className="flex flex-wrap  bg-black/50 overflow-auto justify-center flex-row gap-5 items-center">
              <DisasterInfoCard
              data={floodData}
              selectedImage={selectedImage}
              selectedVideo={selectedVideo}
              url={selectedImage!=null ? 'get_flood_image':'get_flood_video' }
              className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4"
            />
            <div  className="flex flex-row gap-5 mb-32" >
            <CardWithPieChart
              data={floodData}
              className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4"
            />
            <CardWithBarChart
              data={floodData}
              className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4"
            />
            <CardWithLineChart
              data={floodData}
              className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4"
            />
            </div>
          
          </div>
        ) : historyData ? (
          <div className="flex flex-wrap mb-9  bg-black/50 overflow-auto justify-center flex-row gap-5 items-center">
          <History data={historyData} />
          </div>
        ) : (
          <div className="flex flex-col gap-5 items-center">
            <button
              className="bg-green-800 text-[30px] w-[250px] h-[100px] rounded-xl text-white font-medium"
              onClick={handleViewHistory}
            >
              View History
            </button>
            <select
      name="city"
      id="city"
      value={city}
      onChange={handleCityChange}
      className="bg-gray-800 text-white px-4 py-2 rounded-md outline-none focus:outline-none"
    >
      <option value="Karachi">Karachi</option>
      {cityOptions.map((option) => (
        <option key={option} value={option}>
          {option}
        </option>
      ))}
    </select>
        <div className="flex flex-row items-center justify-center" >
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              style={{ display: "none" }}
              id="imageInput"
            />
            <label htmlFor="imageInput">
              <button
                className="bg-gray-800 text-[30px] w-[250px] h-[100px] rounded-xl text-white font-medium"
                onClick={() =>
                  document.getElementById("imageInput").click()
                }
              >
                {isLoadingImage ? (
                  <ThreeCircles
                    height="50"
                    width="50"
                    color="#4fa94d"
                    wrapperStyle={{}}
                    wrapperClass=""
                    visible={true}
                    ariaLabel="three-circles-rotating"
                    outerCircleColor=""
                    innerCircleColor=""
                    middleCircleColor=""
                  />
                ) : (
                  "Upload Image"
                )}
              </button>
            </label>
            <span className="mt-4 text-3xl h-12 font-medium  overflow-hidden whitespace-nowrap border-r-white text-white flex items-center justify-center">
              OR
            </span>
            <input
              type="file"
              accept="video/*"
              onChange={handleVideoChange}
              style={{ display: "none" }}
              id="videoInput"
            />
            <label htmlFor="videoInput">
              <button
                className="bg-gray-800 text-[30px] w-[250px] h-[100px] rounded-xl text-white font-medium flex items-center justify-center"
                onClick={() =>
                  document.getElementById("videoInput").click()
                }
              >
                {isLoadingVideo ? (
                  <ThreeCircles
                    height="50"
                    width="50"
                    color="#4fa94d"
                    wrapperStyle={{}}
                    wrapperClass=""
                    visible={true}
                    ariaLabel="three-circles-rotating"
                    outerCircleColor=""
                    innerCircleColor=""
                    middleCircleColor=""
                  />
                ) : (
                  "Upload Video"
                )}
              </button>
            </label>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};