import React, { useState, useEffect } from 'react';
import { StyleSheet, Image, View, FlatList, TouchableOpacity, Text, useColorScheme, ActivityIndicator } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons'; // Import Ionicons

import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';

// Define an interface for the observation data
interface ObservationData {
  obs_id: number;
  anon_user_id: number;
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

export default function ListObservation() {
  const { projectTitle, classCode, project_id } = useLocalSearchParams(); // Retrieve projectTitle, classCode, and project_id from search parameters
  const [observationData, setObservationData] = useState<ObservationData[]>([]); // State to store observation data
  const [isLoading, setIsLoading] = useState(true); // State to manage loading state
  const router = useRouter(); // Get the router object for navigation
  const colorScheme = useColorScheme(); // Determine the current color scheme

  useEffect(() => {
    if (project_id) {
      // Fetch data from the API
      fetch(`http://localhost:5000/observations/project/${project_id}`)
        .then(response => response.json())
        .then(data => {
          console.log('Fetched data:', data); // Debugging log
          setObservationData(data);
          setIsLoading(false);
        })
        .catch(error => {
          console.error('Error fetching data:', error);
          setIsLoading(false);
        });
    }
  }, [project_id]);

  // Debugging: Log the project_id and fetched observations
  console.log("project ID", project_id);
  console.log('Fetched Observations:', observationData);

  // Function to navigate to the home screen
  const navigateToHome = () => {
    router.push({
      pathname: '/home',
      params: { classCode }, // Pass classCode as a parameter
    });
  };

  // Function to navigate to the add/edit observations screen
  const navigateToAddEdit = () => {
    router.push({
      pathname: '/add_edit_observations',
      params: { classCode, projectTitle, project_id },
    });
  };

  return (
    <View style={[styles.container, colorScheme === 'dark' ? styles.darkContainer : styles.lightContainer]}>
      {/* Display the logo */}
      <Image
        source={require('@/assets/images/partial-react-logo.png')}
        style={styles.reactLogo}
      />
      {/* Display the title of the project */}
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title">Observations for {projectTitle}</ThemedText>
      </ThemedView>

      {/* Display the list of observations */}
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
            </View>
          )}
        />
      )}

      {/* Display the bottom navigation buttons */}
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