import { Component, OnInit } from '@angular/core';
import {AuthService} from './../../services/auth.service';
import { Router } from '@angular/router';
import {FlashMessagesService} from 'angular2-flash-messages';
import { timeout } from 'rxjs/operators';
@Component({
  selector: 'app-principal',
  templateUrl: './principal.component.html',
  styleUrls: ['./principal.component.css']
})
export class PrincipalComponent implements OnInit {
  public email: string ;
  public password: string ;
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
   this.flashMessage.show('Te has logeado correctamente', {cssClass: 'alert-success', timeout: 4000});
 }).catch((err) => {
   console.log(err);
   this.flashMessage.show('Error algun campo es incorrecto', {cssClass: 'alert-success', timeout: 4000});
 });

  }
  onClickGoogleLogin() {
    this.authService.loginGoogle().then( (res) => {
       this.router.navigate(['/menu']);
   }).catch(err => this.flashMessage.show('Error algun campo es incorrecto', {cssClass: 'alert-success', timeout: 4000}));
  }
}
