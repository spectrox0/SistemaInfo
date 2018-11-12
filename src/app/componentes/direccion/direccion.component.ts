import { Component, OnInit } from '@angular/core';
import {ProductoPedido} from './../../models/producto-Pedido';
import {AuthService} from './../../services/auth.service';
import {ComprasService} from './../../services/compras.service';
import {NgForm} from '@angular/forms/src/directives/ng_form';
import {Router} from '@angular/router';
import {FlashMessagesService} from 'angular2-flash-messages';
@Component({
  selector: 'app-direccion',
  templateUrl: './direccion.component.html',
  styleUrls: ['./direccion.component.css']
})
export class DireccionComponent implements OnInit {

  constructor(public authService: AuthService ,
    public router: Router,
    public flashMessage: FlashMessagesService,
    public comprasService: ComprasService) { }

 compras: ProductoPedido[];
 Total = 0;
 // dirrecion
 pais: string;
 ciudad: string;
 dirreccion: string;
 codigoPostal: string;
 userUid: string ;

  ngOnInit() {
    this.getCompras();
  }

  getCompras () {
    this.authService.getUsuarios().subscribe( usuarios => {
      const userId = this.authService.afAuth.auth.currentUser.uid;
     usuarios.forEach(element => {
       if ((element.uid === userId)) {
          this.userUid = element.id;

   } } );
   this.comprasService.getCarrito(this.userUid).subscribe( productos => {
     this.compras = productos;
     this.compras.forEach (element => {
       element.precioTotal = element.precioTotal * element.cantidad;
       this.Total += element.precioTotal ;
     }) ;
  }) ;
  } ) ;

  }
    saveCompra (myForm: NgForm ) {
   if (myForm.valid) {
    this.compras.forEach( element =>  {
      element.fecha =  Date.now();
    this.comprasService.agregarCompraHistorial(element, this.userUid);
    this.comprasService.deleteProductoPedido(this.userUid, element);
    } ) ;
    this.router.navigate(['/compras']);
   this.flashMessage.show('Has completado el pedido correctamente', {cssClass: 'alert-success', timeout: 4000});
   }

    }
}
