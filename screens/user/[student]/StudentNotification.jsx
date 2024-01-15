import React from "react";
import { View } from "react-native";
import { MyInput, MyNotification, MyText } from "../../../components";

export default function StudentNotifications() {
  return (
    <View stye={{ flex: 1, backgroudColor: "#f2f4fc" }}>
      <MyText>NOTIFICATIONS AND UPDATES</MyText>
      <MyNotification
        name={"Erica Robin"}
        message={"Wants to connect with you"}
      />
    </View>
  );
}
