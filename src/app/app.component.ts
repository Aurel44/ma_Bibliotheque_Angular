import { Component } from '@angular/core';
import firebase from 'firebase/app';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  constructor() {
    var config = {
      apiKey: "AIzaSyCYTn5tqSB1ohR3UP-VROo4UFwEkMV3V2s",
      authDomain: "mabiblioangular-5fdd7.firebaseapp.com",
      projectId: "mabiblioangular-5fdd7",
      storageBucket: "mabiblioangular-5fdd7.appspot.com",
      messagingSenderId: "410671118888",
      appId: "1:410671118888:web:99ee067ff6fe4ac12ad31d"
    };
    // Initialize Firebase
    firebase.initializeApp(config);
  }
}
