
# LocaLearn

LocaLearn is a mobile application designed for connecting students and tutors. This README provides the setup instructions and prerequisites needed to get the app running in both development and production environments.

---

## Prerequisites

Before starting, ensure that you have the following software and services set up:

- **Android Studio**: Required for Android development and emulation.
- **Visual Studio Code**: Recommended code editor.
- **Node.js and npm**: Ensure Node.js (latest stable version) and npm are installed.
- **MongoDB**: Ensure access with network settings configured (instructions below).
- **Expo CLI**: Install globally to manage the frontend.
- **Expo Go**: Install on your mobile device for physical testing.
- **Java Development Kit (JDK) version 17**: Required for Android Studio integration.

---

## Setup Instructions

### 1. Clone the Repository

Clone the LocaLearn project from the GitHub repository:

```bash
git clone https://github.com/BismaShuja21/LocaLearn.git
```

### 2. Install Dependencies

Navigate to the project folder in Visual Studio Code and install the required dependencies:

```bash
npm install
```

### 3. Set MongoDB Access

1. Log in to [MongoDB Atlas](https://cloud.mongodb.com/) with the following credentials:
   - **Email**: sanamaryam6677@gmail.com
   - **Password**: LocaLearn90.
2. Go to **Network Access** in MongoDB Atlas.
3. Add your current IP address to the whitelist.

### 4. Update IP Address in the Code

1. Open a command prompt and enter:

   ```bash
   ipconfig
   ```

2. Copy your IP address.
3. Open the project in Visual Studio Code.
4. Search for `10.57.17.49` in the code and replace it with your current IP address.

### 5. Running the Frontend

Start the frontend with the following command:

```bash
npx expo start
```

---

## Running the Project on a Device or Emulator

### Option A: Run on a Physical Device (Using QR Code)

1. After starting the frontend server with `npx expo start`, a QR code will appear in the terminal.
2. Open the **Expo Go** app on your mobile device and scan the QR code.
3. This will launch the project on your physical device.

### Option B: Run on an Android Emulator

1. Ensure an Android emulator is set up and running.
2. Press `a` in the terminal where `npx expo start` is active.
3. The app will open in the Android emulator.

---

## Running the Backend

Navigate to the backend folder and start the server:

```bash
cd backend && npx nodemon server
```

---

