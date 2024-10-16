import { Dimensions, FlatList, Image, Modal, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import Header2 from '../components/Header2';
import { useRoute } from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { Recivemsg, Sendmsg } from '../components/Messages';
import auth from '@react-native-firebase/auth';
import database from '@react-native-firebase/database';
import { launchImageLibrary } from 'react-native-image-picker';
import storage from '@react-native-firebase/storage'; // Import Firebase Storage

const Chatscreen = () => {
  const route = useRoute();
  const item = route.params.item;
  const [msg, setmsg] = useState('');
  const [Allmsgs, setAllmsgs] = useState([]);
  const [Photo, setPhoto] = useState(null);
  const curruid = auth().currentUser.uid;

  useEffect(() => {
    async function storemsgs() {
      const curruid = auth().currentUser.uid;
      try {
        await database().ref('Messages/' + curruid)
          .child(item.uid)
          .on('value', (datasnapshot) => {
            const messages = [];

            datasnapshot.forEach((msg) => {
              messages.push({
                currid: msg.val().message.currid,
                recid: msg.val().message.reciverid,
                msg: msg.val().message.message,
                image: msg.val().message.image,
              });
            });

            setAllmsgs(messages);
          });
      } catch (error) {
        console.log(error);
      }
    }
    storemsgs();
  }, []);

  const Send = async () => {
    if (msg) {
      const senderuid = auth().currentUser.uid;
      const reciveruid = item.uid;
      Sendmsg(senderuid, reciveruid, msg, "")
        .then(() => setmsg(''));
      Recivemsg(senderuid, reciveruid, msg, "")
        .then(() => setmsg(''));
    }
  };

  const OpenGallery = async () => {
    const result = await launchImageLibrary({ mediaType: 'photo' });
    
    if (!result.didCancel) {
      const fileUri = result.assets[0].uri;
      setPhoto(fileUri);
      
      const fileName = fileUri.substring(fileUri.lastIndexOf('/') + 1);
      const storageRef = storage().ref(`images/${fileName}`);
      
      // Upload image to Firebase Storage
      const uploadTask = storageRef.putFile(fileUri);
      
      uploadTask.on('state_changed', (snapshot) => {
        // Handle progress updates if needed
      });
      
      uploadTask.then(async () => {
        const downloadURL = await storageRef.getDownloadURL();
        console.log('Image uploaded successfully:', downloadURL);
        
        // Sending the download URL as the image message
        const uid = auth().currentUser.uid;
        const reciveruid = item.uid;

        Sendmsg(uid, reciveruid, "", downloadURL);
        Recivemsg(uid, reciveruid, "", downloadURL);
      }).catch((error) => {
        console.log('Error uploading image:', error);
      });
    }
  };

  const [modalVisible, setModalVisible] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);

  const openModal = (imageUri) => {
    setSelectedImage(imageUri);
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
    setSelectedImage(null);
  };

  return (
    <>
      <Header2 name={item.name} />
      <View style={styles.container}>
      <FlatList
  ref={ref => this.flatList = ref}
  onContentSizeChange={() => this.flatList.scrollToEnd({ animated: false })}
  data={Allmsgs}
  keyExtractor={(item) => item.uid}
          renderItem={({ item }) => (
            item.image !== "" ? (
              <TouchableOpacity onPress={() => openModal(item.image)}>

              <View style={{
                maxWidth: Dimensions.get('window').width / 2 - 10,
                alignSelf: curruid === item.currid ? 'flex-end' : 'flex-start',
                backgroundColor: curruid === item.currid ? '#a8dadc' : 'white',
                borderRadius: 10,
                marginVertical: 5,
                padding: 10,
                justifyContent: 'center',
                alignItems: 'center',
                marginHorizontal: 20
              }}>
                <Image style={{ height: 200, width: Dimensions.get('window').width / 2 - 30 }}
                  source={{ uri: item.image }} resizeMode='stretch' />
              </View>
              </TouchableOpacity>
            ) : (
              <View style={{
                maxWidth: Dimensions.get('window').width / 2 - 10,
                alignSelf: curruid === item.currid ? 'flex-end' : 'flex-start',
                backgroundColor: curruid === item.currid ? '#a8dadc' : 'white',
                borderRadius: 10,
                marginVertical: 5,
                padding: 10,
                marginHorizontal: 20
              }}>
                <Text style={{ color: 'black', fontWeight: '600', fontSize: 16 }}>{item.msg}</Text>
              </View>
            )
          )}
          style={{ marginBottom: 80 }}
        />

        <View style={styles.inputfield}>
          <TouchableOpacity onPress={OpenGallery}>
            <View style={{ height: 40, width: 40, backgroundColor: 'black', borderRadius: 20, justifyContent: 'center', alignItems: 'center' }}>
              <Ionicons name={"camera"} size={30} color={"white"} />
            </View>
          </TouchableOpacity>
          <TextInput
            value={msg}
            onChangeText={setmsg}
            style={styles.input}
            placeholder='Enter message'
            color="black"
            placeholderTextColor={'black'}
          />
         <View style={{ height: 40, width: 40, backgroundColor: 'black', borderRadius: 20, justifyContent: 'center', alignItems: 'center' }}>
          <TouchableOpacity onPress={Send}>
            <Ionicons name={"send"} size={30} color={"white"} />
          </TouchableOpacity>
          </View>
        </View>
        <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={closeModal}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            {/* Back Arrow to close modal */}
            <TouchableOpacity onPress={closeModal} style={styles.closeButton}>
              <Ionicons name="arrow-back" size={24} color="black" />
            </TouchableOpacity>

            {/* Display the selected image */}
            {selectedImage && (
              <Image source={{ uri: selectedImage }} style={styles.modalImage} />
            )}
          </View>
        </View>
      </Modal>
      </View>
    </>
  );
};

export default Chatscreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#caf0f8',
  },
  inputfield: {
    position: 'absolute',
    bottom: 10,
    width: Dimensions.get('screen').width-50,
    // alignSelf: 'center',
    height: 70,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 15,
    
  },
  input: {
    width: '80%',
    borderRadius: 25,
    backgroundColor: "white",
    padding: 10,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)', 
  },
  modalContent: {
    width: '80%',
    height: '50%', 
    backgroundColor: '#fff',
    borderRadius: 10,
    overflow: 'hidden',
    justifyContent: 'center',
    alignItems: 'center',
  },
  closeButton: {
    position: 'absolute',
    top: 10,
    left: 10,
    padding: 5,
  },
  modalImage: {
    width: '100%',
    height: '80%', 
    resizeMode: 'contain', 
  },
});
