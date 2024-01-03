import React, { useState } from "react";
import {
  Appearance,
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
} from "react-native";

import { Link, router } from "expo-router";
import { Formik } from "formik";
import { MyText } from "../../components";

export default function signIn() {
  return (
    <ScrollView contentContainerStyle={styles.main}>
      <MyText weight="600">random</MyText>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  main: { alignItems: "center" },
});
