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
import {AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument} from 'angularfire2/firestore';
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
  startAt = new Subject ();
  endAt = new Subject ();
  starobs = this.startAt.asObservable();
  endobs = this.endAt.asObservable();
  productosCollection: AngularFirestoreCollection <Producto>;
  productox: Observable<Producto[]>;
  constructor (private afs: AngularFirestore ,
    public productoService: ProductService ,
    public authService: AuthService, public comprasService: ComprasService) {

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
 }) ;

 combineLatest(this.starobs, this.endobs).subscribe((value) => {
this.firequery( value[0] , value[1] ).subscribe( productos => {
  this.productos = productos;
  }) ;
 }) ;
 this.startAt.next('');
    this.endAt.next('\uf8ff');
}
   getProduct() {
    this.productoService.getProductos().subscribe( productos => {
     this.productos = productos;
     });
  }

  search($event) {
    const q = $event.target.value ;
    this.startAt.next(q);
    this.endAt.next(q + '\uf8ff');
    console.log(q);

  }

  firequery(start , end) {
    this.productosCollection = this.afs.collection('productos', ref => ref.limit(6).
    orderBy('nombre').startAt(start).endAt(end));
    this.productox = this.productosCollection.snapshotChanges(). pipe (
      map (actions => {
       return actions.map(a => {
  const data = a.payload.doc.data() as Producto;
  data.id = a.payload.doc.id;
  return data;
      });
      }) );
 return this.productox;
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
    console.log(this.productoToEdit.id);
    }
    clearState() {
      this.editState = false;
       this.productoToEdit = null;
     }
     clearStatex() {
      this.editState = false;
      console.log(this.productoToEdit.id);
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
