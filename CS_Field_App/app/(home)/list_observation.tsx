import { StyleSheet, Image, Platform } from 'react-native';

import { Collapsible } from '@/components/Collapsible';
import { ExternalLink } from '@/components/ExternalLink';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { IconSymbol } from '@/components/ui/IconSymbol';

export default function explore() {
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
          }>
          <ThemedView style={styles.titleContainer}>
            {/* Display the title */}
            <ThemedText type="title">List of Project Observations:
            </ThemedText>
          </ThemedView>
    
          <ThemedView style={styles.stepContainer}>
            {/* Display the list of observations */}
            <ThemedText>All observations for the project will be listed here.</ThemedText>
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
