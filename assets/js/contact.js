import { initializeApp } from "https://www.gstatic.com/firebasejs/9.0.0/firebase-app.js";
import {
  getDatabase,
  ref,
  push,
} from "https://www.gstatic.com/firebasejs/9.0.0/firebase-database.js";

const firebaseConfig = {
  apiKey: "AIzaSyAxQ44fCHL83TRx0lbB3lI325lJadq9NIM",
  authDomain: "movers-8f792.firebaseapp.com",
  databaseURL: "https://movers-8f792-default-rtdb.firebaseio.com",
  projectId: "movers-8f792",
  storageBucket: "movers-8f792.appspot.com",
  messagingSenderId: "161580451488",
  appId: "1:161580451488:web:a209580246fb8a097c6bc5",
};

const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

document.querySelector("form").addEventListener("submit", function (e) {
  e.preventDefault();

  const name = document.getElementById("name").value;
  const email = document.getElementById("email").value;
  const phone = document.getElementById("phone").value;
  const message = document.getElementById("message").value;

  // Save to Firebase
  push(ref(db, "messages"), {
    name: name,
    email: email,
    phone: phone,
    message: message,
  })
    .then(() => {
      alert("Message sent and stored successfully!");
      name = email = phone = message = "";
    })
    .catch((error) => {
      console.error("Error writing to database", error);
    });
});
