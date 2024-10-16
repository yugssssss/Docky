import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/MaterialIcons';
import HomeScreenDoctor from '../Screens/HomeScreenDoctor';
import SelectedDoctors from '../Screens/SelectedDoctors';
import HomeScreenPatient from '../Screens/HomeScreenPatient';
import SelectedPatients from '../Screens/SelectedPatients';
import ChatScreenDoctor from '../Screens/ChatScreenDoctor';

const Tab = createBottomTabNavigator();

const DoctorHomeScreenTabs = () => (
  <Tab.Navigator
    initialRouteName="AppointmentRequest"
    
    screenOptions={({ route }) => ({
      tabBarIcon: ({ focused, color, size }) => {
        let iconName;

        if (route.name === 'AppointmentRequest') {
          iconName = focused ? 'people' : 'people-outline';
        } else if (route.name === 'YourPatients') {
          iconName = focused ? 'person' : 'person-outline';
        }else if(route.name === 'Chat'){
          iconName = focused ? 'chat-bubble' : 'chat';
        }

        return <Icon name={iconName} size={size} color={color} />;
      },
      tabBarActiveTintColor: 'white',
      tabBarInactiveTintColor: 'gray',
      tabBarLabelStyle: { fontSize: 14, fontWeight: '600' },
      tabBarStyle: { backgroundColor: '#0E4F8B', borderTopColor: '#e0e0e0', height: 60 },
    })}
  >
    <Tab.Screen  name="AppointmentRequest" component={HomeScreenPatient} options={{ tabBarLabel: 'Requests',headerShown:false }} />
    <Tab.Screen name="YourPatients" component={SelectedPatients} options={{ tabBarLabel: 'Your Patients' ,headerShown:false}} />
    <Tab.Screen name="Chat" component={ChatScreenDoctor} options={{ tabBarLabel: 'Chat' ,headerShown:false}} />
  </Tab.Navigator>
);

export default DoctorHomeScreenTabs;
