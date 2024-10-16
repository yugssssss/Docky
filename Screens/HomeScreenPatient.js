import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import auth from '@react-native-firebase/auth';
import database from '@react-native-firebase/database';
import Header from '../components/Header';
import Icon from 'react-native-vector-icons/Ionicons'; // Make sure to install react-native-vector-icons
import AppointmentRequestsTable from '../components/Appointmentlist';
import * as ZIM from 'zego-zim-react-native';
import * as ZPNs from 'zego-zpns-react-native';
import ZegoUIKitPrebuiltCallService, {
  ZegoCallInvitationDialog, ZegoUIKitPrebuiltCallWaitingScreen, ZegoUIKitPrebuiltCallInCallScreen, ZegoSendCallInvitationButton,
} from '@zegocloud/zego-uikit-prebuilt-call-rn';
const HomeScreenPatient = () => {


  const [Docdata, setDocdata] = useState([])
  const [timestamp, setTimestamp] = useState(Date.now());
  const [users, setUsers] = useState([]);

const uid  = auth().currentUser.uid
useEffect(()=>{
  const getdocdata = async()=>{
      const dataref =await database().ref('Doctors/'+uid)
      dataref.once('value').then(async(snapshot)=>{
        const data = snapshot.val();
      await  setDocdata(data)
        console.log(data);
        
      })
  }
  getdocdata();

  const fetchData = async () => {
    try {
      const snapshot = await database().ref(uid).once('value');
      const data = snapshot.val();
      if (data) {
        const usersArray = Object.values(data);  // Convert object to array
        setUsers(usersArray);
      }
    } catch (error) {
      console.error("Error retrieving data: ", error);
    }
  };

  fetchData();

},[])




  return (
    <>
     <Header role={"Doctor"}/>
    <View style={{marginVertical:20}}>
    {/* <View style={styles.card}>
        <View style={styles.infoRow}>
          <Icon name="person-outline" size={20} color="#3F7FFF" />
          <Text style={styles.infoText}>Name: {Docdata.name}</Text>
        </View>
        <View style={styles.infoRow}>
          <Icon name="briefcase-outline" size={20} color="#3F7FFF" />
          <Text style={styles.infoText}>Specialization: {Docdata.specialization}</Text>
        </View>
        <View style={styles.infoRow}>
          <Icon name="school-outline" size={20} color="#3F7FFF" />
          <Text style={styles.infoText}>Experience: {Docdata.experience} years</Text>
        </View>
        <View style={styles.infoRow}>
          <Icon name="call-outline" size={20} color="#3F7FFF" />
          <Text style={styles.infoText}>Phone: {Docdata.phoneNumber}</Text>
        </View>
        <View style={styles.infoRow}>
          <Icon name="mail-outline" size={20} color="#3F7FFF" />
          <Text style={styles.infoText}>Email: {Docdata.email}</Text>
        </View> 
      </View> */}

      <Text style={{color:'#0E4F8B', alignSelf:'center',fontSize:24,fontWeight:'700'}}>Appointment Requests</Text>
      {users.length>0?(<View style={{backgroundColor:'#51A3EE',borderRadius:20,marginVertical:15,marginHorizontal:10,padding:20}}>
        <AppointmentRequestsTable Docdata={Docdata}/>
      </View>):(<View style={{marginTop:320,justifyContent:'center',alignItems:'center'}}>
        <Text style={{color:'#219ebc', fontSize:30}}>EMPTY 🫥</Text>
        </View>)}
      
    </View>
    </> 
  )
}

export default HomeScreenPatient

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 5,
    elevation: 4,
    marginBottom: 20,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  infoText: {
    fontSize: 16,
    marginLeft: 10,
    color: '#333',
  },
})  