import { Component, OnInit } from '@angular/core';
import {Producto} from '../../models/producto';
import {ProductService} from './../../services/product.service';
import {NgForm} from '@angular/forms/src/directives/ng_form';
import {map} from 'rxjs/operators';
import {AuthService} from '../../services/auth.service';
import {finalize} from 'rxjs/operators';
import {Observable} from 'rxjs';
import {ComprasService} from '../../services/compras.service';
import {ProductoPedido} from '../../models/producto-pedido';
import {Usuario} from '../../models/usuario';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {
  productos: Producto [];
  usuarios: Usuario [];
  productoToEdit: Producto ;
  editState: any = false;
  userId: string;
  userUid: string;
  Busquedad: string;
  productoPedido: ProductoPedido = {
  nombre: '',
  ing1: 'Ninguno',
  ing2: 'Ninguno',
  cantidad: 1 ,
  isEntregado: false,
  id : '' ,
  urlImg: '',
  precio: 0,
  iva: 0,
  precioTotal: 0
  } ;
  constructor(public productoService: ProductService , public authService: AuthService, public comprasService: ComprasService) {

   }
  ngOnInit() {
  this.getProduct();
  this.authService.getUsuarios().subscribe( usuarios => {
    this.usuarios = usuarios;
    this.userId = this.authService.afAuth.auth.currentUser.uid;
    this.usuarios.forEach(element => {
      if ((element.uid === this.userId)) {
         this.userUid = element.id;
  }  }
  );
 }) ;
}

   getProduct() {
    this.productoService.getProductos().subscribe( productos => {
     this.productos = productos;
     });
  }
   getProductoFilterCategory(categoria: string) {
    this.productoService.getProductoFilterCategory(categoria).subscribe( productos => {
      this.productos = productos;
      });
   }
   getProductoFilterNombre() {
     console.log(this.Busquedad);
     this.productoService.getProductoFilterName(this.Busquedad).subscribe( productos => {
      this.productos = productos;
      });
   }
  editProducto( event, producto: Producto) {
    this.editState = true;
    this.productoToEdit = producto;
   console.log( this.productoPedido.ing1);
   console.log ( this.productoPedido.ing2);
    }
    clearState() {
      this.editState = false;
       this.productoToEdit = null;
     }
     clearStatex() {
      this.editState = false;
       this.productoToEdit = null;
      this.productoPedido.ing1 = 'Ninguno';
      this.productoPedido.ing2 = 'Ninguno';
      this.productoPedido.cantidad = 1;
     }
  saveProduct(myForm: NgForm) {
    this.productoPedido.id = this.productoToEdit.id;
    this.productoPedido.nombre = this.productoToEdit.nombre;
    this.productoPedido.urlImg = this.productoToEdit.img;
    this.productoPedido.precio = this.productoToEdit.precio;
    this.productoPedido.precioTotal = this.productoToEdit.precioTotal;
    this.productoPedido.iva = this.productoToEdit.iva ;
    this.productoPedido.option1 = this.productoToEdit.ing1;
    this.productoPedido.option2 = this.productoToEdit.ing2;
    this.productoPedido.option3 = this.productoToEdit.ing3;
  this.comprasService.agregarProductoCarrito(this.productoPedido, this.userUid);
  this.productoPedido.ing1 = 'Ninguno';
      this.productoPedido.ing2 = 'Ninguno';
      this.productoPedido.cantidad = 1;
        this.clearStatex();
  }
}
