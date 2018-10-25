import { Component, OnInit } from '@angular/core';
import {AuthService} from '../../services/auth.service';
@Component({
  selector: 'app-navegacion',
  templateUrl: './navegacion.component.html',
  styleUrls: ['./navegacion.component.css']
})
export class NavegacionComponent implements OnInit {
 public userName: string;
 public userId: string;
 public isLogin: string;
 public userPicture: string;
  constructor(
    private authService: AuthService
  ) { }

  ngOnInit() {
  }
  onLogout() {
    this.authService.logout();
  }
  onComprobaruserLogin() {
 this.authService.getAuth().subscribe( auth => {
   if (auth) {
     console.log(auth);
   }
 });
  }
}
