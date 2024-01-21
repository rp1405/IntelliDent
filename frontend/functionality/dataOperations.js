import axios from "axios";
const addNewUser = async (data) => {
  try {
    const url = process.env.EXPO_PUBLIC_BACKEND_API_LINK + "/addNewUser";
    const response = await axios.post(url, data);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};
const getUserDataById = async (id) => {
  try {
    const url =
      process.env.EXPO_PUBLIC_BACKEND_API_LINK + "/getUserDataByID?id=";
    const response = await axios.get(url + id);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};
const getUserDataByMobileNumber = async (mobileNumber) => {
  try {
    const url =
      process.env.EXPO_PUBLIC_BACKEND_API_LINK +
      "/getUserDataByMobileNumber?mobileNumber=";
    const response = await axios.get(url + mobileNumber);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};
const updateUser = async (data) => {
  try {
    const url = process.env.EXPO_PUBLIC_BACKEND_API_LINK + "/updateUser";
    const response = await axios.patch(url, data);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};
export { addNewUser, getUserDataById, getUserDataByMobileNumber, updateUser };
