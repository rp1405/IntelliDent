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
} from "react-native";
import { useState, useContext } from "react";
import { Path, Svg } from "react-native-svg";
import translations from "../translations/transaltions";
import Configuration from "../contexts/configuration";
const ResultSplash = ({ route, navigation }) => {
  const { language } = useContext(Configuration);
  const screenWidth = Dimensions.get("window").width;
  const screenHeight = Dimensions.get("window").height;
  return (
    <View
      style={{
        height: screenHeight,
        justifyContent: "center",
        backgroundColor: "black",
        alignItems: "center",
      }}
    >
      <Text
        style={{
          color: "white",
          fontFamily: "Poppins_500Medium",
          fontSize: 30,
        }}
      >
        {translations[language].resultsGenerated}
      </Text>
      <Svg
        xmlns="http://www.w3.org/2000/svg"
        width="250"
        height="250"
        viewBox="0 0 24 24"
        fill="none"
        stroke="#C5FFF8"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
        class="lucide lucide-badge-check"
        style={{ alignSelf: "center" }}
      >
        <Path d="M3.85 8.62a4 4 0 0 1 4.78-4.77 4 4 0 0 1 6.74 0 4 4 0 0 1 4.78 4.78 4 4 0 0 1 0 6.74 4 4 0 0 1-4.77 4.78 4 4 0 0 1-6.75 0 4 4 0 0 1-4.78-4.77 4 4 0 0 1 0-6.76Z" />
        <Path d="m9 12 2 2 4-4" />
      </Svg>
      <Text
        style={{
          color: "white",
          fontFamily: "Poppins_400Regular",
          fontSize: 15,
          marginHorizontal: screenWidth * 0.15,
          textAlign: "center",
        }}
      >
        {translations[language].whatsappMessage}
      </Text>
      <TouchableOpacity
        style={{
          marginTop: 30,
          width: "70%",
          backgroundColor: "black",
          padding: 10,
          borderWidth: 1,
          borderColor: "white",
          borderStyle: "solid",
          alignItems: "center",
          alignSelf: "center",
          height: 0.07 * screenHeight,
          justifyContent: "center",
        }}
        onPress={() => {
          navigation.popToTop();
          navigation.navigate("testDetails", {
            test: route.params.test,
          });
        }}
      >
        <Text
          style={{
            color: "white",
            fontFamily: "Poppins_400Regular",
            fontSize: 15,
          }}
        >
          {translations[language].goToResults}
        </Text>
      </TouchableOpacity>
    </View>
  );
};
export default ResultSplash;
