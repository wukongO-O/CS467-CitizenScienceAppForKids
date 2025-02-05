import { Tabs } from 'expo-router';
import React from 'react';
import { Platform } from 'react-native';

import { HapticTab } from '@/components/HapticTab';
import { IconSymbol } from '@/components/ui/IconSymbol';
import TabBarBackground from '@/components/ui/TabBarBackground';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';

export default function TabLayout() {
  const colorScheme = useColorScheme(); // Determine the current color scheme (light or dark)

  return (
    <Tabs
      screenOptions={{
        // Set the active tab color based on the current color scheme
        tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
        headerShown: false, // Hide the header
        tabBarButton: HapticTab, // Use custom tab bar button with haptic feedback
        tabBarBackground: TabBarBackground, // Use custom tab bar background
        tabBarStyle: Platform.select({
          ios: {
            // Use a transparent background on iOS to show the blur effect
            position: 'absolute',
          },
          default: {},
        }),
      }}>
      <Tabs.Screen
        name="home"
        options={{
          title: 'Home', // Set the title of the tab
          tabBarIcon: ({ color }) => <IconSymbol size={28} name="house.fill" color={color} />,
        }}
      />
      <Tabs.Screen
        name="list_observation"
        options={{
          title: 'List of Observations', // Set the title of the tab
          tabBarIcon: ({ color }) => <IconSymbol size={28} name="bars.fill" color={color} />,
        }}
      />
      <Tabs.Screen
        name="add_edit_observations"
        options={{
          title: 'Add/Edit Observation', // Set the title of the tab
          tabBarIcon: ({ color }) => <IconSymbol size={28} name="add.fill" color={color} />,
        }}
      />
    </Tabs>
  );
}
