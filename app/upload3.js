import React, { useState, useEffect } from "react";
import {
  View,
  StyleSheet,
  Image,
  TouchableOpacity,
  Text,
  Pressable,
  ScrollView,
  ActivityIndicator,
  ImageBackground,
  Modal,
} from "react-native";
import { Button, IconButton } from "react-native-paper";
import * as ImagePicker from "expo-image-picker";
import { BarChart } from "react-native-gifted-charts";
import { Ionicons } from "@expo/vector-icons";
import { Cloudinary } from "@cloudinary/url-gen";
import axios from "axios";
import Toast from "react-native-simple-toast";
import { router } from "expo-router";
import { useLocalSearchParams } from "expo-router";
import { Picker } from "@react-native-picker/picker";
import AsyncStorage from "@react-native-async-storage/async-storage";
import PieChart from "react-native-pie-chart";
import { ResizeMode } from "expo-av";
import VideoPlayer from "expo-video-player";
var floodDamage;
var totalcost
const EarthUpload = () => {
  const { type, email } = useLocalSearchParams();
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    if (type) {
      // Post updated, do something with `post`
      // For example, send the post to the server
      console.log(email);
      console.log(type);
      setIsLoading(false);
    }
  }, [type]);


  earthImgurl = "get_earth_image";
  earthVidurl = "get_earth_video";
  const cld = new Cloudinary({ cloud: { cloudName: "dqjhbicmx" } });
  const [pic, setPic] = useState(null);
  const [galleryPermission, setGalleryPermission] = useState("");
  const [videoUri, setVideoUri] = useState(null);
  const [selectedValue, setSelectedValue] = useState("");
  const [img, setImg] = useState(1);

  const [earthData, setEarthData] = useState([]);


  const [EarthshowBarChart, setEarthShowBarChart] = useState(true);
  const toggleEarthChart = () => {
    setEarthShowBarChart(!EarthshowBarChart);
  };

  const requestPermissions = async () => {
    try {
      const { status } =
        await ImagePicker.requestMediaLibraryPermissionsAsync();
      // console.log("status lib", status);
      setGalleryPermission("granted");
    } catch (error) {
      console.log("error", error);
    }
    try {
      const { status } = await ImagePicker.requestCameraPermissionsAsync();
    } catch (error) {
      console.log("error", error);
    }
  };

  useEffect(() => {
    requestPermissions();
  }, []);
  
  const generateResults = () => {
    console.log(img);
    if (selectedValue) {
      setIsLoading(true);
      if (type == "Earthquake") {
        if (selectedValue && pic && img == 1) {
          const formData = new FormData();
          formData.append("image", {
            uri: pic,
            type: "image/jpeg", // Change the type based on your image format
            name: "photo.jpg", // Change the name based on your requirements
          });

          const apiUrl = `http://192.168.104.24:5000/earthquake/image?email=${email}&city=${selectedValue}`;

          fetch(apiUrl, {
            method: "POST",
            headers: {
              "Content-Type": "multipart/form-data",
            },
            body: formData,
          })
            .then((response) => {
              if (!response.ok) {
                throw new Error("Network response was not ok");
              }
              return response.json(); // Assuming the response is in JSON format
            })
            .then((data) => {
              setEarthData([data]);
              setTimeout(() => {
                console.log(earthData);
                setIsLoading(false);
              }, 2000);
              // Handle the data as needed
            })
            .catch((error) => {
              setIsLoading(false);
              console.error(
                "There was a problem with the fetch operation:",
                error
              );
              // Handle errors
            });
        }
        if (selectedValue && pic && img == 2) {
          const formData = new FormData();
          formData.append("video", {
            uri: pic,
            type: "video/mp4", // Change the type based on your image format
            name: "video.mp4", // Change the name based on your requirements
          });

          const apiUrl = `http://192.168.104.24:5000/earthquake/video?email=${email}&city=${selectedValue}`;

          fetch(apiUrl, {
            method: "POST",
            headers: {
              "Content-Type": "multipart/form-data",
            },
            body: formData,
          })
            .then((response) => {
              if (!response.ok) {
                throw new Error("Network response was not ok");
              }
              return response.json(); // Assuming the response is in JSON format
            })
            .then((data) => {
              setEarthData([data]);
              setTimeout(() => {
                // console.log(floodDamage);
                setIsLoading(false);
              }, 2000);
              // Handle the data as needed
            })
            .catch((error) => {
              setIsLoading(false);
              console.error(
                "There was a problem with the fetch operation:",
                error
              );
              // Handle errors
            });
        }
      }

     
    } else {
      Toast.show("Select a city first!", Toast.LONG);
    }
  };
 

  const [earthbarData, setEarthbarData] = useState([
    { value: 0, label: "AH" },
    { value: 0, label: "AP", frontColor: "#177AD5" },
    { value: 0, label: "DC", frontColor: "#177AD5" },
  ]);

  const [Earthseries, setEarthSeries] = useState([1, 1, 1]);

  useEffect(() => {
    if (earthData.length > 0) {
      const totalDamage = earthData[0].TotalDamageCost;
      const totalHouses = earthData[0].DestroyedBuildings;
      const peopleAffected = earthData[0].PeopleAffected;

      if (totalDamage && peopleAffected) {
        const stringWithoutSpaceAndDollar = totalDamage.replace(/[^\d.-]/g, "");
        const floodDamage = parseFloat(stringWithoutSpaceAndDollar);
        const formattedDamageCost = new Intl.NumberFormat('en-US', {
          style: 'currency',
          currency: 'USD',
          minimumFractionDigits: 0,
          maximumFractionDigits: 2,
        }).format(floodDamage);
        
        // console.log(formattedDa?mageCost); // Output: $48,730
        totalcost=formattedDamageCost.replace(/[^\d.-]/g, "");
        console.log(totalcost);
        totalcost=(totalcost)/peopleAffected
        totalcost=Math.round(totalcost);

       
        const newFloodBarData = [
          // { value: totalHouses, label: "AB" },
          { value: peopleAffected, label: "AP", frontColor: "#177AD5" },
          { value: totalcost, label: "DC", frontColor: "#177AD5" },
        ];
        // const newFloodSeries = [ totalHouses,peopleAffected, totalcost];
        const newFloodSeries = [ peopleAffected, totalcost];

        setEarthbarData(newFloodBarData);
        setEarthSeries(newFloodSeries);
      }
    }
  }, [earthData]);

  const widthAndHeight = 250;
  // const sliceColor = ["#fbd203", "#018749", "#ff3c00"];
  const sliceColor = [ "#018749", "#ff3c00"];
  const buttonColor = pic ? "#177AD5" : "#94b4fc";

  const selectMedia = async () => {
    if (galleryPermission == "granted") {
      let data = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [1, 1],
        quality: 0.5,
      });
      if (!data.canceled) {
        let newfile = {
          uri: data.uri,
          type: `test/${data.uri.split(".")[1]}`,
          name: `test.${data.uri.split(".")[1]}`,
        };
        uploadMedia(newfile);
        setPic(newfile.uri);
        setImg(1);
        // console.log(newfile);
      }
    }
  };

  const uploadMedia = (image1) => {
    // console.log(image1);
    const data = new FormData();
    data.append("file", image1);
    data.append("upload_preset", "pics_vids");
    data.append("cloud_name", "dqjhbicmx");

    fetch("https://api.cloudinary.com/v1_1/dqjhbicmx/image/upload", {
      method: "post",
      body: data,
    })
      .then((res) => res.json())
      .then((data) => {
        const secureurl = data.url.replace(/^http:/, "https:");
        // console.log(secureurl);
        // setPic(secureurl);
      })
      .catch((err) => {
        console.log("error while uploading " + err);
      });
  };

  const selectVideo = async () => {
    if (galleryPermission == "granted") {
      let video = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Videos,
        allowsEditing: true,
        quality: 1,
      });
      if (!video.canceled) {
        const formData = new FormData();
        formData.append("file", {
          uri: video.uri,
          name: "video",
          type: "video/mp4",
        });
        setPic(video.uri);
        setImg(2);
      }
    }
  };
  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Pressable
          onPress={() => {
            router.push("/tabs");
          }}
        >
          <Ionicons name="arrow-back-outline" size={26} color={"#333"} />
        </Pressable>
        <Text style={styles.headerText}>{type} Scan</Text>
        <Ionicons name={"log-out-outline"} size={26} color={"#f5f5f5"} />
      </View>
      <ScrollView style={{ flex: 1 }}>
        <View
          style={{
            justifyContent: "space-between",
            alignItems: "center",
            flexDirection: "row",
            marginVertical: 20,
          }}
        >
          <TouchableOpacity
            style={{
              backgroundColor: "#95aefe",
              width: "40%",
              borderRadius: 10,
              alignItems: "center",
              justifyContent: "center",
              marginHorizontal: 15,
              padding: 10,
            }}
            onPress={selectMedia}
          >
            <Image
              style={{ width: "60%", height: 100, marginTop: 20 }}
              source={require("./assets/image.png")}
            ></Image>
            <Text
              style={{
                marginVertical: 20,
                fontSize: 18,
                fontWeight: "800",
                color: "#FFF",
                letterSpacing: 0.5,
              }}
            >
              Scan Image
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={{
              backgroundColor: "#fc9c9c",
              width: "40%",
              borderRadius: 10,
              alignItems: "center",
              justifyContent: "center",
              marginHorizontal: 15,
              padding: 10,
            }}
            onPress={selectVideo}
          >
            <Image
              style={{ width: "65%", height: 100, marginTop: 20 }}
              source={require("./assets/video.png")}
            ></Image>
            <Text
              style={{
                marginVertical: 20,
                fontSize: 18,
                fontWeight: "800",
                color: "#FFF",
                letterSpacing: 0.5,
              }}
            >
              Scan Video
            </Text>
          </TouchableOpacity>
        </View>
        <View
          style={{
            alignItems: "center",
            justifyContent: "center",
            marginVertical: 10,
          }}
        >
          <View style={styles.picker}>
            <Picker
              selectedValue={selectedValue}
              onValueChange={(itemValue) => setSelectedValue(itemValue)}
            >
             <Picker.Item label="Select a city" value="" />
              <Picker.Item label="Karachi" value="Karachi" />
              <Picker.Item label="Lahore" value="Lahore" />
              <Picker.Item label="Faisalabad" value="Faisalabad" />
              <Picker.Item label="Rawalpindi" value="Rawalpindi" />
              <Picker.Item label="Islamabad" value="Islamabad" />
              <Picker.Item label="Gujranwala" value="Gujranwala" />
              <Picker.Item label="Peshawar" value="Peshawar" />
              <Picker.Item label="Multan" value="Multan" />
              <Picker.Item label="Gaza" value="Gaza" />
            </Picker>
          </View>

          <TouchableOpacity
            mode="contained"
            onPress={generateResults}
            disabled={!pic}
            style={[styles.uploadButton, { backgroundColor: buttonColor }]}
          >
            <Text style={{ fontSize: 20, fontWeight: "bold", color: "#FFF" }}>
              Generate Results
            </Text>
          </TouchableOpacity>
        </View>
        {/* Earthquake Results */}
        <View>
          {earthData.length > 0 ? (
            <View style={styles.reportContainer}>
              {img === 1 ? (
                <Image
                source={{ uri: `http://192.168.104.24:5000/${earthImgurl}?${Math.random()}` }}
                  style={{
                    height: 250,
                    width: "100%",
                    marginBottom: 20,
                    borderRadius: 20,
                  }}
                />
              ) : img === 2 ? (
                <VideoPlayer
                  videoProps={{
                    shouldPlay: true,
                    playbackCallback: true,
                    resizeMode: ResizeMode.CONTAIN,
                    // ❗ source is required https://docs.expo.io/versions/latest/sdk/video/#props
                    source: {
                      uri: `http://192.168.104.24:5000/${earthVidurl}?${Math.random()}`
                    },
                  }}
                  style={{ height: 400 }}
                />
              ) : null}

              {earthData.map((item, index) => (
                <View key={index}>
                  <View style={styles.row}>
                    <Text style={styles.label}>Affected Houses:</Text>
                    <Text style={styles.value}>{item.DestroyedBuildings}</Text>
                  </View>

                  <View style={styles.row}>
                    <Text style={styles.label}>Affected People:</Text>
                    <Text style={styles.value}>{item.PeopleAffected}</Text>
                  </View>

                  <View style={styles.row}>
                    <Text style={styles.label}>Damage Cost:</Text>
                    <Text style={styles.value}>{item.TotalDamageCost}</Text>
                  </View>

                  <View style={styles.row}>
                    <Text style={styles.label}>City:</Text>
                    <Text style={styles.value}>{item.Location}</Text>
                  </View>

                  <View style={styles.row}>
                    <Text style={styles.label}>Scan Date:</Text>
                    <Text style={styles.value}>{item.CreationTime}</Text>
                  </View>
                </View>
              ))}
              <View style={styles.chartContainer}>
                {EarthshowBarChart ? (
                  <View style={styles.chartContainer1}>
                    <View style={styles.chartContent1}>
                      {/* <Text style={styles.value1}>AB - Affected Buildings</Text> */}
                      <Text style={styles.value1}>AP - Affected People</Text>
                      <Text style={styles.value1}>DC - Damage Cost Per Person</Text>
                      <BarChart
                        barWidth={22}
                        noOfSections={3}
                        barBorderRadius={4}
                        frontColor="lightgray"
                        data={earthbarData}
                        yAxisThickness={0}
                        xAxisThickness={0}
                      />
                    </View>
                  </View>
                ) : (
                  <View style={styles.chartContainer1}>
                    <View style={styles.chartContent}>
                      {/* <Text style={styles.value1}> Yellow - Affected Buildings </Text> */}
                      <Text style={styles.value1}>Green - Affected People</Text>
                      <Text style={styles.value1}>Red - Damage Cost Per Person</Text>
                      <PieChart
                        widthAndHeight={widthAndHeight}
                        series={Earthseries}
                        sliceColor={sliceColor}
                        coverRadius={0.45}
                        coverFill="#FFF"
                      />
                    </View>
                  </View>
                )}
                <TouchableOpacity
                  style={{
                    width: "100%",
                  }}
                  onPress={toggleEarthChart}
                >
                  <View
                    style={{ alignItems: "center", justifyContent: "center" }}
                  >
                    <View style={styles.buttonContainer}>
                      <Ionicons
                        name="swap-horizontal-outline"
                        size={26}
                        color={"#fff"}
                      ></Ionicons>
                    </View>
                  </View>
                </TouchableOpacity>
              </View>
            </View>
          ) : (
            <View></View>
          )}
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    justifyContent: "flex-start",
    backgroundColor: "#f5f5f5",
  },
  label: {
    fontSize: 16,
    marginBottom: 5,
  },
  chartContainer1: {
    alignItems: "flex-start",
    justifyContent: "center", // Adjust as needed
    padding: 10,
    marginHorizontal: 30,
  },
  value1: {
    fontSize: 16,
    color: "#000",
    fontWeight: "bold",
    width: 400,
  },
  buttonContainer: {
    backgroundColor: "#177AD5",
    padding: 10,
    borderRadius: 5,
    margin: 10,
    alignItems: "center",
    width: "40%",
  },
  picker: {
    height: 50,
    width: "100%",
    backgroundColor: "#FFF",
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    marginVertical: 20,
  },

  selectedValue: {
    marginTop: 10,
    fontSize: 18,
    fontWeight: "bold",
  },
  header: {
    padding: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    // backgroundColor:'white'
  },
  headerText: {
    fontSize: 24,
    fontWeight: "bold",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 16,
    color: "#333",
  },
  previewContainer: {
    alignItems: "center",
    marginBottom: 16,
  },
  previewImage: {
    width: 200,
    height: 200,
    borderRadius: 10,
    marginBottom: 8,
  },
  previewText: {
    fontSize: 16,
    marginBottom: 8,
  },
  closeButton: {
    position: "absolute",
    top: 0,
    right: 0,
  },
  button: {
    marginVertical: 16,
    backgroundColor: "#1e81b0",
  },
  uploadButton: {
    width: "60%",
    height: 50,
    borderRadius: 20,
    backgroundColor: "#94b4fc",
    marginVertical: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  chartContainer: {
    marginVertical: 20,
    padding: 20,
    width: "100%",
    backgroundColor: "#FFF",
    borderRadius: 20,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  reportContainer: {
    backgroundColor: "#fff",
    padding: 16,
    borderRadius: 8,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    marginTop: 10,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 16,
  },
  label: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#555",
  },
  value: {
    fontSize: 16,
    color: "#333",
  },
});

export default EarthUpload;
