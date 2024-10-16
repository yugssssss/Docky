import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, Image, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';
import { getDatabase, ref, onValue } from '@react-native-firebase/database';
import auth from '@react-native-firebase/auth';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';

import database from '@react-native-firebase/database';
import { useNavigation } from '@react-navigation/native';

const { width } = Dimensions.get('window');


const ChatScreenDoctor = () => {
  const navigation = useNavigation()
  const [doctors, setDoctors] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);
  const [requests, setRequests] = useState([]);
  const [Allusers, setAllusers] = useState([])
  const [photo, setphoto] = useState('https://imgs.search.brave.com/DshBkwSLw8iUrrS450Ft3Yu2TF6qNjR1bn2fxULK4zk/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9zcmN3/YXAuY29tL3dwLWNv/bnRlbnQvdXBsb2Fk/cy8yMDIyLzA4L2Fi/c3RyYWN0LXVzZXIt/ZmxhdC00LnBuZw');

  useEffect(() => {
    const uid = auth().currentUser.uid
    const getdocdata = async () => {
      const dataref = await database().ref('Doctors/' + uid)
      dataref.once('value').then(async (snapshot) => {
        const data = snapshot.val();
        await setRequests(data)
        
        console.log(data);


      })
    }
    getdocdata();

    const functionn = async () => {

      try {
        await database().ref(uid + "confirmed")
          .on("value", async (datasnapshot) => {
            const uuid = auth().currentUser.uid;
            const users = [];
            datasnapshot.forEach((child) => {
              users.push({
                name: child.val().name,
                uid: child.val().id,
                image: child.val().photo,
              });
            }

            );
           await setAllusers(users)
            const snapshot = await database().ref('Doctors/' + uid).get();

            if (snapshot.exists()) {
              const doctorData = snapshot.val();
              const photo = doctorData.photo; 
              if(photo){

                setphoto(photo)
              }
            } else {
              console.log('No data available');
            }


          })
      } catch (error) {
        console.log(error);

      }

    }
    functionn()
  }, [])



  const OpenGallery = () => {
    launchImageLibrary('photo', async (response) => {
      const imagelink = response.assets[0].uri
      setphoto(imagelink)
      const uid = auth().currentUser.uid
      await database().ref('Doctors/' + uid).update({
        photo: imagelink
      })

    })
  }

  const renderDoctor = ({ item }) => (
    <TouchableOpacity style={styles.doctorContainer} onPress={() => navigation.navigate("Chatscreen", { item })}>
      <Image source={{ uri: "https://imgs.search.brave.com/DshBkwSLw8iUrrS450Ft3Yu2TF6qNjR1bn2fxULK4zk/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9zcmN3/YXAuY29tL3dwLWNv/bnRlbnQvdXBsb2Fk/cy8yMDIyLzA4L2Fi/c3RyYWN0LXVzZXIt/ZmxhdC00LnBuZw" }} style={styles.doctorImage} />
      <Text style={styles.doctorName}>{item.name}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Image
          source={require('../assets/logo.png')} // Replace with your logo image
          style={styles.logo}
        />
        <Text style={styles.headerTitle}>Docky-Chat</Text>
      </View>

      {/* Current User Profile Section */}

      <TouchableOpacity style={styles.userProfile} onPress={() => OpenGallery()}>
        <Image source={{ uri: photo}} style={styles.userImage} />
        <Text style={styles.userName}>{requests.name}</Text>
      </TouchableOpacity>


      {/* Approved Doctors List */}
      <FlatList
        data={Allusers}
        keyExtractor={(item) => item.uid}
        renderItem={renderDoctor}
        contentContainerStyle={styles.doctorsList}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'start',
    paddingVertical: 10,
height:70,
    backgroundColor: '#0E4F8B',
    paddingHorizontal: 15,
  },
  logo: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 10,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
  },
  userProfile: {
    alignItems: 'center',
    marginVertical: 20,
  },
  userImage: {
    width: 100,
    height: 100,

    borderRadius: 50,
    marginBottom: 10,
  },
  userName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  doctorsList: {
    paddingHorizontal: 20,
  },
  doctorContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    padding: 15,
    backgroundColor: '#f9f9f9',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  doctorImage: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginRight: 20,
  },
  doctorName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
});

export default ChatScreenDoctor;
