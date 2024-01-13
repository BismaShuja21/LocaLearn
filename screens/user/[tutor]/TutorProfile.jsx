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
import { ScrollView } from "react-native-gesture-handler";
import { MaterialIcons } from "@expo/vector-icons";

export default function TutorProfileSetup() {
  const navigation = useNavigation();

  const [isEditMode, setIsEditMode] = useState({
    firstName: false,
    lastName: false,
    qualification: false,
    tutoringPreferences: false,
    availability: false,
    description: false,
    experience: false,
  });

  const [values, setValues] = useState({
    firstName: "Akhtar",
    lastName: "Ahmed",
    qualification: ["Bachelors"],
    tutoringPreferences: ["Student's Space"],
    availability: ["Monday"],
    description: "Hi i am a teacher",
    experience: "Bhaiii",
  });

  const handleInputChange = (field, text) => {
    setValues((prevValues) => ({
      ...prevValues,
      [field]: text,
    }));
  };

  const handleDropdownChange = (field, value) => {
    setValues((prevValues) => ({
      ...prevValues,
      [field]: value,
    }));
  };

  const handleMultiSelectChange = (field, selectedItems) => {
    setValues((prevValues) => ({
      ...prevValues,
      [field]: selectedItems,
    }));
  };

  const handleEditPress = (field) => {
    setIsEditMode((prevMode) => ({
      ...prevMode,
      [field]: !prevMode[field],
    }));
  };

  const handleCheckPress = (field) => {
    setIsEditMode((prevMode) => ({
      ...prevMode,
      [field]: false,
    }));
  };

  return (
    <ScrollView
      style={{
        flex: 1,
        backgroundColor: "#f2f4fc",
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
        <Form width={150} height={120} style={{ marginLeft: 20 }} />
        <MyText
          text={"Your Profile"}
          size={20}
          weight="600"
          style={{ textAlign: "center", paddingVertical: 10 }}
        />

        <View style={{ width: "100%" }}>
          <MyText
            text={"First Name"}
            style={{ paddingLeft: 5, paddingBottom: 5 }}
          />
          <MyInput
            text={values.firstName}
            editable={isEditMode.firstName}
            inputStyle={{
              color: isEditMode.firstName ? "black" : "grey",
            }}
            rightIcon={{
              name: isEditMode.firstName ? "check" : "edit",
              size: 20,
              color: "grey",
            }}
            onIconPress={() => handleEditPress("firstName")}
            onChange={(text) => handleInputChange("firstName", text)}
          />
        </View>
        <View style={{ width: "100%" }}>
          <MyText
            text={"Last Name"}
            style={{ paddingLeft: 5, paddingBottom: 5 }}
          />
          <MyInput
            text={values.lastName}
            editable={isEditMode.lastName}
            inputStyle={{
              color: isEditMode.lastName ? "black" : "grey",
            }}
            rightIcon={{
              name: isEditMode.lastName ? "check" : "edit",
              size: 20,
              color: "grey",
            }}
            onIconPress={() => handleEditPress("lastName")}
            onChange={(text) => handleInputChange("lastName", text)}
          />
        </View>

        <View style={{ width: "100%" }}>
          <MyText
            text={"Qualification"}
            style={{ paddingLeft: 5, paddingBottom: 5 }}
          />
          {isEditMode.qualification ? (
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <MyDropdown
                style={{ width: "90%" }}
                placeholder="Qualification--"
                data={["Masters", "Bachelors", "Undergraduate"]}
                zIndex={9}
                onSelect={(value) =>
                  handleDropdownChange("qualification", value)
                }
                multiSelect={false}
                disabled={!isEditMode.qualification}
              />
              <MaterialIcons
                name="done"
                size={25}
                color="grey"
                onPress={() => handleCheckPress("qualification")}
              />
            </View>
          ) : (
            <MyInput
              text={values.qualification.join(", ")}
              editable={false}
              inputStyle={{
                color: "grey",
              }}
              rightIcon={{
                name: isEditMode.lastName ? "check" : "edit",
                size: 20,
                color: "grey",
              }}
              onIconPress={() => handleEditPress("qualification")}
            />
          )}
        </View>
        <View style={{ width: "100%" }}>
          <MyText
            text={"Tutoring Preferences"}
            style={{ paddingLeft: 5, paddingBottom: 5 }}
          />
          {isEditMode.tutoringPreferences ? (
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <MyDropdown
                style={{ width: "90%" }}
                placeholder="Preferences--"
                data={["Student's Space", "Tutor's Space"]}
                zIndex={8}
                onSelect={(value) =>
                  handleDropdownChange("tutoringPreferences", value)
                }
                multiSelect
                disabled={!isEditMode.tutoringPreferences}
              />
              <MaterialIcons
                name="done"
                size={25}
                color="grey"
                onPress={() => handleCheckPress("tutoringPreferences")}
              />
            </View>
          ) : (
            <MyInput
              text={values.tutoringPreferences.join(", ")}
              editable={false}
              inputStyle={{
                color: "grey",
              }}
              rightIcon={{
                name: isEditMode.tutoringPreferences ? "done" : "edit",
                size: 20,
                color: "grey",
              }}
              onIconPress={() => handleEditPress("tutoringPreferences")}
            />
          )}
        </View>

        <View style={{ width: "100%" }}>
          <MyText
            text={"Availability"}
            style={{ paddingLeft: 5, paddingBottom: 5 }}
          />
          {isEditMode.availability ? (
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <MyDropdown
                style={{ width: "90%" }}
                placeholder="Days--"
                data={[
                  "Monday",
                  "Tuesday",
                  "Wednesday",
                  "Thursday",
                  "Friday",
                  "Saturday",
                  "Sunday",
                ]}
                zIndex={7}
                onSelect={(value) =>
                  handleMultiSelectChange("availability", value)
                }
                multiSelect
                disabled={!isEditMode.availability}
              />
              <MaterialIcons
                name="done"
                size={20}
                color="grey"
                onPress={() => handleCheckPress("availability")}
              />
            </View>
          ) : (
            <MyInput
              text={values.availability.join(", ")}
              editable={false}
              inputStyle={{
                color: "grey",
              }}
              rightIcon={{
                name: isEditMode.availability ? "done" : "edit",
                size: 20,
                color: "grey",
              }}
              onIconPress={() => handleEditPress("availability")}
            />
          )}
        </View>
        <View style={{ width: "100%" }}>
          <MyText
            text={"Description"}
            style={{ paddingLeft: 5, paddingBottom: 5 }}
          />
          <MyInput
            multiline={true}
            text={values.description}
            editable={isEditMode.description}
            inputStyle={{
              color: isEditMode.description ? "black" : "grey",
            }}
            rightIcon={{
              name: isEditMode.description ? "check" : "edit",
              size: 20,
              color: "grey",
            }}
            onIconPress={() => handleEditPress("description")}
            onChange={(text) => handleInputChange("description", text)}
          />
        </View>
        <View style={{ width: "100%" }}>
          <MyText
            text={"Experience"}
            style={{ paddingLeft: 5, paddingBottom: 5 }}
          />
          <MyInput
            multiline={true}
            text={values.experience}
            editable={isEditMode.experience}
            inputStyle={{
              color: isEditMode.experience ? "black" : "grey",
              alignItems: "flex-start",
            }}
            rightIcon={{
              name: isEditMode.experience ? "check" : "edit",
              size: 20,
              color: "grey",
            }}
            onIconPress={() => handleEditPress("experience")}
            onChange={(text) => handleInputChange("experience", text)}
          />
        </View>
        <GapView length={15} />
        <MyButton
          label={"Logout"}
          onPress={() => {
            navigation.navigate("SignIn");
          }}
        />
      </View>
      <GapView length={100} />
    </ScrollView>
  );
}
