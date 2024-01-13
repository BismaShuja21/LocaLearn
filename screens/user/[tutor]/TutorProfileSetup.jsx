import React, { useState } from "react";
import { View } from "react-native";
import {
  MyInput,
  MyButton,
  MyText,
  GapView,
  MyDropdown,
} from "../../../components";
import { Form } from "../../../assets/vectors";
import { useNavigation } from "@react-navigation/native";

export default function TutorProfileSetup() {
  const [page2, setPage2] = useState(false);
  const navigation = useNavigation();
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: "#f2f4fc",
        paddingVertical: 100,
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
        {page2 ? (
          <>
            <View style={{ width: "100%" }}>
              <MyText
                text={"Availability"}
                style={{ paddingLeft: 5, paddingBottom: 5 }}
              />
              <MyDropdown
                placeholder="Days--"
                data={[
                  "Monday",
                  "Tuesday",
                  "Wednesday",
                  "Thurday",
                  "Friday",
                  "Saturday",
                  "Sunday",
                ]}
                zIndex={8}
                onSelect={(value) => {
                  console.log("data", value);
                }}
                multiSelect
              />
            </View>
            <View style={{ width: "100%" }}>
              <MyText
                text={"Description"}
                style={{ paddingLeft: 5, paddingBottom: 5 }}
              />
              <MyInput style={{ height: 90 }} multiline={true} />
            </View>
            <View style={{ width: "100%" }}>
              <MyText
                text={"Experience"}
                style={{ paddingLeft: 5, paddingBottom: 5 }}
              />
              <MyInput style={{ height: 90 }} multiline={true} />
            </View>
            <GapView length={40} />
            <MyButton
              label={"Complete Profile"}
              onPress={() => {
                navigation.navigate("TutorTab");
              }}
            />
          </>
        ) : (
          <>
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
            <View style={{ width: "100%" }}>
              <MyText
                text={"Qualification"}
                style={{ paddingLeft: 5, paddingBottom: 5 }}
              />
              <MyDropdown
                placeholder="Qualification--"
                data={["Masters", "Bacehelors", "Undergraduate"]}
                zIndex={9}
                onSelect={(value) => {
                  console.log("data", value);
                }}
              />
            </View>
            <View style={{ width: "100%" }}>
              <MyText
                text={"Tutoring Preferences"}
                style={{ paddingLeft: 5, paddingBottom: 5 }}
              />
              <MyDropdown
                placeholder="Preferences--"
                data={["Student's Space", "Tutor's Space"]}
                zIndex={8}
                onSelect={(value) => {
                  console.log("data", value);
                }}
                multiSelect
              />
            </View>
            <GapView length={30} />
            <MyButton
              label={"Proceed"}
              onPress={() => {
                setPage2(true);
              }}
            />
          </>
        )}
      </View>
    </View>
  );
}
