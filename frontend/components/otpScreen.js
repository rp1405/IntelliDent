import { useContext, useState } from "react";
import { createRef } from "react";
import {
  Alert,
  Button,
  StyleSheet,
  Text,
  TextInput,
  Touchable,
  TouchableOpacity,
  ActivityIndicator,
  View,
  Dimensions,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import Backbutton from "./backbutton";
import Configuration from "../contexts/configuration";
import { getUserDataByMobileNumber } from "../functionality/dataOperations";
import translations from "../translations/transaltions";
import storage from "../functionality/localStorage";
const screenWidth = Dimensions.get("window").width;
const screenHeight = Dimensions.get("window").height;
export default function OtpScreen({ route, navigation }) {
  const { user, setUser, loading, setLoading, language, setLanguage } =
    useContext(Configuration);
  const { OTP, mobileNumber, mode } = route.params;
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const inputs = Array(6)
    .fill()
    .map((_, i) => createRef());
  const handleOtpChange = (index, value) => {
    const newOtp = [...otp];
    newOtp[index] = value;

    setOtp(newOtp);
    // Auto focus to the next input
    if (value === "") {
      if (index > 0) {
        inputs[index - 1].current.focus();
      }
    } else {
      if (index < otp.length - 1 && value !== "") {
        inputs[index + 1].current.focus();
      }
    }
  };
  const handleClick = async () => {
    setLoading(true);
    let enteredOtp = "";
    otp.map((value) => {
      enteredOtp += value;
    });
    if (enteredOtp.length < otp.length) {
      Alert.alert("Error", "OTP should be atleast " + otp.length() + "digits.");
      setLoading(false);
      return;
    }
    if (enteredOtp != OTP) {
      Alert.alert("Error", "Incorect OTP");
      setLoading(false);
      return;
    }
    if (mode === "signup") {
      navigation.popToTop();
      navigation.navigate("Signup", { mobileNumber: mobileNumber });
    } else {
      const userData = await getUserDataByMobileNumber(mobileNumber);
      setUser(userData);
      await storage.setData("user", JSON.stringify(userData));
      await storage.setData("isLoggedIn", "true");
      navigation.popToTop();
      navigation.navigate("Home");
    }
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
          <Backbutton navigation={navigation} color="white" />
          <Text component="h1" style={styles.heading}>
            {translations[language].enterOtp}
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
            style={[
              { fontFamily: "Poppins_500Medium", fontSize: 20, color: "white" },
            ]}
          >
            {translations[language].enterOtp}
          </Text>
          <Text
            component="h1"
            style={[
              {
                fontFamily: "Poppins_400Regular",
                fontSize: 15,
                color: "white",
              },
            ]}
          >
            {translations[language].enterCode(mobileNumber)}
          </Text>
        </View>
        <View style={styles.inputAndLabel}>
          {otp.map((digit, index) => (
            <TextInput
              key={index}
              style={styles.input}
              value={digit}
              onChangeText={(value) => handleOtpChange(index, value)}
              onKeyPress={({ nativeEvent }) => {
                if (nativeEvent.key === "Backspace") {
                  handleOtpChange(index, "");
                }
              }}
              keyboardType="numeric"
              maxLength={1}
              ref={inputs[index]}
            />
          ))}
        </View>
        <View style={{ alignItems: "center" }}>
          <TouchableOpacity
            disabled={loading}
            onPress={() => {
              navigation.navigate("Login");
            }}
          >
            <Text style={{ marginTop: 0.01 * screenHeight, color: "white" }}>
              {translations[language].resendOtp}
            </Text>
          </TouchableOpacity>
          <ActivityIndicator
            size="large"
            color="white"
            animating={loading}
            style={{ marginTop: 0.01 * screenHeight }}
          />
        </View>
        <TouchableOpacity
          disabled={loading}
          style={styles.button}
          onPress={handleClick}
        >
          <Text style={styles.buttonText}>
            {translations[language].verifyOtp}
          </Text>
        </TouchableOpacity>
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: "black",
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
    marginTop: "-1.5%",
    marginLeft: "5%",
    color: "white",
  },
  lightText: {
    fontFamily: "Poppins_100Thin",
    fontSize: 50,
  },
  input: {
    borderRadius: 5,
    padding: "3%",
    borderWidth: 1.5,
    borderStyle: "solid",
    borderColor: "#91969E",
    marginTop: 5,
    marginLeft: "4%",
    height: 60,
    fontSize: 25,
    width: "12%",
    fontFamily: "Poppins_400Regular",
    color: "white",
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
    backgroundColor: "white",
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
    fontFamily: "Poppins_500Medium",
    fontSize: 20,
    color: "black",
  },
});
