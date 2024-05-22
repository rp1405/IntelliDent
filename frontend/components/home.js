import {
  createDrawerNavigator,
  DrawerItemList,
} from "@react-navigation/drawer";
import {
  StyleSheet,
  View,
  Text,
  SafeAreaView,
  Dimensions,
  Linking,
  Alert,
  TouchableOpacity,
} from "react-native";
import { Svg, Path, G, Defs, Rect, Line, Circle } from "react-native-svg";
import translations from "../translations/transaltions";
import TestDetails from "./testDetails";
import Homepage from "./homepage";
import Profile from "./Profile";
import AllTests from "./allTests";
import { useContext, useEffect } from "react";
import Configuration from "../contexts/configuration";
import InternalStackNavigation from "./internalStackNavigation";
import About from "./aboutUs";
import Social from "./social";
export default function Home({ navigation }) {
  const { language } = useContext(Configuration);
  const Drawer = createDrawerNavigator();
  const screenHeight = Dimensions.get("window").height;
  return (
    <Drawer.Navigator
      drawerContent={(props) => {
        return (
          <View
            style={{
              display: "flex",
              flexDirection: "column",
              height: screenHeight * 0.95,
              // borderColor: "red",
              // borderWidth: 1,
            }}
          >
            <View style={[{ alignItems: "center", marginTop: 20 }]}>
              <Text
                style={[
                  styles.setColorWhite,
                  styles.fontSize(50),
                  {
                    fontFamily:
                      language == "English" ? "Gruppo_400Regular" : "",
                  },
                ]}
              >
                {translations[language].intelliDent}
              </Text>
              <Text
                style={[
                  styles.setColorWhite,
                  styles.fontSize(15),
                  {
                    fontFamily: "Poppins_400Regular",
                    marginTop: "0%",
                    marginBottom: "10%",
                  },
                ]}
              >
                {translations[language].dentalCareXAI}
              </Text>
            </View>
            <DrawerItemList {...props} />
            <View
              style={[
                {
                  position: "absolute",
                  bottom: 0,
                },
              ]}
            >
              <Social />
            </View>
          </View>
        );
      }}
      screenOptions={{
        headerShown: false,
        drawerStyle: {
          width: "80%",
          height: "100%",
          backgroundColor: "black",
          paddingTop: "5%",
          paddingHorizontal: "2%",
        },
        drawerActiveTintColor: "white",
        drawerActiveBackgroundColor: "#2B2B2B",
        drawerInactiveBackgroundColor: "black",
        drawerInactiveTintColor: "white",
      }}
      initialRouteName="Homepage"
    >
      <Drawer.Screen
        options={{
          name: "Home",
          drawerIcon: () => (
            <Svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
            >
              <Path
                d="M15 22.065V17.065C15 16.2693 14.6839 15.5063 14.1213 14.9437C13.5587 14.3811 12.7956 14.065 12 14.065C11.2044 14.065 10.4413 14.3811 9.87868 14.9437C9.31607 15.5063 9 16.2693 9 17.065V22.065H4C3.46957 22.065 2.96086 21.8543 2.58579 21.4792C2.21071 21.1041 2 20.5954 2 20.065V9.19699C2 8.85162 2.08943 8.51213 2.25959 8.21159C2.42976 7.91104 2.67485 7.65969 2.971 7.48199L10.971 2.68199C11.2818 2.49549 11.6375 2.39697 12 2.39697C12.3625 2.39697 12.7182 2.49549 13.029 2.68199L21.029 7.48199C21.3252 7.65969 21.5702 7.91104 21.7404 8.21159C21.9106 8.51213 22 8.85162 22 9.19699V20.065C22 20.5954 21.7893 21.1041 21.4142 21.4792C21.0391 21.8543 20.5304 22.065 20 22.065H15Z"
                fill="#FBFCFF"
              />
            </Svg>
          ),
          title: translations[language].home,
        }}
        name="InternalStackNavigation"
        component={InternalStackNavigation}
      />
      <Drawer.Screen
        options={{
          drawerIcon: () => (
            <Svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
            >
              <Path
                d="M4,23H20a1,1,0,0,0,1-1V6a1,1,0,0,0-.293-.707l-4-4A1,1,0,0,0,16,1H4A1,1,0,0,0,3,2V22A1,1,0,0,0,4,23ZM5,3H15.586L19,6.414V21H5Zm11,9a1,1,0,0,1-1,1H13v2a1,1,0,0,1-2,0V13H9a1,1,0,0,1,0-2h2V9a1,1,0,0,1,2,0v2h2A1,1,0,0,1,16,12Z"
                fill="#FBFCFF"
              />
            </Svg>
          ),
          title: translations[language].yourTests,
        }}
        name="allTests"
        component={AllTests}
      />
      <Drawer.Screen
        options={{
          drawerIcon: () => (
            <Svg
              viewBox="0 0 32 32"
              xmlns="http://www.w3.org/2000/svg"
              fill={"white"}
              height={24}
              width={24}
            >
              <Defs></Defs>
              <G>
                <Path d="M16,17a8,8,0,1,1,8-8A8,8,0,0,1,16,17ZM16,3a6,6,0,1,0,6,6A6,6,0,0,0,16,3Z" />
                <Path d="M23,31H9a5,5,0,0,1-5-5V22a1,1,0,0,1,.49-.86l5-3a1,1,0,0,1,1,1.72L6,22.57V26a3,3,0,0,0,3,3H23a3,3,0,0,0,3-3V22.57l-4.51-2.71a1,1,0,1,1,1-1.72l5,3A1,1,0,0,1,28,22v4A5,5,0,0,1,23,31Z" />
              </G>
            </Svg>
          ),
          title: translations[language].profile,
        }}
        name="Profile"
        component={Profile}
      />
      <Drawer.Screen
        options={{
          drawerIcon: () => (
            <Svg
              xmlns="http://www.w3.org/2000/svg"
              width={24}
              height={24}
              viewBox="0 0 24 24"
              fill="none"
              stroke="white"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
              class="lucide lucide-sprout"
            >
              <Path d="M7 20h10" />
              <Path d="M10 20c5.5-2.5.8-6.4 3-10" />
              <Path d="M9.5 9.4c1.1.8 1.8 2.2 2.3 3.7-2 .4-3.5.4-4.8-.3-1.2-.6-2.3-1.9-3-4.2 2.8-.5 4.4 0 5.5.8z" />
              <Path d="M14.1 6a7 7 0 0 0-1.1 4c1.9-.1 3.3-.6 4.3-1.4 1-1 1.6-2.3 1.7-4.6-2.7.1-4 1-4.9 2z" />
            </Svg>
          ),
          title: translations[language].about,
        }}
        name="AboutUs"
        component={About}
      />
    </Drawer.Navigator>
  );
}
const styles = StyleSheet.create({
  container: {
    width: "80%",
    height: "100%",
    backgroundColor: "black",
    paddingTop: "5%",
    paddingHorizontal: "2%",
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
