import React from "react";
import { View, TextInput, ViewStyle, StyleSheet } from "react-native";

import GapView from "../GapView";
import { Search } from "../../assets/vectors";

function MySearchBar({ style, placeholder, onBlur }) {
  return (
    <View style={{ ...styles.searchBarContainer, ...style }}>
      <Search />
      <GapView mode="horizontal" />
      <TextInput
        placeholderTextColor={"grey"}
        placeholder={placeholder ? placeholder : "Search"}
        style={styles.inputStyle}
        onBlur={onBlur}
      />
    </View>
  );
}

export default MySearchBar;

const styles = StyleSheet.create({
  searchBarContainer: {
    height: 40,
    borderWidth: 1,
    borderColor: "#E4E4E4",
    borderRadius: 20,
    backgroundColor: "#FAFAFA",
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 20,
  },
  inputStyle: {
    flex: 1,
    fontFamily: "Inter-Regular",
    paddingVertical: 5,
    color: "#666",
    height: 40,
  },
});
