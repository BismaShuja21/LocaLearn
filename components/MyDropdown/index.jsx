import React, { useState } from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import { Entypo, Feather } from "@expo/vector-icons";
import MyText from "../MyText";

export default function MyDropdown({
  data,
  onSelect,
  placeholder = "",
  zIndex = 10,
  multiSelect = false,
  style,
  placeholderColor,
}) {
  const [show, setShow] = useState(false);
  const [selectedItems, setSelectedItems] = useState([]);
  const [label, setLabel] = useState("");
  const listData = multiSelect ? ["All", ...data] : data;

  const handleSelection = (item) => {
    let updatedSelection = [...selectedItems];

    if (item === "All") {
      updatedSelection =
        updatedSelection.length === data.length ? [] : [...data];
    } else {
      const index = updatedSelection.indexOf(item);
      if (index === -1) {
        if (multiSelect) {
          updatedSelection.push(item);
        } else {
          updatedSelection = [item];
        }
      } else {
        updatedSelection.splice(index, 1);
      }

      const allIndex = updatedSelection.indexOf("All");
      if (allIndex !== -1) {
        updatedSelection.splice(allIndex, 1);
      }
    }

    setSelectedItems(updatedSelection);
    onSelect(updatedSelection);

    if (!multiSelect && updatedSelection.length > 0) {
      setLabel(item);
    } else if (updatedSelection.length === data.length) {
      setLabel("All");
    } else {
      setLabel(
        updatedSelection.length > 0
          ? `${updatedSelection.length}+ ${placeholder}`
          : `Select ${placeholder}`
      );
    }
  };

  const isSelected = (selectedItem) => {
    return (
      (selectedItem === "All" && selectedItems.length === data.length) ||
      (selectedItem !== "All" && selectedItems.includes(selectedItem))
    );
  };

  return (
    <View
      style={[
        styles.container,
        { zIndex: zIndex },
        show ? { borderBottomRightRadius: 0, borderBottomLeftRadius: 0 } : {},
        style,
      ]}
    >
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          width: "100%",
          height: "100%",
          paddingHorizontal: 15,
          zIndex: zIndex - 2,
        }}
      >
        <MyText
          text={label ? label : `Select ${placeholder}`}
          textColor={placeholder ? placeholderColor : "#969696"}
        />
        <Entypo
          name={!show ? "chevron-down" : "chevron-up"}
          color={"#060635"}
          size={16}
          onPress={() => {
            setShow(!show);
          }}
        />
      </View>
      {show && (
        <View
          style={{
            zIndex: zIndex + 2,
            width: "101%",
            position: "absolute",
            overflow: "hidden",
            top: 48,
            justifyContent: "space-between",
            backgroundColor: "#f2f4fc",
            borderColor: "#060635",
            borderWidth: 1,
            borderBottomRightRadius: 5,
            borderBottomLeftRadius: 5,
          }}
        >
          {listData?.map((dropdownItem, index) => (
            <TouchableOpacity
              activeOpacity={1}
              style={{
                height: 35,
                borderTopWidth: index > 0 ? 1 : 0,
                justifyContent: "space-between",
                borderColor: "#71717a",
                paddingHorizontal: 15,
                flexDirection: "row",
                alignItems: "center",
              }}
              key={index}
              onPress={() => {
                if (!multiSelect) {
                  setShow(false);
                }
                handleSelection(dropdownItem); // Pass the 'dropdownItem' as an argument
              }}
            >
              <MyText text={dropdownItem} />
              {isSelected(dropdownItem) && (
                <Feather name="check" size={16} color="#060635" />
              )}
            </TouchableOpacity>
          ))}
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: 50,
    borderWidth: 2,
    borderRadius: 25,
    alignItems: "center",
    zIndex: 10,
    borderColor: "#060635",
  },
});
