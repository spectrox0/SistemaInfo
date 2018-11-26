import { Component, OnInit } from '@angular/core';
import {ProductoPedido} from './../../models/producto-Pedido';
import {AuthService} from './../../services/auth.service';
import {ComprasService} from './../../services/compras.service';
import {NgForm} from '@angular/forms/src/directives/ng_form';

@Component({
  selector: 'app-compras',
  templateUrl: './compras.component.html',
  styleUrls: ['./compras.component.css']
})
export class ComprasComponent implements OnInit {

  constructor(public authService: AuthService ,
    public comprasService: ComprasService) { }
   pedidoToEdit: ProductoPedido;
   isState: boolean;
   compras: ProductoPedido[];
   userUid: string;
   Total = 0 ;
  ngOnInit() {
  this.getHistorial();
  }
   clearState(producto: ProductoPedido ) {
   this.pedidoToEdit = producto;
   this.isState = true;
   }
   editProducto( event, producto: ProductoPedido) {
    this.isState = true;
    this.pedidoToEdit = producto;
    }
  getHistorial () {
    this.authService.getUsuarios().subscribe( usuarios => {
      const userId = this.authService.afAuth.auth.currentUser.uid;
     usuarios.forEach(element => {
       if ((element.uid === userId)) {
          this.userUid = element.id;

   } } );
   this.comprasService.getHistorial(this.userUid).subscribe( productos => {
     this.compras = productos;
     this.compras.forEach (element => {
       element.precioTotal = element.precioTotal * element.cantidad;
       this.Total += element.precioTotal ;
     }) ;
  }) ;
  } ) ;

  }
  agregaCarrito(Product: ProductoPedido) {
   this.comprasService.agregarProductoCarrito(Product, this.userUid);
  }
}
