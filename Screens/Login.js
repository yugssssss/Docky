import React from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image, Alert } from 'react-native';
import { Formik } from 'formik';
import * as Yup from 'yup';
import auth from '@react-native-firebase/auth';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { StackActions, useNavigation } from '@react-navigation/native';
import { getDatabase } from '@react-native-firebase/database';
import database from '@react-native-firebase/database';
import * as ZIM from 'zego-zim-react-native';
import * as ZPNs from 'zego-zpns-react-native';
import ZegoUIKitPrebuiltCallService, {
  ZegoCallInvitationDialog, ZegoUIKitPrebuiltCallWaitingScreen, ZegoUIKitPrebuiltCallInCallScreen, ZegoSendCallInvitationButton,
} from '@zegocloud/zego-uikit-prebuilt-call-rn';
const Login = () => {


  const navigation = useNavigation()

  // Validation schema for formik using Yup
  const LoginSchema = Yup.object().shape({
    email: Yup.string().email('Invalid email').required('Email is required'),
    password: Yup.string().min(8, 'Password must be at least 8 characters').required('Password is required'),
  });

  const handleLogin = async (values) => {
    const { email, password } = values;
    try {
      const data = await auth().signInWithEmailAndPassword(email, password);
      const uid = data.user.uid;
      const userref = database().ref('users/' + uid);
      
      // Fetching user data from the database
      userref.once('value').then(async (snapshot) => {
        const userData = snapshot.val();
  
        if (userData) {
          // Navigation based on the user role
          if (userData.role == 'Doctor') {
            await navigation.dispatch(StackActions.replace('HomeScreenPatient'));
          } else if (userData.role == 'patient') {
            await navigation.dispatch(StackActions.replace('HomeScreenDoctor'));
          }
  
          // ZegoUIKitPrebuiltCallService initialization with correct userData
          return ZegoUIKitPrebuiltCallService.init(
            1400545867, // App ID from ZEGOCLOUD's console
            "d6d527f3b2f7481edf7b84d756e24caead3447f5bc80bf2ac5c7af543c763a45", // App Sign from ZEGOCLOUD's console
            userData.uid, // Use userData.uid here
            userData.name, // Use userData.name here
            [ZIM, ZPNs],
            {
              
              androidNotificationConfig: {
                channelID: "ZegoUIKit",
                channelName: "ZegoUIKit",
              },
            }
          ).then(() => {
            // /////////////////////////
            ZegoUIKitPrebuiltCallService.requestSystemAlertWindow({
              message: 'We need your consent for the following permissions in order to use the offline call function properly',
              allow: 'Allow',
              deny: 'Deny',
            });
            // /////////////////////////
          });
        } else {
          Alert.alert('User data not found');
        }
      });
    } catch (error) {
      Alert.alert('Login Failed', error.message);
    }
  };
  

  return (
    <View style={styles.container}>
      
      <View style={styles.logoContainer}>
        <Image style={{ width: wp(13), height: hp(7) }} source={require('../assets/logo.png')} />
        <Text style={styles.logoText}>Docky</Text>
      </View>
      <Text style={styles.titles}>Welcome!</Text>
      <Text style={styles.subtitle}>"Bridging Distance , Building Trust Healthcare At Your Finger Tips"</Text>

      <Formik
        initialValues={{ email: '', password: '' }}
        validationSchema={LoginSchema}
        onSubmit={values => handleLogin(values)}
      >
        {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
          <>
            <TextInput
              style={styles.input}
              placeholder="Email"
              onChangeText={handleChange('email')}
              onBlur={handleBlur('email')}
              value={values.email}
              keyboardType="email-address"
              autoCapitalize="none"
              color="black"
              placeholderTextColor={"black"}
            />
            {touched.email && errors.email && <Text style={styles.errorText}>{errors.email}</Text>}

            <TextInput
              style={styles.input}
              placeholder="Password"
              onChangeText={handleChange('password')}
              onBlur={handleBlur('password')}
              value={values.password}
              secureTextEntry
              autoCapitalize="none"
              color="black"
              placeholderTextColor={"black"}
            />
            {touched.password && errors.password && <Text style={styles.errorText}>{errors.password}</Text>}

            <TouchableOpacity onPress={handleSubmit} style={styles.loginButton}>
              <Text style={styles.loginButtonText}>Login</Text>
            </TouchableOpacity>

            <View style={{ flexDirection: 'row', margin: 20 ,alignSelf:'center'}}>

              <Text style={{ color: 'black', fontSize: 15 }}>Don't Have a account? </Text>
              <TouchableOpacity onPress={() => navigation.goBack()} >
                <Text style={{ color: 'blue', fontSize: 15 }}>  Signup</Text>
              </TouchableOpacity>
            </View>
          </>
        )}
      </Formik>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    flex: 1,
    padding: 20,
    justifyContent: 'center',
  },
  logoContainer: {
    marginBottom: 30,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 10,
  },
  logoText: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#0E4F8B',
    textAlign: 'center',
  },
  image: {
    width: '100%',
    height: 200,
    resizeMode: 'cover',
    borderRadius: 10,
  },
  titles: {
    fontSize: 34,
    fontWeight: 'bold',
    color: '#0E4F8B',
    textAlign: 'center',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 14,
    color: '#0E4F8B',
    textAlign: 'center',
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    marginBottom: 10,
    borderRadius: 5,
  },
  errorText: {
    color: 'red',
    fontSize: 12,
    marginBottom: 10,
  },
  loginButton: {
    backgroundColor: '#1e90ff',
    paddingVertical: 15,
    borderRadius: 10,
    width: '100%',
    alignItems: 'center',
  },
  loginButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default Login;
