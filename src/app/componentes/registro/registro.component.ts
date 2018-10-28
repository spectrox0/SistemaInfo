import { Component, OnInit } from '@angular/core';
import {AuthService} from './../../services/auth.service';
import { Router} from '@angular/router';
import {FlashMessagesService} from 'angular2-flash-messages';
import { timeout } from 'rxjs/operators';
@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit {
   public email: string;
   public password: string;

  constructor(public authService: AuthService,
    public flashMessage: FlashMessagesService,
    public router: Router
     ) { }
  ngOnInit() {
  }
  onSubmitAddUser() {
    this.authService.registerUser(this.email, this.password)
    .then ((res) => {
      this.flashMessage.show('El usuario fue creado correctamente', {cssClass: 'alert-success', timeout: 4000});
      this.router.navigate(['/menu']);
      console.log(res);
  } ).catch((err) => {
    this.flashMessage.show('ha ocurrido un error', { cssClass: 'alert-success', timeout: 4000});
    this.router.navigate(['/principal']);
    console.log(err);
  });

  }


}
