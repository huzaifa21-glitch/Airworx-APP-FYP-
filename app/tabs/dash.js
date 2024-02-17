import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  FlatList,
  Image,
  Dimensions,
  Pressable,
  ActivityIndicator,
  ScrollView,
} from "react-native";
import { ResizeMode } from "expo-av";
import VideoPlayer from "expo-video-player";
import { Ionicons } from "@expo/vector-icons";
import { VictoryBoxPlot, VictoryChart, VictoryAxis } from "victory-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Picker } from "@react-native-picker/picker";
const axios = require("axios");
import {
  useNavigation,
  useRouter,
  router,
  useLocalSearchParams,
} from "expo-router";
var userEmail = "huz@gmail.com";
const Dashboard = () => {
  const [data, setData] = useState([]);
  const [type, setType] = useState("Fire");
  const [isLoading, setIsLoading] = useState(true);
  const navigation = useNavigation();

  const retrieveData = async () => {
    try {
      const data = await AsyncStorage.getItem("userEmail");
      userEmail = JSON.parse(data);
      // console.log(data);
    } catch (error) {
      console.error("Error retrieving data:", error);
    }
  };
  useEffect(() => {
    const fetchData = async () => {
      await retrieveData();
      await fetchScan();
    };

    fetchData();
  }, []);

  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      // This function will be called every time the screen is focused
      const fetchData = async () => {
        await retrieveData();
        await fetchScan();
      };

      fetchData();
    });

    // Return the cleanup function to unsubscribe from the event
    return unsubscribe;
  }, [navigation]);
  useEffect(() => {
    fetchScan();
  }, [type]);
  const [dummyData, setDummyData] = useState();
  const [fireData, setFireData] = useState();
  const [floodData, setFloodData] = useState();
  const fetchScan = () => {
    if (type == "Earthquake") {
      const email = userEmail; // Replace with the actual email
      const disasterType = type; // Replace with the actual disasterType

      fetch(`http://192.168.104.24:3000/find-disasters/${email}/${disasterType}`)
        .then((response) => {
          if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
          }
          return response.json();
        })
        .then((data) => {
          // console.log("Response:", data);
          setDummyData(data);
          setIsLoading(false);
        })
        .catch((error) => {
          console.error("Error:", error.message);
        });
    } else if (type == "Flood") {
      const email = userEmail; // Replace with the actual email
      const disasterType = type; // Replace with the actual disasterType

      fetch(`http://192.168.104.24:3000/find-disasters/${email}/${disasterType}`)
        .then((response) => {
          if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
          }
          return response.json();
        })
        .then((data) => {
          // console.log("Response:", data);
          setFloodData(data);
          setIsLoading(false);
        })
        .catch((error) => {
          console.error("Error:", error.message);
        });
    } else if (type == "Fire") {
      const email = userEmail; // Replace with the actual email
      const disasterType = type; // Replace with the actual disasterType

      fetch(`http://192.168.104.24:3000/find-disasters/${email}/${disasterType}`)
        .then((response) => {
          if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
          }
          return response.json();
        })
        .then((data) => {
          // console.log("Response:", data);
          setFireData(data);
          setIsLoading(false);
        })
        .catch((error) => {
          console.error("Error:", error.message);
        });
    }
  };
  const renderScanItem = ({ item }) => (
    <View style={styles.scanItem}>
      <TouchableOpacity
        onPress={() => {
          router.push({
            pathname: "/report",
            params: {
              image:
                "https://static.timesofisrael.com/www/uploads/2023/03/33AN3EN-highres-640x400.jpg",
              time: item.CreationTime,
              buildings: item.DestroyedBuildings,
              Location: item.Location,
              people: item.PeopleAffected,
              cost: item.TotalDamageCost,
            },
          });
        }}
      >
        <Image
          source={{
            uri: "https://static.timesofisrael.com/www/uploads/2023/03/33AN3EN-highres-640x400.jpg",
          }}
          style={styles.scanImage}
        />
        <Text style={styles.scanUser}>{item.Location}</Text>
        <Text style={styles.scanType}>{item.CreationTime}</Text>
      </TouchableOpacity>
    </View>
  );

  const renderFloodItem = ({ item }) => (
    <View style={styles.scanItem}>
      <TouchableOpacity
        onPress={() => {
          router.push({
            pathname: "/floodreport",
            params: {
              image:
                "https://live.staticflickr.com/4096/4856605878_0f6a6f120f_b.jpg",
              time: item.CreationTime,
              buildings: item["Total Houses Affected"],
              Location: item.City,
              people: item["People Affected (Approx)"],
              cost: item["Total Damage"],
            },
          });
        }}
      >
        <Image
          source={{
            uri: "https://live.staticflickr.com/4096/4856605878_0f6a6f120f_b.jpg",
          }}
          style={styles.scanImage}
        />
        <Text style={styles.scanUser}>{item.City}</Text>
        <Text style={styles.scanType}>{item.CreationTime}</Text>
      </TouchableOpacity>
    </View>
  );

  const renderFireItem = ({ item }) => (
    <View style={styles.scanItem}>
      <TouchableOpacity
        onPress={() => {
          router.push({
            pathname: "/firereport",
            params: {
              image:
                "https://images.nationalgeographic.org/image/upload/t_edhub_resource_key_image/v1638892048/EducationHub/photos/wildfire-in-malibu.jpg",
              time: item.CreationTime,
              buildings: item.DisasterType,
              Location: item.City,
              people: item["Fire Intensity"],
              cost: item["High Alert"],
            },
          });
        }}
      >
        <Image
          source={{
            uri: "https://images.nationalgeographic.org/image/upload/t_edhub_resource_key_image/v1638892048/EducationHub/photos/wildfire-in-malibu.jpg",
          }}
          style={styles.scanImage}
        />
        <Text style={styles.scanUser}>{item.City}</Text>
        <Text style={styles.scanType}>{item.CreationTime}</Text>
      </TouchableOpacity>
    </View>
  );
  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }
  return (
    <View style={styles.container}>
      {/* Header Section */}
      <View style={styles.header}>
        <Ionicons name="arrow-back-outline" size={26} color={"#f5f5f5"} />
        <Text style={styles.headerText}>Dashboard</Text>
        <Pressable
          onPress={() => {
            router.push("/login");
          }}
        >
          <Ionicons name={"log-out-outline"} size={26} color={"#333"} />
        </Pressable>
      </View>
      <ScrollView style={{ flex: 1 }}>
        {/* Options Section */}
        <View style={styles.optionsContainer}>
          <Text style={{ fontSize: 20, fontWeight: "bold" }}>Modules</Text>
          <TouchableOpacity
            style={styles.floodoption}
            onPress={() => {
              router.push({
                pathname: "/upload",
                params: { type: "Flood", email: userEmail },
              });
            }}
          >
            <Image
              style={{ height: 40, width: 40 }}
              source={require("../assets/floodicon.png")}
            ></Image>
            <Text style={styles.optionText}>Flood</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.fireoption}
            onPress={() => {
              router.push({
                pathname: "/upload2",
                params: { type: "Fire", email: userEmail },
              });
            }}
          >
            <Image
              style={{ height: 40, width: 40 }}
              source={require("../assets/fire.png")}
            ></Image>
            <Text style={styles.optionText}>Fire</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.ethquakeoption}
            onPress={() => {
              router.push({
                pathname: "/upload3",
                params: { type: "Earthquake", email: userEmail },
              });
            }}
          >
            <Image
              style={{ height: 40, width: 40 }}
              source={require("../assets/earthquake.png")}
            ></Image>
            <Text style={styles.optionText}>Earthquake</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.chartContainer}>
          <View
            style={{
              flexDirection: "column",
              alignItems: "flex-start",
              justifyContent: "center",
              width: "50%",
            }}
          >
            {/* <Text style={styles.headerText}>AirWorx</Text> */}
            <Text
              style={{
                flexWrap: "wrap",
                fontSize: 18,
                color: "white",
                fontWeight: "600",
                width: "100%",
              }}
            >
              Get instant disaster alerts, tailored just for you.{" "}
            </Text>
            <TouchableOpacity
              style={{
                width: "80%",
                backgroundColor: "#1e81b0",
                alignItems: "center",
                height: 40,
                justifyContent: "center",
                borderRadius: 15,
                marginTop: 10,
                padding: 5,
              }}
              onPress={() => {
                router.replace("/home");
              }}
            >
              <Text
                style={{
                  color: "#fff",
                  fontSize: 18,
                  fontWeight: "bold",
                }}
              >
                Learn More
              </Text>
            </TouchableOpacity>
          </View>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "center",
              marginLeft: 20,
            }}
          >
            <Image
              style={{ height: 120, width: 120, alignSelf: "center" }}
              source={require("../assets/chart.png")}
            ></Image>
          </View>
        </View>

        {/* Recent Scans Section */}
        <View style={styles.recentScans}>
          <Text style={{ fontSize: 20, fontWeight: "bold", marginBottom: 10 }}>
            Recent Scans
          </Text>
          <View style={styles.searchBarContainer}>
            <Ionicons
              name="filter-outline"
              size={25}
              color="#555"
              style={styles.searchIcon}
            />
             
            <Picker
              selectedValue={type}
              onValueChange={(itemValue) => setType(itemValue)}
              style={{ flex: 1 }}
            >
              <Picker.Item label="Earthquake" value="Earthquake" />
              <Picker.Item label="Fire" value="Fire" />
              <Picker.Item label="Flood" value="Flood" />
            </Picker>
          </View>
          {type=="Earthquake"&&dummyData ? (
            <FlatList
              data={dummyData.slice(0, 10)}
              renderItem={renderScanItem}
              keyExtractor={(item) =>
                `${item.id}_${item.CreationTime}_${item.PeopleAffected}`
              }
              horizontal
            />
          ) : type=='Fire' && fireData ? (
            <FlatList
              data={fireData.slice(0, 10)}
              renderItem={renderFireItem} // Replace with your specific renderItem function for fireData
              keyExtractor={(item) => `${item.id}_${item.CreationTime}_${item['Fire Intensity']}`}
              horizontal
            />
          ) : type=='Flood' && floodData ? (
            <FlatList
              data={floodData.slice(0, 10)}
              renderItem={renderFloodItem} // Replace with your specific renderItem function for floodData
              keyExtractor={(item) =>
                `${item.id}_${item.CreationTime}_${item['Total Houses Affected']}`
              }
              horizontal
            />
          ) : null}
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#f5f5f5",
    flex: 1,
    padding: 24,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },
  headerText: {
    fontSize: 24,
    fontWeight: "bold",
  },
  chartContainer: {
    marginVertical: 5,
    backgroundColor: "#7ea7f9",
    borderRadius: 20,
    padding: 30,
    // alignItems: 'center',
    flexDirection: "row",
    justifyContent: "space-between",
  },
  optionsContainer: {
    flexDirection: "column",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  floodoption: {
    height: 60,
    backgroundColor: "#3498db",
    padding: 15,
    borderRadius: 8,
    alignItems: "center",
    flexDirection: "row",
    marginVertical: 10,
  },
  ethquakeoption: {
    height: 60,
    backgroundColor: "#FFC72C",
    padding: 15,
    borderRadius: 8,
    alignItems: "center",
    flexDirection: "row",
    marginVertical: 10,
  },
  fireoption: {
    height: 60,
    backgroundColor: "#FF3800",
    padding: 15,
    borderRadius: 8,
    alignItems: "center",
    flexDirection: "row",
    marginVertical: 10,
  },
  optionText: {
    marginLeft: 20,
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
  recentScans: {
    marginVertical: 20,
  },
  recentScansText: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  scanItem: {
    backgroundColor: "#fff",
    padding: 10,
    borderRadius: 8,
    marginBottom: 16,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    flexDirection: "row",
    alignItems: "center",
    marginRight: 8,
  },
  scanImage: {
    width: 120,
    height: 120,
    borderRadius: 8,
    marginBottom: 5,
  },
  scanUser: {
    fontSize: 14,
    fontWeight: "bold",
  },
  scanType: {
    fontSize: 12,
    color: "#666",
  },
  searchBar: {
    width: "100%",
    height: "100%",
  },
  searchBarContainer: {
    flexDirection: "row",
    alignItems: "center",
    height: 50,
    backgroundColor: "#FFF",
    borderRadius: 10,
    marginBottom: 16,
    paddingLeft: 8,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  searchIcon: {
    marginHorizontal: 8,
  },
});

export default Dashboard;
