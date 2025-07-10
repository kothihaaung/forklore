# 📸 Photo Viewer App — Full Stack Mobile Tech Exercise

A simple yet polished **photo viewer app** built with **React Native (Expo)** and **Ruby on Rails API**, designed to help users explore a gallery of food photography filtered by category.

---

## 📱 App Screenshots

### 🖼️ Light Mode

| ![](./images/light-1.png) | ![](./images/light-2.png) | ![](./images/light-3.png) |
|---------------------------|---------------------------|---------------------------|

### 🌙 Dark Mode

| ![](./images/dark-1.png) | ![](./images/dark-2.png) | ![](./images/dark-3.png) |
|--------------------------|--------------------------|--------------------------|


## 🧠 Summary

### 📱 App Description
This mobile app allows users to browse high-quality food photos categorized by type (e.g., sushi, burger, pizza). Users can filter by category and tap on any photo to view more details like title and photographer.

### ✅ How the App Solves It
- Clean two-column photo grid layout for quick browsing  
- Filters by food category  
- Detail screen shows full-size image, title, photographer, and category  
- Fast, minimal UI with dark/light theme support

### 💪 Strengths
- Full-stack: React Native frontend + Rails backend
- Modern UI with dark/light theme
- Responsive image aspect ratio handling
- Modular code structure with hooks
- Expo-compatible; works on both Android and iOS
- RESTful API with clean JSON responses

---

## ⚙️ Backend API Setup (`backend/`)

### 📦 Requirements
- Ruby 3.3+
- Rails 8+
- SQLite (default)
- Bundler

### 🔧 Installation Steps

```bash
cd backend
bundle install
bin/rails db:setup
```

This will:
- Create the database
- Run migrations
- Seed with food photos (title, category, photographer, image URL)

### 🚀 Run the Server
```bash
bin/rails server -b 0.0.0.0
```

The API will be available at:
```bash
http://<YOUR-IP>:3000/api/v1/photos
```

Use this IP in your mobile API code (e.g., usePhotos.ts):
```bash
axios.get('http://<YOUR-IP>:3000/api/v1/photos');
```

### 🌐 How to Get Your IP Address (for Expo access)
```bash
ipconfig getifaddr en0        # macOS
```

---

## ⚙️ Mobile App Setup (`mobile/`)

### 📦 Requirements

- Node.js v20+
- Expo CLI:
  ```bash
  npm i @expo/cli
  ```

### 📦 Install dependencies

```bash
cd mobile/photo-viewer
npm install
```

### 🚀 Run the App

```bash
npx expo start

Press i to open in iOS Simulator (macOS only)
Press a to open in Android Emulator
Or scan the QR code using the Expo Go app on your physical device
```
