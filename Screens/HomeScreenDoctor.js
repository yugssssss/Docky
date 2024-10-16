import { FlatList, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { StackActions, useNavigation } from '@react-navigation/native';
import auth from '@react-native-firebase/auth';
import Header from '../components/Header';
import database from '@react-native-firebase/database';
import DoctorCard from '../components/DoctorCard';
import { heightPercentageToDP, widthPercentageToDP } from 'react-native-responsive-screen';
import Ionicons from 'react-native-vector-icons/Ionicons';

import * as ZIM from 'zego-zim-react-native';
import * as ZPNs from 'zego-zpns-react-native';
import ZegoUIKitPrebuiltCallService, {
  ZegoCallInvitationDialog, ZegoUIKitPrebuiltCallWaitingScreen, ZegoUIKitPrebuiltCallInCallScreen, ZegoSendCallInvitationButton,
} from '@zegocloud/zego-uikit-prebuilt-call-rn';
const HomeScreenDoctor = () => {
  const [requests, setRequests] = useState([]);
  const [search, setsearch] = useState()

  const navigation = useNavigation()
  const [Allusers, setAllusers] = useState([])
  const [Searchdata, setSearchdata] = useState([])
  const [timestamp, setTimestamp] = useState(Date.now());

  useEffect(()=>{
    const getdocdata = async()=>{
        const dataref =await database().ref('Patients/'+uid)
        dataref.once('value').then(async(snapshot)=>{
          const data = snapshot.val();
        await  setRequests(data)
        console.log(data);
        
          
        })
    }
    getdocdata();
  },[])


  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const dataRef = database().ref('Doctors');
        const snapshot = await dataRef.once('value'); // Get the snapshot

        const doctorsData = snapshot.val(); // Get the value from the snapshot
        const list = [];

        // Loop through the object keys to populate the list
        if (doctorsData) {
          Object.keys(doctorsData).forEach((key) => {
            const child = doctorsData[key]; // Get the child data using the key
            list.push({
              name: child.name,
              uid: child.uid, // Make sure uid is stored in the database
              email: child.email,
              phoneNumber: child.phoneNumber,
              specialization: child.specialization,
              experience: child.experience,
              Age: child.Age,
              gender: child.gender,
              role: 'Doctor',
            });
          });
        }
   
        setAllusers(list); 
       setSearchdata(list)
        
      } catch (error) {
        console.log("Error fetching data: ", error);
      }
    };
  
    fetchDoctors();
  }, []);


  const Handlechange = (value)=>{
    setsearch(value)
     if(value){

         setAllusers(Allusers.filter((item)=> item.name.toLowerCase().includes(value.toLowerCase())))
     } 
     else{
      setAllusers(Searchdata)
     }
    
 }
  

  const handleLogout = async () => {
    try {
      await auth().signOut();
      navigation.dispatch(StackActions.replace("Splash")); // Navigate back to login screen after logout
    } catch (error) {
      Alert.alert('Logout Failed', error.message);
    }
  };

  return (
    <>
      <Header role={"Patient"}/>
      <View style={styles.container}>
        <View style={styles.textContainer}>
          <Text style={styles.blackText}>Connect with</Text>
          <Text style={styles.blackText}>Doctors</Text>
          <Text style={styles.redText}>At Docky</Text>
        </View>
        <Text style={styles.chooseText}>Choose A Doctor</Text>
        <View style={styles.searchContainer}>
      <Ionicons name="search" size={20} color="white" style={styles.icon} />
      <TextInput
        style={styles.input}
        placeholder="Search Doctor"
        placeholderTextColor="white"
        color="white"
        value={search}
        onChangeText={Handlechange}
      />
    </View>
        <FlatList
        data={Allusers}
        keyExtractor={(item)=>item.uid}
        numColumns={2}
         renderItem={({item})=>(
           <DoctorCard doctor={item}/>
         )}
        
        />

      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,

    padding: 10,
  },
  title: {
    fontSize: 20,
    marginBottom: 20,
    textAlign: 'center',
    color: 'black',
  },
  logoutButton: {
    backgroundColor: 'red',
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 5,
    marginTop: 20,
  },
  logoutButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  textContainer: {
    marginTop: 10, // Distance from the header
    alignItems: 'flex-start', // Align text to the left
  },
  blackText: {
    fontSize: 28,
    color: '#51A3EE',
    fontWeight: 'bold',
  },
  chooseText: {
    marginTop: 20,
    fontSize: 24, // Slightly smaller font size
    fontWeight: 'bold',
    color: '#0E4F8B',
    textAlign: 'center',
    marginVertical: 10,
  },
  redText: {
    fontSize: 28,
    color: '#0E4F8B',
    fontWeight: 'bold',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#51A3EE',
    borderRadius: 25,
    paddingHorizontal: 10,
    height: 50,
    marginVertical: 10,
  },
  icon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: 'black',
  },
});

export default HomeScreenDoctor