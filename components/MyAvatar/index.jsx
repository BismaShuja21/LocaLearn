import React from "react";
import { View } from "react-native";
import MyInput from "../MyInput";
import MyText from "../MyText";

export const MyAvatar = ({ name }) => {
  // Function to extract the first two initials from the name
  const getInitials = (name) => {
    const nameArray = name.split(" ");
    return (
      (nameArray[0] ? nameArray[0][0].toUpperCase() : "") +
      (nameArray[1] ? nameArray[1][0].toUpperCase() : "")
    );
  };
  return (
    <View
      style={{
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: "#4CAF50", // You can set your preferred background color
        alignItems: "center",
        justifyContent: "center",
        marginRight: 10, // Add margin as needed
      }}
    >
      <MyText size={16} color="white" weight="600">
        {getInitials(name)}
      </MyText>
    </View>
  );
};
