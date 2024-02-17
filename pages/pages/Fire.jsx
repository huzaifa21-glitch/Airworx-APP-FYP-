

import React, { useState, useEffect } from "react";
import fireBackground from "../assets/firebackground.jpg";
import axios from "axios";
import DisasterInfoCard from "../components/Table";
import { ThreeCircles } from "react-loader-spinner";
import History from "../components/History";

export const FireDisaster = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [isloadingImage, setIsLoadingImage] = useState(false);
  const [historyData, setHistoryData] = useState(null);
  const [city , setCity] = useState("Karachi");
  const [isloadingVideo, setIsLoadingVideo] = useState(false);
  const [fireData, setfireData] = useState(null);

  const handleImageChange = (event) => {
    setSelectedImage(event.target.files[0]);
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
        setIsLoadingImage(true);
      const formData = new FormData();
      formData.append("image", selectedImage);

      axios
        .post(`http://127.0.0.1:5000/fire/image?email=${localStorage.getItem('email')}&city=${city}`, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then((response) => {
          console.log("Image uploaded successfully", response.data);
            setIsLoadingImage(false);
          setfireData(response.data);
        })
        .catch((error) => {
          console.error("Error uploading image:", error);
        });
    }
  };

  const handleViewHistory = () => {
    axios
    .get(
      `http://127.0.0.1:5000/firedata?email=${localStorage.getItem(
        "email"
      )}&city=${city}`
    )
    .then((response) => {
      setHistoryData(response.data);
    })
    .catch((error) => {
      console.error("Error fetching history data:", error);
    });
  }
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
        .post(`http://127.0.0.1:5000/fire/video?email=${localStorage.getItem('email')}&city=${city}`, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then((response) => {
          console.log("Video uploaded successfully", response.data);
            setIsLoadingVideo(false);
          setfireData(response.data);
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
        src={fireBackground}
        alt="fire Background"
      />

      <div className="absolute top-0 left-0 h-full w-full bg-black opacity-80 z-10"></div>

      <div className="flex justify-center items-center h-screen gap-8 flex-col text-white relative z-20">
        <span className="text-6xl font-extrabold">
          AeroVision Fire Detection
        </span>
        <span className="mt-4 text-3xl h-12 font-medium animate-typing overflow-hidden whitespace-nowrap border-r-white text-white">
          Let's give you the complete information about Fire
        </span>
        {fireData ? (
          <div className="flex flex-wrap gap-5 overflow-auto items-center">
            <DisasterInfoCard data={fireData} selectedImage={selectedImage} selectedVideo={selectedVideo} 
            
            url={selectedImage!=null ? 'get_fire_image':'get_fire_video' }
            />

          </div>
        ) : historyData ? (
          <History data={historyData} />
        ) :
        
        (
          <div className="flex flex-col gap-5 items-center">
            <button className="bg-green-800 text-[30px] w-[250px] h-[100px] rounded-xl text-white font-medium" onClick={handleViewHistory} >View History</button>
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
                className="bg-gray-800 text-[30px] w-[250px] h-[100px] rounded-xl flex items-center justify-center text-white font-medium"
                onClick={() => document.getElementById("imageInput").click()}
              >
                {isloadingImage ? (
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
            <span className="mt-4 text-3xl h-12 font-medium  overflow-hidden whitespace-nowrap border-r-white text-white">
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
                onClick={() => document.getElementById("videoInput").click()}
              >
                {isloadingVideo ? (
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