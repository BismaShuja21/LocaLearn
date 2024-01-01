import { StyleSheet, TextInput, View, Image, Text, Button, TouchableOpacity } from 'react-native';
import { Formik } from 'formik';
export default function SignUp() {
  return (
    <View style={styles.Logincontainer}>
        <View style={styles.logoContainer}>
            <Image style={styles.logo} source={require('../assets/images/logo2.svg')}/>
            <Text style={styles.logoTitle}>LocaLearn</Text>
        </View>
    {/* // <SafeAreaView> */}
        <View style={styles.Formcontainer}>
            <Text style={styles.welcome}>Create New Account</Text>
            <Formik
                initialValues={{ username:'', email: '', password: '', role: ''}}
                onSubmit={(values) => {
                    console.log(values);
                    actions.resetForm();
                }}
            >
                {(props) => (
                    <View>
                        <TextInput 
                        style={styles.input}
                        placeholder='Username'
                        onChangeText={props.handleChange('username')}
                        onBlur={props.handleBlur('username')}
                        value={props.values.body}
                        />

                        <TextInput 
                        style={styles.input}
                        placeholder='Email'
                        onChangeText={props.handleChange('email')}
                        onBlur={props.handleBlur('email')}
                        value={props.values.title}
                        />

                    <TextInput 
                        style={styles.input}
                        placeholder='Password'
                        onChangeText={props.handleChange('password')}
                        onBlur={props.handleBlur('password')}
                        value={props.values.body}
                    />

                    <View style={styles.roleContainer}>
                        <TouchableOpacity
                          style={[styles.roleButton, props.values.role === 'student' &&         styles.activeRoleButton]}
                          onPress={() => props.setFieldValue('role', 'student')}
                        >
                          <Text>As Student</Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                          style={[styles.roleButton, props.values.role === 'teacher' &&         styles.activeRoleButton]}
                          onPress={() => props.setFieldValue('role', 'teacher')}
                        >
                          <Text>As Tutor</Text>
                        </TouchableOpacity>
                    </View>  

                    <View style={styles.submit}>
                        <Button  title='SIGN UP'
                         onPress={props.handleSubmit}
                         disabled={!props.values.role || !props.values.username || !props.values.email || !props.values.password}
                         color= 'black'/>
                    </View>

                        <View style={{flexDirection: 'row', marginTop: 5, gap: 20, justifyContent: 'center'}}>
                            <Text style={styles.createTxt}>Already Registered?</Text>
                            <TouchableOpacity>
                                <Text style={{color: 'white', fontWeight: 'bold'}}>Login</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                )}
            </Formik>
        </View>  
    {/* // </SafeAreaView> */}
    </View>
  );
}

const styles = StyleSheet.create({
    Logincontainer: {
        flex: 1,
        width: '100%',
        backgroundColor: '#F7CE4D',
        paddingTop: 30
    },
    logoContainer: {
        alignItems: 'center',
        paddingVertical: 20
    },
    logoTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: 'white'
    },
    logo: {
        width: 70,
        height: 70,
        padding: 20
    },
    Formcontainer: {
        flex: 1,
        width: '100%',
        paddingVertical: 25,
        alignItems: 'center',
        justifyContent: 'flex-start',
      },
      welcome: {
        fontWeight: 'bold',
        fontSize: 28,
        marginBottom: 30,
        width: '60%',
        textAlign: 'center'

      },
      input: {
          borderRadius: 25,
          width: 260,
          height: 45,
          alignSelf: 'center',
          padding: 8,
          fontSize: 16,
          margin: 8,
          backgroundColor: 'white'
      },
      submit: {
        marginTop: 30,
        borderRadius: 50,
        overflow: 'hidden',
        backgroundColor: '#333',
        width: 260,
        height: 45,
        alignSelf: 'center',
      },
      roleContainer: {
        flexDirection: 'row',
        gap: 10,
        marginTop: 50,
      },
      roleButton: {
        flex: 1,
        padding: 8,
        borderRadius: 25,
        borderWidth: 2,
        borderColor: 'black',
        alignItems: 'center',
      },
      activeRoleButton: {
        backgroundColor: 'white',
        borderColor: 'white'
      },
    
});
