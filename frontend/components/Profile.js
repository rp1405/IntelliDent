import { useContext, useState } from "react";
import {
  Button,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  Touchable,
  ActivityIndicator,
  TouchableOpacity,
  View,
  Switch,
  Dimensions,
} from "react-native";
import Header from "./header";
import translations from "../translations/transaltions";
import { Svg, Path, G, Defs } from "react-native-svg";
import Configuration from "../contexts/configuration";
import storage from "../functionality/localStorage";
const screenHeight = Dimensions.get("window").height;
const screenWidth = Dimensions.get("window").width;
export default function Profile({ navigation }) {
  const { user, setUser, language, setLanguage, loading } =
    useContext(Configuration);
  return (
    <>
      <View style={styles.container}>
        <Header theme="dark" navigation={navigation} />
        <View style={{ alignItems: "center" }}>
          <Svg
            xmlns="http://www.w3.org/2000/Svg"
            width="200"
            height="200"
            viewBox="0 0 2100 2100"
          >
            <Path
              fill-rule="nonzero"
              fill="white"
              fill-opacity="1"
              d="M 1050 375 C 677.527344 375 375 677.53125 375 1050 C 375 1422.472656 677.527344 1725 1050 1725 C 1422.46875 1725 1725 1422.472656 1725 1050 C 1725 677.53125 1422.46875 375 1050 375 Z M 1050 428.929688 C 1393.289062 428.929688 1671.070312 706.710938 1671.070312 1050 C 1671.070312 1233.511719 1591.171875 1397.75 1464.839844 1511.390625 L 1463.300781 1505.835938 C 1438.789062 1417.671875 1397.761719 1349.238281 1333.5 1289.132812 C 1301.710938 1259.394531 1271.808594 1235.0625 1267.058594 1235.0625 C 1262.300781 1235.0625 1239.878906 1249.179688 1217.210938 1266.492188 C 1117.089844 1342.910156 982.773438 1342.910156 882.660156 1266.492188 C 859.988281 1249.1875 837.5625 1235.0625 832.808594 1235.0625 C 828.046875 1235.0625 798.152344 1259.394531 766.363281 1289.132812 C 702.109375 1349.238281 661.148438 1417.671875 636.636719 1505.835938 L 635.089844 1511.390625 C 508.789062 1397.75 428.933594 1233.492188 428.933594 1050 C 428.933594 706.710938 706.71875 428.929688 1050 428.929688 Z M 1049.929688 763.191406 C 987.066406 763.191406 924.238281 788.898438 872.742188 840.398438 C 800.207031 912.941406 780.183594 996.25 810.65625 1098.871094 C 829.867188 1163.558594 901.808594 1237.058594 964.921875 1256.4375 C 1066.011719 1287.476562 1155.328125 1266.769531 1226.339844 1195.757812 C 1330.21875 1091.878906 1330.570312 943.78125 1227.191406 840.398438 C 1175.691406 788.898438 1112.800781 763.191406 1049.929688 763.191406 Z M 1049.929688 763.191406 "
            />
          </Svg>
          <Text
            style={[
              { color: "white", fontFamily: "Poppins_500Medium", fontSize: 30 },
            ]}
          >
            {user.name}
          </Text>
        </View>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
            marginTop: "50%",
          }}
        >
          <Text
            style={{
              fontFamily: "Poppins_400Regular",
              fontSize: 12, // Adjust the font size based on your preference
              color: "white",
              textAlign: "center",
            }}
          >
            {translations[language].english}
          </Text>
          <Switch
            trackColor={{ false: "black", true: "white" }}
            thumbColor={language == "Hindi" ? "black" : "white"}
            onValueChange={() => {
              setLanguage((prev) => (prev == "Hindi" ? "English" : "Hindi"));
            }}
            value={language == "Hindi"}
            style={{ marginLeft: 10, marginRight: 10 }}
          />
          <Text
            style={{
              fontFamily: "Poppins_400Regular",
              fontSize: 12, // Adjust the font size based on your preference
              color: "white",
              textAlign: "center",
            }}
          >
            {translations[language].hindi}
          </Text>
        </View>
        <TouchableOpacity
          disabled={loading}
          style={[
            styles.button,
            { display: "flex", flexDirection: "row", justifyContent: "center" },
          ]}
          onPress={async () => {
            setUser({
              id: "",
              name: "",
              mobileNumber: "",
              age: "",
              gender: "",
            });
            await storage.setData("user", JSON.stringify(user));
            await storage.setData("isLoggedIn", "false");
            navigation.popToTop();
            navigation.navigate("Login");
          }}
        >
          <Svg
            height="24"
            width="24"
            viewBox="0 0 110 110"
            xmlns="http://www.w3.org/2000/svg"
            fill={"black"}
          >
            <G>
              <Path d="M20.4844,54H66a6,6,0,0,0,0-12H20.4844l7.7578-7.7578a5.9994,5.9994,0,0,0-8.4844-8.4844l-18,18a5.9979,5.9979,0,0,0,0,8.4844l18,18a5.9994,5.9994,0,1,0,8.4844-8.4844Z" />
              <Path d="M90,0H42a5.9966,5.9966,0,0,0-6,6V18a6,6,0,0,0,12,0V12H84V84H48V78a6,6,0,0,0-12,0V90a5.9966,5.9966,0,0,0,6,6H90a5.9966,5.9966,0,0,0,6-6V6A5.9966,5.9966,0,0,0,90,0Z" />
            </G>
          </Svg>
          <Text style={styles.buttonText}>{translations[language].logout}</Text>
        </TouchableOpacity>
      </View>
    </>
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
    alignItems: "center",
    marginTop: "2%",
    marginLeft: "2%",
  },
  heading: {
    alignSelf: "center",
    fontFamily: "Gruppo_400Regular",
    fontSize: 37,
    marginLeft: "38%",
    color: "white",
  },
  totalBalanceHeading: {
    fontFamily: "Poppins_400Regular",
    fontSize: 15,
    color: "white",
  },
  totalBalanceAmount: {
    fontFamily: "Poppins_500Medium",
    fontSize: 27,
    color: "white",
    marginTop: "2%",
  },
  button: {
    position: "absolute",
    bottom: screenHeight * 0.015,
    width: "96%",
    backgroundColor: "white",
    padding: 7,
    borderWidth: 0,
    borderStyle: "solid",
    borderRadius: 10,
    alignItems: "center",
    alignSelf: "center",
    height: 0.076 * screenHeight,
    justifyContent: "center",
  },
  buttonText: {
    fontFamily: "Poppins_500Medium",
    fontSize: 25,
    color: "black",
  },
  balance: {
    backgroundColor: "black",
    alignItems: "center",
    borderRadius: 10,
    marginTop: "4%",
  },
  setColorWhite: {
    color: "white",
  },
  displayRow: {
    display: "flex",
    flexDirection: "row",
  },
  givePadding(x) {
    return { padding: x + "%" };
  },
  fontSize(x) {
    return { fontSize: x };
  },
});
