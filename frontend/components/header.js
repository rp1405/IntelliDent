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
import translations from "../translations/transaltions";
import Configuration from "../contexts/configuration";
import MenuButton from "./menuButton";
const Header = ({ navigation, theme }) => {
  const { user, setUser, language, setLanguage } = useContext(Configuration);
  return (
    <View
      style={{
        justifyContent: "center",
        flexDirection: "row",
        alignItems: "center",
        marginTop: "2%",
        width: "100%",
      }}
    >
      <MenuButton
        navigation={navigation}
        color={theme == "dark" ? "white" : "black"}
      />
      <View
        style={{
          flexDirection: "row",
          justifyContent: "center",
          alignSelf: "stretch",
        }}
      >
        <Text
          component="h1"
          style={{
            alignSelf: "center",
            fontFamily: language == "English" ? "Gruppo_400Regular" : "",
            fontSize: 33,
            color: theme == "dark" ? "white" : "black",
          }}
        >
          {translations[language].intelliDent}
        </Text>
      </View>
    </View>
  );
};
export default Header;
