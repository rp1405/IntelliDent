import { useContext } from "react";
import {
  Button,
  StyleSheet,
  TextInput,
  Touchable,
  TouchableOpacity,
  View,
} from "react-native";
import { Svg, Path } from "react-native-svg";
import Configuration from "../contexts/configuration";
export default function Backbutton({ navigation, color }) {
  const { loading } = useContext(Configuration);
  return (
    <TouchableOpacity
      style={{ position: "absolute", left: 0, top: 0 }}
      disabled={loading}
      onPress={() => {
        navigation.goBack();
      }}
    >
      <Svg
        height="24"
        width="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke={color}
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <Path d="M19 12H5M12 19l-7-7 7-7" />
      </Svg>
    </TouchableOpacity>
  );
}
