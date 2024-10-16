import React from "react";
import { View } from "react-native";
import MyText from "../MyText";
import MyButton from "../MyButton";
import { useSelector } from "react-redux";
import { LightTheme, DarkTheme } from "../../theme/theme";
const MyNotificationCard = ({ name, message, onAccept, onReject, type }) => {
  const theme = useSelector((state) => state.theme.theme);
  const currentTheme = theme === "light" ? LightTheme : DarkTheme;
  return (
    <View
      style={{
        backgroundColor: "#fff",
        padding: 16,
        borderRadius: 8,
        marginBottom: 16,
        backgroundColor: currentTheme.colors.notification,
        elevation: 2, // Add elevation for a card-like appearance
      }}
    >
      <MyText size={18} weight="600" style={{ marginBottom: 4 }}>
        {name}
      </MyText>

      <MyText weight="500" style={{ marginBottom: 8 }}>
        {message}
      </MyText>
      <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
        <MyButton
          label="Accept"
          onPress={onAccept}
          style={{ flex: 1, marginRight: 8 }}
        />
        <MyButton
          label="Reject"
          onPress={onReject}
          style={{ flex: 1, marginLeft: 8 }}
        />
      </View>
    </View>
  );
};

export default MyNotificationCard;
