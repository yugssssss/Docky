import React, { useState, useEffect } from 'react';
import { FlatList, StyleSheet, Text, View, TouchableOpacity, Alert, Modal, Button, Dimensions } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import database from '@react-native-firebase/database';
import auth from '@react-native-firebase/auth';
import DateTimePickerModal from "react-native-modal-datetime-picker";

const { height } = Dimensions.get('window');
const AppointmentRequestsTable = ({Docdata}) => {
  const [requests, setRequests] = useState([]);
  const [ConfirmPatients, setConfirmPatients] = useState([])
  const [selectedItem, setSelectedItem] = useState(null); 
  const uid = auth().currentUser.uid;

  const [modalVisible, setModalVisible] = useState(false);
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [isTimePickerVisible, setTimePickerVisibility] = useState(false);

  const [Selectdate, setSelectdate] = useState('Date');
  const [Selecttime, setSelecttime] = useState('Time');
  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = (date) => {
    const dt = new Date(date)
    const x = dt.toISOString().split('T');
    const x1 = x[0].split('-')
    setSelectdate(x1[2] + "/" + x1[1] + "/" + x1[0])
    hideDatePicker();
  };
  const showTimePicker = () => {
    setTimePickerVisibility(true);
  };

  const hideTimePicker = () => {
    setTimePickerVisibility(false);
  };

  const handleConfirmTime = (date) => {
    const dt = new Date(date);
    let x = dt.toLocaleTimeString()
    setSelecttime(x)
    hideTimePicker();
  };

  const closeModal = () => {
    setModalVisible(false); // Close the modal
  };


  const Handledelete = async (item) => {
    // Filter out the request with the matching item.id
    // const updatedRequest = requests.filter((data) => item.id !== data.id);
  
    // setRequests(updatedRequest);

await database().ref(uid+"/"+item.id)
.remove()

await database().ref(uid+"confirmed/"+item.id)
.set({
  ...item, 
  date : Selectdate,
  time: Selecttime
 })
    
 await database().ref("appointments/"+item.id+"/"+uid+"/")
 .set({
  name: Docdata.name,
  uid: Docdata.uid, 
  email: Docdata.email,
  phoneNumber: Docdata.phoneNumber,
  specialization: Docdata.specialization,
  experience: Docdata.experience,
  Age: Docdata.Age,
  gender: Docdata.gender,
  date: Selectdate,
  time:Selecttime,
  
 })
  };
 

  
  
  useEffect(() => {
    const fetchRequests = async () => {
      try {
        const dataRef = database().ref(uid);
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
              age: request.Age,
              gender: request.gender,
              phoneNumber: request.phoneNumber,
            });
          });
        }

        setRequests(list); // Set the fetched data
       
        
      } catch (error) {
        console.log('Error fetching data: ', error);
      }
    };

    fetchRequests();
    
  }, [requests]);

  const handleAccept = (id) => {
    setModalVisible(true);
  };

  const handleDecline =async (item) => {
    await database().ref(uid+"/"+item.id)
    .remove()
  };

  const renderRequest = ({ item }) => (
    <>
      <View style={styles.card}>
        <View style={styles.row}>
          <View style={styles.column}>
            <Text style={styles.name}>Name: {item.name || "Unknown"}</Text>
            <Text style={styles.feeling}>Feeling: {item.feeling || "Unknown"}</Text>
            <Text style={styles.age}>Age: {item.age || "Unknown"}</Text>
          </View>
          <View style={styles.actions}>
            <TouchableOpacity 
              onPress={() => {
                setSelectedItem(item);  // Set the selected item when opening the modal // add cancle button in modal and when click cancle set selecteditem to null
                setModalVisible(true);  // Open the modal
              }} 
              style={styles.iconButton}
            >
              <Icon name="check-circle" size={28} color="green" />
            </TouchableOpacity>
            <TouchableOpacity onPress={() =>{ 
               setSelectedItem(item);
              handleDecline(selectedItem)

            }} style={styles.iconButton}>
              <Icon name="cancel" size={28} color="red" />
            </TouchableOpacity>
          </View>
        </View>
  
        {/* Modal */}
        <Modal
          animationType="fade"
          transparent={true}
          visible={modalVisible}
          onRequestClose={closeModal}
        >
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <Text style={styles.modalText}>Schedule Appointment</Text>
              <View style={{ flexDirection: 'row', gap: 20, marginVertical: 20 }}>
                <TouchableOpacity onPress={showDatePicker} style={{ width: 130, height: 60, padding: 15, backgroundColor: 'transparent', borderColor: '#999', borderWidth: 2, borderRadius: 10, justifyContent: 'center', alignItems: 'center' }}>
                  <Text style={{ color: 'black' }}>{Selectdate}</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={showTimePicker} style={{ width: 130, height: 60, padding: 15, backgroundColor: 'transparent', borderColor: '#999', borderWidth: 2, borderRadius: 10, justifyContent: 'center', alignItems: 'center' }}>
                  <Text style={{ color: 'black' }}>{Selecttime}</Text>
                </TouchableOpacity>
              </View>
  
              {/* Confirm Button */}
              <TouchableOpacity 
                style={{ marginVertical: 20, borderRadius: 15, width: 120, height: 50, backgroundColor: '#a8dadc', borderColor: '#888', borderWidth: 2, justifyContent: 'center', alignItems: 'center' }}
                onPress={() => {
                  closeModal();
                  
                  if (selectedItem) {
                    setConfirmPatients((prev) => [...prev, selectedItem]);  // Use the selected item
                    Handledelete(selectedItem)
                  }
                }}
              >
                <Text style={{ color: 'white', fontSize: 16, fontWeight: "600" }}>Confirm</Text>
              </TouchableOpacity>
            </View>
          </View>
  
          <DateTimePickerModal
            isVisible={isDatePickerVisible}
            mode="date"
            onConfirm={handleConfirm}
            onCancel={hideDatePicker}
          />
          <DateTimePickerModal
            isVisible={isTimePickerVisible}
            mode="time"
            onConfirm={handleConfirmTime}
            onCancel={hideTimePicker}
          />
        </Modal>
      </View>
    </>
  );
  
  return (
    <FlatList
      data={requests}
      keyExtractor={(item) => item.id}
      renderItem={renderRequest}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f0f0f0', // Light gray background
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
    textAlign: 'center',
    color: '#3F7FFF',
  },
  card: {
    backgroundColor: 'white', // White card background
    padding: 20,
    marginBottom: 15,
    borderRadius: 10,
    elevation: 5, // For Android shadow
    shadowColor: '#000', // For iOS shadow
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Semi-transparent background
  },
  modalView: {
    width: '90%', // Modal width
    height: height * 0.5, // 50% of the screen height
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalText: {
    color: 'black',
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 15,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  column: {
    flex: 3,
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 5,
  },
  feeling: {
    fontSize: 16,
    color: '#555',
    marginBottom: 5,
  },
  age: {
    fontSize: 16,
    color: '#888',
  },
  actions: {
    flexDirection: 'row',
    flex: 1,
    justifyContent: 'flex-end',
  },
  iconButton: {
    marginLeft: 15,
  },
});

export default AppointmentRequestsTable;
