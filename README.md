
# Connected Services App

A cross-platform application built with React Native, Expo, and TypeScript to explore integrations with device services, external APIs, and platform-specific functionality.

Originally developed as a Full Sail University project, the application brings together weather information, location services, camera access, maps, and a demonstration login interface.

## Features

- Dashboard with navigation to connected services
- Demo login with locally persisted session status
- Current weather information based on device location
- Location permission requests and GPS coordinates
- Map functionality with platform-specific implementations
- Browser camera preview using the MediaDevices API
- Profile and navigation screens
- Loading states and error handling
- Web and mobile application structure

## Tech Stack

- React Native
- Expo
- Expo Router
- TypeScript
- React Hooks
- Expo Location
- React Native Maps
- AsyncStorage
- OpenWeather API
- Firebase SDK (configuration and service helpers)

## Project Structure

```text
app/
  _layout.tsx
  index.tsx
  weather.tsx
  map.tsx
  map.web.tsx
  camera.tsx
  profile.tsx

components/
  BackButton.tsx

services/
  authService.ts
  firebase.ts
  locationService.ts
  weatherService.ts

screenshots/
```

## How It Works

### Demo Authentication

The dashboard uses a demonstration login with predefined credentials. Session status is stored locally using AsyncStorage.

This is not production authentication and should not be used to protect sensitive information.

### Weather Integration

The application requests location permission, retrieves the device's coordinates, and makes a request to the OpenWeather API.

The weather screen displays temperature, conditions, humidity, wind speed, and feels-like temperature.

The API request is made directly from the application using an environment variable.

### Maps and Location

The project demonstrates location-aware functionality and platform-specific map implementations.

Map behavior differs between web and native platforms.

### Camera Integration

The web camera screen requests browser camera permission using getUserMedia.

It displays a live video preview and releases the camera stream when the component unmounts.

The native camera screen currently provides an informational fallback rather than a live camera preview.

### Firebase

The repository contains Firebase initialization and authentication service helpers.

The Firebase configuration currently uses placeholder values. The demonstration login in the main screen does not use Firebase Authentication.

## Getting Started

### Requirements

- Node.js
- npm
- Expo-compatible development environment

### Installation

Clone the repository:

```bash
git clone https://github.com/OnoprichukSergey-FS/ConnectedServicesApp.git
```

Open the project:

```bash
cd ConnectedServicesApp
```

Install dependencies:

```bash
npm install
```

Start Expo:

```bash
npm start
```

Run the web application:

```bash
npm run web
```

### Weather API Configuration

The weather service reads an API key from:

`EXPO_PUBLIC_OPENWEATHER_API_KEY`

This is a client-side environment variable and should not be treated as a secure secret.

A production application should use an appropriate backend or server-side proxy for API credentials that must remain confidential.

### Firebase Configuration

Replace the placeholder values in `services/firebase.ts` with configuration from your own Firebase project if you intend to use the Firebase services.

Configure authentication and Firestore security rules appropriately before using real accounts or user data.

## Technical Concepts Demonstrated

- React functional components and Hooks
- TypeScript type definitions
- Asynchronous API requests
- Device permissions and location services
- Platform-specific implementations
- Navigation using Expo Router
- Local session persistence
- Error and loading state management
- Integration of third-party services

## Current Limitations

- Login uses demonstration credentials rather than Firebase Authentication
- QR scanning and photo capture are not implemented
- The camera preview is available on web, with a mobile fallback
- Firebase integration requires configuration
- Map behavior varies between platforms
- Weather API credentials are referenced in client-side code

## Future Improvements

- Implement production authentication
- Move sensitive API requests to a backend
- Add native camera capture and QR scanning
- Improve cross-platform map support
- Add automated tests
- Expand Firebase integration

## Author

**Sergey Onoprichuk**

Web Development Graduate | Cybersecurity Student

[GitHub Profile](https://github.com/OnoprichukSergey-FS)
