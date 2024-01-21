import {
  Button,
  StyleSheet,
  TextInput,
  Touchable,
  TouchableOpacity,
  View,
} from "react-native";
import { Svg, Rect } from "react-native-svg";
export default function MenuButton({ navigation, color }) {
  return (
    <TouchableOpacity
      style={{ position: "absolute", left: 2 }}
      onPress={() => {
        navigation.toggleDrawer();
      }}
    >
      <View style={{ padding: 2 }}>
        <Svg
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <Rect width="24" height="4" rx="2" fill={color} />
          <Rect y="10" width="24" height="4" rx="2" fill={color} />
          <Rect y="20" width="24" height="4" rx="2" fill={color} />
        </Svg>
      </View>
    </TouchableOpacity>
  );
}
