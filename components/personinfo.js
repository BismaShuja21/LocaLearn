import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

const PersonInfoBox = ({ info, onClose, onChatNow, onViewProfile }) => {
  return (
    <View style={styles.modalContainer}>
      <View style={styles.modalContent}>
        <Text style={styles.modalTitle}>
          {info ? info.name : "No location selected"}
        </Text>
        <Text style={styles.modalDetails}>{info.description}</Text>
        <Text>Qualification:{info.qualification}</Text>
        <Text>Subjects: {info.subjects}</Text>
        <Text>Teaching Space:{info.tutorPreference}</Text>

        {/* "Chat Now" button */}
        <TouchableOpacity style={styles.chatButton} onPress={onChatNow}>
          <Text style={{ color: "white" }}>Chat Now</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.chatButton} onPress={onViewProfile}>
          <Text style={{ color: "white" }}>View Profile</Text>
        </TouchableOpacity>

        {/* Close button */}
        <TouchableOpacity style={styles.closeButton} onPress={onClose}>
          <Text style={{ color: "white" }}>Close</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  // Add your styles here...
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent: {
    backgroundColor: "white",
    padding: 20,
    borderRadius: 10,
    elevation: 5,
  },
  chatButton: {
    backgroundColor: "#060635",
    flexDirection: "row",
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    height: 40,
  },
  closeButton: {
    backgroundColor: "#060635",
    flexDirection: "row",
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    height: 40,
  },
});

export default PersonInfoBox;
