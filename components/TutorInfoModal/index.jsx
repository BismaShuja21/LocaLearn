import React from "react";
import { View, StyleSheet } from "react-native";
import MyText from "../MyText";
import MyButton from "../MyButton";

const PersonInfoBox = ({ info, buttons }) => {
  return (
    <View style={styles.modalContainer}>
      <View style={styles.modalContent}>
        <MyText weight={"600"} size={16}>
          {info ? info.name : "No location selected"}
        </MyText>
        <View style={{ width: "100%", paddingVertical: 10, marginLeft: -20 }}>
          <MyText>{info.description}</MyText>
          <MyText>Qualification:{info.qualification}</MyText>
          <MyText>Subjects: {info.subjects.join(" | ")}</MyText>
          <MyText>Teaching Space: {info.tutorPreference}</MyText>
        </View>
        <View
          style={{
            width: "100%",
            paddingHorizontal: 30,
          }}
        >
          {buttons &&
            buttons.map((button) => (
              <View style={{ marginTop: 2 }} key={button.id}>
              {/* <View style={{ marginTop: 2 }} key={`${button.label}-${index}`}> */}
                <MyButton
                  onPress={button.onPress}
                  backgroundColor={button?.backgroundColor}
                  textColor={button?.textColor}
                  label={button.label}
                />
              </View>
            ))}
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent: {
    backgroundColor: "#f6f6f9",
    padding: 15,
    borderRadius: 10,
    elevation: 5,
    alignItems: "center",
  },
});

export default PersonInfoBox;
