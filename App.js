import { Appearance, StyleSheet, useColorScheme } from "react-native";

import { SafeAreaView } from "react-native-safe-area-context";
import { useFonts } from "expo-font";
import { MaterialIcons } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";
import { NavigationContainer, useTheme } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import { MyHeader } from "./components";
import SignIn from "./screens/SignIn";
import SignUp from "./screens/SignUp";

import StudentProfileSetup from "./screens/user/[student]/StudentProfileSetup";
import StudentProfile from "./screens/user/[student]/StudentProfile";
import StudentSearch from "./screens/user/[student]/StudentSearch";
import StudentNotifications from "./screens/user/[student]/StudentNotification";
import StudentChat from "./screens/user/[student]/StudentChat";
import StudentInbox from "./screens/user/[student]/StudentInbox";
import ViewTutorProfileScreen from "./screens/user/[student]/ViewTutorProfileScreen";

import TutorProfileSetup from "./screens/user/[tutor]/TutorProfileSetup";
import TutorProfile from "./screens/user/[tutor]/TutorProfile";
import TutorNotifications from "./screens/user/[tutor]/TutorNotifications";
import TutorInbox from "./screens/user/[tutor]/TutorInbox";
import TutorChat from "./screens/user/[tutor]/TutorChat";
import { DarkTheme, LightTheme } from "./theme/theme";
import { useState, useEffect } from "react";
import { store } from "./redux/store";
import { Provider } from "react-redux";

const RootStack = createStackNavigator();
const Tab = createBottomTabNavigator();
const StudentInboxStack = createStackNavigator();
const TutorInboxStack = createStackNavigator();
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

  // $ npx nodemon server

  return (
    <Provider store={store}>
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
          <RootStack.Screen
            name="ViewTutorProfileScreen"
            component={ViewTutorProfileScreen}
          />
          <RootStack.Screen
            name="StudentInboxStackNavigator"
            component={StudentInboxStackNavigator}
          />
          <RootStack.Screen
            name="TutorInboxStackNavigator"
            component={TutorInboxStackNavigator}
          />
        </RootStack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}
const commonTabOptions = {
  tabBarStyle: {
    backgroundColor: "#e2b623",
    height: 55,
    alignItems: "center",
    justifyContent: "space-evenly",
  },
  tabBarItemStyle: {
    justifyContent: "center",
    alignItems: "center",
    paddingBottom: 5,
  },
  tabBarActiveTintColor: "white",
  tabBarActiveBackgroundColor: "#060635",
  tabBarInactiveTintColor: "white",
};

const StudentTabNavigator = ({ route }) => {
  const userID = route.params.userID;
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#e2b623" }}>
      <Tab.Navigator screenOptions={commonTabOptions}>
        <Tab.Screen
          name="StudentSearch"
          component={StudentSearch}
          options={{
            tabBarLabel: "Search",
            tabBarIcon: ({ color, size }) => (
              <FontAwesome name="search" size={24} color="white" />
            ),
            header: () => <MyHeader />,
          }}
          initialParams={{ userID: userID }}
        />
        <Tab.Screen
          name="StudentNotifications"
          component={StudentNotifications}
          options={{
            tabBarLabel: "Notifications",
            tabBarIcon: ({ color, size }) => (
              <MaterialIcons name="notifications" size={24} color="white" />
            ),
            header: () => <MyHeader />,
          }}
          initialParams={{ userID: userID }}
        />
        <Tab.Screen
          name="StudentInboxStackNavigator"
          component={StudentInboxStackNavigator}
          options={{
            tabBarLabel: "Inbox",
            tabBarIcon: ({ color, size }) => (
              <MaterialIcons name="chat" size={24} color="white" />
            ),
            header: () => <MyHeader />,
          }}
          initialParams={{ userID: userID }}
        />
        <Tab.Screen
          name="StudentProfile"
          component={StudentProfile}
          options={{
            tabBarLabel: "Profile",
            tabBarIcon: ({ color, size }) => (
              <MaterialIcons name="account-circle" size={24} color="white" />
            ),
            header: () => <MyHeader />,
          }}
          initialParams={{ userID: userID }}
        />
      </Tab.Navigator>
    </SafeAreaView>
  );
};

const TutorTabNavigator = ({ route }) => {
  const userID = route.params.userID;

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#e2b623" }}>
      <Tab.Navigator screenOptions={commonTabOptions}>
        <Tab.Screen
          name="TutorNotifications"
          component={TutorNotifications}
          options={{
            tabBarLabel: "Notifications",
            tabBarIcon: ({ color, size }) => (
              <MaterialIcons name="notifications" size={24} color="white" />
            ),
            header: () => <MyHeader />,
          }}
          initialParams={{ userID: userID }}
        />
        <Tab.Screen
          name="TutorInboxStackNavigator"
          component={TutorInboxStackNavigator}
          options={{
            tabBarLabel: "Inbox",
            tabBarIcon: ({ color, size }) => (
              <MaterialIcons name="chat" size={24} color="white" />
            ),
            header: () => <MyHeader />,
          }}
          initialParams={{ userID: userID }}
        />
        <Tab.Screen
          name="TutorProfile"
          component={TutorProfile}
          options={{
            tabBarLabel: "Profile",
            tabBarIcon: ({ color, size }) => (
              <MaterialIcons name="account-circle" size={24} color="white" />
            ),
            header: () => <MyHeader />,
          }}
          initialParams={{ userID: userID }}
        />
      </Tab.Navigator>
    </SafeAreaView>
  );
};

const StudentInboxStackNavigator = ({ route }) => {
  const userID = route.params.userID;
  return (
    <StudentInboxStack.Navigator>
      <StudentInboxStack.Screen
        name={"StudentInbox"}
        component={StudentInbox}
        options={{ headerShown: false }} // Hide the header for the inbox screen
        initialParams={{ userID: userID }}
      />
      <StudentInboxStack.Screen
        name={"StudentChat"}
        component={StudentChat}
        options={{ headerShown: false }} // Hide the header for the chat screen
        initialParams={{ userID: userID }}
      />
    </StudentInboxStack.Navigator>
  );
};
const TutorInboxStackNavigator = ({ route }) => {
  const userID = route.params.userID;
  return (
    <TutorInboxStack.Navigator>
      <TutorInboxStack.Screen
        name={"TutorInbox"}
        component={TutorInbox}
        options={{ headerShown: false }} // Hide the header for the inbox screen
        initialParams={{ userID: userID }}
      />
      <TutorInboxStack.Screen
        name={"TutorChat"}
        component={TutorChat}
        options={{ headerShown: false }} // Hide the header for the chat screen
        initialParams={{ userID: userID }}
      />
    </TutorInboxStack.Navigator>
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
