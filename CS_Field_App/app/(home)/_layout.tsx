import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import { useEffect } from 'react';
import 'react-native-reanimated';
import { View } from 'react-native'; // Import View

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded] = useFonts({
    SpaceMono: require('../../assets/fonts/SpaceMono-Regular.ttf'), // Load custom font
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync(); // Hide the splash screen once fonts are loaded
    }
  }, [loaded]);

  if (!loaded) {
    return null; // Render nothing until fonts are loaded
  }

  return (
    <View style={{ flex: 1 }}> {/* Wrap Stack and StatusBar in a View */}
      <Stack>
        <Stack.Screen name="home" options={{ headerShown: false }}/>
        <Stack.Screen name="add_edit_observations" options={{ headerShown: false }} />
        <Stack.Screen name="list_observation" options={{ headerShown: false }} />
      </Stack>
      <StatusBar style="auto" />
    </View>
  );
}