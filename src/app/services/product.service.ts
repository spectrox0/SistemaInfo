import { Injectable } from '@angular/core';
import {Producto} from '../models/producto';
import {AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument} from 'angularfire2/firestore';
import {Observable} from 'rxjs';
import { map } from 'rxjs/operators';
import { database } from 'firebase';
@Injectable({
  providedIn: 'root'
})
export class ProductService {
 productosCollection: AngularFirestoreCollection <Producto>;
 productos: Observable<Producto[]>;
 productoDoc: AngularFirestoreDocument<Producto>;

  constructor( afs: AngularFirestore
  ) {
     // this.productos = afs.collection('productos').valueChanges();
     this.productosCollection = afs.collection<Producto>('productos');
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
   }



  deleteProducto( $key: string) {
    console.log('borra PRODUCTO');

} }
