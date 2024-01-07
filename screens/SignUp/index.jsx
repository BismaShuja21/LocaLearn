import { StyleSheet, TouchableOpacity, View } from "react-native";
import { GapView, MyButton, MyInput, MyText } from "../../components";
import { Bulb, BulbOff, Group } from "../../assets/vectors";

export default function SignUp() {
  return (
    <View style={styles.main}>
      <View style={styles.container}>
        <View style={[styles.top]}>
          <MyText
            text={"LocaLearn"}
            size={30}
            weight={"700"}
            textColor={"#060635"}
          />
          <BulbOff />
          <MyText
            text={"Register"}
            size={35}
            weight={"800"}
            textColor={"#060635"}
          />
        </View>
        <View style={styles.mid}>
          <MyInput placeholder={"Email"} />
          <GapView length={20} />
          <MyInput placeholder={"Password"} />

          <View
            style={{
              flexDirection: "row",
              width: "100%",
              justifyContent: "space-between",
              marginTop: 50,
              marginBottom: 50,
            }}
          >
            <MyButton
              label={"As Student"}
              textColor={"#060635"}
              backgroundColor={"transparent"}
              style={{ width: "46%", borderWidth: 2 }}
            />
            <MyButton
              label={"As Tutor"}
              textColor={"#060635"}
              backgroundColor={"transparent"}
              style={{ width: "46%", borderWidth: 2 }}
            />
          </View>
          <MyButton label={"Proceed"} textColor={"white"} />
          <View style={{ flexDirection: "row", gap: 10, marginTop: 20 }}>
            <MyText text={"Already Registered?"} weight={"600"} />
            <MyText
              text={"Login instead"}
              weight={"600"}
              textColor={"#f2f4fc"}
            />
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  main: {
    flex: 1,
    width: "100%",
    height: "100%",
    backgroundColor: "#e2b623",
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
