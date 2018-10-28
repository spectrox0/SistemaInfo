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
 productoDoc: AngularFirestoreDocument<Producto>;

  constructor( public afs: AngularFirestore
  ) {
     this.productosCollection = afs.collection<Producto>('productos' , ref => ref.orderBy('fecha', 'desc'));
     this.productos = this.productosCollection.snapshotChanges(). pipe (
       map (actions => actions.map (a => {
   const data = a.payload.doc.data() as Producto;
   const id = a.payload.doc.id;
   return {id , ... data};
       }))
     );
}
  getProductos() {
 return this.productos;
  }

  addProducto(producto: Producto) {
console.log('NEW PRODUCTO');
this.productosCollection.add(producto);
  }

  updateProducto(producto: Producto) {
    console.log('actualiza PRODUCTO');
    this.productoDoc = this.afs.doc(`productos/${producto.id}`);
    this.productoDoc.update(producto);

   }



  deleteProducto( producto: Producto) {
    console.log('borra PRODUCTO');
    this.productoDoc = this.afs.doc(`productos/${producto.id}`);
    this.productoDoc.delete();
} }
