import { FlatList, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import Header from '../components/Header'
import database from '@react-native-firebase/database';
import auth from '@react-native-firebase/auth';
import PatientCard from '../components/PatientCard';


const SelectedPatients = () => {
const uid = auth().currentUser.uid
const [confirmed, setconfirmed] = useState([])

  useEffect(() => {
    const fetchRequests = async () => {
      try {
        const dataRef = database().ref(uid+"confirmed/");
        const snapshot = await dataRef.once('value');
        const requestsData = snapshot.val();
        const list = [];

        if (requestsData) {
          Object.keys(requestsData).forEach((key) => {
            const request = requestsData[key];
            list.push({
              id: key,
              name: request.name,
              feeling: request.feeling,
              age: request.age,
              gender: request.gender,
              phoneNumber: request.phoneNumber,
              date : request.date,
              time : request.time,
              uid:request.id
            });
          });
        }

        setconfirmed(list); // Set the fetched data
      } catch (error) {
        console.log('Error fetching data: ', error);
      }
    };

    fetchRequests();
    
    



  }, [confirmed]);


  return (
    <>
    <Header role={"Doctor"}/>
    <View style={{marginVertical:20}}>
    <Text style={{color:'#0E4F8B', alignSelf:'center',fontSize:24,fontWeight:'700'}}>Confirmed Appointment</Text> 
      {confirmed.length>0?<View  style={{backgroundColor:'#51A3EE',borderRadius:20,padding:20,marginVertical:15,marginHorizontal:10}}>
            <FlatList
            data={confirmed}
            keyExtractor={(item)=>item.id}
            renderItem={({item})=>(
              <PatientCard patient={item}/>
            )}
            contentContainerStyle={{paddingBottom:150,

            }}
            showsVerticalScrollIndicator={false}
            />
      </View>:(<View style={{marginTop:320,justifyContent:'center',alignItems:'center'}}>
        <Text style={{color:'#219ebc', fontSize:30}}>EMPTY 🫥</Text>
      </View>)}
    </View>
    </>
  )
}

export default SelectedPatients

const styles = StyleSheet.create({})