// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB-fhTdzoXp4MuI32zqqYZudtu4xsaLH8Y",
  authDomain: "chatwebsite-21ae4.firebaseapp.com",
  projectId: "chatwebsite-21ae4",
  storageBucket: "chatwebsite-21ae4.appspot.com",
  messagingSenderId: "571948723583",
  appId: "1:571948723583:web:113648d1ddd6f0c9523e4a",
  measurementId: "G-6MS8XY55K6"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// initialize database
const db = firebase.database();

// get user's data
const username = prompt("Enter your name:");

// submit form
// listen for submit event on the form and call the postChat function
document.getElementById("message-form").addEventListener("submit", sendMessage);

// send message to db
function sendMessage(e) {
  e.preventDefault();

  // get values to be submitted
  const timestamp = Date.now();
  const messageInput = document.getElementById("message-input");
  const message = messageInput.value;

  // clear the input box
  messageInput.value = "";

  //auto scroll to bottom
  document
    .getElementById("messages")
    .scrollIntoView({ behavior: "smooth", block: "end", inline: "nearest" });

  // create db collection and send in the data
  db.ref("messages/" + timestamp).set({
    username,
    message,
  });
}

// display the messages
// reference the collection created earlier
const fetchChat = db.ref("messages/");

// check for new messages using the onChildAdded event listener
fetchChat.on("child_added", function (snapshot) {
  const messages = snapshot.val();
  const message = `<li class=${
    username === messages.username ? "sent" : "receive"
  }><span>${messages.username}: </span>${messages.message}</li>`;
  // append the message on the page
  document.getElementById("messages").innerHTML += message;
});


