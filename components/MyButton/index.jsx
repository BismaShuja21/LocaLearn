import React from "react";
import { TouchableOpacity } from "react-native";

import MyText from "../MyText";

export default function MyButton({
  label,
  onPress,
  textColor,
  backgroundColor,
  style,
  labelStyle,
  leftIcon,
  weight,
}) {
  const buttonStyle = {
    backgroundColor: backgroundColor || "#060635",
    flexDirection: "row",
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    height: 40,
    ...style,
  };

  const buttonTextStyle = {
    ...labelStyle,
  };

  return (
    <TouchableOpacity onPress={onPress} style={[buttonStyle, style]}>
      {leftIcon && leftIcon}
      <MyText
        text={label}
        textColor={textColor || ""}
        weight={weight || "600"}
        size={16}
        style={buttonTextStyle}
      />
    </TouchableOpacity>
  );
}
