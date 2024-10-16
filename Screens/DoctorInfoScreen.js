import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import Header2 from '../components/Header2'
import { useRoute } from '@react-navigation/native'
import Icon from 'react-native-vector-icons/Ionicons'; // Make sure to install react-native-vector-icons
import auth from '@react-native-firebase/auth';
import database from '@react-native-firebase/database';
const DoctorInfoScreen = () => {

  const [feeling, setFeeling] = useState(''); // State for the input box
  const [PatientData, setPatientData] = useState()
  const route = useRoute();
  const doctor = route.params.Doctorinfo;
  const docuid = doctor.uid;

  const patientuid = auth().currentUser.uid

useEffect(() => {
  
try {
  
const patientdataa= database().ref(`Patients/${patientuid}`)
patientdataa.once('value').then(async(snapshot)=>{
const data = snapshot.val();
console.log(data);

await setPatientData(data)
})

} catch (error) {
  console.log(error);
  
}
  
}, [])



const Appointment = async()=>{
  try {
    
    const doctorRef = database().ref(`${docuid}/${patientuid}`);
  
      await doctorRef.set({
        name: PatientData.name,
        age:PatientData.age,
        email: PatientData.email,
        phoneNumber:PatientData.phonenumber,
        feeling : feeling,
        gender : PatientData.gender,
        Age: PatientData.Age
      });
      setFeeling('')
  } catch (error) {
    console.log(error);
    
  }

}



  return (
    <>
    <Header2 doctorName={doctor.name}/>
    <View style={styles.container}>
      {/* Header Section */}
      <Text style={styles.heading}>Connect with {doctor.name}</Text>

      {/* Doctor Information Card */}
      <View style={styles.card}>
        <View style={styles.infoRow}>
          <Icon name="person-outline" size={20} color="#3F7FFF" />
          <Text style={styles.infoText}>Name: {doctor.name}</Text>
        </View>
        <View style={styles.infoRow}>
          <Icon name="briefcase-outline" size={20} color="#3F7FFF" />
          <Text style={styles.infoText}>Specialization: {doctor.specialization}</Text>
        </View>
        <View style={styles.infoRow}>
          <Icon name="school-outline" size={20} color="#3F7FFF" />
          <Text style={styles.infoText}>Experience: {doctor.experience} years</Text>
        </View>
        <View style={styles.infoRow}>
          <Icon name="call-outline" size={20} color="#3F7FFF" />
          <Text style={styles.infoText}>Phone: {doctor.phoneNumber}</Text>
        </View>
        <View style={styles.infoRow}>
          <Icon name="mail-outline" size={20} color="#3F7FFF" />
          <Text style={styles.infoText}>Email: {doctor.email}</Text>
        </View>
      </View>
    
      <TextInput
        style={styles.input}
        placeholder="How are you feeling?"
        placeholderTextColor="#555"
        value={feeling}
        onChangeText={(text) => setFeeling(text)}
      />


      {/* Book Appointment Button */}
      <TouchableOpacity
        style={[styles.button, feeling ? styles.buttonEnabled : styles.buttonDisabled]}
        onPress={() =>{ 
          Appointment();
          alert('Request Send!')
        }}
        disabled={!feeling} // Disable button if input is empty
      >
        <Text style={styles.buttonText}>Book Appointment</Text>
      </TouchableOpacity>
     {!feeling? <Text style={{color:'black', marginVertical:10}}> NOTE : Describe Your Condition For Booking an Appointment</Text> : null}
    </View>
    </>
  )
}

export default DoctorInfoScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#F5F5F5',
  },
  heading: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 20,
    textAlign: 'left',
  }, 
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
  input: {
    height: 50,
    borderRadius: 8,
    backgroundColor: '#fff',
    paddingHorizontal: 15,
    fontSize: 16,
    color: '#333',
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 5,
    elevation: 3,
    marginBottom: 20,
  },

  button: {
    backgroundColor: '#3F7FFF',
    paddingVertical: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 20,
  },
  buttonEnabled: {
    backgroundColor: '#3F7FFF',
  },
  buttonDisabled: {
    backgroundColor: '#b0c4de', // Light color to indicate disabled state
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
  },
});