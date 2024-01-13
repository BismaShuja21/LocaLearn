import { StyleSheet, Text, View } from "react-native";
import SignIn from "./screens/SignIn";
import SignUp from "./screens/SignUp";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { MaterialIcons } from "@expo/vector-icons";

import { useFonts } from "expo-font";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import StudentProfileSetup from "./screens/user/[student]/StudentProfileSetup";
import TutorProfileSetup from "./screens/user/[tutor]/TutorProfileSetup";
import StudentProfile from "./screens/user/[student]/StudentProfile";
import TutorProfile from "./screens/user/[tutor]/TutorProfile";

const RootStack = createStackNavigator();
const StudentStack = createStackNavigator();
const TutorStack = createStackNavigator();
const Tab = createBottomTabNavigator();

export default function App() {
  const [fontsLoaded] = useFonts({
    "Inter-ExtraBold": require("./assets/fonts/Inter-ExtraBold.ttf"),
    "Inter-Bold": require("./assets/fonts/Inter-Bold.ttf"),
    "Inter-SemiBold": require("./assets/fonts/Inter-SemiBold.ttf"),
    "Inter-Regular": require("./assets/fonts/Inter-Regular.ttf"),
    "Inter-Medium": require("./assets/fonts/Inter-Medium.ttf"),
    "Inter-Light": require("./assets/fonts/Inter-Light.ttf"),
  });

  if (!fontsLoaded) {
    return null;
  }
  console.log("Fonts loaded:", fontsLoaded);

  return (
    <NavigationContainer>
      <RootStack.Navigator
        initialRouteName="SignIn"
        screenOptions={{
          headerShown: false,
        }}
      >
        <RootStack.Screen name="SignIn" component={SignIn} />
        <RootStack.Screen name="SignUp" component={SignUp} />
        <RootStack.Screen
          name="StudentProfileSetup"
          component={StudentProfileSetup}
        />
        <RootStack.Screen
          name="TutorProfileSetup"
          component={TutorProfileSetup}
        />
        <RootStack.Screen name="StudentTab" component={StudentTabNavigator} />
        <RootStack.Screen name="TutorTab" component={TutorTabNavigator} />
      </RootStack.Navigator>
    </NavigationContainer>
  );
}

const StudentTabNavigator = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen
        name="StudentScreens"
        component={StudentScreensNavigator}
        options={{
          tabBarLabel: "Student",
          tabBarIcon: ({ color, size }) => (
            <MaterialIcons name="school" color={color} size={size} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

const TutorTabNavigator = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen
        name="TutorScreens"
        component={TutorScreensNavigator}
        options={{
          tabBarLabel: "Tutor",
          tabBarIcon: ({ color, size }) => (
            <MaterialIcons name="work" color={color} size={size} />
          ),
          headerShown: false,
        }}
      />
    </Tab.Navigator>
  );
};

const StudentScreensNavigator = () => {
  return (
    <StudentStack.Navigator>
      <StudentStack.Screen name="StudentProfile" component={StudentProfile} />
    </StudentStack.Navigator>
  );
};

const TutorScreensNavigator = () => {
  return (
    <TutorStack.Navigator>
      <TutorStack.Screen name="TutorProfile" component={TutorProfile} />
    </TutorStack.Navigator>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
