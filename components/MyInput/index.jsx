import React, { useState } from "react";
import { TextInput, View, StyleSheet, ViewStyle } from "react-native";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";

export default function MyInput({
  multiline,
  placeholder,
  password = false,
  onChange,
  text,
  style,
  inputStyle,
  rightIcon,
  placeholderColor,
  editable,
  onIconPress,
}) {
  const [showPassword, setShowPassword] = useState(false);
  const inputContainerStyle = {
    ...styles.inputContainerStyle,
  };

  return (
    <View style={[inputContainerStyle, style]}>
      <TextInput
        multiline={multiline}
        secureTextEntry={password ? (showPassword ? false : true) : false}
        placeholder={placeholder}
        placeholderTextColor={placeholderColor || "grey"}
        style={[styles.inputStyle, { fontFamily: "Inter-Regular" }, inputStyle]}
        value={text}
        onChangeText={onChange}
        editable={editable}
      />
      {password && (
        <Ionicons
          name={showPassword ? "eye-outline" : "md-eye-off-outline"}
          size={15}
          color={"grey"}
          onPress={() => setShowPassword(!showPassword)}
        />
      )}
      {rightIcon && (
        <MaterialIcons
          name={rightIcon.name}
          size={rightIcon.size || 15}
          color={rightIcon.color || "grey"}
          onPress={onIconPress}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  inputContainerStyle: {
    backgroundColor: "#f2f4fc",
    flexDirection: "row",
    paddingHorizontal: 10,
    borderRadius: 25,
    borderWidth: 2,
    alignItems: "center",
    elevation: 3,
    borderColor: "#060635",
  },
  inputStyle: {
    flex: 1,
    padding: 10,
    fontSize: 15,
  },
});
