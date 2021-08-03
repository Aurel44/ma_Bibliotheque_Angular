import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(public afs: AngularFirestore,   // Inject Firestore service
              public fireAuthModule: AngularFireAuth, // Inject Firebase auth service
              public router: Router,) { }

  createNewUser(email: string, password: string) {
    return new Promise<void>(
      (resolve, reject) => {
        this.fireAuthModule.createUserWithEmailAndPassword(email, password)
        .then(
          () => {
            resolve();
          },
          (error: any) => {
            reject(error);
          }
        );
      }
    );
  }

  signInUser(email: string, password: string) {
    return new Promise<void> (
      (resolve, reject) => {
        this.fireAuthModule.signInWithEmailAndPassword(email, password)
        .then(
          () => {
            resolve();
          },
          (error: any) => {
            reject(error);
          }
        );
      }
    );
  }

  signOutUser(){
    this.fireAuthModule.signOut();
  }
}

