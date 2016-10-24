import { NgModule } from '@angular/core';
import { AngularFireModule } from 'angularfire2';

export const firebaseConfig = {
  apiKey: 'AIzaSyDdL9uqe8M0K72g2RX481DAzG9KfFVm1qE',
  authDomain: 'pwc-people.firebaseapp.com',
  databaseURL: 'https://pwc-people.firebaseio.com',
  storageBucket: 'pwc-people.appspot.com',
  messagingSenderId: '138770696058'
};

@NgModule({
  imports: [
    AngularFireModule.initializeApp(firebaseConfig)
  ],
  exports: [
    AngularFireModule
  ]
})
export class FirebaseModule {}
