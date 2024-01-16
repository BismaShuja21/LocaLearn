import { StyleSheet, View } from "react-native";
import { useState } from "react";
import { GapView, MyButton, MyInput, MyText } from "../../components";
import { Bulb, Group } from "../../assets/vectors";
import { useNavigation } from "@react-navigation/native";
import { Formik } from "formik";
import { UserSignInSchema } from "../../constants/validations/schema";
import axios from "axios";

export default function SignIn() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(""); // Add this line to define setError

  const navigation = useNavigation();

  return (
    <View style={styles.main}>
      <View style={styles.container}>
        <View style={styles.top}>
          <MyText text={"LocaLearn"} size={30} weight={"700"} />
          <Bulb />
          <MyText text={"Welcome!"} size={35} weight={"800"} />
        </View>

        <Formik
          initialValues={{
            email: "",
            password: "",
          }}
          onSubmit={async (values, { resetForm }) => {
            try {
              const response = await axios.post(
                "http://192.168.43.143:3000/api/login",
                values
              );

              if (response.data.success) {
                const userType = response.data.user.userType;
                const userID = response.data.user._id;
                console.log("userType:", userType);

                if (userType === "tutor") {
                  navigation.navigate("TutorTab", {userID: userID});

                } else {
                    // navigation.navigate("StudentTab", {userID: userID});
                    // Fetch the Student instance using the userID
        const studentResponse = await axios.get(
          `http://192.168.43.143:3000/student/getStudent?userID=${userID}`
        );

        if (studentResponse.data.success) {

          const studentID = studentResponse.data.student._id;
          navigation.navigate("StudentTab", { userID: studentID });
        } else {
          setError(studentResponse.data.message || "Failed to fetch student data");
        }
                }
              } else {
                setError(response.data.message || "Sign-in failed");
              }
            } catch (error) {
              console.error("Error signing in:", error);
              setError("An unexpected error occurred");
            }
          }}
          validationSchema={UserSignInSchema.signInForm}
        >
          {({ handleChange, handleSubmit, errors }) => {
            return (
              <View style={styles.mid}>
                <MyInput
                  placeholder={"Email"}
                  onChange={handleChange("email")}
                />
                <GapView length={20} />
                <MyInput
                  placeholder={"Password"}
                  password
                  onChange={handleChange("password")}
                />
                <View style={styles.pw}>
                  <MyText text={"Forgot Password?"} weight={"600"} />
                </View>
                <MyButton
                  label={"Sign In"}
                  onPress={() => {
                    console.log(errors);
                    // navigation.navigate("TutorTab");
                    handleSubmit();
                  }}
                />
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
            );
          }}
        </Formik>
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
