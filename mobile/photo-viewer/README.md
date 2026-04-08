# 📱 Forklore - Every dish tells a story. (React Native)

This is the React Native (Expo) front-end for the **Forklore - Every dish tells a story.**, which displays a grid of food photos and allows users to filter by category and view detailed photo information. It connects to a Ruby on Rails backend API that provides photo data.

---

## 🚀 Features

- 📷 Responsive photo **grid layout** for iOS & Android
- 🧭 Category-based **filter bar** to quickly narrow photos
- 📄 **Detail screen** with full image, title, category, and photographer info
- 🖼️ Dynamic image height calculation to preserve correct aspect ratio
- 🧭 Navigation via **Expo Router** (tabs and stacks)
- 🌙 **Dark and light theme** support using system preferences
- 📱 Safe Area Insets for top/bottom padding across devices

---

## 🛠️ Tech Stack

- [React Native](https://reactnative.dev/) (via [Expo SDK](https://docs.expo.dev/))
- [TypeScript](https://www.typescriptlang.org/)
- [Expo Router](https://expo.github.io/router/)
- [Axios](https://axios-http.com/) for API requests
- [`react-native-safe-area-context`](https://github.com/th3rdwave/react-native-safe-area-context) for layout safety
- Theming via `useColorScheme()` and `useTheme()`

---

## 🧪 How to Run the App

### 1. Install Required Tools

- Node.js v20+
- Expo CLI:
  ```bash
  npm i @expo/cli
  ```

### 2. Run the project

```bash
cd mobile/photo-viewer
npm install
npx expo start 

Press i to open in iOS Simulator (macOS only)
Press a to open in Android Emulator
Or scan the QR code using the Expo Go app on your physical device
```
