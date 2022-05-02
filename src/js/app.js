// Import Vue
import Vue from 'vue';

// Import Framework7
import Framework7 from 'framework7/framework7-lite.esm.bundle.js';

// Import Framework7-Vue Plugin
import Framework7Vue from 'framework7-vue/framework7-vue.esm.bundle.js';

// Import Framework7 Styles
import 'framework7/css/framework7.bundle.css';

// Import Icons and App Custom Styles
import '../css/default.scss';

// Import App Component
import App from '../components/app.vue';

// Import Firebase
import firebase from "firebase/app";

//Import Plugins Default
import '@/axios/axios';
import store from '@/store/store';

// Init Framework7-Vue Plugin
Framework7.use(Framework7Vue);

// CONFIG FIREBASE
const configOptions = {
  apiKey: "AIzaSyCV2Om9SpdPDbaYTib23vjY-HLl0eh-yXM",
  authDomain: "app-agende-se-salao.firebaseapp.com",
  databaseURL: "https://app-agende-se-salao.firebaseio.com",
  projectId: "app-agende-se-salao",
  storageBucket: "app-agende-se-salao.appspot.com",
  messagingSenderId: "412908086477",
  appId: "1:412908086477:web:e6349e42a3594a568ab584",
  measurementId: "G-YY4TWTYLPE"
};
// INITIALIZE FIREBASE
firebase.initializeApp(configOptions);

firebase.auth().onAuthStateChanged((user) => {
  console.log("User auth status has changed!", user);
  store.dispatch("fetchUser", user);
  // SET TYPE CLIENT OR PROFESSIONAL
  if(user){
    var uid = firebase.auth().currentUser.uid;
    var typeUser;
    var tableUsers = firebase.database().ref("/userClient");
    //RECUPERY DATA DATABASE
    function loadData() {
      return tableUsers.once("value");
    }
    //ANALYZING DATA AFTER CONSULTATION
    loadData().then((list) => {
      list.forEach(function (childList) {
        var data = childList.val();
        if (data.idUser == uid) {
          typeUser = data.typeUser;
        }
      });
      store.dispatch("fecthTypeUser", typeUser);
    });
  } else {
    store.dispatch("fecthTypeUser", null);
  }
});

// FILTERS VUE
Vue.filter('dinheiro', valor => {
	return `R$ ${parseFloat(valor).toFixed(2)}`.replace('.', ',')
})

// Init App
new Vue({
  el: '#app',
  render: (h) => h(App),
  store,
  // Register App Component
  components: {
    app: App
  },
});