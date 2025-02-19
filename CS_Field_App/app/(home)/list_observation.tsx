import React, { useState, useEffect } from 'react';
import { StyleSheet, Image, View, FlatList, TouchableOpacity, Text, useColorScheme } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons'; // Import Ionicons

import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';

// Define an interface for the observation data
interface ObservationData {
  obs_id: number;
  anonymous_user_id: string;
  timestamp: string;
  data: Array<{ type: string; label: string; value: any }>;
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

export default function ListObservation() {
  const { projectTitle, classCode } = useLocalSearchParams(); // Retrieve projectTitle and classCode from search parameters
  const [observationData, setObservationData] = useState<ProjectData[]>([]); // State to store observation data
  const [filteredObservations, setFilteredObservations] = useState<ObservationData[]>([]); // State to store filtered observations
  const router = useRouter(); // Get the router object for navigation
  const colorScheme = useColorScheme(); // Determine the current color scheme

  useEffect(() => {
    // Load observation data from file
    const data: ProjectData[] = require('../test_data/observation_data.json');
    setObservationData(data);

    // Debugging: Log the loaded data and projectTitle
    console.log('Loaded Data:', data);
    console.log('Observations', data.map(project => project.observations));
    console.log('Project Title:', projectTitle);

    // Filter observations based on the selected project title
    const selectedProject = data.find(project => project.title === projectTitle);
    if (selectedProject) {
      setFilteredObservations(selectedProject.observations);
    } else {
      console.log('No matching project found');
    }
  }, [projectTitle]);

  // Debugging: Log the filtered observations
  console.log('Filtered Observations:', filteredObservations);

  const navigateToHome = () => {
    router.push({
      pathname: '/home',
      params: { classCode }, // Pass classCode as a parameter
    });
  };

  const navigateToAddEdit = () => {
    router.push({
      pathname: '/add_edit_observations',
      params: { classCode, projectTitle },
    });
  };

  return (
    <View style={[styles.container, colorScheme === 'dark' ? styles.darkContainer : styles.lightContainer]}>
      <Image
        source={require('@/assets/images/partial-react-logo.png')}
        style={styles.reactLogo}
      />
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title">Observations for {projectTitle}</ThemedText>
      </ThemedView>

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
          </View>
        )}
      />

      <View style={styles.bottomNavContainer}>
        <TouchableOpacity style={styles.navButton} onPress={navigateToHome}>
          <Ionicons name="home-outline" size={24} color="white" />
          <Text style={styles.navText}>Home</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navButton} onPress={() => router.push('/list_observation')}>
          <Ionicons name="menu-outline" size={24} color="white" />
          <Text style={styles.navText}>Menu</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navButton} onPress={navigateToAddEdit}>
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
  itemContainer: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  itemTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  itemDescription: {
    fontSize: 16,
    color: '#666',
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
  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
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