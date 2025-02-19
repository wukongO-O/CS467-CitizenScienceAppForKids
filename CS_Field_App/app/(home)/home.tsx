import React, { useState, useEffect } from 'react';
import { View, StyleSheet, ActivityIndicator, useColorScheme, Image, TouchableOpacity, Text } from 'react-native';
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
  const [mockData, setMockData] = useState<DataItem[]>([]); // State to store mock data
  const [isLoading, setIsLoading] = useState(true); // State to manage loading state
  const [selectedProject, setSelectedProject] = useState<string>(''); // State to store selected project
  const colorScheme = useColorScheme(); // Determine the current color scheme
  const router = useRouter(); // Get the router object for navigation

  useEffect(() => {
    // Simulate data loading
    const data: DataItem[] = require('../test_data/data.json');
    setMockData(data);
    setIsLoading(false);
  }, []);

  // Filter data based on class_code
  const filteredData = mockData.filter(item => item.class_code === classCode);

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
    router.push({
      pathname: '/list_observation',
      params: { classCode, projectTitle: selectedProject },
    });
  };
  const navigateToAddEdit = () => {
    router.push({
      pathname: '/add_edit_observations',
      params: { classCode, projectTitle: selectedProject },
    });
  };

  // Find the selected project data
  const selectedProjectData = filteredData.find(item => item.title === selectedProject);

  // Determine picker styles based on the current color scheme
  const pickerStyle = colorScheme === 'dark' ? styles.pickerDark : styles.pickerLight;

  return (
    <View style={styles.container}>
      <ParallaxScrollView
        headerBackgroundColor={{ light: '#D0D0D0', dark: '#353636' }}
        headerImage={
          <Image
            source={require('@/assets/images/partial-react-logo.png')}
            style={styles.reactLogo}
          />
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
              style={pickerStyle}
            >
              <Picker.Item label="Select a project" value="" />
              {filteredData.map((item) => (
                <Picker.Item key={item.project_id} label={item.title} value={item.title} />
              ))}
            </Picker>
          )}
          {selectedProjectData ? (
            <View style={styles.itemContainer}>
              <ThemedText style={styles.itemDescription}>{selectedProjectData.description}</ThemedText>
              <ThemedText style={styles.itemDirections}>{selectedProjectData.directions}</ThemedText>
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
  },
  headerImage: {
    color: '#808080',
    bottom: -90,
    left: -35,
    position: 'absolute',
  },
  titleContainer: {
    flexDirection: 'row',
    gap: 8,
    alignItems: 'center', // Align items vertically
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  picker: {
    height: 50,
    width: '100%',
  },
  pickerLight: {
    backgroundColor: '#fff',
    color: '#000',
  },
  pickerDark: {
    backgroundColor: '#333',
    color: '#fff',
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
    fontSize: 18,
    color: '#666',
  },
  itemDirections: {
    fontSize: 14,
    color: '#666',
  },
  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: 'absolute',
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