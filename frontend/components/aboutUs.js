import React, { useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  Animated,
  TouchableOpacity,
  Switch,
  Dimensions,
  ActivityIndicator,
  Image,
  ScrollView,
} from "react-native";
import { useState, useContext } from "react";
import { Path, Svg } from "react-native-svg";
import translations from "../translations/transaltions";
import Configuration from "../contexts/configuration";
import Header from "./header";
import Social from "./social";
const About = ({ route, navigation }) => {
  const { language } = useContext(Configuration);
  const screenWidth = Dimensions.get("window").width;
  const screenHeight = Dimensions.get("window").height;
  const [img, setImg] = useState(require("../assets/akshaygupta.jpg"));
  return (
    <ScrollView
      style={{
        flex: 1,
        padding: 13,
        height: screenHeight,
        // justifyContent: "center",
        backgroundColor: "black",
      }}
    >
      <Header theme={"dark"} navigation={navigation} />
      <View
        style={{
          alignItems: "center",
        }}
      >
        <Text
          style={{
            marginTop: screenHeight * 0.05,
            color: "white",
            fontFamily: "Poppins_400Regular",
            fontSize: 30,
          }}
        >
          {translations[language].about}
        </Text>
        <Image
          source={img}
          style={{
            height: 250,
            width: screenWidth * 0.9,
            marginVertical: 20,
            borderRadius: 10,
          }}
        ></Image>
        <Text
          style={{
            color: "white",
            fontFamily: "Poppins_400Regular",
            fontSize: 15,
            marginHorizontal: screenWidth * 0.02,
            textAlign: "center",
          }}
        >
          {translations[language].aboutUsContent}
        </Text>
      </View>
      <View style={{ marginVertical: 50 }}>
        <Text
          style={{
            color: "white",
            fontFamily: "Poppins_400Regular",
            fontSize: 15,
            textAlign: "center",
            marginBottom: 20,
          }}
        >
          {translations[language].socialMediaHandles}
        </Text>
        <Social />
      </View>
    </ScrollView>
  );
};
export default About;
