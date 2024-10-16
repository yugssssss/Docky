import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, Alert, Modal, Dimensions } from 'react-native';
import auth from '@react-native-firebase/auth';
import { StackActions, useNavigation } from '@react-navigation/native';
import database from '@react-native-firebase/database';
import Icon from 'react-native-vector-icons/MaterialIcons';
import ZegoUIKitPrebuiltCallService, {
  ZegoCallInvitationDialog, ZegoUIKitPrebuiltCallWaitingScreen, ZegoUIKitPrebuiltCallInCallScreen, ZegoSendCallInvitationButton,
} from '@zegocloud/zego-uikit-prebuilt-call-rn';
import * as ZIM from 'zego-zim-react-native';
import * as ZPNs from 'zego-zpns-react-native';
const { height } = Dimensions.get('window');

const Header = ({role}) => {
  const [modalVisible, setModalVisible] = useState(false);
  const navigation = useNavigation();
  const [requests, setRequests] = useState([]);

  const onClose = () => {
    setModalVisible(false);
  };

  const handleLogout = async () => {
    try {
      await auth().signOut();
      navigation.dispatch(StackActions.replace("Splash"));
      setModalVisible(false);
      return ZegoUIKitPrebuiltCallService.uninit()
    } catch (error) {
      Alert.alert('Logout Failed', error.message);
    }
  };

  const uid = auth().currentUser.uid


  if(role=="Patient"){

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
  }

  if(role=="Doctor"){
    useEffect(()=>{
      const getdocdata = async()=>{
          const dataref =await database().ref('Doctors/'+uid)
          dataref.once('value').then(async(snapshot)=>{
            const data = snapshot.val();
          await  setRequests(data)
            
          })
      }
      getdocdata();
    },[])
  }


  return (
    <View style={styles.headerContainer}>
      <View style={styles.logoContainer}>
        <Image
          source={require('../assets/logo.png')}
          style={styles.logo}
        />
        <Text style={styles.appName}>Docky</Text>
      </View>

      <View style={styles.userContainer}>
        <TouchableOpacity onPress={() => setModalVisible(true)} style={styles.profileButton}>
          {/* <Text style={styles.profileButtonText}>Profile</Text> */}
          <Icon name={"account-circle"} size={24} color={"blue"}/>
        </TouchableOpacity>
      </View>

      <Modal
        visible={modalVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={onClose}
      >
        <View style={styles.centeredView}>
          <View style={styles.stylishModalView}>
            <View style={styles.modalHeaderContainer}>
              <Text style={styles.title}>About</Text>
            </View>

            <View style={styles.contentSection}>
              <View style={styles.infoRow}>
                <Text style={styles.label}>Name:</Text>
                <Text style={styles.infoText}>{requests.name}</Text>
              </View>
              <View style={styles.infoRow}>
                <Text style={styles.label}>Age:</Text>
                <Text style={styles.infoText}>{requests.Age}</Text>
              </View>
              <View style={styles.infoRow}>
                <Text style={styles.label}>Phone:</Text>
                <Text style={styles.infoText}>{role == 'Doctor' ? requests.phoneNumber : requests.phonenumber}</Text>
              </View>
              <View style={styles.infoRow}>
                <Text style={styles.label}>Email:</Text>
                <Text style={styles.infoText}>{requests.email}</Text>
              </View>
            </View>
            <View>

            <TouchableOpacity style={[styles.stylishLogoutButton,{backgroundColor:'blue',marginTop:20}]} onPress={()=>setModalVisible(false)}>
              <Text style={styles.logoutButtonText}>Cancle</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.stylishLogoutButton} onPress={handleLogout}>
              <Text style={styles.logoutButtonText}>Logout</Text>
            </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    height: 70,
    backgroundColor: '#0E4F8B',
  },
  logoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  logo: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  profileButton: {
    backgroundColor: '#90e0ef',
    padding: 5,
    borderRadius: 15,
  },
  profileButtonText: {
    color: 'black',
    fontSize: 16,
    fontWeight: 'bold',
  },
  appName: {
    marginLeft: 10,
    color: '#fff',
    fontSize: 24,
    fontWeight: 'bold',
  },
  userContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  stylishModalView: {
    width: '85%',
    height: height / 2,
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalHeaderContainer: {
    width: '100%',
    paddingBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#2B6DEB',
  },
  contentSection: {
    marginTop: 20,
    padding: 10,
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    color: '#555',
  },
  infoText: {
    fontSize: 16,
    fontWeight: '400',
    color: '#000',
  },
  stylishLogoutButton: {
    marginTop: 10,
    backgroundColor: '#E63946',
    padding: 12,
    borderRadius: 25,
    alignItems: 'center',
    width: '100%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  logoutButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default Header;
