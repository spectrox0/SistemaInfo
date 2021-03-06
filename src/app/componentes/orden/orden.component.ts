import { Component, OnInit, AfterViewChecked, ElementRef } from '@angular/core';
import {ViewChild} from '@angular/core';
import {ProductoPedido} from '../../models/producto-pedido';
import {ProductService} from '../../services/product.service';
import {AuthService} from '../../services/auth.service';
import {ComprasService} from '../../services/compras.service';
import {NgForm} from '@angular/forms/src/directives/ng_form';

declare let paypal: any;
declare let $: any;
import {Router} from '@angular/router';
import {FlashMessagesService} from 'angular2-flash-messages';
@Component({
  selector: 'app-orden',
  templateUrl: './orden.component.html',
  styleUrls: ['./orden.component.css']
})
export class OrdenComponent implements OnInit {

  municipio: string;
 urbanizacion: string;
 calle: string;
 casa: string;


  addScript = false;
  paypalLoad = true;
  productos: ProductoPedido [] = [];
  userUid: string ;
  Total = 0;
  subTotal = 0;
  paypalConfig  = {
    env: 'sandbox',
    client: {
      sandbox: 'AQGQTww7YgXAPJ7Vgm98Fg7VML0OxFF8N4ZMHoZrX3Syqrr5h7PIDzcGaMRi58WsGdDrTX_ulrqKPC-P',
      production: ''
    },
    commit: true,
    payment: (data, actions) => {
      return actions.payment.create({
        payment: {
          transactions: [
            {
              amount: {total: this.Total,
               currency : 'USD'}
              }
          ]
        }
      });
    },
    style: {
      color: 'blue',   // 'gold, 'blue', 'silver', 'black'
      size:  'responsive', // 'medium', 'small', 'large', 'responsive'
      shape: 'pill'
           // 'rect', 'pill'
    },
    onAuthorize : (data, actions) => {
      return actions.payment.execute().then((payment) => {
        this.saveCompra();
      }) ;
    }
  };

  // tslint:disable-next-line:use-life-cycle-interface
  ngAfterViewChecked(): void {
    if (!this.addScript) {
      this.addPayPalScript().then(() => {
        paypal.Button.render(this.paypalConfig, '#paypal-checkout-btn');
        this.paypalLoad = false;
      }) ;
    }
  }

  addPayPalScript() {
    this.addScript = true;
    return new Promise ((resolve, reject) => {
      const scripttagelement = document.createElement('script');
      scripttagelement.src = 'https://www.paypalobjects.com/api/checkout.js';
      scripttagelement.onload = resolve;
      document.body.appendChild(scripttagelement);
    });
  }


  constructor( public authService: AuthService,
    public comprasService: ComprasService ,
    public router: Router,
    public flashMessage: FlashMessagesService,
    ) {

  }
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
        this.subTotal += element.precio * element.cantidad;
      }) ;
   }) ;
   } ) ;
  }
  deleteProduct(event , product: ProductoPedido) {
    this.comprasService.deleteProductoPedido(this.userUid, product);

    this.comprasService.getCarrito(this.userUid).subscribe( productos => {
      this.productos = productos;
      this.Total = 0 ;
      this.subTotal = 0;
      this.productos.forEach (element => {
        this.Total += element.precioTotal ;
        this.subTotal += (element.precio * element.precio);
      }) ;
   }) ;
  }

  saveCompra () {
    this.productos.forEach( element =>  {
      element.fecha =  Date.now();
     element.dir1 = this.urbanizacion;
     element.dir2 = this.municipio;
     element.dir3 = this.calle ;
     element.dir4 = this.casa ;
    this.comprasService.agregarCompraHistorial(element, this.userUid);
    this.comprasService.deleteProductoPedido(this.userUid, element);
    } ) ;

     $('#myModal').modal('hide');
    this.router.navigate(['/compras']);
   this.flashMessage.show('Has completado el pedido correctamente', {cssClass: 'alert-success', timeout: 4000});
   }
}
