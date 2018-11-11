import { Injectable } from '@angular/core';
import {Producto} from './../models/producto';
import {AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument} from 'angularfire2/firestore';
import {Observable} from 'rxjs';
import { map } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class ProductService {
 productosCollection: AngularFirestoreCollection <Producto>;
 productos: Observable<Producto[]>;
 producto: Observable <Producto> ;
 productoDoc: AngularFirestoreDocument<Producto>;

  constructor( private afs: AngularFirestore
  ) {
    this.productosCollection = this.afs.collection<Producto>('productos' , ref => ref.orderBy('fecha', 'desc'));
}
  getProductos(): Observable<Producto []> {
    this.productos = this.productosCollection.snapshotChanges(). pipe (
      map (actions => {
       return actions.map(a => {
  const data = a.payload.doc.data() as Producto;
  data.id = a.payload.doc.id;
  return data;
      });
      }) );
 return this.productos;
  }

  addProducto(producto: Producto) {
this.productosCollection.add(producto);
  }

  updateProducto(producto: Producto) {
    this.productoDoc = this.afs.doc(`productos/${producto.id}`);
    this.productoDoc.update(producto);
   }

   getProducto (idProducto: string) {
     this.productoDoc = this.afs.doc<Producto>(`productos/${idProducto}`);
   this.producto = this.productoDoc.snapshotChanges(). pipe (
    map (actions => {
      if (actions.payload.exists === false) {
        return null;
      } else {
        const data = actions.payload.data() as Producto;
        data.id = actions.payload.id;
        return data;
      }

    } ) ) ;
    return this.producto;
   }

  deleteProducto( producto: Producto) {
    this.productoDoc = this.afs.doc(`productos/${producto.id}`);
    this.productoDoc.delete();
} }
