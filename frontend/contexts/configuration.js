import { createContext } from "react";
const Configuration = createContext({
  user: {
    id: "",
    name: "",
    mobileNumber: "",
    age: "",
    gender: "",
    tests: [],
  },
  setUser: () => {},
  loading: false,
  setLoading: () => {},
  language: "English",
  setLanguage: () => {},
});
export default Configuration;
