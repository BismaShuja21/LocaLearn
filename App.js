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
import TutorNotifications from "./screens/user/[tutor]/TutorNotifications";
import TutorChat from "./screens/user/[tutor]/TutorChat";
import StudentSearch from "./screens/user/[student]/StudentSearch";
import StudentNotifications from "./screens/user/[student]/StudentNotification";
import StudentChat from "./screens/user/[student]/StudentChat";

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
        name="StudentSearch"
        component={StudentSearch}
        options={{
          tabBarLabel: "Search",
          tabBarIcon: ({ color, size }) => (
            <MaterialIcons name="school" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="StudentNotifications"
        component={StudentNotifications}
        options={{
          tabBarLabel: "Notifications",
          tabBarIcon: ({ color, size }) => (
            <MaterialIcons name="school" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="StudentChat"
        component={StudentChat}
        options={{
          tabBarLabel: "Chat",
          tabBarIcon: ({ color, size }) => (
            <MaterialIcons name="school" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="StudentProfile"
        component={StudentProfile}
        options={{
          tabBarLabel: "Profile",
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
        name="TutorNotifications"
        component={TutorNotifications}
        options={{
          tabBarLabel: "Notifications",
          tabBarIcon: ({ color, size }) => (
            <MaterialIcons name="circle" color={color} size={size} />
          ),
          headerShown: true,
        }}
      />
      <Tab.Screen
        name="TutorChat"
        component={TutorChat}
        options={{
          tabBarLabel: "Chat",
          tabBarIcon: ({ color, size }) => (
            <MaterialIcons name="circle" color={color} size={size} />
          ),
          headerShown: true,
        }}
      />
      <Tab.Screen
        name="TutorProfile"
        component={TutorProfile}
        options={{
          tabBarLabel: "Profile",
          tabBarIcon: ({ color, size }) => (
            <MaterialIcons name="circle" color={color} size={size} />
          ),
          headerShown: true,
        }}
      />
    </Tab.Navigator>
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
