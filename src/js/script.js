import { initializeApp } from "https://www.gstatic.com/firebasejs/10.11.1/firebase-app.js";
import {
  getFirestore,
  doc,
  getDoc,
} from "https://www.gstatic.com/firebasejs/10.11.1/firebase-firestore.js";

// Initialize Firebase
const firebaseConfig = {
  apiKey: "AIzaSyDiVCVKuaI6SfwmMWcrKCCYAmTT_WYvepA",
  authDomain: "tracking-app-8bb20.firebaseapp.com",
  projectId: "tracking-app-8bb20",
  appId: "1:774297816977:web:9b630edb524073568d9430",
};
const app = initializeApp(firebaseConfig);
//TRY LOGGING THIS FIRST TO MAKE SURE JS FILE IS LOADED BY HTML
console.log("fsf");
//auth and firestore references
const db = getFirestore(app);
const params = new URLSearchParams(location.search);
const id = params.get("id");

const docRef = doc(db, "TrackingId", id);
const docSnap = await getDoc(docRef);
console.log(docSnap);
const statusContainer = document.getElementById("statusContainer");

if (docSnap.exists()) {
  docSnap.data().TrackStatus.map((item) => {
    const card = document.createElement("div");
    card.classList.add("card");
    const cardBody = document.createElement("div");
    cardBody.classList.add("card-body");
    const date = document.createElement("span");
    date.classList.add("date");
    date.innerHTML = item.date;
    cardBody.appendChild(date);
    const location = document.createElement("p");
    location.classList.add("location");
    location.innerHTML = `${item.city}, ${item.country}`;
    cardBody.appendChild(location);
    const status = document.createElement("div");
    status.innerHTML = `${docSnap.data().TrackStatus[0].transport} ${
      item.status
    }`;
    cardBody.appendChild(status);
    card.appendChild(cardBody);
    statusContainer.appendChild(card);
  });
} else {
  statusContainer.innerHTML = "Tracking Id Not Found";
}
