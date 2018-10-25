import { Component, OnInit } from '@angular/core';
import {AuthService} from '../../services/auth.service';
import {Usuario} from '../../models/usuario';
import { Router } from '@angular/router';
@Component({
  selector: 'app-navegacion',
  templateUrl: './navegacion.component.html',
  styleUrls: ['./navegacion.component.css']
})
export class NavegacionComponent implements OnInit {
 public userName: string;
 public userId: string;
 public userEmail: string;
 public isLogin: boolean;
 public isAdmin: boolean;
 public userPicture: string;
 private router: Router;
  constructor(
    private authService: AuthService
  ) { }
  public usuarios: Usuario [];

  ngOnInit() {
    this.onComprobaruserLogin();
    this.authService.getUsuarios().subscribe( usuarios => {
      this.usuarios = usuarios;
      this.usuarios.forEach(element => {
        if (element.uid === this.userId) {
          this.isAdmin = true;
        }
      });
    });
  }
  onLogout() {
    this.authService.logout();
  }
  onComprobaruserLogin() {
 this.authService.getAuth().subscribe( auth => {
   if (auth) {
     this.isLogin = true;
     this.isAdmin = false;
     this.userName = auth.displayName;
     this.userId = auth.uid;
     this.userEmail = auth.email;
     this.userPicture = auth.photoURL;
   } else {
     this.isLogin = false;
   }

 });
  }
}
