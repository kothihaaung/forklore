import PhotoGridScreen from '@/screens/PhotoGridScreen';
import React from "react";
import {
  SafeAreaView,
  StyleSheet,
} from "react-native";

export default function HomeScreen() {
  return (
    <SafeAreaView style={styles.safeArea}>
      <PhotoGridScreen />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
});