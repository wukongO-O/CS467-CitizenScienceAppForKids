import React, { useState, useEffect } from 'react';
import { StyleSheet, View, TextInput, Button, FlatList, TouchableOpacity, Text, useColorScheme } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons'; // Import Ionicons
import * as FileSystem from 'expo-file-system';

import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';

// Define an interface for the observation data
interface ObservationData {
  obs_id: number;
  anonymous_user_id: string;
  timestamp: string;
  data: Array<{ type: string; label: string; value: any; options?: Array<{ value: string; label: string }> }>;
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
  const { projectTitle, classCode } = useLocalSearchParams(); // Retrieve projectTitle and classCode from search parameters
  const [observationData, setObservationData] = useState<ProjectData[]>([]); // State to store observation data
  const [filteredObservations, setFilteredObservations] = useState<ObservationData[]>([]); // State to store filtered observations
  const [newObservation, setNewObservation] = useState<ObservationData>({
    obs_id: Date.now(),
    anonymous_user_id: '',
    timestamp: new Date().toISOString(),
    data: []
  }); // State to store new observation
  const router = useRouter(); // Get the router object for navigation
  const colorScheme = useColorScheme(); // Determine the current color scheme

  useEffect(() => {
    // Load observation data from file
    const data: ProjectData[] = require('../test_data/observation_data.json');
    setObservationData(data);

    // Filter observations based on the selected project title
    const selectedProject = data.find(project => project.title === projectTitle);
    if (selectedProject) {
      setFilteredObservations(selectedProject.observations);
      setNewObservation({
        ...newObservation,
        data: selectedProject.observations.length > 0 ? selectedProject.observations[0].data.map(d => ({ ...d, value: '' })) : []
      });
    } else {
      console.log('No matching project found');
    }
  }, [projectTitle]);

  const handleAddObservation = async () => {
    const updatedObservations = [...filteredObservations, newObservation];
    setFilteredObservations(updatedObservations);
    setNewObservation({
      obs_id: Date.now(),
      anonymous_user_id: '',
      timestamp: new Date().toISOString(),
      data: newObservation.data.map(d => ({ ...d, value: '' }))
    });

    // Update the observation_data.json file
    const updatedData = observationData.map(project => {
      if (project.title === projectTitle) {
        return { ...project, observations: updatedObservations };
      }
      return project;
    });

    const fileUri = FileSystem.documentDirectory + 'observation_data.json';
    await FileSystem.writeAsStringAsync(fileUri, JSON.stringify(updatedData, null, 2));
    console.log('Observation data updated');
  };

  const handleEditObservation = (obs_id: number) => {
    const observationToEdit = filteredObservations.find(obs => obs.obs_id === obs_id);
    if (observationToEdit) {
      setNewObservation(observationToEdit);
    }
  };

  const handleSaveObservation = async () => {
    const updatedObservations = filteredObservations.map(obs =>
      obs.obs_id === newObservation.obs_id ? newObservation : obs
    );
    setFilteredObservations(updatedObservations);
    setNewObservation({
      obs_id: Date.now(),
      anonymous_user_id: '',
      timestamp: new Date().toISOString(),
      data: newObservation.data.map(d => ({ ...d, value: '' }))
    });

    // Update the observation_data.json file
    const updatedData = observationData.map(project => {
      if (project.title === projectTitle) {
        return { ...project, observations: updatedObservations };
      }
      return project;
    });

    const fileUri = FileSystem.documentDirectory + 'observation_data.json';
    await FileSystem.writeAsStringAsync(fileUri, JSON.stringify(updatedData, null, 2));
    console.log('Observation data updated');
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
      params: { classCode, projectTitle },
    });
  };

  return (
    <View style={[styles.container, colorScheme === 'dark' ? styles.darkContainer : styles.lightContainer]}>
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title">Add or Edit an Observation</ThemedText>
      </ThemedView>
      <ThemedView style={styles.stepContainer}>
        <ThemedText>List of observations that are available to edit:</ThemedText>
        <FlatList
          data={filteredObservations}
          keyExtractor={(item) => item.obs_id.toString()}
          renderItem={({ item }) => (
            <View style={styles.itemContainer}>
              {item.data.map((dataItem, index) => (
                <View key={index} style={styles.dataContainer}>
                  <ThemedText style={styles.dataLabel}>{dataItem.label}:</ThemedText>
                  <ThemedText style={styles.dataValue}>{dataItem.value}</ThemedText>
                </View>
              ))}
              <Button title="Edit" onPress={() => handleEditObservation(item.obs_id)} />
            </View>
          )}
        />
      </ThemedView>
      <ThemedView style={styles.stepContainer}>
        <ThemedText>Add a new observation:</ThemedText>
        {newObservation.data.map((dataItem, index) => (
          <TextInput
            key={index}
            style={styles.input}
            placeholder={dataItem.label}
            value={dataItem.value.toString()}
            onChangeText={(text) => setNewObservation({
              ...newObservation,
              data: newObservation.data.map((d, i) => i === index ? { ...d, value: text } : d)
            })}
          />
        ))}
        <Button title="Add Observation" onPress={handleAddObservation} />
        <Button title="Save Observation" onPress={handleSaveObservation} />
      </ThemedView>
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