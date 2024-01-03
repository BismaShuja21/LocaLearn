import React from "react";
import { StyleSheet } from "react-native";
import { Redirect } from "expo-router";


export default function App() {
  return <Redirect href={"/auth/signIn"} />;
}

const styles = StyleSheet.create({});