import React, { useState, useEffect } from 'react';
import { StyleSheet, View, TextInput, Button, FlatList, TouchableOpacity, Text, useColorScheme, ActivityIndicator, Image, ScrollView } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons'; // Import Ionicons

import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import ParallaxScrollView from '@/components/ParallaxScrollView';

// Define an interface for the observation data
interface ObservationData {
  obs_id: number;
  anonymous_user_id: string;
  timestamp: string;
  data: { [key: string]: any }; // Adjusted to reflect the correct data structure
}

// Define an interface for the project data
interface ProjectData {
  class_code: string;
  project_id: number;
  title: string;
  description: string;
  directions: string;
  observations: ObservationData[];
}

export default function AddEditObservations() {
  const { projectTitle, classCode, project_id } = useLocalSearchParams(); // Retrieve projectTitle, classCode, and project_id from search parameters
  const [observationData, setObservationData] = useState<ObservationData[]>([]); // State to store observation data
  const [isLoading, setIsLoading] = useState(true); // State to manage loading state
  const [newObservation, setNewObservation] = useState<ObservationData>({
    obs_id: Date.now(),
    anonymous_user_id: '',
    timestamp: new Date().toISOString(),
    data: {}
  }); // State to store new observation
  const [isEditing, setIsEditing] = useState(false); // State to manage if an observation is being edited
  const router = useRouter(); // Get the router object for navigation
  const colorScheme = useColorScheme(); // Determine the current color scheme

  useEffect(() => {
    console.log('Fetching data for project_id:', project_id); // Debugging log
    // Fetch observation data from the API
    fetch(`http://localhost:5000/observations/project/${project_id}`)
      .then(response => response.json())
      .then(data => {
        console.log('Fetched data:', data); // Debugging log
        if (Array.isArray(data)) {
          setObservationData(data);
          setIsLoading(false);

          // Set new observation template based on the first observation's data structure
          if (data.length > 0 && typeof data[0].data === 'object') {
            setNewObservation({
              ...newObservation,
              data: Object.keys(data[0].data).reduce((acc, key) => {
                acc[key] = '';
                return acc;
              }, {} as { [key: string]: any })
            });
          }
        } else {
          console.error('Expected an array but got:', data);
          setIsLoading(false);
        }
      })
      .catch(error => {
        console.error('Error fetching data:', error);
        setIsLoading(false);
      });
  }, [projectTitle, project_id]);

  const handleAddObservation = async () => {
    try {
      // Create a new anonymous user
      const userResponse = await fetch(`http://localhost:5000/anonymous_users`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!userResponse.ok) {
        throw new Error('Failed to create anonymous user');
      }

      const userResult = await userResponse.json();
      console.log('Anonymous user created:', userResult);

      const newObs = {
        project_id: project_id,
        anon_user_id: userResult.anon_user_id,
        data: newObservation.data,
      };

      console.log('Sending new observation:', newObs); // Debugging log

      // Add the new observation to the backend
      const response = await fetch(`http://localhost:5000/observations`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newObs),
      });

      if (response.ok) {
        const result = await response.json();
        console.log('Observation added:', result);

        // Create a complete ObservationData object
        const completeNewObs: ObservationData = {
          obs_id: result.obs_id,
          anonymous_user_id: String(userResult.anon_user_id), // Ensure it's a string
          timestamp: new Date().toISOString(),
          data: newObservation.data,
        };

        setObservationData([...observationData, completeNewObs]);
        setNewObservation({
          obs_id: Date.now(),
          anonymous_user_id: '',
          timestamp: new Date().toISOString(),
          data: Object.keys(newObservation.data).reduce((acc, key) => {
            acc[key] = '';
            return acc;
          }, {} as { [key: string]: any })
        });
        setIsEditing(false); // Switch back to Add Mode after saving
      } else {
        console.error('Failed to add observation');
      }
    } catch (error) {
      console.error('Error adding observation:', error);
    }
  };

  const handleEditObservation = (obs_id: number) => {
    const observationToEdit = observationData.find(obs => obs.obs_id === obs_id);
    if (observationToEdit) {
      setNewObservation(observationToEdit);
      setIsEditing(true); // Set editing state to true when an observation is selected for editing
    }
  };

  const handleSaveObservation = async () => {
    const updatedObservations = observationData.map(obs =>
      obs.obs_id === newObservation.obs_id ? newObservation : obs
    );
    setObservationData(updatedObservations);
    setNewObservation({
      obs_id: Date.now(),
      anonymous_user_id: '',
      timestamp: new Date().toISOString(),
      data: Object.keys(newObservation.data).reduce((acc, key) => {
        acc[key] = '';
        return acc;
      }, {} as { [key: string]: any })
    });
    setIsEditing(false); // Reset editing state after saving

    // Update the observation data in the backend
    try {
      const response = await fetch(`http://localhost:5000/observations/${newObservation.obs_id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newObservation),
      });

      if (response.ok) {
        console.log('Observation data updated');
      } else {
        console.error('Failed to update observation data');
      }
    } catch (error) {
      console.error('Error updating observation data:', error);
    }
  };

  const navigateToHome = () => {
    router.push({
      pathname: '/home',
      params: { classCode }, // Pass classCode as a parameter
    });
  };

  const navigateToListObservation = () => {
    router.push({
      pathname: '/list_observation',
      params: { classCode, projectTitle, project_id },
    });
  };

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
        {/* Display the title of the page */}
        <ThemedView style={styles.titleContainer}>
          <ThemedText type="title">Add or Edit an Observation</ThemedText>
        </ThemedView>

        {/* Display the form to add or edit an observation */}
        <ThemedView style={styles.stepContainer}>
          <ThemedText>{isEditing ? 'Edit the observation:' : 'Add a new observation:'}</ThemedText>
          {isEditing && (
            <ThemedText style={styles.instructionsText}>
              Click the "EDIT" button under the observation you wish to edit. 
              Then update the fields below and click "Save Observation".
            </ThemedText>
          )}
          {Object.entries(newObservation.data).map(([key, value], index) => (
            <TextInput
              key={index}
              style={[styles.input, { color: colorScheme === 'dark' ? 'white' : 'black', backgroundColor: colorScheme === 'dark' ? '#333' : '#FFFFFF' }]}
              placeholder={key}
              placeholderTextColor={colorScheme === 'dark' ? '#888' : '#ccc'}
              value={value.toString()}
              onChangeText={(text) => setNewObservation({
                ...newObservation,
                data: { ...newObservation.data, [key]: text }
              })}
            />
          ))}
          <View style={styles.buttonRow}>
            <Button title={isEditing ? "Save Observation" : "Add Observation"} onPress={isEditing ? handleSaveObservation : handleAddObservation} color="#4CAF50" />
            <Button title={isEditing ? "Switch to Add Mode" : "Switch to Edit Mode"} onPress={() => setIsEditing(!isEditing)} color="#4CAF50" />
          </View>
        </ThemedView>
        
        {/* Display the list of observations available to edit */}
        <ThemedView style={styles.stepContainer}>
          <ThemedText>List of observations that are available to edit:</ThemedText>
          {isLoading ? (
            <ActivityIndicator size="large" color="#0000ff" />
          ) : (
            <ScrollView contentContainerStyle={styles.stepContainer}>
              {observationData.map((item) => (
                <View key={item.obs_id} style={[styles.itemContainer, { backgroundColor: colorScheme === 'dark' ? '#333' : '#FFFFFF' }]}>
                  {Object.entries(item.data).map(([key, value], index) => (
                    <View key={index} style={styles.dataContainer}>
                      <ThemedText style={[styles.dataLabel, { color: colorScheme === 'dark' ? 'white' : 'black' }]}>{key}:</ThemedText>
                      <ThemedText style={[styles.dataValue, { color: colorScheme === 'dark' ? 'white' : 'black' }]}>{value}</ThemedText>
                    </View>
                  ))}
                  <Button title="Edit" onPress={() => handleEditObservation(item.obs_id)} color="#4CAF50" />
                </View>
              ))}
            </ScrollView>
          )}
        </ThemedView>
        <View style={styles.buffer} />
      </ParallaxScrollView>

      {/* Display the bottom navigation buttons */}
      <View style={styles.bottomNavContainer}>
        <TouchableOpacity style={styles.navButton} onPress={navigateToHome}>
          <Ionicons name="home-outline" size={24} color="white" />
          <Text style={styles.navText}>Home</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navButton} onPress={navigateToListObservation}>
          <Ionicons name="menu-outline" size={24} color="white" />
          <Text style={styles.navText}>Menu</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navButton} onPress={handleSaveObservation}>
          <Ionicons name="save-outline" size={24} color="white" />
          <Text style={styles.navText}>Save</Text>
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
  itemContainer: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    borderRadius: 5,
  },
  dataContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  dataLabel: {
    fontSize: 14,
    fontWeight: 'bold',
  },
  dataValue: {
    fontSize: 14,
    marginLeft: 5,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
    borderRadius: 5,
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
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
  reactLogo: {
    height: 173,
    width: 150,
    resizeMode: 'contain', // Ensure the logo is contained within the view
  },
  buffer: {
    height: 100, // Adjust the height of the buffer to match the height of the bottom navigation
  },
  instructionsText: {
    fontSize: 14,
    color: '#FF6F00', // Dark orange text color
    marginBottom: 10,
  },
});