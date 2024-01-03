import React, { useEffect, useRef } from "react";
import {
  StatusBar,
  View,
  Animated,
  Easing,
  StyleSheet,
  BackHandler,
} from "react-native";
import { Slot } from "expo-router";

export default function AuthLayout() {
  return (
    <View
      style={{
        flex: 1,
        zIndex: 1,
      }}
    >
      <Slot />
    </View>
  );
}

const styles = StyleSheet.create({
  backgroundImage: {
    resizeMode: "cover", // or 'stretch' or 'contain'
    position: "absolute",
    width: "200%",
    height: "140%",
    zIndex: -1,
  },
});
