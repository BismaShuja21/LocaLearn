import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import SignIn from './screens/SignIn';
import { useFonts } from 'expo-font';
import { useEffect } from 'react';
import SignUp from './screens/SignUp';

export default function App() {

  
  const [fontsLoaded] = useFonts( {
    'Inter-ExtraBold': require("./assets/fonts/Inter-ExtraBold.ttf"),
    'Inter-Bold': require('./assets/fonts/Inter-Bold.ttf'),
    'Inter-SemiBold': require('./assets/fonts/Inter-SemiBold.ttf'),
    'Inter-Regular': require('./assets/fonts/Inter-Regular.ttf'),
    'Inter-Medium': require('./assets/fonts/Inter-Medium.ttf'),
    'Inter-Light': require('./assets/fonts/Inter-Light.ttf'),
  });

 return (
    <View style={styles.container}>
    {/* <SignIn /> */}
    <SignUp />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
