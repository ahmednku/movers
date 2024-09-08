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

document.querySelector("form").addEventListener("submit", async function (e) {
  e.preventDefault();

  const name = document.getElementById("name");
  const email = document.getElementById("email");
  const phone = document.getElementById("phone");
  const message = document.getElementById("message");

  const formData = {
    name: name?.value ?? "",
    email: email?.value ?? "",
    phone: phone?.value ?? "",
    message: message?.value ?? "",
  };

  showLoader();

  try {
    await push(ref(db, "messages"), formData);
    hideLoader();
    name.value = "";
    email.value = "";
    if (phone) phone.value = "";
    message.value = "";

    let timerInterval;
    await Swal.fire({
      title: "Message sent",
      html: "",
      timer: 2000,
      timerProgressBar: true,
      didOpen: () => {
        // Swal.showLoading();
        timerInterval = setInterval(() => {}, 100);
      },
      willClose: () => {
        clearInterval(timerInterval);
      },
    }).then((result) => {});
  } catch (error) {
    hideLoader();
    console.error("Error writing to database", error);
  }
});
