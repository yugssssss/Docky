import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Modal, Dimensions, Alert } from 'react-native';
import ZegoUIKitPrebuiltCallService, {
  ZegoCallInvitationDialog, ZegoUIKitPrebuiltCallWaitingScreen, ZegoUIKitPrebuiltCallInCallScreen, ZegoSendCallInvitationButton,
} from '@zegocloud/zego-uikit-prebuilt-call-rn';
import * as ZIM from 'zego-zim-react-native';
import * as ZPNs from 'zego-zpns-react-native';
import database from '@react-native-firebase/database';
import auth from '@react-native-firebase/auth';
import { useNavigation } from '@react-navigation/native';

const { height } = Dimensions.get('window');
const AppointedDoctorcard = ({ doctor }) => {
  const item = doctor;
const navigation = useNavigation()
  const [modalVisible, setModalVisible] = useState(false);
  const [requests, setRequests] = useState([]);
  const [timestamp, setTimestamp] = useState(Date.now());
    const getInitials = (name) => {
        const initials = name.split(' ').map((n) => n[0]).join('');
        return initials;
      };


      const toggleModal = () => {
        setModalVisible(!modalVisible);
      };
      const uid = auth().currentUser.uid

      useEffect(()=>{
        const getdocdata = async()=>{
            const dataref =await database().ref('Patients/'+uid)
            dataref.once('value').then(async(snapshot)=>{
              const data = snapshot.val();
            await  setRequests(data)
            
            
          })
        }
        getdocdata();
      },[timestamp])
      
      
 



  return (
    <View style={styles.card}>
      {/* Initials section */}
      <View style={styles.initials}>
        <Text style={styles.initialsText}>
          {getInitials(doctor.name)}
        </Text>
      </View>

      {/* Doctor info */}
      <View style={styles.info}>
        <Text style={styles.name}>Dr. {doctor.name}</Text>
        <Text style={styles.date}>Appointment Date: {doctor.date}</Text>
        <Text style={styles.time}>Appointment Time: {doctor.time}</Text>
      </View>

      {/* Connect button */}
      <TouchableOpacity style={styles.button} onPress={()=>navigation.navigate("Chatscreen",{item})}>
        <Text style={styles.buttonText}>Chat</Text>
      </TouchableOpacity>

      {/* <Modal
        transparent={true}
        visible={modalVisible}
        animationType="slide"
        onRequestClose={toggleModal}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Connect With Dr.{doctor.name}</Text>

            <TouchableOpacity style={styles.optionButton} onPress={() => console.log('Chat')}>
              <Text style={styles.optionText}>Chat</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.optionButton} onPress={() => console.log('Video Call')}>
              <Text style={styles.optionText}>Video Call</Text>
            </TouchableOpacity>


            <TouchableOpacity style={styles.closeButton} onPress={toggleModal}>
              <Text style={styles.closeButtonText}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal> */}
      {requests && doctor ? (
  <View style={styles.buttonContainer}>
  <ZegoSendCallInvitationButton
    invitees={[{ userID: doctor.uid, userName: doctor.name }]}
    isVideoCall={true}
    resourceID={"Docky_videocall"}
    customData={{
      inviter: { userID: requests.uid, userName: requests.name },
      callID: `call_${requests.uid}_${Date.now()}`,
    }}
    onPressed={() => {
      console.log("Invitation button pressed");
    }}
  />
</View>
) : (
 Alert.alert("problem")
)}
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    borderRadius: 10,
    borderColor: '#e0e0e0',
    borderWidth: 1,
    padding: 15,
    marginVertical: 10,
    alignItems: 'center',
    width: '90%',
    alignSelf: 'center',
  },
  initials: {
    backgroundColor: '#0E4F8B',
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
  initialsText: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
  },
  info: {
    marginBottom: 15,
    alignItems: 'center',
  },
  name: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
  },
  date: {
    fontSize: 14,
    color: '#555',
    marginVertical: 5,
  },
  time: {
    fontSize: 14,
    color: '#555',
  },
  button: {
    backgroundColor: '#0E4F8B',
    paddingVertical: 10,
    paddingHorizontal: 30,
    borderRadius: 5,
    height:50,
    justifyContent:'center',
    alignItems:'center',
    width:120,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0, 0, 0, 0.2)', // Semi-transparent background
  },
  modalContent: {
    height: height / 2.5, // Half the screen height
    backgroundColor: '#fff',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
    color:'black'
  },
  optionButton: {
    width: '100%',
    backgroundColor: '#90e0ef',
    paddingVertical: 15,
    borderRadius: 10,
    marginVertical: 10,
    alignItems: 'center',
  },
  optionText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#000',
  },
  closeButton: {
    backgroundColor: '#FF5C5C',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
    marginTop: 20,
  },
  closeButtonText: {
    color: '#fff',
    fontSize: 16,
  },
  buttonContainer: {
    width:120,
    height:50,
    backgroundColor: '#0E4F8B', // Background color of the container
    padding: 10, // Padding around the button
    borderRadius: 5, // Rounded corners
    alignItems: 'center', // Center the button
    justifyContent: 'center',
    marginVertical:10, 
  },
});

export default AppointedDoctorcard;
