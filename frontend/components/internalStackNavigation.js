import { createStackNavigator } from "@react-navigation/stack";
import React, { useEffect } from "react";
import Homepage from "./homepage";
import TestDetails from "./testDetails";
import ResultSplash from "./ResultSplash";
import AllTests from "./allTests";
const Stack = createStackNavigator();
const InternalStackNavigation = ({ navigation }) => {
  return (
    <Stack.Navigator
      screenOptions={{ headerShown: false }}
      initialRouteName="Homepage"
    >
      <Stack.Screen name="Homepage" component={Homepage} />
      <Stack.Screen name="ResultSplash" component={ResultSplash} />
      <Stack.Screen name="testDetails" component={TestDetails} />
    </Stack.Navigator>
  );
};
export default InternalStackNavigation;
