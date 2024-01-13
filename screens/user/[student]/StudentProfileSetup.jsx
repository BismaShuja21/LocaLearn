import React from "react";
import { View } from "react-native";
import { GapView, MyButton, MyInput, MyText } from "../../../components";
import { Form } from "../../../assets/vectors";
import { useNavigation } from "@react-navigation/native";
import StudentProfile from "./StudentProfile";

export default function StudentProfileSetup() {
  const navigation = useNavigation();
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: "#f2f4fc",
        paddingVertical: 120,
        width: "100%",
        height: "100%",
        alignItems: "center",
        paddingHorizontal: 20,
      }}
    >
      <View
        style={{
          width: "100%",
          alignSelf: "center",
          alignItems: "center",
          gap: 5,
        }}
      >
        <Form width={150} height={120} style={{ marginLeft: 20 }} />
        <MyText
          text={"Please Enter details to proceed"}
          size={20}
          style={{ textAlign: "center", paddingVertical: 10 }}
        />

        <View style={{ width: "100%" }}>
          <MyText
            text={"First Name"}
            style={{ paddingLeft: 5, paddingBottom: 5 }}
          />
          <MyInput />
        </View>
        <View style={{ width: "100%" }}>
          <MyText
            text={"Last Name"}
            style={{ paddingLeft: 5, paddingBottom: 5 }}
          />
          <MyInput />
        </View>
        <View
          style={{
            flexDirection: "row",
            width: "100%",
            justifyContent: "space-between",
          }}
        >
          <View style={{ width: "47%" }}>
            <MyText text={"Age"} style={{ paddingLeft: 5, paddingBottom: 5 }} />
            <MyInput />
          </View>
          <View style={{ width: "47%" }}>
            <MyText
              text={"Grade"}
              style={{ paddingLeft: 5, paddingBottom: 5 }}
            />
            <MyInput />
          </View>
        </View>
        <GapView length={30} />
        <MyButton
          label={"Submit"}
          onPress={() => {
            navigation.navigate("StudentTab");
          }}
        />
      </View>
    </View>
  );
}
