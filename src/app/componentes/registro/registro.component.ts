import { Component, OnInit } from '@angular/core';
import {AuthService} from '../../services/auth.service';
import { Router} from '@angular/Router';
@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit {
   public email: string;
   public password: string;
   public router: Router;
  constructor(public authService: AuthService) { }

  ngOnInit() {
  }
  onSubmitAddUser() {
    this.authService.registerUser(this.email, this.password)
    .then ((res) => {this.router.navigate(['/menu']) ;
    console.log(res);
  } ).catch((err) => {
    console.log(err);
  });

  }


}
