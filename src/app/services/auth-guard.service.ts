import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { Router } from '@angular/router';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireAuth } from '@angular/fire/auth';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {

  constructor(private router: Router,
              public fireAuthModule: AngularFireAuth,) { }

  canActivate(): Observable<boolean> | Promise<boolean> | boolean{
    return new Promise(
      (resolve,reject)=>{
        this.fireAuthModule.onAuthStateChanged(
          (user)=>{
            if(user){
              resolve(true);
            } else {
              this.router.navigate(['/auth','signin']);
              resolve(false);
            }
          }
        );
      }
    );
  }
}
