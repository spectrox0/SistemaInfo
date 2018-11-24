import { Component, OnInit, AfterViewChecked } from '@angular/core';
import {ProductoPedido} from '../../models/producto-pedido';
import {ProductService} from '../../services/product.service';
import {AuthService} from '../../services/auth.service';
import {ComprasService} from '../../services/compras.service';
import {NgForm} from '@angular/forms/src/directives/ng_form';


@Component({
  selector: 'app-orden',
  templateUrl: './orden.component.html',
  styleUrls: ['./orden.component.css']
})
export class OrdenComponent implements OnInit {


  constructor( public authService: AuthService, public comprasService: ComprasService ) {

  }
    productos: ProductoPedido [];
    userUid: string ;
    Total = 0;
  ngOnInit() {
    this.getProductosPedidos();
  }
   getProductosPedidos() {
    this.authService.getUsuarios().subscribe( usuarios => {
       const userId = this.authService.afAuth.auth.currentUser.uid;
      usuarios.forEach(element => {
        if ((element.uid === userId)) {
           this.userUid = element.id;
    } } );
    this.comprasService.getCarrito(this.userUid).subscribe( productos => {
      this.productos = productos;
      this.productos.forEach (element => {
        this.Total += element.precioTotal ;
      }) ;
   }) ;
   } ) ;
  }
  deleteProduct(event , product: ProductoPedido) {
    this.comprasService.deleteProductoPedido(this.userUid, product);

    this.comprasService.getCarrito(this.userUid).subscribe( productos => {
      this.productos = productos;
      this.Total = 0 ;

      this.productos.forEach (element => {
        this.Total += element.precioTotal ;
      }) ;
   }) ;
  }
}
