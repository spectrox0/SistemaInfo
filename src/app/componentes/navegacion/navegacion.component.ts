import { Component, OnInit } from '@angular/core';
import {AuthService} from './../../services/auth.service';
import {Usuario} from '../../models/usuario';
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
 public isLogin: boolean = false;
 public isAdmin: boolean = false;
 public userPicture: string;
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
  onLogout(): void {
    this.authService.logout();
  }

  onComprobaruserLogin(): void {
 this.authService.getAuth().subscribe( auth => {
   if (auth) {
     this.isLogin = true;
     this.userName = auth.displayName;
     this.userId = auth.uid;
     this.userEmail = auth.email;
     this.userPicture = auth.photoURL;
    }
    }

 );
  }
}
