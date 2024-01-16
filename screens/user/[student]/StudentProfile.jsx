import React, { useState, useEffect } from "react";
import { View } from "react-native";
import { GapView, MyButton, MyInput, MyText } from "../../../components";
import { Form } from "../../../assets/vectors";
import { useNavigation } from "@react-navigation/native";

export default function StudentProfileSetup({ route }) {
  const navigation = useNavigation();
  const userID = route.params?.userID;
  console.log(userID);

  // const [studentData, setStudentData] = useState(null);


  const [isEditMode, setIsEditMode] = useState({
    firstName: false,
    lastName: false,
    age: false,
    grade: false,
  });

  const [values, setValues] = useState({
    firstName: 'Someone',
    lastName: '',
    age: '',
    grade: '',
  });



  useEffect(() => {
    // Fetch student data when the component mounts
    const fetchStudentData = async () => {
      try {
        const response = await fetch(`http://192.168.43.143/student/getStudentEdit?userID=${userID}`);
        const data = await response.json();
        console.log(data);
    
        if (!response.ok) {
          console.error('Error response:', response);
          // You might want to throw an error here
        }
    
        // Update the values state with actual data from studentData
        setValues({
          firstName: data?.firstName || "",
          lastName: data?.lastName || "",
          age: data?.age || "",
          grade: data?.grade || "",
        });
      } catch (error) {
        console.error('Error fetching student data:', error);
        console.error('Error details:', error.message);      }
    };
    

    fetchStudentData();
  }, [userID]);




  const handleInputChange = (field, text) => {
    setValues((prevValues) => ({
      ...prevValues,
      [field]: text,
    }));
  };

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: "#f2f4fc",
        paddingVertical: 90,
        width: "100%",
        height: "100%",
        alignItems: "center",
        paddingHorizontal: 20,
      }}
    >
      <View
        style={{
          width: "100%",
          alignSelf: "center",
          alignItems: "center",
          gap: 5,
        }}
      >
        <Form width={150} height={120} style={{ marginLeft: 20 }} />
        <MyText
          text={"Your Profile"}
          size={20}
          weight="600"
          style={{ textAlign: "center", paddingVertical: 10 }}
        />

        <View style={{ width: "100%" }}>
          <MyText
            text={"First Name"}
            style={{ paddingLeft: 5, paddingBottom: 5 }}
          />
          <MyInput
            text={values.firstName}
            editable={isEditMode.firstName}
            inputStyle={{
              color: isEditMode.firstName ? "black" : "grey",
            }}
            rightIcon={{
              name: isEditMode.firstName ? "check" : "edit",
              size: 20,
              color: "grey",
            }}
            onIconPress={() =>
              setIsEditMode((prev) => ({ ...prev, firstName: !prev.firstName }))
            }
            onChange={(text) => handleInputChange("firstName", text)}
          />
        </View>
        <View style={{ width: "100%" }}>
          <MyText
            text={"Last Name"}
            style={{ paddingLeft: 5, paddingBottom: 5 }}
          />
          <MyInput
            text={values.lastName}
            editable={isEditMode.lastName}
            inputStyle={{
              color: isEditMode.lastName ? "black" : "grey",
            }}
            rightIcon={{
              name: isEditMode.lastName ? "check" : "edit",
              size: 20,
              color: "grey",
            }}
            onIconPress={() =>
              setIsEditMode((prev) => ({ ...prev, lastName: !prev.lastName }))
            }
            onChange={(text) => handleInputChange("lastName", text)}
          />
        </View>
        <View
          style={{
            flexDirection: "row",
            width: "100%",
            justifyContent: "space-between",
          }}
        >
          <View style={{ width: "47%" }}>
            <MyText text={"Age"} style={{ paddingLeft: 5, paddingBottom: 5 }} />
            <MyInput
              text={values.age}
              editable={isEditMode.age}
              inputStyle={{
                color: isEditMode.age ? "black" : "grey",
              }}
              rightIcon={{
                name: isEditMode.age ? "check" : "edit",
                size: 20,
                color: "grey",
              }}
              onIconPress={() =>
                setIsEditMode((prev) => ({ ...prev, age: !prev.age }))
              }
              onChange={(text) => handleInputChange("age", text)}
            />
          </View>
          <View style={{ width: "47%" }}>
            <MyText
              text={"Grade"}
              style={{ paddingLeft: 5, paddingBottom: 5 }}
            />
            <MyInput
              text={values.grade}
              editable={isEditMode.grade}
              inputStyle={{
                color: isEditMode.grade ? "black" : "grey",
              }}
              rightIcon={{
                name: isEditMode.grade ? "check" : "edit",
                size: 20,
                color: "grey",
              }}
              onIconPress={() =>
                setIsEditMode((prev) => ({ ...prev, grade: !prev.grade }))
              }
              onChange={(text) => handleInputChange("grade", text)}
            />
          </View>
        </View>
        <GapView length={30} />
        <MyButton
          label={"Logout"}
          onPress={() => navigation.navigate("SignIn")}
        />
      </View>
    </View>
  );
}
