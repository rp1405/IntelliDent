import React, { useContext } from "react";
import {
  View,
  ActivityIndicator,
  StyleSheet,
  ScrollView,
  Text,
} from "react-native";
import Configuration from "../contexts/user";

const Loading = () => {
  const { loading } = useContext(Configuration);
  return <ActivityIndicator size="large" color="#ffffff" animating={loading} />;
};

export default Loading;
