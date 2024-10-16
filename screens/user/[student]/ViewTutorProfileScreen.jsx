import React, { useState } from "react";
import { View } from "react-native";
import {
  MyInput,
  MyButton,
  MyText,
  GapView,
  MyDropdown,
} from "../../../components";
import { Avatar, Form, WhiteAvatar } from "../../../assets/vectors";
import { useNavigation } from "@react-navigation/native";
import { ScrollView } from "react-native-gesture-handler";
import { MaterialIcons } from "@expo/vector-icons";
import { useSelector } from "react-redux";
import { LightTheme, DarkTheme } from "../../../theme/theme";

export default function TutorProfileSetup({ route }) {
  const tutor = route.params.tutor;
  console.log(tutor);
  //   const navigation = useNavigation();

  //   const [isEditMode, setIsEditMode] = useState({
  //     firstName: false,
  //     lastName: false,
  //     qualification: false,
  //     tutoringPreferences: false,
  //     availability: false,
  //     description: false,
  //     experience: false,
  //   });

  const [values, setValues] = useState({
    firstName: tutor.firstName,
    lastName: tutor.lastName,
    qualification: tutor.qualification,
    tutoringPreferences: tutor.tutorPreference,
    availability: tutor.availability,
    description: tutor.description,
    experience: tutor.experience,
  });
  const theme = useSelector((state) => state.theme.theme);
  const currentTheme = theme === "light" ? LightTheme : DarkTheme;
  return (
    <ScrollView
      style={{
        flex: 1,
        backgroundColor: currentTheme.colors.background,
        paddingVertical: 80,
        width: "100%",
        height: "100%",
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
        {currentTheme.dark === true ? (
          <WhiteAvatar width={150} height={120} style={{ marginLeft: 20 }} />
        ) : (
          <Avatar width={150} height={120} style={{ marginLeft: 20 }} />
        )}

        <MyText
          text={"Teacher's Profile"}
          size={20}
          weight="600"
          style={{ textAlign: "center", paddingVertical: 10 }}
        />

        <View style={{ width: "100%", marginBottom: 15 }}>
          <MyText
            text={"First Name"}
            weight="600"
            size={18}
            style={{ paddingBottom: 10 }}
          />
          <MyText
            text={values.firstName}
            style={{
              borderBottomColor: "#cdd1d0",
              borderBottomWidth: 2,
              borderRadius: 3,
              paddingHorizontal: 10,
            }}
          />
        </View>
        <View style={{ width: "100%", marginBottom: 15 }}>
          <MyText
            text={"Last Name"}
            weight="600"
            size={18}
            style={{ paddingBottom: 5 }}
          />
          <MyText
            text={values.lastName}
            style={{
              borderBottomColor: "#cdd1d0",
              borderBottomWidth: 2,
              borderRadius: 3,
              paddingHorizontal: 10,
              paddingVertical: 5,
            }}
          />
        </View>

        <View style={{ width: "100%", marginBottom: 15 }}>
          <MyText
            text={"Qualification"}
            weight="600"
            size={18}
            style={{ paddingBottom: 5 }}
          />

          <MyText
            text={values.qualification.join(", ")}
            style={{
              borderBottomColor: "#cdd1d0",
              borderBottomWidth: 2,
              borderRadius: 3,
              paddingHorizontal: 10,
              paddingVertical: 5,
            }}
          />
        </View>
        <View style={{ width: "100%", marginBottom: 15 }}>
          <MyText
            text={"Experience"}
            weight="600"
            size={18}
            style={{ paddingBottom: 5 }}
          />
          <MyText
            text={values.experience}
            style={{
              borderBottomColor: "#cdd1d0",
              borderBottomWidth: 2,
              borderRadius: 3,
              paddingHorizontal: 10,
              paddingVertical: 5,
            }}
          />
        </View>
        <View style={{ width: "100%", marginBottom: 15 }}>
          <MyText
            text={"Tutoring Preferences"}
            weight="600"
            size={18}
            style={{ paddingBottom: 5 }}
          />

          <MyText
            text={values.tutoringPreferences.join(", ")}
            style={{
              borderBottomColor: "#cdd1d0",
              borderBottomWidth: 2,
              borderRadius: 3,
              paddingHorizontal: 10,
              paddingVertical: 5,
            }}
          />
        </View>
        <View style={{ width: "100%", marginBottom: 15 }}>
          <MyText
            text={"Availability"}
            weight="600"
            size={18}
            style={{ paddingBottom: 5 }}
          />

          <MyText
            text={values.availability.join(", ")}
            style={{
              borderBottomColor: "#cdd1d0",
              borderBottomWidth: 2,
              borderRadius: 3,
              paddingHorizontal: 10,
              paddingVertical: 5,
            }}
          />
        </View>

        <View style={{ width: "100%", marginBottom: 15 }}>
          <MyText
            text={"Description"}
            weight="600"
            size={18}
            style={{ paddingBottom: 5 }}
          />
          <MyText
            text={values.description}
            style={{
              borderBottomColor: "#cdd1d0",
              borderBottomWidth: 2,
              borderRadius: 3,
              paddingHorizontal: 10,
              paddingVertical: 5,
            }}
          />
        </View>
        <GapView length={15} />
        <MyButton
          label={"Send Request"}
          //   onPress={() => {
          //     navigation.navigate("SignIn");
          //   }}
        />
      </View>
      <GapView length={100} />
    </ScrollView>
  );
}
