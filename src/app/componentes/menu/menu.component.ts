import { Component, OnInit } from '@angular/core';
import {Producto} from '../../models/producto';
import { Subject } from 'rxjs';
import {ProductService} from './../../services/product.service';
import {NgForm} from '@angular/forms/src/directives/ng_form';
import {map} from 'rxjs/operators';
import {AuthService} from '../../services/auth.service';
import {finalize} from 'rxjs/operators';
import {Observable} from 'rxjs';
import {ComprasService} from '../../services/compras.service';
import {ProductoPedido} from '../../models/producto-pedido';
import {Usuario} from '../../models/usuario';
import {combineLatest} from 'rxjs';
import {FlashMessagesService} from 'angular2-flash-messages';
import { timeout } from 'rxjs/operators';
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
  Busquedad = '';
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
  startAt = new Subject ();
  endAt = new Subject ();
  starobs = this.startAt.asObservable();
  endobs = this.endAt.asObservable();

  constructor ( public productoService: ProductService ,
    public authService: AuthService, public comprasService: ComprasService,
    public flashMessage: FlashMessagesService) {

   }

  ngOnInit() {
  this.authService.getUsuarios().subscribe( usuarios => {
    this.usuarios = usuarios;
    this.userId = this.authService.afAuth.auth.currentUser.uid;
    this.usuarios.forEach(element => {
      if ((element.uid === this.userId)) {
         this.userUid = element.id;
  } }
  );
 });
 combineLatest(this.starobs, this.endobs).subscribe((value) => {
this.productoService.firequery( value[0] , value[1] ).subscribe( productos => {
  this.productos = productos;
  }) ;
 }) ;
 this.startAt.next('');
 this.endAt.next('\uf8ff');
}

 // Next() {
 // combineLatest(this.starobs, this.endobs).subscribe((value) => {
 //   this.productoService.firequeryNext( ).subscribe( productos => {
    //  this.productos = productos;
   //   }) ;
   //  }) ;
   //  this.startAt.next('');
   //  this.endAt.next('\uf8ff');

// }
   getProduct() {
    this.productoService.getProductos().subscribe( productos => {
     this.productos = productos;
     });
  }

  search($event) {
    const q = $event.target.value ;
    this.startAt.next(q);
    this.endAt.next(q + '\uf8ff');
  }
   getProductoFilterCategory(categoria: string) {
    this.productoService.getProductoFilterCategory(categoria).subscribe( productos => {
      this.productos = productos;
      });
   }
  editProducto( event, producto: Producto) {
    this.editState = true;
    this.productoToEdit = producto;
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
    this.productoPedido.precioTotal = this.productoPedido.cantidad * this.productoToEdit.precioTotal;
    this.productoPedido.iva = this.productoToEdit.iva ;
    this.productoPedido.option = this.productoToEdit.extras;
  this.comprasService.agregarProductoCarrito(this.productoPedido, this.userUid);
  this.flashMessage.show('Has agregado ' + this.productoPedido.nombre + ' a tu carrito', {cssClass: 'alert-success', timeout: 8000});
  this.productoPedido.ing1 = 'Ninguno';
      this.productoPedido.ing2 = 'Ninguno';
      this.productoPedido.cantidad = 1;
        this.clearStatex();
  }
}
