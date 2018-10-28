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
  public password1: string;
  public password2: string;
  constructor(public authService: AuthService) { }

  ngOnInit() {
  }

   onSubmitChange() {

}
}
