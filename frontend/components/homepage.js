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
import { launchCameraAsync, launchImageLibraryAsync } from "expo-image-picker";
import * as permissions from "expo-permissions";
import Header from "./header";
import Configuration from "../contexts/configuration";
import translations from "../translations/transaltions";
import { updateUser } from "../functionality/dataOperations";
import storage from "../functionality/localStorage";
import { sendFile, sendMessage } from "../functionality/messageService";
import treatment from "../functionality/treatments";
const screenWidth = Dimensions.get("window").width;
const screenHeight = Dimensions.get("window").height;
export default function Homepage({ navigation }) {
  const { user, setUser, loading, setLoading, language, setLanguage } =
    useContext(Configuration);
  const placeholderImage =
    "https://placehold.co/1000x1000/FFFFFF/000000/webp?text=Add+Image&font=Montserrat";
  const [img, setImg] = useState(null);
  const [imgUrl, setImgUrl] = useState(placeholderImage);
  const openCamera = async () => {
    const newpermission = await permissions.askAsync(permissions.CAMERA);
    if (newpermission.status != "granted") {
      Alert.alert(
        translations[language].error,
        translations[language].cameraPermissions
      );
    }
    const result = await launchCameraAsync();
    setImg(result?.assets[0]);
    setImgUrl(result?.assets[0]?.uri);
  };
  const openGallery = async () => {
    const result = await launchImageLibraryAsync();
    setImg(result?.assets[0]);
    setImgUrl(result?.assets[0]?.uri);
  };
  const imageUpload = async () => {
    if (img == null) {
      Alert.alert(
        translations[language].error,
        translations[language].selectImage
      );
      return;
    }
    setLoading(true);
    try {
      const formData = new FormData();
      formData.append("upload_file", {
        //model is expecting a file named upload_file
        uri: img.uri,
        name: "image.jpg", // Set a specific name for the file
        type: `image/${img.uri.split(".").pop()}`, // Determine the image type dynamically
      });
      const response = await fetch("http://139.59.44.237:8000/get_image", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "JSON",
        },
        body: formData,
        redirect: "follow",
      });
      const data = await response.json();
      const finalResult = {
        testId: 10000 + user.tests.length + 1,
        time: Date.now(),
        result: data,
      };
      console.log(finalResult.result);
      setUser((prevUser) => ({
        ...prevUser,
        tests: [...prevUser.tests, finalResult],
      }));
      await storage.setData("user", JSON.stringify(user));
      const updatedUser = await updateUser(user);
      async function sendDentalFile(condition, status, link, mobileNumber) {
        if (status === "positive") {
          await sendFile(mobileNumber, condition, link);
          await sendFile(
            process.env.EXPO_PUBLIC_ADMIN_MOBILE_NUMBER,
            condition,
            link
          );
        }
      }
      // console.log(1);
      await sendDentalFile(
        translations[language].dentalCavity +
          " " +
          translations[language].detected +
          "\n" +
          `*${translations[language].treatments}*\n` +
          treatment[language].dentalCavity,
        finalResult.result.dentalCavity.status,
        finalResult.result.dentalCavity.link,
        user.mobileNumber
      );
      // console.log(2);
      await sendDentalFile(
        translations[language].spacesBetweenTeeth +
          " " +
          translations[language].detected +
          "\n" +
          `*${translations[language].treatments}*\n` +
          treatment[language].spacesBetweenTeeth,
        finalResult.result.spacesBetweenTeeth.status,
        finalResult.result.spacesBetweenTeeth.link,
        user.mobileNumber
      );
      // console.log(3);
      await sendDentalFile(
        translations[language].dentalStain +
          " " +
          translations[language].detected +
          "\n" +
          `*${translations[language].treatments}*\n` +
          treatment[language].dentalStain,
        finalResult.result.dentalStain.status,
        finalResult.result.dentalStain.link,
        user.mobileNumber
      );
      // console.log(4);
      await sendDentalFile(
        translations[language].dentalCalculus +
          " " +
          translations[language].detected +
          "\n" +
          `*${translations[language].treatments}*\n` +
          treatment[language].dentalCalculus,
        finalResult.result.dentalCalculus.status,
        finalResult.result.dentalCalculus.link,
        user.mobileNumber
      );
      // console.log(5);
      const messageEnglish =
        "Dear " +
        user.name +
        ",\n\n" +
        "Thank you for using the Intellident app to monitor and maintain your dental health. We appreciate your commitment to proactive healthcare.\n\n" +
        "Here are the details of your recent dental assessment:\n\n" +
        "- *Patient Name:* " +
        user.name +
        "\n" +
        "- *Patient Age:* " +
        user.age +
        "\n" +
        "- *Mobile Number:* " +
        user.mobileNumber +
        "\n\n" +
        "*Test Results:*\n" +
        "1. *Dental Cavities:* " +
        translations[language][finalResult.result.dentalCavity.status] +
        "\n" +
        "2. *Spaces Between Teeth:* " +
        translations[language][finalResult.result.spacesBetweenTeeth.status] +
        "\n" +
        "3. *Dental Stain:* " +
        translations[language][finalResult.result.dentalStain.status] +
        "\n" +
        "4. *Dental Calculus:* " +
        translations[language][finalResult.result.dentalCalculus.status] +
        "\n\n" +
        "If you have any questions or concerns regarding these results, please feel free to reach out to us.\n\n" +
        "*Contact Details of Your Dentist:*\n" +
        "*Akshay Dental Clinic*\n" +
        "- Address: 1st Floor, Chandraprabhu Market, Jai Dayal Rd, Opp. Bank of India, Vishwkarma Park, Gole Bazar, Katni, Madhya Pradesh 483501\n" +
        "- Contact Numbers: 9425152372 9993383153\n\n" +
        "We encourage you to schedule a follow-up appointment with Akshay Dental Clinic for further consultation or treatment if needed.\n\n" +
        "Thank you for trusting Intellident for your dental care. We look forward to continuing to support your health and wellness.\n\n" +
        "Best Regards,\n" +
        "Intellident";
      const messageHindi =
        "प्रिय " +
        user.name +
        ",\n\n" +
        "इंटेलीडेंट ऐप का उपयोग करने के लिए धन्यवाद। आपके दंत स्वास्थ्य को मॉनिटर करने और बनाए रखने के लिए। हम आपके सकारात्मक स्वास्थ्य से समर्थन करने के लिए कृतज्ञ हैं।\n\n" +
        "यहां आपके हाल के डेंटल मूल्यांकन के विवरण हैं:\n\n" +
        "- *रोगी का नाम:* " +
        user.name +
        "\n" +
        "- *रोगी की आयु:* " +
        user.age +
        "\n" +
        "- *मोबाइल नंबर:* " +
        user.mobileNumber +
        "\n\n" +
        "*परीक्षण परिणाम:*\n" +
        "1. *दांतो में कीड़ा:* " +
        translations[language][finalResult.result.dentalCavity.status] +
        "\n" +
        "2. *दांतो में गैप:* " +
        translations[language][finalResult.result.spacesBetweenTeeth.status] +
        "\n" +
        "3. *दांतो में दाग़:* " +
        translations[language][finalResult.result.dentalStain.status] +
        "\n" +
        "4. *पथरीली जमावत:* " +
        translations[language][finalResult.result.dentalCalculus.status] +
        "\n\n" +
        "यदि इन परिणामों के संबंध में कोई सवाल या चिंता है, तो कृपया हमसे संपर्क करें।\n\n" +
        "*आपके दंतचिकित्सक की संपर्क जानकारी:*\n" +
        "*अक्षय डेंटल क्लिनिक*\n" +
        "- पता: 1वीं मंजिल, चंद्रप्रभु मार्केट, जय दयाल रोड, बैंक ऑफ इंडिया के सामने, विश्वकर्मा पार्क, गोले बाजार, कटनी, मध्य प्रदेश 483501\n" +
        "- संपर्क नंबर: 9425152372, 9993383153\n\n" +
        "हम आपको आवश्यकता होने पर आक्षय डेंटल क्लिनिक के साथ एक फॉलो-अप अपॉइंटमेंट निर्धारित करने की सलाह देते हैं।\n\n" +
        "आपके दंत स्वास्थ्य के लिए इंटेलीडेंट का विश्वास करने के लिए धन्यवाद। हम आपके स्वास्थ्य और कल्याण का समर्थन करने के लिए उत्सुक हैं।\n\n" +
        "शुभकामनाएं,\n" +
        "इंटेलीडेंट";
      await sendMessage(
        user.mobileNumber,
        language == "English" ? messageEnglish : messageHindi
      );
      await sendMessage(
        process.env.EXPO_PUBLIC_ADMIN_MOBILE_NUMBER,
        language == "English" ? messageEnglish : messageHindi
      );
      setImgUrl(placeholderImage);
      navigation.navigate("testDetails", {
        test: finalResult,
      });
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  };
  return (
    <>
      <View style={styles.container}>
        <Header theme="light" navigation={navigation} />
        <View style={{ alignItems: "center" }}>
          <Text
            style={{
              fontFamily: "Poppins_500Medium",
              marginTop: 0.04 * screenHeight,
              marginBottom: 10,
              fontSize: 20,
            }}
          >
            {translations[language].selectMode}
          </Text>
          <Image
            source={{
              uri: imgUrl,
            }}
            height={1.2 * screenWidth}
            width={0.9 * screenWidth}
          ></Image>
          <View style={{ marginTop: "-23%" }}>
            <TouchableOpacity
              onPress={imageUpload}
              style={{
                backgroundColor: "black",
                width: 100,
                height: 0.05 * screenHeight,
                marginTop: 10,
                borderRadius: 10,
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              {loading ? (
                <ActivityIndicator color="white" animating={loading} />
              ) : (
                <View>
                  <Text
                    style={{
                      color: "white",
                      fontFamily: "Poppins_400Regular",
                      fontSize: 15,
                    }}
                  >
                    {translations[language].submit}
                  </Text>
                </View>
              )}
            </TouchableOpacity>
          </View>
        </View>
        <View
          style={{
            position: "absolute",
            bottom: screenHeight * 0.01,
            display: "flex",
            flexDirection: "row",
            alignSelf: "center",
          }}
        >
          <View style={{ alignItems: "center" }}>
            <TouchableOpacity onPress={openGallery}>
              <Svg
                height="80"
                id="Layer_1"
                version="1.1"
                viewBox="0 0 50 50"
                width="80"
              >
                <G id="Layer_1">
                  <Path d="M43,39h6V4H8v6H1v36h42V39z M10,6h37v31h-4V10H10V6z M8,12h33v7.586l-4-4l-17,17l-10-10l-7,7V12H8z M41,44H3V32.414l7-7   l10,10l17-17l4,4V39V44z" />
                  <Path d="M20,25c2.757,0,5-2.243,5-5s-2.243-5-5-5s-5,2.243-5,5S17.243,25,20,25z M20,17c1.654,0,3,1.346,3,3s-1.346,3-3,3   s-3-1.346-3-3S18.346,17,20,17z" />
                </G>
                <G />
              </Svg>
            </TouchableOpacity>
            <Text style={{ fontFamily: "Poppins_500Medium" }}>
              {translations[language].gallery}
            </Text>
          </View>
          <View
            style={{
              alignItems: "center",
              marginLeft: "40%",
            }}
          >
            <TouchableOpacity onPress={openCamera}>
              <Svg
                height="80"
                id="Layer_1"
                version="1.1"
                viewBox="0 0 50 50"
                width="80"
              >
                <Path
                  clipRule="evenodd"
                  d="M43,41H5c-2.209,0-4-1.791-4-4V15c0-2.209,1.791-4,4-4h1l0,0c0-1.104,0.896-2,2-2h2c1.104,0,2,0.896,2,2h2c0,0,1.125-0.125,2-1l2-2c0,0,0.781-1,2-1h8c1.312,0,2,1,2,1l2,2c0.875,0.875,2,1,2,1h9c2.209,0,4,1.791,4,4v22C47,39.209,45.209,41,43,41z M45,15c0-1.104-0.896-2-2-2l-9.221-0.013c-0.305-0.033-1.889-0.269-3.193-1.573  l-2.13-2.13l-0.104-0.151C28.351,9.132,28.196,9,28,9h-8c-0.153,0-0.375,0.178-0.424,0.231l-0.075,0.096l-2.087,2.086  c-1.305,1.305-2.889,1.54-3.193,1.573l-4.151,0.006C10.046,12.994,10.023,13,10,13H8c-0.014,0-0.026-0.004-0.04-0.004L5,13  c-1.104,0-2,0.896-2,2v22c0,1.104,0.896,2,2,2h38c1.104,0,2-0.896,2-2V15z M24,37c-6.075,0-11-4.925-11-11s4.925-11,11-11  s11,4.925,11,11S30.075,37,24,37z M24,17c-4.971,0-9,4.029-9,9s4.029,9,9,9s9-4.029,9-9S28.971,17,24,17z M24,31  c-2.762,0-5-2.238-5-5s2.238-5,5-5s5,2.238,5,5S26.762,31,24,31z M24,23c-1.656,0-3,1.344-3,3c0,1.657,1.344,3,3,3  c1.657,0,3-1.343,3-3C27,24.344,25.657,23,24,23z M10,19H6c-0.553,0-1-0.447-1-1v-2c0-0.552,0.447-1,1-1h4c0.553,0,1,0.448,1,1v2  C11,18.553,10.553,19,10,19z"
                  fillRule="evenodd"
                />
              </Svg>
            </TouchableOpacity>
            <Text style={{ fontFamily: "Poppins_500Medium" }}>
              {translations[language].camera}
            </Text>
          </View>
        </View>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
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
  },
  givePadding(x) {
    return { padding: x + "%" };
  },
  fontSize(x) {
    return { fontSize: x };
  },
});
