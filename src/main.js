import Vue from 'vue'
import App from './App.vue'
import router from './routes/routes'
import store from "./store/store";
import firebase from 'firebase'

Vue.config.productionTip = false
const firebaseConfig = {
  apiKey: "AIzaSyDD6PmhhkM3EWRQZ8AETpjA3vnI9ujVII8",
  authDomain: "test-project-19b76.firebaseapp.com",
  databaseURL: "https://test-project-19b76.firebaseio.com",
  projectId: "test-project-19b76",
  storageBucket: "test-project-19b76.appspot.com",
  messagingSenderId: "994001376320",
  appId: "1:994001376320:web:eed54945a8ac6f4744fba5"
};

firebase.initializeApp(firebaseConfig)

firebase.auth().onAuthStateChanged(user => {
  store.dispatch("fetchUser", user);
});

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
