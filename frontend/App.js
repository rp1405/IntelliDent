import {
  Keyboard,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import { useContext, useState } from "react";
import { useFonts } from "@expo-google-fonts/gruppo";
import "react-native-gesture-handler";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Gruppo_400Regular } from "@expo-google-fonts/gruppo";
import "intl-pluralrules";
import {
  Poppins_400Regular,
  Poppins_600SemiBold,
  Poppins_500Medium,
  Poppins_700Bold,
  Poppins_100Thin,
  Poppins_200ExtraLight,
  Poppins_300Light,
} from "@expo-google-fonts/poppins";
import Login from "./components/login";
import Splash from "./components/splash";
import Signup from "./components/signup";
import Home from "./components/home";
import CreateNewAccount from "./components/createNewAccount";
import OtpScreen from "./components/otpScreen";
import Result from "./components/allTests";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import Configuration from "./contexts/configuration";
import ErrorBoundary from "react-native-error-boundary";
const Stack = createNativeStackNavigator();
export default function App() {
  const [user, setUser] = useState({});
  const [loading, setLoading] = useState(false);
  const [language, setLanguage] = useState("English");
  let [fontsLoaded, fontError] = useFonts({
    Gruppo_400Regular,
    Poppins_400Regular,
    Poppins_500Medium,
    Poppins_600SemiBold,
    Poppins_100Thin,
    Poppins_200ExtraLight,
    Poppins_300Light,
  });

  if (!fontsLoaded && !fontError) {
    return null;
  }
  return (
    <Configuration.Provider
      value={{ user, setUser, loading, setLoading, language, setLanguage }}
    >
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{ headerShown: false }}
          initialRouteName="Splash"
        >
          <Stack.Screen name="Splash" component={Splash} />
          <Stack.Screen name="Login" component={Login} />
          <Stack.Screen name="CreateNewAccount" component={CreateNewAccount} />
          <Stack.Screen name="Signup" component={Signup} />
          <Stack.Screen name="Home" component={Home} />
          <Stack.Screen name="OtpScreen" component={OtpScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </Configuration.Provider>
  );
}
