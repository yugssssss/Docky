import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { heightPercentageToDP, widthPercentageToDP } from 'react-native-responsive-screen';

const getInitials = (name) => {
  const initials = name.split(' ').map((n) => n[0]).join('');
  return initials;
};

const DoctorCard = ({ doctor }) => {
const Doctorinfo = doctor;
const navigation = useNavigation();

  return (
    <View style={styles.cardContainer}>
      
      <View style={styles.initialsContainer}>
        <Text style={styles.initialsText}>{getInitials(doctor.name)}</Text>
      </View>

      <View style={styles.infoContainer}>
        <Text style={styles.nameText}>Dr.{doctor.name}</Text>
        <Text style={styles.specializationText}>{doctor.specialization}</Text>
        <Text style={styles.experienceText}>Experience: {doctor.experience} years</Text>
        <Text style={styles.cityText}>{doctor.gender == 'M' ? "Gender : Male" :"Gender : Female"}</Text>

        
        <TouchableOpacity onPress={()=>navigation.navigate("DoctorinfoScreen",{Doctorinfo})}>
          <Text style={styles.viewReportText}>View Details</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    flexDirection: 'row',
    backgroundColor: '#51A3EE',
    padding: 10,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
    marginVertical: 10,
    width:widthPercentageToDP(46),
    height:150,
    marginRight:5,
  },
  initialsContainer: {
    backgroundColor: '#0E4F8B', 
    borderRadius: 30,
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  initialsText: {
    color: '#fff',
    fontSize: 15,
    fontWeight: 'bold',
  },
  infoContainer: {
   gap:5,
    marginLeft: 7,
  },
  cityText:{
    color:'white',
    fontSize:11,
  },
  nameText: {
    fontSize: 12,
    fontWeight: 'bold',
    color:'white',
  },
  specializationText: {
    fontSize: 13,
    color: 'white',
    marginTop: 2,
  },
  experienceText: {
    fontSize: 11,
    color: 'white',
    marginTop: 5,
  },
  
  viewReportText: {
    color: 'white',
    fontWeight: 'bold',
    marginTop: 10,
    fontSize:11,
  },
});

export default DoctorCard;
