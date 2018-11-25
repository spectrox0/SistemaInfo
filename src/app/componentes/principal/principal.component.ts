import { Component, OnInit } from '@angular/core';
import {AuthService} from './../../services/auth.service';
import { Router } from '@angular/router';
import {FlashMessagesService} from 'angular2-flash-messages';
import { timeout } from 'rxjs/operators';
import {Usuario} from '../../models/usuario';
@Component({
  selector: 'app-principal',
  templateUrl: './principal.component.html',
  styleUrls: ['./principal.component.css']
})
export class PrincipalComponent implements OnInit {
  public email: string ;
  public password: string ;
  public usuario: Usuario = {
   userName : '' ,
   isAdmin : false ,
  } ;
  constructor(
    public authService: AuthService,
    public router: Router,
    public flashMessage: FlashMessagesService
) { }
  ngOnInit() {
  }
  onSubmitLogin() {
 this.authService.loginEmail(this.email, this.password)
 .then ((res) => {
   this.router.navigate(['/menu']);
   this.flashMessage.show('Te has logeado correctamente', {cssClass: 'alert-success', timeout: 8000});
 }).catch((err) => {
   console.log(err);
   this.flashMessage.show('Error algun campo es incorrecto', {cssClass: 'alert-warning', timeout: 4000});
 });

  }
  onClickGoogleLogin() {
    this.authService.loginGoogle().then( (res) => {
        if (res.additionalUserInfo.isNewUser) {
      this.usuario.uid = res.user.uid;
      this.usuario.userName = res.user.displayName;
      this.authService.agregaUsuario(this.usuario);
        } else { }
       this.flashMessage.show('Te has logeado correctamente', {cssClass: 'alert-success', timeout: 8000});
       this.router.navigate(['/menu']);
   }).catch(err => this.flashMessage.show('Error algun campo es incorrecto', {cssClass: 'alert-warning', timeout: 8000}));
  }
  onClickFacebookLogin() {
    this.authService.loginFacebook().then( (res) => {
      console.log('entra aca');
      if (res.additionalUserInfo.isNewUser) {
    this.usuario.uid = res.user.uid;
    this.usuario.userName = res.user.displayName;
    this.authService.agregaUsuario(this.usuario);
      } else { }
     this.flashMessage.show('Te has logeado correctamente', {cssClass: 'alert-success', timeout: 8000});
     this.router.navigate(['/menu']);
 }).catch(err => this.flashMessage.show('Error algun campo es incorrecto', {cssClass: 'alert-warning', timeout: 8000}));

  }
  recoverPass() {
     this.authService.recoverPass(this.email).then(() =>
      this.flashMessage.show('Se va enviado un correo de recuperacion', {cssClass: 'alert-success', timeout: 8000}))
     .catch((error) => this.flashMessage.show('Error algun campo es incorrecto', {cssClass: 'alert-warning', timeout: 8000}));
    //  $('#myModal').modal('hide');
  }
}
