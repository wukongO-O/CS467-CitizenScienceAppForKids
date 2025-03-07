import React, { useState, useEffect } from 'react';
import { View, StyleSheet, ActivityIndicator, Image, TouchableOpacity, Text, Modal, Button } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { Picker } from '@react-native-picker/picker';
import { Ionicons } from '@expo/vector-icons'; // Import Ionicons

import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import ParallaxScrollView from '@/components/ParallaxScrollView';

// Define an interface for the data items
interface DataItem {
  class_code: string;
  project_id: number;
  title: string;
  description: string;
  directions: string;
}

export default function Home() {
  const { classCode } = useLocalSearchParams(); // Retrieve classCode from search parameters
  const [data, setData] = useState<DataItem[]>([]); // State to store fetched data
  const [isLoading, setIsLoading] = useState(true); // State to manage loading state
  const [selectedProject, setSelectedProject] = useState<string>(''); // State to store selected project
  const [modalVisible, setModalVisible] = useState(false); // State to manage modal visibility
  const router = useRouter(); // Get the router object for navigation

  useEffect(() => {
    // Fetch data from the API
    fetch(`https://citsciapp.pythonanywhere.com/projects/class_code/${classCode}`)
      .then(response => response.json())
      .then(data => {
        console.log('Fetched data:', data); // Debugging log
        if (Array.isArray(data)) {
          setData(data);
        } else {
          console.error('Expected an array but got:', data);
        }
        setIsLoading(false);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
        setIsLoading(false);
      });
  }, [classCode]);

  // Handle project selection change
  const handleProjectChange = (itemValue: string) => {
    setSelectedProject(itemValue);
  };

  const navigateToHome = () => {
    router.push({
      pathname: '/home',
      params: { classCode }, // Pass classCode as a parameter
    });
  };

  // Navigate to list_observation with the selected project
  const navigateToListObservation = () => {
    const selectedProjectData = data.find(item => item.title === selectedProject);
    if (selectedProjectData) {
      router.push({
        pathname: '/list_observation',
        params: { classCode, projectTitle: selectedProject, project_id: selectedProjectData.project_id },
      });
    }
  };

  const navigateToAddEdit = () => {
    const selectedProjectData = data.find(item => item.title === selectedProject);
    if (selectedProjectData) {
      router.push({
        pathname: '/add_edit_observations',
        params: { classCode, projectTitle: selectedProject, project_id: selectedProjectData.project_id },
      });
    }
  };

  // Find the selected project data
  const selectedProjectData = data.find(item => item.title === selectedProject);
  // console.log('Selected project data:', selectedProjectData); // Debugging log - Removed

  return (
    <View style={styles.container}>
      <ParallaxScrollView
        headerBackgroundColor={{ dark: '#A0D4FF', light: '#A0D4FF' }} // Light Blue
        headerImage={
          <View style={styles.headerImageContainer}>
            <Image
              source={require('@/assets/images/Logo.png')}
              style={styles.reactLogo}
            />
          </View>
        }
      >
        <ThemedView style={styles.titleContainer}>
          <ThemedText type="title">Projects for your class</ThemedText>
        </ThemedView>
        <ThemedView style={styles.stepContainer}>
          <ThemedText>Select a project to see its description.</ThemedText>
          {isLoading ? (
            <ActivityIndicator size="large" color="#0000ff" />
          ) : (
            <Picker
              selectedValue={selectedProject}
              onValueChange={handleProjectChange}
              style={styles.picker}
            >
              <Picker.Item label="Select a project" value="" />
              {data.map((item) => (
                <Picker.Item key={item.project_id} label={item.title} value={item.title} />
              ))}
            </Picker>
          )}
          {selectedProjectData ? (
            <View style={styles.itemContainer}>
              <ThemedText style={styles.itemTitle}>Description</ThemedText>
              <ThemedText style={styles.itemDescription}>{selectedProjectData.description}</ThemedText>
              <ThemedText style={styles.itemTitle}>Directions</ThemedText>
              <TouchableOpacity style={styles.button} onPress={() => setModalVisible(true)}>
                <Text style={styles.buttonText}>View Directions</Text>
              </TouchableOpacity>
              <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => {
                  setModalVisible(!modalVisible);
                }}
              >
                <View style={styles.modalView}>
                  <Text style={styles.modalText}>{selectedProjectData.directions}</Text>
                  <Button title="Close" onPress={() => setModalVisible(!modalVisible)} />
                </View>
              </Modal>
            </View>
          ) : null}
        </ThemedView>
      </ParallaxScrollView>
      <View style={styles.bottomNavContainer}>
        <TouchableOpacity style={styles.navButton} onPress={navigateToHome}>
          <Ionicons name="home-outline" size={24} color="white" />
          <Text style={styles.navText}>Home</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navButton} onPress={navigateToListObservation}>
          <Ionicons name="menu-outline" size={24} color="white" />
          <Text style={styles.navText}>View Observations</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navButton} onPress={navigateToAddEdit}>
          <Ionicons name="add-outline" size={24} color="white" />
          <Text style={styles.navText}>Add/Edit</Text>
        </TouchableOpacity>
      </View>
    </View>
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
  picker: {
    height: 50,
    width: '100%',
    backgroundColor: '#FFFFFF', // White background for picker
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#B0BEC5', // Light border color
  },
  itemContainer: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    backgroundColor: '#FFFFFF', // White background for item container
    borderRadius: 5,
  },
  itemTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#37474F', // Dark text color
    marginTop: 10,
  },
  itemDescription: {
    fontSize: 16,
    color: '#546E7A', // Medium text color
  },
  itemDirections: {
    fontSize: 14,
    color: '#546E7A', // Medium text color
  },
  button: {
    backgroundColor: '#4CAF50', // Green background for button
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 10,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
  reactLogo: {
    height: 173,
    width: 150,
    resizeMode: 'contain', // Ensure the logo is contained within the view
  },
  bottomNavContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: '#4CAF50', // Green background for bottom navigation
    paddingVertical: 10,
  },
  navButton: {
    alignItems: 'center',
  },
  navText: {
    color: 'white',
    fontSize: 12,
    marginTop: 4,
  },
});