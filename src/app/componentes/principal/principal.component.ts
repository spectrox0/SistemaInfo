import { Component, OnInit } from '@angular/core';
import {AuthService} from '../../services/auth.service';
@Component({
  selector: 'app-principal',
  templateUrl: './principal.component.html',
  styleUrls: ['./principal.component.css']
})
export class PrincipalComponent implements OnInit {

  constructor(
    private authService: AuthService
  ) {

   }

  ngOnInit() {
  }
  onClickGoogleLogin() {
    // this.authService.loginGoogle().then.( res => {
      // console.log(res);
   // }).catch(err => console.log( err.message));
  }
}
