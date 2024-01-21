import React, { useContext, useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
  View,
  Alert,
  Dimensions,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import Backbutton from "./backbutton";
import { sendOTP } from "../functionality/messageService";
import { getUserDataByMobileNumber } from "../functionality/dataOperations";
import Configuration from "../contexts/configuration";
import translations from "../translations/transaltions";
const screenWidth = Dimensions.get("window").width;
const screenHeight = Dimensions.get("window").height;
export default function CreateNewAccount({ navigation }) {
  const [mobileNumber, setMobileNumber] = useState("");
  const { loading, setLoading, language } = useContext(Configuration);

  useEffect(() => {
    // Additional initialization logic can go here
  }, []);

  const handleClick = async () => {
    setLoading(true);
    const userData = await getUserDataByMobileNumber(mobileNumber);
    if (userData !== "") {
      setLoading(false);
      Alert.alert(
        translations[language].error,
        translations[language].userExists
      );
      return;
    }
    const OTP = await sendOTP(mobileNumber);
    navigation.popToTop();
    navigation.navigate("OtpScreen", {
      mode: "signup",
      OTP: OTP,
      mobileNumber: mobileNumber,
    });

    setLoading(false);
  };

  return (
    <TouchableWithoutFeedback
      onPress={() => {
        Keyboard.dismiss();
      }}
    >
      <View style={styles.container}>
        <View style={styles.top}>
          <Backbutton navigation={navigation} color={"black"} />
          <Text component="h1" style={styles.heading}>
            {translations[language].createNewAccountHeading}
          </Text>
        </View>
        <View
          style={[
            {
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              marginTop: 0.15 * screenHeight,
            },
          ]}
        >
          <Text
            component="h1"
            style={[{ fontFamily: "Poppins_500Medium", fontSize: 20 }]}
          >
            {translations[language].verifyMobileNumber}
          </Text>
          <Text
            component="h1"
            style={[{ fontFamily: "Poppins_400Regular", fontSize: 15 }]}
          >
            {translations[language].receiveOTP}
          </Text>
        </View>
        <View style={styles.inputAndLabel}>
          <TextInput
            style={styles.input}
            keyboardType="numeric"
            value="+91"
            editable={false}
          ></TextInput>
          <TextInput
            style={[styles.input, { width: "75%" }]}
            onChangeText={(newText) => {
              setMobileNumber(newText);
            }}
            keyboardType="numeric"
            placeholder={translations[language].enterMobileNumber}
          ></TextInput>
        </View>
        <View style={{ alignItems: "center" }}>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate("Login");
            }}
          >
            <Text style={{ marginTop: 0.01 * screenHeight }}>
              {translations[language].haveAccount}{" "}
              {translations[language].login}
            </Text>
          </TouchableOpacity>
          <ActivityIndicator
            size="large"
            color="black"
            animating={loading}
            style={{ marginTop: 0.01 * screenHeight }}
          />
        </View>
        <TouchableOpacity style={styles.button} onPress={handleClick}>
          <Text style={styles.buttonText}>{translations[language].getOTP}</Text>
        </TouchableOpacity>
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    height: screenHeight,
  },
  top: {
    flexDirection: "row",
    marginTop: 0.03 * screenHeight,
    alignItems: "center",
    justifyContent: "center",
  },
  heading: {
    fontFamily: "Poppins_500Medium",
    fontSize: 24,
  },
  lightText: {
    fontFamily: "Poppins_100Thin",
    fontSize: 50,
  },
  input: {
    borderRadius: 5,
    padding: 10,
    borderWidth: 1,
    borderStyle: "solid",
    borderColor: "#91969E",
    marginTop: 5,
    marginLeft: "2%",
    height: 60,
    fontSize: 25,
  },
  inputAndLabel: {
    display: "flex",
    flexDirection: "row",
    marginTop: 0.05 * screenHeight,
  },
  button: {
    position: "absolute",
    bottom: screenHeight * 0.015,
    width: "96%",
    backgroundColor: "black",
    padding: 10,
    borderWidth: 0,
    borderStyle: "solid",
    borderRadius: 10,
    alignItems: "center",
    alignSelf: "center",
    height: 0.07 * screenHeight,
    justifyContent: "center",
  },
  buttonText: {
    fontFamily: "Poppins_400Regular",
    fontSize: 20,
    color: "white",
  },
});
