import React, { useState, useEffect } from 'react';
import { StyleSheet, View, TextInput, Button, FlatList, TouchableOpacity, Text, useColorScheme, ActivityIndicator } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons'; // Import Ionicons

import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';

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
    <View style={[styles.container, colorScheme === 'dark' ? styles.darkContainer : styles.lightContainer]}>
      {/* Display the title of the page */}
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title">Add or Edit an Observation</ThemedText>
      </ThemedView>

      {/* Display the list of observations available to edit */}
      <ThemedView style={styles.stepContainer}>
        <ThemedText>List of observations that are available to edit:</ThemedText>
        {isLoading ? (
          <ActivityIndicator size="large" color="#0000ff" />
        ) : (
          <FlatList
            data={observationData}
            keyExtractor={(item) => item.obs_id.toString()}
            renderItem={({ item }) => (
              <View style={styles.itemContainer}>
                {Object.entries(item.data).map(([key, value], index) => (
                  <View key={index} style={styles.dataContainer}>
                    <ThemedText style={styles.dataLabel}>{key}:</ThemedText>
                    <ThemedText style={styles.dataValue}>{value}</ThemedText>
                  </View>
                ))}
                <Button title="Edit" onPress={() => handleEditObservation(item.obs_id)} />
              </View>
            )}
          />
        )}
      </ThemedView>

      {/* Display the form to add a new observation */}
      <ThemedView style={styles.stepContainer}>
        <ThemedText>Add a new observation:</ThemedText>
        {Object.entries(newObservation.data).map(([key, value], index) => (
          <TextInput
            key={index}
            style={styles.input}
            placeholder={key}
            value={value.toString()}
            onChangeText={(text) => setNewObservation({
              ...newObservation,
              data: { ...newObservation.data, [key]: text }
            })}
          />
        ))}
        <Button title="Add Observation" onPress={handleAddObservation} />
        <Button title="Save Observation" onPress={handleSaveObservation} />
      </ThemedView>

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
        <TouchableOpacity style={styles.navButton} onPress={() => {}}>
          <Ionicons name="add-outline" size={24} color="white" />
          <Text style={styles.navText}>Add</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  lightContainer: {
    backgroundColor: '#fff',
  },
  darkContainer: {
    backgroundColor: '#000',
  },
  titleContainer: {
    flexDirection: 'row',
    gap: 8,
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
  },
  bottomNavContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: '#007AFF',
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