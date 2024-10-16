import { FlatList, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import Header from '../components/Header'
import auth from '@react-native-firebase/auth';
import database from '@react-native-firebase/database';
import AppointedDoctorcard from '../components/AppointedDoctorcard';

const SelectedDoctors = () => {

  const [Requests, setRequests] = useState([])

  const uuid = auth().currentUser.uid

  useEffect(() => {
    const doctorfunction = async () => {
      const dataRef = database().ref('appointments/'+uuid+"/");
      const snapshot = await dataRef.once('value');
      const requestsData = snapshot.val();
      const list = [];
  
      if (requestsData) {
        Object.keys(requestsData).forEach((key) => {
          const request = requestsData[key];
          list.push({
            name: request.name,
            uid: request.uid,
            email: request.email,
            phoneNumber: request.phoneNumber,
            specialization: request.specialization,
            experience: request.experience,
            Age: request.Age,
            gender: request.gender,
            date: request.date,
            time: request.time,
          });
        });
      }
  
      setRequests(list);   // Set the requests array
      console.log(list);  // Log the fetched list before setting state
    };
  
    doctorfunction();
  }, []);  // Dependency array is empty, so it will run only once when the component mounts.
  

// useEffect(() => {
//  console.log(Requests);
 
// }, [])



  return (
    <>
      <Header role={"Patient"}/>
      <View style={{ marginVertical: 20 }}>
        <Text style={{ color: 'black', alignSelf: 'center', fontSize: 24, fontWeight: '700' }}>Approved Doctors</Text>
       {Requests.length>0? <View style={{backgroundColor:'#51A3EE',borderRadius:20,padding:20,marginVertical:15,marginHorizontal:10}}>
           <FlatList
           data={Requests}
           keyExtractor={(item)=>item.uid}
           renderItem={({item})=>(
            <AppointedDoctorcard doctor={item}/>
           )}
           contentContainerStyle={{paddingBottom:100}}
           showsVerticalScrollIndicator={false}
           />
        </View>:(<View style={{marginTop:320,justifyContent:'center',alignItems:'center'}}>
        <Text style={{color:'#219ebc', fontSize:30}}>EMPTY 🫥</Text>
      </View>)}
      </View>
    </>
  )
}

export default SelectedDoctors

const styles = StyleSheet.create({})