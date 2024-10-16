import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { NavigationContainer } from '@react-navigation/native';
import SplashScreen from '../Screens/SplashScreen';
import Login from '../Screens/Login';
import HomeScreen from '../Screens/HomeScreenDoctor';
import Chose from '../Screens/Chose';
import DoctorSignUpScreen from '../Screens/doctorSignup';
import DoctorPatientScreen from '../Screens/Chose';
import PatientSignUpScreen from '../Screens/patientSignup';
import HomeScreenDoctor from '../Screens/HomeScreenDoctor';
import HomeScreenPatient from '../Screens/HomeScreenPatient';
import DoctorInfoScreen from '../Screens/DoctorInfoScreen';
import HomeScreenTabs from './HomeScreenTabs';
import DoctorHomeScreenTabs from './DoctorHomeScreenTabs';
import Chatscreen from '../Screens/Chatscreen';
import ZegoUIKitPrebuiltCallService, {
  ZegoCallInvitationDialog, ZegoUIKitPrebuiltCallWaitingScreen, ZegoUIKitPrebuiltCallInCallScreen, ZegoSendCallInvitationButton,
} from '@zegocloud/zego-uikit-prebuilt-call-rn';
import * as ZIM from 'zego-zim-react-native';
import * as ZPNs from 'zego-zpns-react-native';
const Mainnavigator = () => {

  const Stack = createNativeStackNavigator();

  return (
    <NavigationContainer>
      <ZegoCallInvitationDialog />

      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name='Splash' component={SplashScreen} />
        <Stack.Screen name='Chose' component={Chose} />
        <Stack.Screen name='DoctorSignup' component={DoctorSignUpScreen} />
        <Stack.Screen name='PatientSignup' component={PatientSignUpScreen} />
        <Stack.Screen name='Login' component={Login} />


        <Stack.Screen name='HomeScreenDoctor' component={HomeScreenTabs} />
        <Stack.Screen name='HomeScreenPatient' component={DoctorHomeScreenTabs} />
        <Stack.Screen name='DoctorinfoScreen' component={DoctorInfoScreen} />
        <Stack.Screen
          options={{ headerShown: false }}
          // DO NOT change the name 
          name="ZegoUIKitPrebuiltCallWaitingScreen"
          component={ZegoUIKitPrebuiltCallWaitingScreen}
        />
        <Stack.Screen
          options={{ headerShown: false }}
          // DO NOT change the name
          name="ZegoUIKitPrebuiltCallInCallScreen"
          component={ZegoUIKitPrebuiltCallInCallScreen}
        />
        <Stack.Screen name='Chatscreen' component={Chatscreen} />



      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default Mainnavigator

const styles = StyleSheet.create({})