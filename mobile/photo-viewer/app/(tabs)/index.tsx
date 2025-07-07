import PhotoGridScreen from '@/screens/PhotoGridScreen';
import React from "react";
import { StyleSheet, View, Platform } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function HomeScreen() {
  const insets = useSafeAreaInsets();

  return (
    <View
      style={[
        styles.container,
        {
          paddingTop: insets.top,
          paddingBottom: Platform.OS === "android" ? 0 : insets.bottom + 33 + 16, // 33 for the tab bar height, 16 for bottom padding
        },
      ]}
    >
      <PhotoGridScreen />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
