import { Component, OnInit } from '@angular/core';
import {AuthService} from '../../services/auth.service';
import { Router } from '@angular/router';
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
    public router: Router
  ) {

   }
  ngOnInit() {
  }
  onSubmitLogin() {
 this.authService.loginEmail(this.email, this.password)
 .then ((res) => {
   this.router.navigate(['/menu']);
 }).catch((err)=> {
   console.log(err);
   this.router.navigate (['/principal']);
 });

  }
  onClickGoogleLogin() {
    this.authService.loginGoogle().then( (res) => {
       this.router.navigate(['/menu']);
   }).catch(err => console.log( err.message));
  }
}
