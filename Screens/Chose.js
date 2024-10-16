import { StackActions, useNavigation } from '@react-navigation/native';
import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';

const DoctorPatientScreen = () => {

const navigation = useNavigation()

  return (
    <View style={styles.container}>
      {/* Doctor Image and Label */}
      <TouchableOpacity style={styles.imageContainer} onPress={()=>navigation.dispatch(StackActions.replace('DoctorSignup'))}>
        <Image
          source={require('../assets/doctor2.png')} // Replace with your doctor image path
          style={styles.image}
        />
        <Text style={styles.label}>Doctor</Text>
      </TouchableOpacity>

      {/* Patient Image and Label */}
      <TouchableOpacity style={styles.imageContainer} onPress={()=>navigation.dispatch(StackActions.replace('PatientSignup'))}>
        <Image
          source={require('../assets/patient.png')} // Replace with your patient image path
          style={styles.image}
        />
        <Text style={styles.label}>Patient</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#51A3EE', // Background color
    justifyContent: 'center', // Center vertically
    alignItems: 'center', // Center horizontally
    flexDirection:'row',
    gap:70,
  },
  imageContainer: {
    alignItems: 'center', // Align image and text in the center
    marginBottom: hp(5), // Add some space between the images
  },
  image: {
    width: hp(15), // Circle diameter
    height: hp(15),
    borderRadius: hp(15) / 2, // Make it circular
    borderWidth: 2,
    borderColor: 'white',
  },
  label: {
    marginTop: hp(2),
    fontSize: hp(2.5),
    color: 'white',
    fontWeight: 'bold',
  },
});

export default DoctorPatientScreen;
