import React, { useState, useEffect } from 'react';
import { View, StyleSheet, ActivityIndicator, useColorScheme, Image } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import { Picker } from '@react-native-picker/picker';

import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { IconSymbol } from '@/components/ui/IconSymbol';
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

  // Find the selected project data
  const selectedProjectData = filteredData.find(item => item.title === selectedProject);

  // Determine picker styles based on the current color scheme
  const pickerStyle = colorScheme === 'dark' ? styles.pickerDark : styles.pickerLight;

  return (
    <ParallaxScrollView
      // Set different background colors for light and dark modes
      headerBackgroundColor={{ light: '#D0D0D0', dark: '#353636' }}
      headerImage={
        // Display an image in the header
        <Image
          source={require('@/assets/images/partial-react-logo.png')}
          style={styles.reactLogo}
          />
        
      }
    >
      <ThemedView style={styles.titleContainer}>
        {/* Display the title */}
        <ThemedText type="title">Projects for your class</ThemedText>
      </ThemedView>

      <ThemedView style={styles.stepContainer}>
        {/* Display instructions */}
        <ThemedText>Select a project to see its description.</ThemedText>
        {isLoading ? (
          // Show loading indicator while data is loading
          <ActivityIndicator size="large" color="#0000ff" />
        ) : (
          // Display a picker to select a project
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
        {selectedProjectData && (
          // Display selected project details
          <View style={styles.itemContainer}>
            <ThemedText style={styles.itemDescription}>{selectedProjectData.description}</ThemedText>
            <ThemedText style={styles.itemDirections}>{selectedProjectData.directions}</ThemedText>
          </View>
        )}
      </ThemedView>
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  headerImage: {
    color: '#808080',
    bottom: -90,
    left: -35,
    position: 'absolute',
  },
  titleContainer: {
    flexDirection: 'row',
    gap: 8,
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
  // Style for the react logo
  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: 'absolute',
  },
});