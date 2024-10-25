Prerequisites
•	Android Studio for Android development
•	Visual Studio Code as the code editor
•	Node.js and npm installed
•	MongoDB access with the correct network settings
•	Expo CLI installed globally
•	Expo Go installed on your phone
•	Java Development Kit (JDK) version 17 installed

Setup Instructions

1.	Clone the Repository
Clone the LocaLearn project from the GitHub repository:
https://github.com/BismaShuja21/LocaLearn.git

2.	Install Dependencies
Navigate to the project folder in vs code and install the required dependencies using command :
npm install
3.	Set MongoDB Access
Log in to MongoDB using the following credentials:
Email : sanamaryam6677@gmail.com
Password: LocaLearn90.
Then, go to Network Access and add your current IP address to the whitelist.

4.	Update IP Address in the Code
Open a command prompt and type the following command:
ipconfig
Copy your IP address, open the project in VS Code, and search for `10.57.16.248`. Replace it with your current IP address wherever needed.

5.	Running the Frontend
To start the frontend, use the following command:
npx expo start
6. Run on a Physical Device (Using QR Code):
a.	After starting the frontend server with npx expo start, a QR code will be generated in the terminal.
b.	Open the Expo Go app on your physical device and scan the QR code displayed in your terminal.
c.	This will launch the project on your mobile device.
7.	Run on an Android Emulator:
a.	If you have an Android emulator set up, press a in the terminal where npx expo start is running.
b.	This will open the app on your Android emulator.

8.	Running the Backend
Navigate to the backend folder and run the backend server:
cd backend && npx nodemon server



