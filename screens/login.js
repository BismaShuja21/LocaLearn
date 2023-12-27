import { StyleSheet, TextInput, View, Image, Text, Button, TouchableOpacity } from 'react-native';
import { Formik } from 'formik';
export default function Login() {
  return (
    <View style={styles.Logincontainer}>
        <View style={styles.logoContainer}>
            <Text style={styles.logoTitle}>LocaLearn</Text>
            <Image style={styles.logo} source={require('../assets/images/logo.svg')}/>
        </View>
    {/* // <SafeAreaView> */}
        <View style={styles.Formcontainer}>
            <Text style={styles.welcome}>Welcome!</Text>
            <Formik
                initialValues={{ email: '', password: ''}}
                onSubmit={(values) => {
                    console.log(values);
                    actions.resetForm();
                }}
            >
                {(props) => (
                    <View>
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
                        <View style={styles.submit}>
                            <Button  title='SIGN IN'
                             onPress={props.handleSubmit}
                             color= 'black'/>
                        </View>
                        <View style={{flexDirection: 'row', marginTop: 5, gap: 10}}>
                            <Text style={styles.createTxt}>Don't have an account?</Text>
                            <TouchableOpacity>
                                <Text style={{color: '#F4C01E', fontWeight: 'bold'}}>Create Account</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                )}
            </Formik>
        </View>
        <Image style={styles.homeImg} source={require('../assets/images/Group 4.svg')} />    
    {/* // </SafeAreaView> */}
    </View>
  );
}

const styles = StyleSheet.create({
    Logincontainer: {
        flex: 1,
        width: '100%',
        // backgroundColor: 'lightyellow',
        paddingTop: 30
    },
    logoContainer: {
        alignItems: 'center',
        paddingVertical: 20
    },
    logoTitle: {
        fontSize: 18,
        fontWeight: 'bold'
    },
    logo: {
        width: 70,
        height: 70,
        padding: 20
    },
    Formcontainer: {
        flex: 1,
        width: '100%',
        paddingVertical: 30,
        alignItems: 'center',
        justifyContent: 'Center',
      },
      welcome: {
        fontWeight: 'bold',
        fontSize: 28,
        marginBottom: 30
      },
      input: {
          borderWidth: 1,
          borderColor: '#333',
          borderRadius: 25,
          width: 260,
          height: 45,
          alignSelf: 'center',
          padding: 8,
          fontSize: 16,
          margin: 10,
      },
      submit: {
        marginTop: 30,
        borderRadius: 50,
        overflow: 'hidden',
        backgroundColor: 'black',
        width: 260,
        height: 40,
        alignSelf: 'center'
      },
      homeImg: {
        width: 250,
        height: 250,
        resizeMode: 'contain',
        alignSelf: 'center',
        // overflow: 'hidden'
      },
    
});
