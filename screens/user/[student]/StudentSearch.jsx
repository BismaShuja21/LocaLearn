import React from "react";
import { ImageBackground, View } from "react-native";
import { GapView, MySearchBar, MyText } from "../../../components";
import { SafeAreaView } from "react-native-safe-area-context";

export default function StudentSearch() {
  const subjects = ["Mathematics", "English", "Physics", "science"];
  return (
    <View style={{ flex: 1, backgroundColor: "#f2f4fc", paddingVertical: 10 }}>
      <MySearchBar style={{ marginHorizontal: 10 }} />
      <GapView length={10} />
      <ImageBackground
        source={require("../../../assets/pngs/map2.png")}
        style={{
          resizeMode: "cover",
          justifyContent: "center",
          width: "110%",
          height: 220,
          marginLeft: -10,
          marginBottom: -10,
        }}
      />
      <View
        style={{
          width: "100%",
          backgroundColor: "#f2f4fc",
          height: 600,
          borderTopLeftRadius: 20,
          borderTopRightRadius: 20,
          marginTop: -10,
          alignItems: "center",
          paddingHorizontal: 20,
          elevation: 4,
        }}
      >
        <View
          style={{
            borderBottomWidth: 2,
            color: "grey",
            width: 40,
            paddingTop: 20,
          }}
        />
        <GapView length={20} />
        <TutorCard subjects={subjects} />
      </View>
    </View>
  );
}

function TutorCard({ subjects }) {
  const subjectsToShow = subjects.slice(0, 3);
  return (
    <View
      style={{
        borderRadius: 5,
        width: "100%",
        height: 120,
        elevation: 3,
        backgroundColor: "#ffff",
        padding: 5,
        gap: 20,
        flexDirection: "row",
      }}
    >
      <View
        style={{
          width: 50,
          height: 50,
          backgroundColor: "grey",
          borderRadius: 50,
        }}
      />
      <View>
        <MyText text={"Ms. Bisma Shuja"} weight={"600"} size={18} />
        <MyText text={"Home Based Tutor"} weight={"400"} />
        <View style={{ flexDirection: "row", flexWrap: "wrap", width: 250 }}>
          <MyText text={"|"} />
          {subjectsToShow?.map((subject, index) => (
            <MyText key={index}> {subject} |</MyText>
          ))}
        </View>
      </View>
    </View>
  );
}
