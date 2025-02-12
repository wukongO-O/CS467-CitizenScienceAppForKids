import React, { useState, useEffect } from 'react';
import { StyleSheet, Image, View, FlatList } from 'react-native';
import { useLocalSearchParams } from 'expo-router';

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
  const { projectTitle } = useLocalSearchParams(); // Retrieve projectTitle from search parameters
  const [observationData, setObservationData] = useState<ProjectData[]>([]); // State to store observation data
  const [filteredObservations, setFilteredObservations] = useState<ObservationData[]>([]); // State to store filtered observations

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

  return (
    <View style={styles.container}>
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
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
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
});