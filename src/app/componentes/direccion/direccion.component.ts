import { Component, OnInit , AfterViewChecked } from '@angular/core';
import {ProductoPedido} from './../../models/producto-Pedido';
import {AuthService} from './../../services/auth.service';
import {ComprasService} from './../../services/compras.service';
import {NgForm} from '@angular/forms/src/directives/ng_form';
declare let paypal: any;

import {Router} from '@angular/router';
import {FlashMessagesService} from 'angular2-flash-messages';
@Component({
  selector: 'app-direccion',
  templateUrl: './direccion.component.html',
  styleUrls: ['./direccion.component.css']
})



export class DireccionComponent implements OnInit {
  compras: ProductoPedido [];
 Total = 0;
 // dirrecion
 pais: string;
 ciudad: string;
 dirreccion: string;
 codigoPostal: string;
 userUid: string ;

  addScript: boolean = false;
  paypalLoad: boolean = true;
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


  constructor(public authService: AuthService ,
    public router: Router,
    public flashMessage: FlashMessagesService,
    public comprasService: ComprasService) { }
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
    saveCompra () {
    this.compras.forEach( element =>  {
      element.fecha =  Date.now();
    this.comprasService.agregarCompraHistorial(element, this.userUid);
    this.comprasService.deleteProductoPedido(this.userUid, element);
    } ) ;
    this.router.navigate(['/compras']);
   this.flashMessage.show('Has completado el pedido correctamente', {cssClass: 'alert-success', timeout: 4000});
   }
}
