import { Component, OnInit } from '@angular/core';
import {Producto} from '../../models/producto';
import {ProductService} from './../../services/product.service';
import {NgForm} from '@angular/forms/src/directives/ng_form';
import {map} from 'rxjs/operators';
import {AngularFireStorage} from 'angularfire2/storage';
import {finalize} from 'rxjs/operators';
import {Observable} from 'rxjs';
@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})

export class MenuComponent implements OnInit {
  productos: Producto [];
  profileUrl: Observable<string | null>;
  constructor(public productoService: ProductService, public storage: AngularFireStorage) {

   }
  ngOnInit() {
    this.productoService.getProductos().subscribe(productos => {
     this.getProduct(productos);
    });
  }
  getProduct(data) {
   this.productos =  data;

  }

}
