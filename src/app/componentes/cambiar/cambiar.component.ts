import { Component, OnInit } from '@angular/core';
import {AuthService} from './../../services/auth.service';
import {FlashMessagesService} from 'angular2-flash-messages';
import {Usuario} from './../../models/usuario';
import { timeout } from 'rxjs/operators';
import {Observable} from 'rxjs' ;
import {AngularFireStorage} from 'angularfire2/storage';
import {finalize} from 'rxjs/operators';
@Component({
  selector: 'app-cambiar',
  templateUrl: './cambiar.component.html',
  styleUrls: ['./cambiar.component.css']
})
export class CambiarComponent implements OnInit {
  public newPassword: string;
  public newPassword2: string;
  public oldPassword: string;
  public imgUrl = '';
  public userName = '';
  public userUid: string;
  uploadProgress: Observable<number>;
 uploadURL: Observable <string>;
  userIdImg: string;
  Usuario: Usuario = {
 userName : '',
 urlImg : '',

  } ;
  constructor(private _storage: AngularFireStorage,
    public authService: AuthService , public flashMessage: FlashMessagesService) { }

  ngOnInit() {
    this.getUser();
  }
   getUser() {
    this.authService.getUsuarios().subscribe( usuarios => {
      const userId = this.authService.afAuth.auth.currentUser.uid;
      usuarios.forEach(element => {
        if ((element.uid === userId)) {
           this.Usuario = element;
           this.userUid = element.id;
           this.userName = element.userName;
           this.imgUrl = element.urlImg;
    } }
    );
   });

   }
   actualizaUser() {
      this.Usuario.userName = this.userName ;
      if (this.imgUrl !== '' && this.Usuario.urlImg !== null) {
        this.Usuario.urlImg = this.imgUrl;
        const filepath = `images/${this.Usuario.idImg}`;
        const fileRef = this._storage.ref(filepath);
        this.Usuario.idImg = this.userIdImg;
        fileRef.delete();
        this.authService.updateUser(this.Usuario);
      } else {
        this.Usuario.urlImg = this.imgUrl;
        this.Usuario.idImg = this.userIdImg;
        this.authService.updateUser(this.Usuario);
      }

   }

   upload(event) {
    // obtiene el input file
  const file: File = event.target.files[0];
   const randomId = Math.random().toString(36).substring(2);
   const filepath = `images/${randomId}`;
   const fileRef = this._storage.ref(filepath);
   // Upload image
   const task = this._storage.upload(filepath, file);

   this.uploadProgress = task.percentageChanges();

   task.snapshotChanges().pipe (finalize( () => {
     this.uploadURL = fileRef.getDownloadURL();
    this.uploadURL.subscribe (
      url => {
       this.userIdImg = randomId;
       this.imgUrl = url;
       console.log(url);
    });
   }) // {{ downloadURL | async }})
   ).subscribe();
 }
   onSubmitChange() {
    const User = this.authService.afAuth.auth.currentUser;
     this.authService.loginEmail(User.email, this.oldPassword).then(sucess => {
     if (this.newPassword === this.newPassword2) {
      this.flashMessage.show('Has cambiado la clave correctamente', {cssClass: 'alert-success', timeout: 4000});
     User.updatePassword(this.newPassword);
     } else {
      this.flashMessage.show('Ha ocurrido un error, confirme bien', {cssClass: 'alert-warning', timeout: 4000});
     }


     }).catch(error => {
      this.flashMessage.show('Ha ocurrido un error, ingrese su contrasena actual bien', {cssClass: 'alert-warning', timeout: 4000});
     }) ;

    // const cred = this.authService.afAuth.auth.Crede

}
}
