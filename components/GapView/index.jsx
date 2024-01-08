import React from "react";
import { View } from "react-native";

function GapView({ mode = "vertical", length = 10 }) {
  if (mode == "horizontal") {
    return <View style={{ width: length }} />;
  } else {
    return <View style={{ height: length }} />;
  }
}

export default GapView;
