import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
  Pressable,
  Image,
  ScrollView,
  Dimensions,
} from "react-native";
import RNHTMLtoPDF from "react-native-html-to-pdf"; // Install this library
import { useLocalSearchParams } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { useNavigation } from "expo-router";
import { BarChart } from "react-native-gifted-charts";
import PieChart from "react-native-pie-chart";
var damage;
var totalcost
const FloodReport = () => {
  const [isLoading, setIsLoading] = useState(true);

  const { image, time, buildings, Location, people, cost } =
    useLocalSearchParams();
  const navigation = useNavigation();
  // console.log('damaged buildings',buildings);
  // console.log('people affected',people);
  // console.log('damage cost',cost);
  const screenWidth = Dimensions.get("window").width;
  const [scanData, setScanData] = useState([]);
  const [showBarChart, setShowBarChart] = useState(true);
  const toggleChart = () => {
    setShowBarChart(!showBarChart);
  };
  useEffect(() => {
    const stringWithoutSpaceAndDollar = cost.replace(/[^\d.-]/g, "");
    damage = parseFloat(stringWithoutSpaceAndDollar);
    const formattedDamageCost = new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 3,
    }).format(damage);
    
    // console.log(formattedDa?mageCost); // Output: $48,730
    totalcost=formattedDamageCost.replace(/[^\d.-]/g, "");
    totalcost=(totalcost*0.01)/people
    totalcost=Math.round(totalcost);
    

    console.log('tt',totalcost);
    setIsLoading(false);
  }, []);

  const barData = [
    { value: buildings, label: "AH" },
    { value: people, label: "AP", frontColor: "#177AD5" },
    {
      value: totalcost, //Math.round(cost) * 0.001,
      label: "DC",
      frontColor: "#177AD5",
    },
  ];

  const widthAndHeight = 250;
  const series = [
    buildings,
    people,
    totalcost, //Math.round(cost) * 0.001,
  ];
  const sliceColor = ["#fbd203", "#018749", "#ff3c00"];

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
            // router.push('/login')
            navigation.dispatch({ type: "POP_TO_TOP" });
          }}
        >
          <Ionicons name="arrow-back-outline" size={26} color={"#333"} />
        </Pressable>
        <Text style={styles.headerText}>Disaster Scan Report</Text>

        <Ionicons name={"log-out-outline"} size={26} color={"#f5f5f5"} />
      </View>
      <ScrollView>
        <View style={styles.reportContainer}>
          <Image
            source={{ uri: image }}
            style={{
              height: 250,
              width: "100%",
              marginBottom: 20,
              borderRadius: 20,
            }}
          ></Image>
          <View style={styles.row}>
            <Text style={styles.label}>Affected Houses:</Text>
            <Text style={styles.value}>{buildings}</Text>
          </View>

          <View style={styles.row}>
            <Text style={styles.label}>Affected People:</Text>
            <Text style={styles.value}>{people}</Text>
          </View>

          <View style={styles.row}>
            <Text style={styles.label}>Damage Cost:</Text>
            <Text style={styles.value}>{cost}</Text>
          </View>

          <View style={styles.row}>
            <Text style={styles.label}>City:</Text>
            <Text style={styles.value}>{Location}</Text>
          </View>

          <View style={styles.row}>
            <Text style={styles.label}>Scan Date:</Text>
            <Text style={styles.value}>{time}</Text>
          </View>

          {/* <View style={styles.row}>
            <Text style={styles.label}>Author:</Text>
            <Text style={styles.value}>{scanData.author}</Text>
          </View> */}
        </View>

        <View style={styles.chartContainer}>
          {showBarChart ? (
            <View style={styles.chartContainer1}>
              <View style={styles.chartContent1}>
                <Text style={styles.value1}>AH - Affected Houses</Text>
                <Text style={styles.value1}>AP - Affected People</Text>
                <Text style={styles.value1}>DC - Damage Cost</Text>
                <BarChart
                  barWidth={22}
                  noOfSections={3}
                  barBorderRadius={4}
                  frontColor="lightgray"
                  data={barData}
                  yAxisThickness={0}
                  xAxisThickness={0}
                />
              </View>
            </View>
          ) : (
            <View style={styles.chartContainer1}>
              <View style={styles.chartContent}>
                <Text style={styles.value1}>Yellow - Affected Houses</Text>
                <Text style={styles.value1}>Green - Affected People</Text>
                <Text style={styles.value1}>Red - Damage Cost</Text>
                <PieChart
                  widthAndHeight={widthAndHeight}
                  series={series}
                  sliceColor={sliceColor}
                  coverRadius={0.45}
                  coverFill="#FFF"
                />
              </View>
            </View>
          )}
          <TouchableOpacity
            style={{
              width: "40%",
            }}
            onPress={toggleChart}
          >
            <View style={styles.buttonContainer}>
              <Ionicons
                name="swap-horizontal-outline"
                size={26}
                color={"#fff"}
              ></Ionicons>
            </View>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#f5f5f5",
  },
  buttonContainer: {
    backgroundColor: "#177AD5",
    padding: 10,
    borderRadius: 5,
    margin: 10,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  chartContainer1: {
    alignItems: "flex-start",
    justifyContent: "center", // Adjust as needed
    padding: 10,
    marginHorizontal: 30,
  },
  chartContainer: {
    // flexDirection: "row", // Use row direction to place charts side by side
    alignItems: "center",
    marginVertical: 20,
    marginBottom: 30,
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
  chartContent: {
    width: "50%", // 50% width for the content within each chart container
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "flex-start", // Adjust as needed
    padding: 10,
  },
  chartContent1: {
    width: "50%", // 50% width for the content within each chart container
    borderRadius: 10,
    alignItems: "flex-start",
    justifyContent: "flex-start", // Adjust as needed
    padding: 10,
  },
  header: {
    marginTop: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },
  headerText: {
    fontSize: 24,
    fontWeight: "bold",
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
  value1: {
    fontSize: 16,
    color: "#000",
    fontWeight: "bold",
    width: 400,
  },
  exportButton: {
    backgroundColor: "#1e81b0",
    alignItems: "center",
    height: 40,
    justifyContent: "center",
    borderRadius: 8,
    marginTop: 20,
  },
  exportButtonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
});

export default FloodReport;
