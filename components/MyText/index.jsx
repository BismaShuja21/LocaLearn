import React from "react";
import { Text, TouchableOpacity } from "react-native";
import * as Font from "expo-font";
import { useFonts } from "expo-font";

const MyText = ({
  text,
  children,
  textColor,
  weight,
  size,
  style,
  numberOfLines,
  onPress,
}) => {

  const [fontsLoaded] = useFonts({
    'Inter-ExtraBold': require("../../assets/fonts/Inter-ExtraBold.ttf"),
    'Inter-Bold': require('../../assets/fonts/Inter-Bold.ttf'),
    'Inter-SemiBold': require('../../assets/fonts/Inter-SemiBold.ttf'),
    'Inter-Regular': require('../../assets/fonts/Inter-Regular.ttf'),
    'Inter-Medium': require('../../assets/fonts/Inter-Medium.ttf'),
    'Inter-Light': require('../../assets/fonts/Inter-Light.ttf'),
  });

  if (!fontsLoaded) {
    return null;
  }


  const getFontFamily = (weight) => {
    switch (weight) {
      case "700":
        return "Inter-Bold";
      case "600":
        return "Inter-SemiBold";
      case "500":
        return "Inter-Medium";
      case "400":
        return "Inter-Regular";
      case "300":
        return "Inter-Light";
      default:
        return "Inter-Regular";
    }
  };

  const textStyle = {
    color: textColor || "black",
    fontWeight: weight || "normal",
    fontSize: size || 14,
    fontFamily: weight ? getFontFamily(weight) : "Inter-Regular"
  };

  if (onPress) {
    return (
      <TouchableOpacity onPress={onPress}>
        <Text style={[textStyle, style]} numberOfLines={numberOfLines}>
          {children || text}
        </Text>
      </TouchableOpacity>
    );
  }

  return (
    <Text style={[textStyle, style]} numberOfLines={numberOfLines}>
      {children || text}
    </Text>
  );
};

export default MyText;