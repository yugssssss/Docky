import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

const getInitials = (name) => {
  const initials = name.split(' ').map((n) => n[0]).join('');
  return initials;
};

const PatientCard = ({patient}) => {
const item = patient;
const navigation = useNavigation();

  return (
    <View style={styles.cardContainer}>
  <View style={styles.initialsContainer}>
    <Text style={styles.initialsText}>{getInitials(patient.name)}</Text>
  </View>

  <View style={styles.infoContainer}>
    <Text style={styles.nameText}>{patient.name}</Text>
    <Text style={styles.experienceText}>Age: {patient.age} years</Text>
    <Text style={styles.experienceText}>Feeling: {patient.feeling}</Text>
    <Text style={styles.experienceText}>Phone-No: {patient.phoneNumber}</Text>
    <Text style={styles.experienceText}>Gender: {patient.gender}</Text>
    <Text style={styles.experienceText}>Time: {patient.time}</Text>
    <Text style={styles.experienceText}>Date: {patient.date}</Text>
    <TouchableOpacity style={styles.chatButton} onPress={() => navigation.navigate('Chatscreen',{item})}>
      <Text style={styles.chatButtonText}>Chat</Text>
    </TouchableOpacity>
  </View>
</View>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    flexDirection: 'row',
    backgroundColor: '#f9f9f9', // Softer background color
    padding: 15,
    borderRadius: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 10,
    elevation: 5,
    marginVertical: 15,
    width: '100%',
    height: 300,
    gap: 20,
    marginRight: 5,
    borderColor: '#e0e0e0', // Adding a subtle border
    borderWidth: 1,
  },
  initialsContainer: {
    backgroundColor: '#0E4F8B', // Soft blue color for initials
    borderRadius: 40, // Perfectly round container
    width: 80,
    height: 80,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 5,
  },
  initialsText: {
    color: '#fff',
    fontSize: 28,
    fontWeight: 'bold',
  },
  infoContainer: {
    flex: 1,
    justifyContent: 'center',
    marginLeft: 15, // Spacing from initials container
    gap: 8,
  },
  nameText: {
    fontSize: 18, // Slightly bigger for the name
    fontWeight: 'bold',
    color: '#333', // Darker text color for name
  },
  experienceText: {
    fontSize: 14, // Larger font for info
    color: '#666', // Light gray for info
    marginTop: 3,
  },
  viewReportText: {
    color: '#0a7aff',
    fontWeight: 'bold',
    marginTop: 10,
    fontSize: 12,
  },
  chatButton: {
    marginTop: 15,
    backgroundColor: '#0E4F8B', // Primary color for the button
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 25,
    alignSelf: 'flex-start', // Aligns the button to the left
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 5,
  },
  chatButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold',
  },
});


export default PatientCard;
