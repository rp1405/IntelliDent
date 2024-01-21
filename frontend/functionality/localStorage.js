import AsyncStorage from "@react-native-async-storage/async-storage";
const storage = {
  setData: async (key, data) => {
    try {
      const value = await AsyncStorage.setItem(key, data);
      return value;
    } catch (error) {
      console.error("Error storing data:", error);
    }
  },
  getData: async (key) => {
    try {
      const value = await AsyncStorage.getItem(key);
      return value;
    } catch (error) {
      console.error("Error retrieving data:", error);
    }
  },
  clearData: async (key) => {
    try {
      await AsyncStorage.removeItem(key);
    } catch (error) {
      console.error("Error clearing AsyncStorage:", error);
    }
  },
};
export default storage;
