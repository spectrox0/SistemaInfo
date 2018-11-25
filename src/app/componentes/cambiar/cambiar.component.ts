import { Component, OnInit } from '@angular/core';
import {AuthService} from './../../services/auth.service';
import {FlashMessagesService} from 'angular2-flash-messages';
import { timeout } from 'rxjs/operators';
@Component({
  selector: 'app-cambiar',
  templateUrl: './cambiar.component.html',
  styleUrls: ['./cambiar.component.css']
})
export class CambiarComponent implements OnInit {
  public newPassword: string;
  public newPassword2: string;
  public oldPassword: string;
  public imgUrl: string;
  public userName: string;
  constructor(public authService: AuthService , public flashMessage: FlashMessagesService) { }

  ngOnInit() {
    this.getUser();
  }
   getUser() {


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
