import React from "react";
import { View } from "react-native";
import { MyInput, MyText } from "../../../components";

export default function StudentProfileSetup() {
  return (
    <View style={{ flex: 1, backgroudColor: "#f2f4fc", paddingVertical: 50 }}>
      <View style={{ width: "85%", alignSelf: "center" }}>
        <MyText
          text={"Please Enter detials to proceed"}
          size={20}
          numberOfLines={2}
          style={{ textAlign: "center" }}
        />
        <MyText text={"Age"} />
        <MyInput />
        <MyText text={"Gender"} />
        <MyInput placeholder={"male | female"} />
      </View>
    </View>
  );
}
