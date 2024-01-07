import { StyleSheet, TouchableOpacity, View } from "react-native";
import { GapView, MyButton, MyInput, MyText } from "../../components";
import { Bulb, Group } from "../../assets/vectors";
import { useNavigation } from "@react-navigation/native";

export default function SignIn() {
  const navigation = useNavigation();

  return (
    <View style={styles.main}>
      <View style={styles.container}>
        <View style={styles.top}>
          <MyText
            text={"LocaLearn"}
            size={30}
            weight={"700"}
            textColor={"#060635"}
          />
          <Bulb />
          <MyText
            text={"Welcome!"}
            size={35}
            weight={"800"}
            textColor={"#060635"}
          />
        </View>
        <View style={styles.mid}>
          <MyInput placeholder={"Email"} />
          <GapView length={20} />
          <MyInput placeholder={"Password"} password />
          <View style={styles.pw}>
            <MyText text={"Forgot Password?"} weight={"600"} />
          </View>
          <MyButton label={"Sign In"} textColor={"white"} />
          <View style={{ flexDirection: "row" }}>
            <MyText text={"Don't have an account? "} weight={"600"} />
            <MyText
              text={"Create Account"}
              weight={"600"}
              textColor={"#e2b623"}
              onPress={() => navigation.navigate("SignUp")}
            />
          </View>
        </View>
      </View>
      <Group />
    </View>
  );
}

const styles = StyleSheet.create({
  main: {
    flex: 1,
    width: "100%",
    height: "100%",
    backgroundColor: "#f2f4fc",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: "10%",
  },
  container: {
    alignItems: "center",
    marginTop: 80,
    width: "100%",
  },
  top: {
    alignItems: "center",
    justifyContent: "space-between",
    paddingBottom: 25,
    gap: 5,
  },
  mid: { alignItems: "center", width: "100%" },
  pw: {
    width: "100%",
    alignItems: "flex-end",
    paddingTop: 5,
    marginBottom: 30,
  },
});

// app bg: #f2f4fc
// primary color: #060635
// secondary Color: #e2b623
