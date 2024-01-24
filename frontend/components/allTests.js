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
} from "react-native";
import { Svg, G, Path } from "react-native-svg";
import * as permissions from "expo-permissions";
import Configuration from "../contexts/configuration";
import translations from "../translations/transaltions";
import Header from "./header";
export default function AllTests({ route, navigation }) {
  const { user, setUser, Loading, setLoading, language } =
    useContext(Configuration);
  const { tests } = user;
  const TestCard = ({ test }) => {
    const date = new Date(test.time);
    const testTime = date.toLocaleTimeString();
    const testDate = date.toLocaleDateString();
    return (
      <TouchableOpacity
        style={{
          backgroundColor: "transparent",
          borderRadius: 5,
          padding: 20,
          margin: 10,
          borderColor: "white",
          borderWidth: 0.3,
        }}
        onPress={() => {
          navigation.navigate("testDetails", {
            test: test,
          });
          console.log(test.testId);
        }}
      >
        <View
          style={{
            flex: 1,
            flexDirection: "row",
            justifyContent: "space-around",
          }}
        >
          <View>
            <Text
              style={{
                fontFamily: "Poppins_400Regular",
                color: "white",
                flex: 3,
              }}
            >
              {translations[language].testId} : {test.testId}
            </Text>
            <Text style={{ fontFamily: "Poppins_400Regular", color: "white" }}>
              {translations[language].date}: {testDate}
            </Text>
            <Text style={{ fontFamily: "Poppins_400Regular", color: "white" }}>
              {translations[language].time}: {testTime}
            </Text>
          </View>
          <View style={{ justifyContent: "center" }}>
            <Text
              style={{
                fontFamily: "Poppins_400Regular",
                color: "white",
                fontSize: 20,
              }}
            >
              {translations[language].getDetails} →
            </Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  };
  return (
    <>
      <ScrollView style={styles.container}>
        <Header theme="dark" navigation={navigation} />
        {tests.map((obj, index) => {
          return <TestCard key={index} test={obj} />;
        })}
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
  givePadding(x) {
    return { padding: x + "%" };
  },
  fontSize(x) {
    return { fontSize: x };
  },
});
