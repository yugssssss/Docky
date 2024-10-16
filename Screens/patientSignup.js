import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  CheckBox,
  ScrollView,
  Image,
  Alert,
  Button,
} from 'react-native';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
import auth from '@react-native-firebase/auth';
import database from '@react-native-firebase/database';
import { StackActions, useNavigation } from '@react-navigation/native';
import * as yup from 'yup'
import { Formik } from 'formik'


const PatientSignUpScreen = () => {
  // const [name, setName] = useState('');
  // const [email, setEmail] = useState('');
  // const [phoneNumber, setPhoneNumber] = useState('');
  // const [password, setpassword] = useState('');
 

const navigation = useNavigation()


const loginValidationSchema = yup.object().shape({
  email: yup
    .string()
    .email("Please enter valid email")
    .required('Email Address is Required'),
  password: yup
    .string()
    .min(8, ({ min }) => `Password must be at least ${min} characters`)
    .required('Password is required'),
    name: yup
    .string()
    
    .required('Name is Required'),
    phoneNumber: yup
    .string()
    .min(10,'Number should be of 10 Digits')
    .max(10,'Number Should be of 10 Digits')
    .required('PhoneNumber is Required'),
    Age: yup
    .string()
    
    
    .required('Age is Required'),
    gender: yup
    .string()
    .oneOf(['M', 'F'], 'Gender must be either M (Male) or F (Female)')
    .required('Gender is required'),

})


  const HandleSignup = async(values) =>{
    try {
      const user = await auth().createUserWithEmailAndPassword(values.email,values.password)
     
      const uid = await auth().currentUser.uid
     await database().ref('Patients/'+uid).set({
      name : values.name,
      uid : uid,
      email : values.email,
      phonenumber : values.phoneNumber,
      gender:values.gender,
      role : 'patient',
      Age:values.Age,
     
     });
      await database().ref('users/'+uid).set({
      name : values.name,
      uid : uid,
      email : values.email,
      phonenumber : values.phoneNumber,
      gender:values.gender,
      role : 'patient',
      Age:values.Age,
     
     });
      Alert.alert("Registered Successfully")
      navigation.navigate("Login")
     
     values.name = '',
     values.email = '',values.phoneNumber = '',values.password = '',values.gender = ''
    } catch (error) {
      Alert.alert('error')
    }
    }


  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.logoContainer}>
      <Image style={{width:wp(13) ,height: hp(7)}} source={require('../assets/logo.png')}/> 
        <Text style={styles.logoText}>Docky</Text>
      </View>

      <Text style={styles.title}>Create an account</Text>
      <Text style={styles.subtitle}>
       "Your Health Journey Starts here Connect With Right Care , Anytime  Anywhere"
      </Text>

      {/* Name Input */}
      <Formik
   validationSchema={loginValidationSchema}
   initialValues={{name:'', email: '', password: '' ,phoneNumber:'' ,Age:'' , gender:''}}
   onSubmit={values => HandleSignup(values)}
 >
   {({
     handleChange,
     handleBlur,
     handleSubmit,
     values,
     errors,
     isValid,
     touched,
   }) => (
     <>
     <TextInput
         name="name"
         placeholder="Enter Name"
         style={styles.textInput}
         onChangeText={handleChange('name')}
         onBlur={handleBlur('name')}
         value={values.name}
         placeholderTextColor={'black'}
       />
        {(errors.name && touched.name) &&
         <Text style={{ fontSize: 10, color: 'red',alignSelf:'flex-start' ,marginBottom:10 }}>{errors.name}</Text>
       }
       <TextInput
         name="email"
         placeholder="Email Address"
         style={styles.textInput}
         onChangeText={handleChange('email')}
         onBlur={handleBlur('email')}
         value={values.email}
         keyboardType="email-address"
         placeholderTextColor={'black'}
       />
       {(errors.email && touched.email)&&
         <Text style={{ fontSize: 10, color: 'red',alignSelf:'flex-start' ,marginBottom:10 }}>{errors.email}</Text>
       }
       <TextInput
         name="password"
         placeholder="Password"
         style={styles.textInput}
         onChangeText={handleChange('password')}
         onBlur={handleBlur('password')}
         value={values.password}
         secureTextEntry
         placeholderTextColor={'black'}

       />
       {(errors.password && touched.password) &&
         <Text style={{ fontSize: 10, color: 'red' ,alignSelf:'flex-start' ,marginBottom:10}}>{errors.password}</Text>
       }
        <TextInput
         name="PhoneNumber"
         placeholder="Enter PhoneNumber"
         style={styles.textInput}
         onChangeText={handleChange('phoneNumber')}
         onBlur={handleBlur('phoneNumber')}
         value={values.phoneNumber}
         keyboardType="email-address"
         placeholderTextColor={'black'}
       />
        {(errors.phoneNumber ,touched.phoneNumber ) &&
         <Text style={{ fontSize: 10, color: 'red',alignSelf:'flex-start' ,marginBottom:10}}>{errors.phoneNumber}</Text>
       }
      

      <TextInput
         name="Age"
         placeholder="Enter Age (Years)"
         style={styles.textInput}
         onChangeText={handleChange('Age')}
         onBlur={handleBlur('Age')}
         value={values.Age}
         keyboardType="email-address"
         placeholderTextColor={'black'}
       />
        {(errors.Age ,touched.Age ) &&
         <Text style={{ fontSize: 10, color: 'red',alignSelf:'flex-start' ,marginBottom:10}}>{errors.Age}</Text>
       }

<TextInput
         name="gender"
         placeholder="Enter Gender"
         style={styles.textInput}
         onChangeText={handleChange('gender')}
         onBlur={handleBlur('gender')}
         value={values.gender}
         keyboardType="email-address"
         placeholderTextColor={'black'}
       />
        {(errors.gender ,touched.gender ) &&
         <Text style={{ fontSize: 10, color: 'red',alignSelf:'flex-start' ,marginBottom:10}}>{errors.gender}</Text>
       }


        <TouchableOpacity style={styles.button}  onPress={handleSubmit}
         disabled={!isValid}>
        <Text style={styles.buttonText}>Sign Up</Text>
      </TouchableOpacity>

      <View style={{flexDirection:'row', margin:20}}>

<Text style={{ color: 'black', fontSize:15 }}>Already registered at Docky?</Text>
<TouchableOpacity onPress={() =>navigation.dispatch(StackActions.replace('Login'))} >
  <Text style={{ color: 'blue' , fontSize:15  }}>  Login</Text>
</TouchableOpacity>
</View>
     </>
   )}
 </Formik>
 
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
    // Background color
  },
 
  textInput: {
    width: '100%',
    padding: 15,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    marginBottom: 15,
    backgroundColor: '#fff',
    color:'black',
  },
  logoContainer: {
    marginBottom: 30,
    flexDirection:'row',
    justifyContent:'center',
    alignItems:'center',
    gap:10,
  },
  logoText: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#0E4F8B',
    textAlign: 'center',
  },
  title: {
    fontSize: 24,
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
    width: '100%',
    padding: 15,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    marginBottom: 15,
    backgroundColor: '#fff',
  },
  termsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  termsText: {
    fontSize: 12,
    color: '#666',
    marginLeft: 10,
  },
  link: {
    color: '#1e90ff',
    textDecorationLine: 'underline',
  },
  button: {
    backgroundColor: '#1e90ff',
    paddingVertical: 15,
    borderRadius: 10,
    width: '100%',
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  btn:{
    backgroundColor: '#1e90ff',
    paddingVertical: 15,
    borderRadius: 10,
    width: '100%',
    alignItems: 'center',
  },
});

export default PatientSignUpScreen;
