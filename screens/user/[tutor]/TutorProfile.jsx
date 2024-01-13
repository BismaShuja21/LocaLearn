import React from "react";
import { View } from "react-native";
import { MyButton, MyInput, MyText } from "../../../components";
import { useNavigation } from "@react-navigation/native";

export default function TutorProfile() {
  const navigation = useNavigation();
  return (
    <View stye={{ flex: 1, backgroudColor: "#f2f4fc" }}>
      <MyText>Profile screeeen</MyText>
      <MyButton
        label={"Logout"}
        onPress={() => navigation.navigate("SignIn")}
      />
    </View>
  );
}
