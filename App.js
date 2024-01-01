import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import Login from './screens/login';
import SignUp from './screens/signup';


export default function App() {
  return (
    <View style={styles.container}>
      <Login />
      {/* <SignUp /> */}
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
