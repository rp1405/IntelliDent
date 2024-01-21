import React, { useState } from "react";
import { Picker, Item } from "@react-native-picker/picker";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Alert,
} from "react-native";
import MenuButton from "./menuButton";
const AddTransaction = ({ navigation }) => {
  const [name, setName] = useState("");
  const [amount, setAmount] = useState("");
  const [notes, setNotes] = useState("");
  const [transactionType, setTransactionType] = useState("online");
  const handleAddTransaction = () => {
    if (name === "") {
      Alert.alert("Error!", "Please enter Name");
      return;
    }
    if (amount === "") {
      Alert.alert("Error!", "Please enter Name");
    }
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.top}>
        <MenuButton navigation={navigation} />
        <Text component="h1" style={styles.heading}>
          Flow
        </Text>
      </View>
      <View style={{ alignItems: "center" }}>
        <Text style={styles.heading2}>Add New Transaction</Text>
      </View>
      <TextInput
        style={styles.input}
        placeholder="Name"
        value={name}
        onChangeText={(text) => setName(text)}
      />

      {/* Amount Input */}
      <TextInput
        style={styles.input}
        placeholder="Amount"
        keyboardType="numeric"
        value={amount}
        onChangeText={(text) => setAmount(text)}
      />
      {/* Transaction Type Dropdown */}
      <View style={styles.input}>
        <Text
          style={[
            { fontFamily: "Poppins_400Regular", marginBottom: "-15%" },
            styles.fontSize(16),
          ]}
        >
          Transaction Type:
        </Text>
        <Picker
          style={{ height: "30%" }}
          selectedValue={transactionType}
          onValueChange={(itemValue) => setTransactionType(itemValue)}
        >
          <Picker.Item label="Online" value="online" />
          <Picker.Item label="Cash" value="cash" />
        </Picker>
      </View>
      <TextInput
        style={styles.input}
        placeholder="Notes"
        value={notes}
        onChangeText={(text) => setNotes(text)}
      />

      {/* Add Transaction Button */}
      <TouchableOpacity style={styles.button} onPress={handleAddTransaction}>
        <Text style={styles.buttonText}>Add Transaction</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  top: {
    flexDirection: "row",
    marginTop: "7%",
    marginLeft: "2%",
  },
  heading: {
    fontFamily: "Gruppo_400Regular",
    fontSize: 37,
    marginTop: "-1.5%",
    marginLeft: "35%",
  },
  heading2: {
    fontSize: 20,
    marginBottom: 20,
    marginTop: 20,
    fontFamily: "Poppins_600SemiBold",
  },
  input: {
    borderWidth: 1,
    borderColor: "gray",
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
    fontFamily: "Poppins_400Regular",
  },
  button: {
    width: "100%",
    backgroundColor: "black",
    marginTop: "5%",
    padding: 10,
    borderWidth: 0,
    borderStyle: "solid",
    borderRadius: 5,
    alignItems: "center",
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
    fontFamily: "Poppins_500Medium",
  },
  fontSize(x) {
    return { fontSize: x };
  },
});

export default AddTransaction;
