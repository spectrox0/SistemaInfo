import { Injectable } from '@angular/core';
import {ProductoPedido} from '../models/producto-pedido';
import {AngularFireAuth} from 'angularfire2/auth';
import * as firebase from 'firebase/app';
import {Observable} from 'rxjs';
import {Usuario} from '../models/usuario';
import {AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument} from 'angularfire2/firestore';
import {map} from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class ComprasService {

  constructor(public afs: AngularFirestore) { }

  carritosCollection: AngularFirestoreCollection <ProductoPedido>;
  carrito: Observable<ProductoPedido[]>;
  carritoDoc: AngularFirestoreDocument<ProductoPedido>;

  comprasCollection: AngularFirestoreCollection <ProductoPedido>;
  compra: Observable<ProductoPedido[]>;
  compraDoc: AngularFirestoreDocument<ProductoPedido>;

  agregarProductoCarrito (productoPedido: ProductoPedido, userUid: string) {
    this.carritosCollection = this.afs.collection<ProductoPedido>(`usuarios/${userUid}/carrito`);
   this.carritosCollection.add(productoPedido);
  }

  getCarrito(userUid: string) {
    this.carritosCollection = this.afs.collection<ProductoPedido>(`usuarios/${userUid}/carrito`);
    this.carrito = this.carritosCollection.snapshotChanges(). pipe (
      map (actions => {
       return actions.map(a => {
  const data = a.payload.doc.data();
   data.id = a.payload.doc.id;
  return data;
      });
      }) );
 return this.carrito;

  }

  deleteProductoPedido(userUid: string, product: ProductoPedido) {
    this.carritoDoc = this.afs.doc(`usuarios/${userUid}/carrito/${product.id}`);
    this.carritoDoc.delete();

  }

  agregarCompraHistorial (productoPedido: ProductoPedido, userUid: string) {
    this.comprasCollection = this.afs.collection<ProductoPedido>(`usuarios/${userUid}/historial`);
   this.comprasCollection.add(productoPedido);

  }
  updateHistorial ( userUid: string, pedido: ProductoPedido) {
    this.compraDoc = this.afs.doc(`usuarios/${userUid}/historial/${pedido.id}`);
    return this.compraDoc.update(pedido);
  }

  getHistorial(userUid: string) {
   this.comprasCollection = this.afs.collection<ProductoPedido>(`usuarios/${userUid}/historial`);
   this.compra = this.comprasCollection.snapshotChanges(). pipe (
     map (actions => {
      return actions.map(a => {
 const data = a.payload.doc.data();
  data.id = a.payload.doc.id;
 return data;
     });
     }) );
return this.compra;

 }
 getPedidosPendientes(userUid: string) {
  this.comprasCollection = this.afs.collection<ProductoPedido>(`usuarios/${userUid}/historial`,
  ref => ref.where('isEntregado', '==', false).orderBy('fecha'));
   this.compra = this.comprasCollection.snapshotChanges(). pipe (
     map (actions => {
      return actions.map(a => {
 const data = a.payload.doc.data();
  data.id = a.payload.doc.id;
 return data;
     });
     }) );
return this.compra;

 }
}
