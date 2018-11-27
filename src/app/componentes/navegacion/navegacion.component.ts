import { Component, OnInit } from '@angular/core';
import {AuthService} from './../../services/auth.service';
import {Usuario} from '../../models/usuario';
import {ProductService} from './../../services/product.service';
@Component({
  selector: 'app-navegacion',
  templateUrl: './navegacion.component.html',
  styleUrls: ['./navegacion.component.css']
})
export class NavegacionComponent implements OnInit {
  constructor(  public authService: AuthService ) { }

 public userName: string;
 public userId: string;
 public userEmail: string;
 public isLogin = false;
 public isAdmin = false;
 public isExtern = false;
 public userPicture: string;
  public usuarios: Usuario [];

  ngOnInit() {
    this.onComprobaruserLogin();
  }
  onLogout(): void {
    this.authService.logout();
  }

  onComprobaruserLogin(): void {
 this.authService.getAuth().subscribe( auth => {
   if (auth) {
     this.isLogin = true;
     this.userEmail =  auth.email;
     this.userId = auth.uid;
     this.userPicture = auth.photoURL;
     this.authService.getUsuarios().subscribe( usuarios => {
      this.usuarios = usuarios;
      this.usuarios.forEach(element => {
        if ((element.uid === this.userId)) {
          if (element.isAdmin) {
          this.isAdmin = true; }
          this.userName = element.userName;
          this.isExtern = element.isExtern;
        }
      });
    });
    }
    }

 );
  }
}
