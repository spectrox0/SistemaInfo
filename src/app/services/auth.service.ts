import { Injectable } from '@angular/core';

import {AngularFireAuth} from 'angularfire2/auth';
import * as firebase from 'firebase/app';
import {Observable} from 'rxjs';
import {Usuario} from '../models/usuario';
import {AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument} from 'angularfire2/firestore';
import {map} from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  usuariosCollection: AngularFirestoreCollection <Usuario>;
  usuarios: Observable<Usuario[]>;
  usuarioDoc: AngularFirestoreDocument<Usuario>;
  constructor(
    public afAuth: AngularFireAuth , public afs: AngularFirestore) {

      this.usuariosCollection = afs.collection<Usuario>('usuarios');
      this.usuarios = this.usuariosCollection.snapshotChanges(). pipe (
        map (actions => actions.map (a => {
    const data = a.payload.doc.data() as Usuario;
    const id = a.payload.doc.id;
    return {id , ... data};
        }))
      );

    }
    getUsuarios() {
      return this.usuarios;
       }
    loginGoogle() {
       return this.afAuth.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider());
    }
    getAuth() {
       return this.afAuth.authState.pipe(map(auth => auth));

    }
    logout() {
      return this.afAuth.auth.signOut;
    }

    registerUser(email: string , pass: string) {
   return new Promise((resolve, reject) => {
   this.afAuth.auth.createUserWithEmailAndPassword(email, pass)
   .then(userData => resolve(userData), err => reject (err)) ;


   });
    }

    loginEmail(email: string , pass: string) {
      return new Promise((resolve, reject) => {
      this.afAuth.auth.signInWithEmailAndPassword(email, pass)
      .then(userData => resolve(userData), err => reject (err)) ;
      });
       }



}
