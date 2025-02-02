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
          headerBackgroundColor={{ light: '#D0D0D0', dark: '#353636' }}
          headerImage={
            <IconSymbol
              size={310}
              color="#808080"
              name="chevron.left.forwardslash.chevron.right"
              style={styles.headerImage}
            />
          }>
          <ThemedView style={styles.titleContainer}>
            <ThemedText type="title">Here is where you will add projects to your teachers
              project.
            </ThemedText>
          </ThemedView>
    
          <ThemedView style={styles.stepContainer}>
            {/* Display the title */}
            <ThemedText>Here will appear the options for what you can add.</ThemedText>
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
});
