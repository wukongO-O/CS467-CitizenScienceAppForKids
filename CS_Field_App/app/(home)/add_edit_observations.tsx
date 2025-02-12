import React, { useState, useEffect } from 'react';
import { StyleSheet, Image, Platform, View, ActivityIndicator, useColorScheme } from 'react-native';
import { useLocalSearchParams } from 'expo-router';

import { Collapsible } from '@/components/Collapsible';
import { ExternalLink } from '@/components/ExternalLink';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { IconSymbol } from '@/components/ui/IconSymbol';

// Define an interface for the data items
interface DataItem {
  class_code: string;
  project_id: number;
  title: string;
  description: string;
  directions: string;
}

export default function add_edit_observations() {
  const { classCode } = useLocalSearchParams(); // Retrieve classCode from search parameters
  const [mockData, setMockData] = useState<DataItem[]>([]); // State to store mock data
  const [isLoading, setIsLoading] = useState(true); // State to manage loading state
  const [selectedProject, setSelectedProject] = useState<string>(''); // State to store selected project
  const colorScheme = useColorScheme(); // Determine the current color scheme




  return (
    <ParallaxScrollView
          headerBackgroundColor={{ light: '#D0D0D0', dark: '#353636' }}
          headerImage={
            <Image
                source={require('@/assets/images/partial-react-logo.png')}
                style={styles.reactLogo}
            />
          }>
          <ThemedView style={styles.titleContainer}>
            <ThemedText type="title">Add or Edit an observation:</ThemedText>
          </ThemedView>
          <ThemedView style={styles.stepContainer}>
            <ThemedText>List of observations that are available to edit are here:</ThemedText>
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
  // Style for the step container
  stepContainer: {
    gap: 8,
    marginBottom: 8,
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
