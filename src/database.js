// Initialize Firebase
let config = {
    apiKey: "AIzaSyBbGawQb-iggUU-OYQ-c0kXeHj9mXLfEgk",
    authDomain: "quick-bytes-c7a3c.firebaseapp.com",
    databaseURL: "https://quick-bytes-c7a3c.firebaseio.com",
    projectId: "quick-bytes-c7a3c",
    storageBucket: "quick-bytes-c7a3c.appspot.com",
    messagingSenderId: "210399752495"
};
firebase.initializeApp(config);

//firebase realtime database
console.log(firebase); // verify that firebase is loaded by logging the global it created for us
  
// #1 - get a reference to the databse
let database = firebase.database();

// #2 - refer to a root node named `scores`
let ref = database.ref('searches');

// #3 - create some data
let data = {
    search: ['','','']
};

// #4 - send data, in this case we are adding it to the `scores` node
ref.set(data);