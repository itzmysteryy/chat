// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB5j64Arok6XGkQqR8ewNPIj2ilRqcq2SE",
  authDomain: "chatarcc.firebaseapp.com",
  projectId: "chatarcc",
  storageBucket: "chatarcc.appspot.com",
  messagingSenderId: "966540036468",
  appId: "1:966540036468:web:a54f264e76a1f7246e8421",
  measurementId: "G-GEB1V9EZEE"
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


