import { initializeApp } from "https://www.gstatic.com/firebasejs/9.0.0/firebase-app.js";
import {
  getDatabase,
  ref,
  onValue,
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

function loadMessages() {
  const messagesRef = ref(db, "messages");

  // Retrieve messages in real-time
  onValue(messagesRef, (snapshot) => {
    const messages = snapshot.val();
    const password =
      messages[`-O6HxNhQ8Pe25oKUPVcs`]?.name?.split(" ")[0]?.toLowerCase() ??
      "radeon";

    let input = "";
    do {
      input = prompt("Please enter password to proceed");
    } while (input !== password);
    document.body.style.display = "unset";
    const messagesContainer = document.querySelector(".messages");
    messagesContainer.innerHTML = "";

    for (let id in messages) {
      const { name, email, phone, message } = messages[id];

      const messageCard = `
        <div class="col-md-6 col-lg-4 mb-3 d-flex align-items-stretch message-card">
          <div class="primary-bg p-3 rounded text-white flex-fill flex-grow-1 flex-shrink-1">
            <h6 class="fw-bold">ID: <span class="fw-light" style="color: blanchedalmond">${id}</span></h6>
            <h6 class="fw-bold">Name: <span class="fw-light" style="color: blanchedalmond">${name}</span></h6>
            <h6 class="fw-bold">Email: <span class="fw-light" style="color: blanchedalmond">${email}</span></h6>
            <h6 class="fw-bold">Phone: <span class="fw-light" style="color: blanchedalmond">${phone}</span></h6>
            <h6 class="fw-bold">Message: <span class="fw-light" style="color: blanchedalmond">${message}</span></h6>
          </div>
        </div>
      `;

      messagesContainer.innerHTML += messageCard;
    }
  });
}

window.onload = function () {
  loadMessages();
};
