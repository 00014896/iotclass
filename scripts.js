// Firebase Configuration
const firebaseConfig = {
    apiKey: "AIzaSyA-gHX_f7ceXeAtNlYzx2NxT6FX3f0MeUg",
    authDomain: "iot-class-d0023.firebaseapp.com",
    databaseURL: "https://iot-class-d0023-default-rtdb.firebaseio.com",
    projectId: "iot-class-d0023",
    storageBucket: "iot-class-d0023.firebasestorage.app",
    messagingSenderId: "946304989097",
    appId: "1:946304989097:web:9510d26e2b8f33485876b8",
    measurementId: "G-PSC0PT94N3"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const database = firebase.database();

// Reference to the SensorData node in Firebase
const sensorDataRef = database.ref('SensorData');
const ledControlRef = database.ref('LEDControl');  // Reference to top-level LEDControl node

// Fetch and Update Humidity Data
sensorDataRef.child('Humidity').on('value', (snapshot) => {
    const humidity = snapshot.val();
    document.getElementById('humidity').innerHTML = `Humidity: ${humidity}%`;
});

// Fetch and Update Temperature Data
sensorDataRef.child('Temperature').on('value', (snapshot) => {
    const temperature = snapshot.val();
    document.getElementById('temperature').innerHTML = `Temperature: ${temperature}&#8451;`;
});

// Fetch and Update LED State
ledControlRef.on('value', (snapshot) => {
    const ledState = snapshot.val();
    document.getElementById('led').innerHTML = ledState ? "Turn Off" : "Turn On";
});

// LED Button Control Function
function press() {
    // Retrieve current LED state and toggle it
    ledControlRef.once('value', (snapshot) => {
        const currentState = snapshot.val();
        ledControlRef.set(!currentState);  // Toggle the boolean value
        document.getElementById('led').innerHTML = currentState ? "Turn On" : "Turn Off";
    });
}
