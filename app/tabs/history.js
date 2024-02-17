import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Image,
  TextInput,
  ActivityIndicator,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import {
  useNavigation,
  useRouter,
  router,
  useLocalSearchParams,
} from "expo-router";
import { Picker } from "@react-native-picker/picker";
const HistoryScreen = () => {
  const [earthHistory, setearthHistory] = useState([]);
  const [floodHistory, setFloodHistory] = useState([]);
  const [fireHistory, setFireHistory] = useState([]);

  const [isLoading, setIsLoading] = useState(true);
  const navigation = useNavigation();
  const [type, setType] = useState("Earthquake"); //1=earthquake, 2=flood, 3=fire, 4=survivors
  const fetchAllScans = async () => {
    if (type == "Earthquake") {
      try {
        const response = await fetch(
          `http://192.168.104.24:3000/disasters/${type}`
        );

        if (!response.ok) {
          throw new Error("Network response was not ok");
        }

        const data = await response.json();
        // console.log(data);
        setearthHistory(data);
        setIsLoading(false);
      } catch (error) {
        setIsLoading(false);
        console.error("Error fetching data:", error);
      }
    } else if (type == "Flood") {
      try {
        const response = await fetch(
          `http://192.168.104.24:3000/disasters/${type}`
        );

        if (!response.ok) {
          throw new Error("Network response was not ok");
        }

        const data = await response.json();
        // console.log(data);
        setFloodHistory(data);
        setIsLoading(false);
      } catch (error) {
        setIsLoading(false);
        console.error("Error fetching data:", error);
      }
    } else if (type == "Fire") {
      try {
        const response = await fetch(
          `http://192.168.104.24:3000/disasters/${type}`
        );

        if (!response.ok) {
          throw new Error("Network response was not ok");
        }

        const data = await response.json();
        // console.log(data);
        setFireHistory(data);
        setIsLoading(false);
      } catch (error) {
        setIsLoading(false);
        console.error("Error fetching data:", error);
      }
    }
  };

  useEffect(() => {
    fetchAllScans();
  }, [type]);

  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      // This function will be called every time the screen is focused
      fetchAllScans();
    });

    // Return the cleanup function to unsubscribe from the event
    return unsubscribe;
  }, [navigation]);

  const renderEarthItem = ({ item }) => (
    <TouchableOpacity
      style={styles.scanItem}
      onPress={() => {
        router.push({ pathname: "/report", params: {  
        image:"https://static.timesofisrael.com/www/uploads/2023/03/33AN3EN-highres-640x400.jpg",
        time: item.CreationTime,
        buildings: item.DestroyedBuildings,
        Location:item.Location,
        people:item.PeopleAffected,
        cost:item.TotalDamageCost, } });
      }}
    >
      <Image
        source={{
          uri: "https://static.timesofisrael.com/www/uploads/2023/03/33AN3EN-highres-640x400.jpg",
        }}
        style={styles.scanImage}
      />
      <View style={styles.scanDetails}>
        <Text style={styles.scanName}>Earthquake Scan</Text>
        <Text style={styles.scanArea}>{item.Location}</Text>
        <Text style={styles.scanType}>{item.DisasterType}</Text>
        <Text style={styles.scanDate}>{item.CreationTime}</Text>
      </View>
      <View>
        <Ionicons
          name="chevron-forward-circle-outline"
          size={30}
          color={"gray"}
        />
      </View>
    </TouchableOpacity>
  );

  const renderFloodItem = ({ item }) => (
    <TouchableOpacity
      style={styles.scanItem}
      onPress={() => {
        router.push({
          pathname: "/floodreport",
          params: {
            image:"https://live.staticflickr.com/4096/4856605878_0f6a6f120f_b.jpg",
            time: item.CreationTime,
            buildings: item['Total Houses Affected'],
            Location:item.City,
            people:item['People Affected (Approx)'],
            cost:item['Total Damage'],
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
      <View style={styles.scanDetails}>
        <Text style={styles.scanName}>Flood Scan</Text>
        <Text style={styles.scanArea}>{item.City}</Text>
        <Text style={styles.scanType}>{item.DisasterType}</Text>
        <Text style={styles.scanDate}>{item.CreationTime}</Text>
      </View>
      <View>
        <Ionicons
          name="chevron-forward-circle-outline"
          size={30}
          color={"gray"}
        />
      </View>
    </TouchableOpacity>
  );

  const renderFireHistoryItem = ({ item }) => (
    <TouchableOpacity
      style={styles.scanItem}
      onPress={() => {
        router.push({ pathname: "/firereport", 
        params: {
          image:"https://images.nationalgeographic.org/image/upload/t_edhub_resource_key_image/v1638892048/EducationHub/photos/wildfire-in-malibu.jpg",
          time: item.CreationTime,
          buildings: item.DisasterType,
          Location:item.City,
          people:item['Fire Intensity'],
          cost:item['High Alert'],
        }, });
      }}
    >
      <Image
        source={{
          uri: "https://images.nationalgeographic.org/image/upload/t_edhub_resource_key_image/v1638892048/EducationHub/photos/wildfire-in-malibu.jpg",
        }}
        style={styles.scanImage}
      />
      <View style={styles.scanDetails}>
        <Text style={styles.scanName}>Flood Scan</Text>
        <Text style={styles.scanArea}>{item.City}</Text>
        <Text style={styles.scanType}>{item.DisasterType}</Text>
        <Text style={styles.scanDate}>{item.CreationTime}</Text>
      </View>
      <View>
        <Ionicons
          name="chevron-forward-circle-outline"
          size={30}
          color={"gray"}
        />
      </View>
    </TouchableOpacity>
  );

  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }
  if (type == "Earthquake") {
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <Ionicons name="arrow-back-outline" size={26} color={"#f5f5f5"} />
          <Text style={styles.headerText}>History</Text>
          <Ionicons name={"log-out-outline"} size={26} color={"#f5f5f5"} />
        </View>

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
        <FlatList
          data={earthHistory}
          keyExtractor={(item) => `${item.id}_${item.CreationTime}_${item.PeopleAffected}`}
          renderItem={renderEarthItem}
        />
      </View>
    );
  }
  if (type == "Flood") {
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <Ionicons name="arrow-back-outline" size={26} color={"#f5f5f5"} />
          <Text style={styles.headerText}>History</Text>
          <Ionicons name={"log-out-outline"} size={26} color={"#f5f5f5"} />
        </View>
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
        <FlatList
          data={floodHistory}
          keyExtractor={(item) => `${item.id}_${item.CreationTime}_${item['Total Houses Affected']}`}
          renderItem={renderFloodItem}
        />
      </View>
    );
  }

  if (type == "Fire") {
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <Ionicons name="arrow-back-outline" size={26} color={"#f5f5f5"} />
          <Text style={styles.headerText}>History</Text>
          <Ionicons name={"log-out-outline"} size={26} color={"#f5f5f5"} />
        </View>
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
        <FlatList
          data={fireHistory}
          keyExtractor={(item) => `${item.id}_${item.CreationTime}_${item['Fire Intensity']}`}
          renderItem={renderFireHistoryItem}
        />
      </View>
    );
  }
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: "#f5f5f5",
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
  },
  scanImage: {
    width: 80,
    height: 80,
    borderRadius: 10,
    marginRight: 16,
  },
  scanDetails: {
    flex: 1,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  scanName: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 4,
  },
  scanDate: {
    fontSize: 12,
    fontWeight: "600",
    marginBottom: 4,
  },
  scanArea: {
    fontSize: 16,
    marginBottom: 4,
  },
  scanAuthor: {
    fontSize: 14,
    color: "#555",
    marginBottom: 4,
  },
  scanType: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#1e81b0",
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

export default HistoryScreen;
