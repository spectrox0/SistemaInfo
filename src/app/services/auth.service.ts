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

    }
    getUsuarios() {
      this.usuarios = this.usuariosCollection.snapshotChanges(). pipe (
        map (actions => {
         return actions.map(a => {
    const data = a.payload.doc.data() as Usuario;
     data.id = a.payload.doc.id;
    return data;
        });
        }) );
   return this.usuarios;
       }
       getIdUser() {
        const id = this.afAuth.auth.currentUser.uid;

       }

       updateUser(user: Usuario) {
        this.usuarioDoc = this.afs.doc(`usuarios/${user.id}`);
    this.usuarioDoc.update(user);

       }
    loginGoogle() {
       return this.afAuth.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider());
    }
    loginFacebook () {
      return this.afAuth.auth.signInWithPopup(new firebase.auth.FacebookAuthProvider());
    }
    // LoginTwitter() {
    //   return this.afAuth.auth.signInWithPopup (new firebase.auth.TwitterAuthProvider());
   //  }
    getAuth() {
       return this.afAuth.authState.pipe(map(auth => auth));

    }
    recoverPass(email: string) {
    return this.afAuth.auth.sendPasswordResetEmail(email);
    }
    logout() {
      return this.afAuth.auth.signOut();
    }

    registerUser(email: string , pass: string, usuario: Usuario) {
   return new Promise((resolve, reject) => {
   this.afAuth.auth.createUserWithEmailAndPassword(email, pass)
   .then(userData => { resolve(userData);
     usuario.uid = userData.user.uid;
     this.agregaUsuario(usuario); }
     , err => reject (err)) ;
   });
    }
    agregaUsuario(usuario: Usuario) {
      this.usuariosCollection.add(usuario) ;
    }
    loginEmail(email: string , pass: string) {
      return new Promise((resolve, reject) => {
      this.afAuth.auth.signInWithEmailAndPassword(email, pass)
      .then(userData => resolve(userData), err => reject (err)) ;
      });
       }
}
