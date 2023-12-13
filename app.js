// Replace with your Firebase configuration
const firebaseConfig = {
    apiKey: "YOUR_API_KEY",
    authDomain: "YOUR_AUTH_DOMAIN",
    projectId: "YOUR_PROJECT_ID",
    storageBucket: "YOUR_STORAGE_BUCKET",
    messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
    appId: "YOUR_APP_ID"
  };
  
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  
  // Reference to the appointments collection in Firebase
  const appointmentsRef = firebase.database().ref('appointments');
  
  // Function to submit an appointment
  function submitAppointment() {
    const studentName = document.getElementById('studentName').value;
    const teacherName = document.getElementById('teacherName').value;
    const date = document.getElementById('date').value;
    const time = document.getElementById('time').value;
  
    // Save the appointment to Firebase
    appointmentsRef.push({
      studentName: studentName,
      teacherName: teacherName,
      date: date,
      time: time
    });
  
    // Clear the form
    document.getElementById('appointmentForm').reset();
  }
  
  // Function to display appointments
  function displayAppointments() {
    const appointmentsDiv = document.getElementById('appointments');
    
    // Listen for changes in the appointments collection
    appointmentsRef.on('value', (snapshot) => {
      appointmentsDiv.innerHTML = '';
  
      // Loop through the appointments and display them
      snapshot.forEach((childSnapshot) => {
        const appointment = childSnapshot.val();
        const appointmentInfo = `${appointment.studentName} with ${appointment.teacherName} on ${appointment.date} at ${appointment.time}`;
        const p = document.createElement('p');
        p.textContent = appointmentInfo;
        appointmentsDiv.appendChild(p);
      });
    });
  }
  
  // Call the displayAppointments function to initially display any existing appointments
  displayAppointments();
  