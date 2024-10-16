import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/MaterialIcons';
import HomeScreenDoctor from '../Screens/HomeScreenDoctor';
import SelectedDoctors from '../Screens/SelectedDoctors';
import ChatScreenPateint from '../Screens/ChatScreenPateint';

const Tab = createBottomTabNavigator();

const HomeScreenTabs = () => (
  <Tab.Navigator
    initialRouteName="AllDoctors"
    
    screenOptions={({ route }) => ({
      tabBarIcon: ({ focused, color, size }) => {
        let iconName;

        if (route.name === 'AllDoctors') {
          iconName = focused ? 'people' : 'people-outline';
        } else if (route.name === 'YourDoctors') {
          iconName = focused ? 'person' : 'person-outline';
        }else if(route.name === 'Chat'){
          iconName = focused ? 'chat-bubble' : 'chat';
        }

        return <Icon name={iconName} size={size} color={color} />;
      },
      tabBarActiveTintColor: 'white',
      tabBarInactiveTintColor: '#aaa',
      tabBarLabelStyle: { fontSize: 14, fontWeight: '600' },
      tabBarStyle: { backgroundColor: '#0E4F8B', borderTopColor: '#e0e0e0', height: 60 },
    })}
  >
    <Tab.Screen  name="AllDoctors" component={HomeScreenDoctor} options={{ tabBarLabel: 'All Doctors',headerShown:false }} />
    <Tab.Screen name="YourDoctors" component={SelectedDoctors} options={{ tabBarLabel: 'Your Doctors' ,headerShown:false}} />
    <Tab.Screen  name="Chat" component={ChatScreenPateint} options={{ tabBarLabel: 'Chat',headerShown:false }} />

  </Tab.Navigator>
);

export default HomeScreenTabs;
