import {
  Button,
  StyleSheet,
  Text,
  TextInput,
  Touchable,
  TouchableOpacity,
  View,
  Image,
  Alert,
  ActivityIndicator,
  TouchableWithoutFeedback,
  Keyboard,
  Dimensions,
} from "react-native";
import { Svg, Path, Circle, Rect } from "react-native-svg";
import { Dropdown } from "react-native-element-dropdown";
import {
  getUserDataByMobileNumber,
  getUserDataById,
  addNewUser,
} from "../functionality/dataOperations";
import { useContext, useState } from "react";
import Configuration from "../contexts/configuration";
import storage from "../functionality/localStorage";
import { sendMessage } from "../functionality/messageService";
const screenWidth = Dimensions.get("window").width;
const screenHeight = Dimensions.get("window").height;
export default function Signup({ route, navigation }) {
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [gender, setGender] = useState(null);
  const [isFocus, setIsFocus] = useState(false);
  const { user, setUser, loading, setLoading, language } =
    useContext(Configuration);
  const handleClick = async () => {
    setLoading(true);
    const userDetails = {
      name: name,
      age: age,
      gender: gender,
      mobileNumber: route.params.mobileNumber,
      tests: [],
    };
    addNewUser(userDetails)
      .then((res) => {
        setUser(res);
        setUser(userDetails);
        storage
          .setData("user", JSON.stringify(userDetails))
          .then(() => storage.setData("isLoggedIn", "true"))
          .then(() => {
            setLoading(false);
            navigation.popToTop();
            navigation.navigate("Home");
          });
      })
      .catch((error) => {
        setLoading(false);
        Alert.alert("OOPS!", "Some error occured. Please try again");
        console.log(error);
      });
    const messageHindi =
      "इंटेलीडेंट में आपका स्वागत है।\nहम एक परिसर दंत रोग उत्साहिता के दल हैं जो इच्छुक हैं कि ज्ञान और समय की कमी के कारण देर से दंत उपचार की प्रवृत्ति को समाप्त करें। हमारे ए.आई. आधारित एप्लिकेशन से सभी दंत बीमारियों की पहचान होती है और आवश्यक उपचार की सिफारिश की जाती है। हम आपकी सेवा करना चाहते हैं या आपको इसे अपने परिवार के दंत चिकित्सक के साथ साझा करने के लिए प्रोत्साहित करना चाहते हैं ताकि खर्च और समय की बचत हो सके।\n\n" +
      '"INTELLIDENT" बहुभाषी (अंग्रेजी और हिंदी) है, जिससे सभी के लिए यह सरल है। 5 मिनट से कम समय में शून्य लागत पर पूर्ण मौखिक स्कैन हमारा लक्ष्य प्रतिरोध से बेहतर है को सबसे अच्छे तरीके से पूरा करता है। हम आशा करते हैं कि आपको हमारे साथ अच्छा अनुभव होगा। हमें बेहतर बनाने के लिए प्रोत्साहन और सकारात्मक आलोचना की प्रतीक्षा है।\n\n' +
      "शुभकामनाएँ,\nटीम इंटेलिडेंट";
    const messageEnglish =
      "Welcome to INTELLIDENT\nWe are a team of preventive dental disease enthusiasts who wish to eliminate the tendency of delayed dental treatment due to a lack of knowledge and time. Our AI BASED APPLICATION detects all dental ailments and recommends the needed treatment. We wish to serve you for the same or encourage you to share the inferences with your family dentist so that early treatment is performed, saving on expenses and time.\n\n" +
      '"INTELLIDENT" is multilingual (ENGLISH & HINDI), making it easy for all. A complete oral scan in less than 5 minutes at zero cost delivers our aim PREVENTION IS BETTER THAN CURE in the best possible way. We hope you have a good experience with us. Looking forward to encouragement and positive criticism to make us better.\n\n' +
      "Regards,\nTEAM INTELLIDENT";
    await sendMessage(
      userDetails.mobileNumber,
      language == "English" ? messageEnglish : messageHindi
    );
  };
  return (
    <TouchableWithoutFeedback
      onPress={() => {
        Keyboard.dismiss();
      }}
    >
      <View style={styles.container}>
        <View style={styles.top}>
          {/* <Backbutton navigation={navigation} color={"black"} /> */}
          <Text component="h1" style={styles.heading}>
            Create new account
          </Text>
        </View>
        <View style={{ alignItems: "center" }}>
          <Svg
            xmlns="http://www.w3.org/2000/Svg"
            width="200"
            height="200"
            viewBox="0 0 2100 2100"
          >
            <Path
              fill-rule="nonzero"
              fill="black"
              fill-opacity="1"
              d="M 1050 375 C 677.527344 375 375 677.53125 375 1050 C 375 1422.472656 677.527344 1725 1050 1725 C 1422.46875 1725 1725 1422.472656 1725 1050 C 1725 677.53125 1422.46875 375 1050 375 Z M 1050 428.929688 C 1393.289062 428.929688 1671.070312 706.710938 1671.070312 1050 C 1671.070312 1233.511719 1591.171875 1397.75 1464.839844 1511.390625 L 1463.300781 1505.835938 C 1438.789062 1417.671875 1397.761719 1349.238281 1333.5 1289.132812 C 1301.710938 1259.394531 1271.808594 1235.0625 1267.058594 1235.0625 C 1262.300781 1235.0625 1239.878906 1249.179688 1217.210938 1266.492188 C 1117.089844 1342.910156 982.773438 1342.910156 882.660156 1266.492188 C 859.988281 1249.1875 837.5625 1235.0625 832.808594 1235.0625 C 828.046875 1235.0625 798.152344 1259.394531 766.363281 1289.132812 C 702.109375 1349.238281 661.148438 1417.671875 636.636719 1505.835938 L 635.089844 1511.390625 C 508.789062 1397.75 428.933594 1233.492188 428.933594 1050 C 428.933594 706.710938 706.71875 428.929688 1050 428.929688 Z M 1049.929688 763.191406 C 987.066406 763.191406 924.238281 788.898438 872.742188 840.398438 C 800.207031 912.941406 780.183594 996.25 810.65625 1098.871094 C 829.867188 1163.558594 901.808594 1237.058594 964.921875 1256.4375 C 1066.011719 1287.476562 1155.328125 1266.769531 1226.339844 1195.757812 C 1330.21875 1091.878906 1330.570312 943.78125 1227.191406 840.398438 C 1175.691406 788.898438 1112.800781 763.191406 1049.929688 763.191406 Z M 1049.929688 763.191406 "
            />
          </Svg>
        </View>
        <View style={styles.inputAndLabel}>
          <TextInput
            style={[styles.input, { width: "96%" }]}
            onChangeText={(newText) => {
              setName(newText);
            }}
            keyboardType="default"
            placeholder="Enter Your Name"
          ></TextInput>
        </View>
        <View style={[styles.inputAndLabel, { flexDirection: "row" }]}>
          <TextInput
            style={[styles.input, { width: "25%" }]}
            onChangeText={(newText) => {
              setAge(newText);
            }}
            keyboardType="numeric"
            placeholder="Age"
          ></TextInput>
          <Dropdown
            style={styles.dropdown}
            placeholderStyle={styles.dropdownPlaceholder}
            selectedTextStyle={styles.dropdownText}
            itemTextStyle={[{ fontSize: 20 }]}
            data={[
              { label: "Male", value: "Male" },
              { label: "Female", value: "Female" },
              { label: "Other", value: "Other" },
            ]}
            maxHeight={300}
            labelField="label"
            valueField="value"
            placeholder="Gender"
            searchPlaceholder="Search..."
            fontFamily="Poppins_400Regular"
            value={gender}
            onFocus={() => setIsFocus(true)}
            onBlur={() => setIsFocus(false)}
            onChange={(item) => {
              setGender(item.value);
              setIsFocus(false);
            }}
          />
        </View>
        <View
          style={{
            alignSelf: "center",
            position: "absolute",
            bottom: screenHeight * 0.015,
            width: "96%",
          }}
        >
          <ActivityIndicator
            size="large"
            color="black"
            animating={loading}
            style={{ marginBottom: 10 }}
          />
          <TouchableOpacity
            disabled={loading}
            style={styles.button}
            onPress={handleClick}
          >
            <Text style={styles.buttonText}>Create Account</Text>
          </TouchableOpacity>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  top: {
    flexDirection: "row",
    marginTop: "7%",
    marginLeft: "2%",
  },
  heading: {
    fontFamily: "Poppins_500Medium",
    fontSize: 24,
    marginTop: "-1.5%",
    marginLeft: "5%",
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
    marginLeft: "2%",
    height: 60,
    fontSize: 25,
    fontFamily: "Poppins_400Regular",
  },
  inputAndLabel: {
    display: "flex",
    flexDirection: "row",
    marginTop: "10%",
  },
  button: {
    width: "100%",
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
    borderWidth: 1,
    fontFamily: "Poppins_400Regular",
    fontSize: 20,
    color: "white",
  },
  dropdown: {
    width: "61%",
    fontSize: 20,
    padding: 5,
    marginLeft: "10%",
    borderWidth: 1,
    borderStyle: "solid",
    borderColor: "#91969E",
    borderRadius: 5,
    height: 60,
  },
  dropdownPlaceholder: {
    fontSize: 25,
    color: "#C7C7CD",
  },
  dropdownText: {
    fontSize: 24,
  },
});
