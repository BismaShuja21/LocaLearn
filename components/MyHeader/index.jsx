import React from "react";
import { View } from "react-native";
import { Bulb, BulbOff } from "../../assets/vectors";
import MyText from "../MyText";

export default function MyHeader() {
  return (
    <View
      style={{
        width: "100%",
        height: 40,
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#e2b623",
        justifyContent: "center",
        paddingHorizontal: 10,
        paddingBottom: 5,
      }}
    >
      <BulbOff
        width={32}
        height={32}
        style={{ position: "absolute", left: 20, bottom: 8 }}
      />
      <MyText weight={"700"} size={24}>
        LocaLearn
      </MyText>
    </View>
  );
}
