import { Component, OnInit } from '@angular/core';
import {ProductoPedido} from './../../models/producto-Pedido';
import {AuthService} from './../../services/auth.service';
import {ComprasService} from './../../services/compras.service';
import {NgForm} from '@angular/forms/src/directives/ng_form';
declare let paypal: any;

@Component({
  selector: 'app-direccion',
  templateUrl: './direccion.component.html',
  styleUrls: ['./direccion.component.css']
})



export class DireccionComponent implements OnInit {

  addScript: boolean = false;
  finalAmount: number = 1;
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
            {amount: {total: this.Total, currency : 'USD'}}
          ]
        }
      })
    },
    onAuthorize : (data, actions) => {
      return actions.payment.execute().then((payment) => {
        
      })
    }
  };

  ngAfterViewChecked():void {
    if(!this.addScript){
      this.addPayPalScript().then(() => {
        paypal.Button.render(this.paypalConfig, '#paypal-checkout-button');
      })
    }
  }

  addPayPalScript() {
    this.addScript = true;
    return new Promise ((resolve, reject) => {
      let scripttagelement = document.createElement('script')
      scripttagelement.src = 'https://www.paypalobjects.com/api/checkout.js'
      scripttagelement.onload = resolve;
      document.body.appendChild(scripttagelement);
    })
  }


  constructor(public authService: AuthService ,
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

   }

    }
}
