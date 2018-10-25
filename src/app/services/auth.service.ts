import { Injectable } from '@angular/core';

import {AngularFireAuth} from 'angularfire2/auth';
import * as firebase from 'firebase/app';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private afAuth: AngularFireAuth) {}
    loginGoogle() {
       return this.afAuth.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider());
    }
    loginEmail(){
      //return this.afAuth.auth.signInWithEmailAndPassword(new firebase.auth.EmailAuthProvider());
    }
    getAuth() {
       return this.afAuth.authState.pipe(map(auth => auth));

    }
    logout() {
      return this.afAuth.auth.signOut;
    }
}
