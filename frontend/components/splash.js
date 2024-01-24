import React, { useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  Animated,
  TouchableOpacity,
  Switch,
  Dimensions,
} from "react-native";
import { useState, useContext } from "react";
import Configuration from "../contexts/configuration";
import translations from "../translations/transaltions";
import storage from "../functionality/localStorage";
export default function Splash({ navigation }) {
  const { language, setLanguage, setUser } = useContext(Configuration);
  const [animationDes, setAnimationDes] = useState(40);
  const initialPosition = new Animated.Value(0);
  const flowOpacity = new Animated.Value(1);
  const sentencesOpacity = new Animated.Value(0);
  const screenHeight = Dimensions.get("window").height;
  const translateY = initialPosition.interpolate({
    inputRange: [0, 1],
    outputRange: [0, -0.15 * screenHeight],
  });
  const moveFlowUp = Animated.timing(initialPosition, {
    toValue: 1,
    duration: 1000,
    useNativeDriver: true,
  });
  useEffect(() => {
    const showSentences = Animated.sequence([
      Animated.delay(3000),
      moveFlowUp,
      Animated.delay(1000),
      Animated.timing(sentencesOpacity, {
        toValue: 1,
        duration: 500,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);
  useEffect(() => {
    const listener = sentencesOpacity.addListener(({ value }) => {
      if (value === 1) {
        setAnimationDes(25);
      }
    });
    return () => {
      sentencesOpacity.removeListener(listener);
    };
  }, [sentencesOpacity]);
  return (
    <View style={styles.container}>
      <Animated.View
        style={{
          transform: [{ translateY }],
          opacity: flowOpacity,
          position: "absolute",
          top: animationDes + "%",
        }}
      >
        <Text component="h1" style={[styles.mainText]}>
          {translations[language].intelliDent}
        </Text>
        <Text style={[styles.tagline, { marginTop: 10 }]}>
          {translations[language].dentalCareXAI}
        </Text>
      </Animated.View>
      <Animated.View style={{ marginTop: 100, opacity: sentencesOpacity }}>
        <TouchableOpacity
          style={styles.touchable}
          onPress={async () => {
            const isLoggedIn = await storage.getData("isLoggedIn");
            console.log(isLoggedIn);
            if (isLoggedIn == "true") {
              const userData = await storage.getData("user");
              setUser(JSON.parse(userData));
              navigation.navigate("Home");
            } else {
              navigation.navigate("Login");
            }
          }}
        >
          <Text style={styles.buttonText}>
            {translations[language].existingUser + " →"}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.touchable}
          onPress={() => {
            navigation.navigate("CreateNewAccount");
          }}
        >
          <Text style={styles.buttonText}>
            {translations[language].newUser + " →"}
          </Text>
        </TouchableOpacity>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Text style={styles.tagline}>{translations[language].english}</Text>
          <Switch
            trackColor={{ false: "black", true: "white" }}
            thumbColor={language == "Hindi" ? "black" : "white"}
            onValueChange={() => {
              setLanguage((prev) => (prev == "Hindi" ? "English" : "Hindi"));
            }}
            value={language == "Hindi"}
            style={{ marginLeft: 10, marginRight: 10 }}
          />
          <Text style={styles.tagline}>{translations[language].hindi}</Text>
        </View>
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "black",
    alignItems: "center",
    justifyContent: "center",
  },
  mainText: {
    fontFamily: "Gruppo_400Regular",
    fontWeight: 200,
    fontSize: 60,
    color: "white",
    textAlign: "center",
  },
  tagline: {
    fontFamily: "Poppins_400Regular",
    fontSize: 12, // Adjust the font size based on your preference
    color: "white",
    textAlign: "center",
  },
  touchable: {
    backgroundColor: "transparent",
    borderRadius: 5,
    padding: 20,
    margin: 10,
    borderColor: "white",
    borderWidth: 0.3,
  },
  buttonText: {
    fontFamily: "Poppins_400Regular",
    color: "white",
    fontSize: 20,
    textAlign: "center",
  },
  dropdown: {
    marginTop: "5%",
    alignSelf: "center",
    width: "20%",
    fontSize: 20,
    padding: 5,
    borderWidth: 1,
    borderStyle: "solid",
    borderColor: "#91969E",
    borderRadius: 5,
    height: 55,
  },
  dropdownPlaceholder: {
    fontSize: 20,
    color: "#C7C7CD",
  },
  dropdownText: {
    fontSize: 20,
    color: "#C7C7CD",
  },
});
