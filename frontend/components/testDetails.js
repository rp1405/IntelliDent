import { useContext, useState } from "react";
import {
  Button,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  Touchable,
  TouchableOpacity,
  ActivityIndicator,
  Image,
  View,
  Alert,
  Dimensions,
} from "react-native";
import { Svg, G, Path } from "react-native-svg";
import { Dropdown } from "react-native-element-dropdown";
import MenuButton from "./menuButton";
import Configuration from "../contexts/configuration";
import Header from "./header";
import translations from "../translations/transaltions";
import treatment from "../functionality/treatments";
const screenWidth = Dimensions.get("window").width;
const screenHeight = Dimensions.get("window").height;
export default function TestDetails({ route, navigation }) {
  const { user, setUser, Loading, setLoading, language } =
    useContext(Configuration);
  const result = route.params.test.result;
  // console.log(result);
  const keys = Object.keys(result);
  function camelCaseToSpacedText(camelCaseString) {
    const spacedText = camelCaseString.replace(/([a-z])([A-Z])/g, "$1 $2");
    return spacedText.charAt(0).toUpperCase() + spacedText.slice(1);
  }
  let dataForDropdown = [];
  keys.map((disease) => {
    dataForDropdown.push({
      label: translations[language][disease],
      value: disease,
    });
  });
  const [test, setTest] = useState(keys[0]);
  const [isFocus, setIsFocus] = useState(false);
  return (
    <>
      <ScrollView style={styles.container}>
        <Header theme="dark" navigation={navigation} />
        <Dropdown
          style={styles.dropdown}
          placeholderStyle={styles.dropdownPlaceholder}
          selectedTextStyle={styles.dropdownText}
          itemTextStyle={[{ fontSize: 20 }]}
          data={dataForDropdown}
          maxHeight={300}
          labelField="label"
          valueField="value"
          placeholder="Select Disease"
          searchPlaceholder="Search..."
          fontFamily="Poppins_400Regular"
          value={test}
          onFocus={() => setIsFocus(true)}
          onBlur={() => setIsFocus(false)}
          onChange={(item) => {
            setTest(item.value);
            setIsFocus(false);
          }}
        />
        {result[test].status == "positive" ? (
          <>
            <Image
              style={{
                height: 100,
                width: 100,
                alignSelf: "center",
                marginTop: "5%",
              }}
              source={require("../assets/warning.png")}
            ></Image>
            <Text
              style={{
                color: "white",
                fontFamily: "Poppins_400Regular",
                fontSize: 20,
                alignSelf: "center",
                marginTop: 20,
              }}
            >
              {translations[language][test]} {translations[language].detected}!
            </Text>
            <Image
              style={{
                height: screenWidth * 1.2,
                width: screenWidth * 0.9,
                alignSelf: "center",
                marginTop: "5%",
                marginBottom: "10%",
              }}
              source={{
                uri: result[test].link,
              }}
            ></Image>
            <View>
              <Text
                style={{
                  color: "white",
                  fontSize: 25,
                  fontFamily: "Poppins_500Medium",
                  marginLeft: 5,
                }}
              >
                {translations[language].treatments}
              </Text>
              <Text
                style={{
                  color: "white",
                  fontSize: 19,
                  marginLeft: 5,
                  marginTop: 10,
                  marginBottom: 50,
                }}
              >
                {treatment[language][test]}
              </Text>
            </View>
          </>
        ) : (
          <>
            <Image
              style={{
                height: 100,
                width: 100,
                alignSelf: "center",
                marginTop: "30%",
              }}
              source={require("../assets/healthy-tooth.png")}
            ></Image>
            <Text
              style={{
                color: "white",
                fontFamily: "Poppins_400Regular",
                fontSize: 20,
                alignSelf: "center",
                marginTop: 20,
              }}
            >
              {translations[language].safe(translations[language][test])} !
            </Text>
          </>
        )}
      </ScrollView>
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
    fontFamily: "Gruppo_400Regular",
    fontSize: 37,
    marginLeft: "38%",
    color: "white",
  },
  dropdown: {
    marginTop: "5%",
    alignSelf: "center",
    width: "90%",
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
  givePadding(x) {
    return { padding: x + "%" };
  },
  fontSize(x) {
    return { fontSize: x };
  },
});
