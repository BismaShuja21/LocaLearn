import { Pressable, StyleSheet, TouchableOpacity, View } from "react-native";
import { GapView, MyButton, MyInput, MyText } from "../../components";
import { Bulb, BulbOff, Group } from "../../assets/vectors";
import { useNavigation } from "@react-navigation/native";
import { Formik } from "formik";
import { UserSignUpSchema } from "../../constants/validations/schema";
import { useState } from "react";
import axios from 'axios';



export default function SignUp() {
  const navigation = useNavigation();
  const [selectedRole, setSelectedRole] = useState("");

  const handleRoleSelection = (role) => {
    setSelectedRole(role);
  };

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
        <Formik
          initialValues={{
            email: "",
            password: "",
            confirmPassword: "",
            anyOne: false,
          }}
          onSubmit={async (values, { resetForm }) => {

            // try {
            //   // Prepare the data to be sent to the server
            //   const userData = {
            //     email: values.email,
            //     password: values.password,
            //     userType: selectedRole,
            //   };
          
            //   // Send the data to the server using Axios
            //   const response = await axios.post('http://192.168.43.142:3000/api/register', userData);

            //   // Handle the server response here if needed
            //   console.log('Server Response:', response.data);
            //   console.log("Sign Up success", values);
          
            //   // Navigate to the appropriate screen based on the selected role
            //   navigation.navigate(selectedRole === 'student' ? 'StudentProfileSetup' : 'TutorProfileSetup');
          
            //   // Reset the form after successful submission
            //   resetForm();
            // } catch (error) {
            //   // Handle errors (e.g., network issues, server errors)
            //   console.error('Error submitting the form:', error);
            // }


            console.log("Sign Up success", values);
            navigation.navigate(
              selectedRole === "student"
                ? "StudentProfileSetup"
                : "TutorProfileSetup"
            );

          }}
          validationSchema={UserSignUpSchema.signUpForm}
        >
          {({ handleChange, handleSubmit, errors, setFieldValue }) => (
            <View style={styles.mid}>
              <MyInput placeholder={"Email"} onChange={handleChange("email")} />
              <GapView length={15} />
              <MyInput
                placeholder={"Password"}
                password
                onChange={handleChange("password")}
              />
              <GapView length={15} />
              <MyInput
                placeholder={"Confirm Password"}
                password
                onChange={handleChange("confirmPassword")}
              />

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
                  textColor={selectedRole == "student" ? "white" : "#060635"}
                  backgroundColor={
                    selectedRole === "student" ? "#060635" : "transparent"
                  }
                  style={{
                    width: "46%",
                    borderWidth: 2,
                  }}
                  onPress={() => {
                    handleRoleSelection("student");
                    setFieldValue("anyOne", true);
                  }}
                />
                <MyButton
                  label={"As Tutor"}
                  textColor={selectedRole == "tutor" ? "white" : "#060635"}
                  backgroundColor={
                    selectedRole === "tutor" ? "#060635" : "transparent"
                  }
                  style={{ width: "46%", borderWidth: 2 }}
                  onPress={() => {
                    handleRoleSelection("tutor");
                    setFieldValue("anyOne", true);
                  }}
                />
              </View>

              <MyButton
                label={"Sign Up"}
                onPress={() => {
                  handleSubmit();
                  // navigation.navigate(
                  //   selectedRole === "student"
                  //     ? "StudentProfileSetup"
                  //     : "TutorProfileSetup"
                  // );
                  console.log(errors);
                }}
              />

              <View style={{ flexDirection: "row", gap: 10, marginTop: 20 }}>
                <MyText text={"Already Registered?"} weight={"600"} />
                <MyText
                  text={"Login instead"}
                  weight={"600"}
                  textColor={"#f2f4fc"}
                  onPress={() => navigation.navigate("SignIn")}
                />
              </View>
            </View>
          )}
        </Formik>
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
