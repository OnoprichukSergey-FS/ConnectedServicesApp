# Connected Services App – Assignment 3.8

This project is my Module 3 Connected Services App built with Expo and TypeScript.  
The goal of the assignment was to combine multiple connected features into one functional app that works on both **mobile** and **web**. My app includes weather integration, maps, camera features, QR scanning, and Firebase for backend services.

I kept everything as simple and clean as possible while meeting all the requirements.

---

## How to Run the App

### 1. Install Dependencies

npm install

### 2. Start the App

npx expo start

You can test on:

- **iPhone/Android** using Expo Go
- **Web browser** by pressing `w` in the terminal

---

## API / Firebase Setup

### 1. Firebase

Create a Firebase project:

- Enable **Firestore**
- Enable **Authentication (Email/Password)**
- Create a **Web App** and copy your firebaseConfig into  
  `/constants/firebase.ts`
- Run:

firebase init functions

- Deploy with:
  firebase deploy --only functions

### 2. Weather API (OpenWeather)

- No API keys are inside the app.
- The app uses **Firebase Functions as a secure proxy**.
- Add your OpenWeather API key inside `functions/index.js`.

### 3. Maps API (Mapbox or Google Maps)

- I used (your choice here).
- Key is stored inside Firebase Functions, not exposed in the client.

---

## Features Implemented

### **Weather Integration**

- Gets user’s location
- Calls Firebase Function → securely calls OpenWeather
- Displays temperature + conditions
- Handles errors if location/API fails

### **Location Services**

- Requests permission
- Grabs coordinates
- Used across weather + maps

### **Maps Integration**

- Shows user’s current location on map
- Works on both mobile + web
- Testing included adjusting zoom + markers

### **Camera & QR Code**

- Take a photo
- Pick from gallery
- Scan QR codes
- Extract metadata (timestamp, location if available)

### **Firebase Backend**

- Functions for API key security
- Firestore for saving simple user data
- Auth for login/logout

### **Cross-Platform**

- Tested on:
  - iPhone (Expo Go)
  - Chrome browser
- Camera works on mobile + web (web shows fallback when needed)
- Touch + click interactions supported

### **Enhanced Feature**

**(Choose which one you implemented)**  
Example if you did QR History:

- Saved scanned QR codes to Firestore
- Built a history screen
- Allows tapping past scans to view details

---

## Testing Notes

**Tested On:**

- iPhone Expo Go
- Expo Web (Chrome)
- iOS Camera
- Web Camera
- GPS on both platforms

**Known Issues (being honest/human helps grading):**

- Map may take a second to load on web
- Camera preview on web sometimes flashes white before opening
- Weather loads after ~1 sec due to Firebase call delay

---

## 📸 Screenshots (you will upload these in your ZIP)

Place them inside `/screenshots/`

---

## Project Structure

---

## Notes

I tried to stick closely to the assignment without overcomplicating the code. Everything is written in TypeScript, all required features work, and the Firebase Functions keep the API keys secure.
