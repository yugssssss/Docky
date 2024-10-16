import { ActivityIndicator, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

import Entypo from 'react-native-vector-icons/Entypo'
import Animated, { useSharedValue, withSpring } from 'react-native-reanimated';
import { StackActions, useNavigation } from '@react-navigation/native';

import auth from '@react-native-firebase/auth'
import database from '@react-native-firebase/database'
const SplashScreen = () => {

  const ring1padding = useSharedValue();
  const ring2padding = useSharedValue();

const navigation = useNavigation()


  const [user, setUser] = useState(null);
  const [role, setRole] = useState(null);

  const onAuthStateChanged = async (user) => {
    setUser(user); // Set user in state
    if (user) {
      const userRef = database().ref('users/'+user.uid);
      userRef.once('value').then((snapshot) => {
        const userData = snapshot.val();
        if (userData) {
          setRole(userData.role); 
        }
      });
    }
  };

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    setInterval(async() => {
    
       await setTimeout(() => ring1padding.value =  withSpring(ring1padding.value + hp(5)), 500);
       await setTimeout(() => ring2padding.value = withSpring(ring2padding.value + hp(5.5)), 600);
        ring1padding.value = 0;
        ring2padding.value = 0;
  
     },1200);
    return subscriber; 
  }, []);



  // useEffect(() => {
    
  //   setInterval(async() => {
      
  //    await setTimeout(() => ring1padding.value =  withSpring(ring1padding.value + hp(5)), 500);
  //    await setTimeout(() => ring2padding.value = withSpring(ring2padding.value + hp(5.5)), 600);
  //     ring1padding.value = 0;
  //     ring2padding.value = 0;

  //  },1200);

  // }, [])

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      {/* Image Background */}
      <Image
        style={{
          width: wp(100),
          height: hp(100),
          position: 'relative'
        }}
        source={require('../assets/DockyDesigns/Docky/photo.png')}
      />

      {/* Centered Circle with Plus Icon */}
      <View style={{
         position: 'absolute',
    
    justifyContent:'center',
    alignItems:'center',

      }}>

      <Animated.View style={[ { padding: ring2padding ,backgroundColor: 'rgba(52, 52, 52, 0.2)' , borderRadius:hp(16)}]}>

        <Animated.View
          style={[ { padding: ring1padding ,backgroundColor: 'rgba(52, 52, 52, 0.4)',borderRadius:hp(15) }]}
        >
          <View style={{backgroundColor:'white', height:hp(15), borderRadius:hp(15)/2}}>

            <Entypo name={'circle-with-plus'} color={'#51A3EE'} size={hp(15)}  />
          </View>

        </Animated.View>
      </Animated.View>

      </View>
      <TouchableOpacity 
      onPress={()=>{
        user? (
          role ==='Doctor'? (navigation.dispatch(StackActions.replace('HomeScreenPatient'))):(navigation.dispatch(StackActions.replace('HomeScreenDoctor')))
        ):(navigation.navigate('Chose'))
      }}
      
      
      style={{position:'absolute', bottom:20, width:wp(60) , height:hp(10), justifyContent:'center', alignItems:'center', padding:10, backgroundColor:'#51A3EE',
        borderRadius:25,borderWidth:1,borderColor:'white',
       }}>
        <Text style={{fontSize:20 , color:'white'}}>Get Started</Text>
      </TouchableOpacity>
    </View>

  )
}

export default SplashScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  ani: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: [{ translateX: -hp(7.5) }, { translateY: -hp(7.5) }],
    backgroundColor: 'rgba(52, 52, 52, 0.2)',
    borderRadius: hp(15),

  },
  ani2: {

  },
})