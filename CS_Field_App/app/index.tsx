// This file is the main entry point for the app.
// This is where students enter their class code to access the app.
// The class code is validated against the API to ensure it is correct.
// This code was built with help Github's copilot AI.

import React, { useState } from 'react';
import { Text, View, TextInput, Button, Image, StyleSheet, useColorScheme, Alert, Platform } from 'react-native';
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
  const createTwoButtonAlert = () => {
    if (Platform.OS === 'web') {
      // Use browser's alert function for web
      alert('Invalid Code. Please try again.');
    } else {
      // Use React Native's Alert API for mobile
      Alert.alert('Invalid Code', 'Please try again.', [
        {
          text: 'Cancel',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel',
        },
        { text: 'OK', onPress: () => console.log('OK Pressed') },
      ]);
    }
  };

  // Function to validate the entered class code
  const validateCode = () => {
    console.log('Validating class code:', classCode); // Debugging log
    // Fetch data from the API
    fetch(`https://citsciapp.pythonanywhere.com/projects/class_code/${classCode}`)
      .then(response => {
        console.log('Response status:', response.status); // Debugging log
        if (response.status === 404) {
          // If the status is 404, show an alert
          createTwoButtonAlert();
          // Set the isValid state to false
          setIsValid(false);
          throw new Error('Class code not found');
        }
        return response.json();
      })
      .then(data => {
        console.log('Fetched data:', data); // Debugging log
        if (data.length > 0) {
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
      })
      .catch(error => {
        console.error('Error fetching data:', error);
        // Set the isValid state to false
        setIsValid(false);
      });
  };

  // Determine text color based on the current color scheme
  const textColor = colorScheme === 'dark' ? 'white' : 'black';
  // Determine placeholder text color based on the current color scheme
  const placeholderColor = colorScheme === 'dark' ? '#888' : '#ccc';
  // Determine input background color based on the current color scheme
  const inputBackgroundColor = colorScheme === 'dark' ? '#333' : '#FFFFFF';

  // Render the component with the ParallaxScrollView
  // This is the main UI for the HomeScreen component
  // A header image, title, input field, and button are displayed
  return (
    <ParallaxScrollView
      headerBackgroundColor={{ dark: '#A0D4FF', light: '#A0D4FF' }} // Light Blue
      headerImage={
        <View style={styles.headerImageContainer}>
          <Image
            source={require('@/assets/images/Logo.png')}
            style={styles.reactLogo}
          />
        </View>
      }>
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title">Welcome to the Citizen Science App!</ThemedText>
      </ThemedView>
      <ThemedView style={styles.stepContainer}>
        <ThemedText type="subtitle">Enter your class code below.</ThemedText>
        <TextInput
          style={[styles.input, { color: textColor, backgroundColor: inputBackgroundColor }]}
          placeholder="Class Code"
          placeholderTextColor={placeholderColor}
          value={classCode}
          onChangeText={setClassCode}
        />
        <View style={styles.buttonContainer}>
          <Button title="Validate Code" onPress={validateCode} color="#4CAF50" />
        </View>
      </ThemedView>
      <ThemedView style={styles.stepContainer}>
      </ThemedView>
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E1F5FE', // Light background color
  },
  headerImageContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    height: 200, // Adjust the height as needed
  },
  titleContainer: {
    flexDirection: 'row',
    gap: 8,
    alignItems: 'center', // Align items vertically
    padding: 10,
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
    padding: 10,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 12,
    paddingHorizontal: 8,
    borderRadius: 5,
  },
  buttonContainer: {
    marginTop: 12,
  },
  reactLogo: {
    height: 173,
    width: 150,
    resizeMode: 'contain', // Ensure the logo is contained within the view
  },
});