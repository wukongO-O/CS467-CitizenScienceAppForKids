import React, { useState } from 'react';
import { Text, View, TextInput, Button, Image, StyleSheet, Platform, useColorScheme, Alert } from 'react-native';
import { useRouter } from 'expo-router';

import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';

// Define an interface for the data items
interface DataItem {
  class_code: string;
  title: string;
  description: string;
}

// Load mock data from file
const mockData: DataItem[] = require('./test_data/data.json');

export default function HomeScreen() {
  // Get the current color scheme (light or dark)
  const colorScheme = useColorScheme();
  
  // State to store the entered class code
  const [classCode, setClassCode] = useState('');
  // State to store the validity of the entered class code
  const [isValid, setIsValid] = useState(false);
  // Get the router object for navigation
  const router = useRouter();

  // Function to create an alert with two buttons
  const createTwoButtonAlert = () =>
    Alert.alert('Invalid Code', 'Please try again.', [
      {
        text: 'Cancel',
        onPress: () => console.log('Cancel Pressed'),
        style: 'cancel',
      },
      { text: 'OK', onPress: () => console.log('OK Pressed') },
    ]);

  // Function to validate the entered class code
  const validateCode = () => {
    // Check if the entered classCode exists in the mockData
    const isValidCode = mockData.some(item => item.class_code === classCode);

    if (isValidCode) {
      // If the code is valid, set the isValid state to true
      setIsValid(true);
      // Navigate to the home screen with the classCode as a parameter
      router.push({
        pathname: '/home',
        params: { classCode }, // Pass classCode as a parameter
      });
    } else {
      // If the code is invalid, show an alert
      createTwoButtonAlert();
      // Set the isValid state to false
      setIsValid(false);
    }
  };

  // Determine text color based on the current color scheme
  const textColor = colorScheme === 'dark' ? 'white' : 'black';
  // Determine placeholder text color based on the current color scheme
  const placeholderColor = colorScheme === 'dark' ? '#888' : '#ccc';

  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#A1CEDC', dark: '#1D3D47' }}
      headerImage={
        <Image
          source={require('@/assets/images/partial-react-logo.png')}
          style={styles.reactLogo}
        />
      }>
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title">Welcome to the Citizen Science App!</ThemedText>
      </ThemedView>
      <ThemedView style={styles.stepContainer}>
        <ThemedText type="subtitle">Enter your class code below.</ThemedText>
        <TextInput
          style={{ color: textColor }}
          placeholder="Class Code"
          placeholderTextColor={placeholderColor}
          value={classCode}
          onChangeText={setClassCode}/>
        <Button title="Validate Code" onPress={validateCode} />
      </ThemedView>
      <ThemedView style={styles.stepContainer}>
      </ThemedView>
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  // Style for the title container
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  // Style for the step container
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  // Style for the input field
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 12,
    paddingHorizontal: 8,
  },
  // Style for the react logo
  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: 'absolute',
  },
});