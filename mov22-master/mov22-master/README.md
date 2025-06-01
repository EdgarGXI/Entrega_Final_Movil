# Punto G - React Native App 🌸

<p align="center">
  <img src="assets/logo-puntog.png" width="200" alt="Punto G Logo">
</p>

<p align="center"><em>A modern React Native application for sexual education event management built with Expo and NativeWind.</em></p>

## 📖 About

The **mov22** directory contains a React Native implementation of the Punto G platform, designed to facilitate the creation, management, and discovery of sexual education events and workshops. This app provides an intuitive interface for users to explore educational content, manage events, and engage with the community.

## 🎥 Demo Video

[![Demo](https://img.youtube.com/vi/fFWO2N6fPK8/0.jpg)](https://www.youtube.com/watch?v=fFWO2N6fPK8)

## ✨ Features

- 📅 **Event Management** - Create, edit, and delete educational events
- 🔍 **Advanced Search** - Filter events by categories with real-time search
- 📊 **Feedback Dashboard** - View ratings and comments for events
- 🎨 **Customizable Backgrounds** - Multiple themed backgrounds for events
- 📱 **Cross-Platform** - Runs on iOS, Android, and Web via Expo
- 🎯 **Category System** - Organized content with specialized categories
- 💅 **Modern UI** - Built with NativeWind (TailwindCSS for React Native)
- 🚀 **Performance Optimized** - Efficient list rendering and image loading

## 🛠️ Tech Stack

- **Framework**: React Native with Expo
- **Styling**: NativeWind (TailwindCSS for React Native)
- **Navigation**: React Navigation v6 with Stack Navigators
- **UI Components**:
  - Expo Vector Icons (MaterialIcons)
  - React Native Paper Dates (Date/Time pickers)
  - React Native Dropdown Picker
- **State Management**: React Context API via `AppProvider`
- **HTTP Client**: Axios (via services)
- **Fonts**: Nunito family (Regular, Bold, Black)
- **Development**: Expo CLI with Metro bundler


## 🚀 Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- Expo CLI (`npm install -g @expo/cli`)
- iOS Simulator (for Mac) or Android Emulator

### Installation

1. **Navigate to the React Native project**:

   ```bash
   cd mov22
   ```

2. **Install dependencies**:

   ```bash
   npm install
   # or
   yarn install
   ```

3. **Start the development server**:

   ```bash
   npx expo start
   ```

4. **Run on specific platforms**:

   ```bash
   # iOS (requires macOS)
   npx expo start --ios

   # Android
   npx expo start --android

   # Web
   npx expo start --web
   ```

### Configuration

1. **API Configuration**: Update the API base URL in your service files to point to your backend
2. **Font Loading**: Fonts are loaded via `useFonts` from Expo Google Fonts
3. **Styling**: Customize themes in tailwind.config.js

## 📱 Key Screens

### Home Screen (`homeScreen.js`)

- Dashboard with recent events and categories
- Quick navigation to event creation
- Visual hierarchy with pink-themed design

### Search Screen (`searchScreen.js`)

- Real-time event search functionality
- Category filtering with horizontal scrollable tabs
- Event management (edit/delete) capabilities

### Event Form (`eventForm.js`)

- Create and edit events with rich form inputs
- Background image selection from categorized themes
- Date/time picker integration
- Category assignment with dropdown

### Feedback Dashboard (`feedbackDashboard.js`)

- Event ratings visualization with progress bars
- Comments display with user-friendly interface
- Statistical feedback overview

## 🎨 Styling & Theming

The app uses **NativeWind** for styling, which brings TailwindCSS utility classes to React Native:

```javascript
// Example usage in components
<View className="bg-pink-200 rounded-full py-3 px-6">
  <Text className="text-pink-600 font-semibold">Button Text</Text>
</View>
```

### Color Palette

- **Primary**: Pink tones (`pink-600`, `pink-200`, `pink-800`)
- **Background**: White and gray variations
- **Accents**: Material Design colors via Expo Vector Icons

## 🔧 Custom Hooks

### `useAppNavigation`

Provides navigation utilities for consistent routing throughout the app.

### `useEventForm`

Manages event creation and editing logic with form validation.

### `useCategoryForm`

Handles category management operations with error handling.

## 📦 Key Dependencies

```json
{
  "@expo/vector-icons": "^14.0.0",
  "@react-navigation/native": "^6.x",
  "@react-navigation/stack": "^6.x",
  "expo": "~51.0.0",
  "react-native-paper-dates": "^0.x",
  "react-native-dropdown-picker": "^5.x",
  "nativewind": "^2.x",
  "tailwindcss": "^3.x"
}
```

## 🧪 Development

### Running the App

```bash
# Start Expo development server
npx expo start

# Clear cache if needed
npx expo start --clear
```

### Building for Production

```bash
# Build for Android
npx expo build:android

# Build for iOS
npx expo build:ios

# Create APK
npx expo export --platform android
```

## 🔗 Integration

This React Native app integrates with:

- **Backend API**: RESTful services for data management
- **Image Assets**: Local storage for event backgrounds via `eventBackgroundsMap`
- **Context System**: Global state management via `AppProvider`

## 🤝 Contributing

1. Follow the existing code structure and naming conventions
2. Use TypeScript-style prop validation where applicable
3. Maintain consistent styling with NativeWind classes
4. Test on both iOS and Android platforms

## 📄 License

This project is part of the Punto G educational platform initiative.

---
