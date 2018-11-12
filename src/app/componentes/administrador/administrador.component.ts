import { Component, OnInit } from '@angular/core';
import {Producto} from './../../models/producto';
import {ProductService} from './../../services/product.service';
import {NgForm} from '@angular/forms/src/directives/ng_form';
import {map} from 'rxjs/operators';
import {AngularFireStorage} from 'angularfire2/storage';
import {finalize} from 'rxjs/operators';
import {Observable} from 'rxjs';
@Component({
  selector: 'app-administrador',
  templateUrl: './administrador.component.html',
  styleUrls: ['./administrador.component.css']
})
export class AdministradorComponent implements OnInit {

  producto: Producto = {
    nombre: '',
    precio: 0,
    iva: 0,
    precioTotal: 0,
    descripcion: '',
    categoria: 'Desayuno',
    disponibilidad: true,
    ing1: '',
    ing2: '',
    ing3: '',
    img: '',
    isPersonalizable: true
  };
 editState: any = false;
  productoToEdit: Producto;
  productos: Producto [];
uploadProgress: Observable<number>;
uploadURL: Observable <string>;
  constructor(private productoService: ProductService, private _storage: AngularFireStorage) {
}
 ngOnInit() {
  this.productoService.getProductos().subscribe( productos =>
   this.productos = productos
  );
  }

  onGuardarProducto(myForm: NgForm) {
    if (myForm.valid) {
    const fecha = Date.now();
    const iva = parseInt((this.producto.precio * 0.1).toFixed(2), 10);
    const precioTotal = this.suma(iva , this.producto.precio);
    this.producto.iva = iva;
    this.producto.precioTotal = precioTotal;
    this.producto.fecha = fecha;
    this.productoService.addProducto(this.producto);
    myForm.reset();
  } else {console.log('error');
}
  }
 editProducto( event, producto: Producto) {
 this.editState = true;
 this.productoToEdit = producto;
 }
 suma(valor1, valor2): number {
  return ( valor1 + parseInt(valor2, 10));
 }

 upload(event) {
   // obtiene el input file
 const file: File = event.target.files[0];
  const randomId = Math.random().toString(36).substring(2);
  const filepath = `images/${randomId}`;
  const fileRef = this._storage.ref(filepath);
  // Upload image
  const task = this._storage.upload(filepath, file);

  this.uploadProgress = task.percentageChanges();

  task.snapshotChanges().pipe (finalize( () => {
    this.uploadURL = fileRef.getDownloadURL();
   this.uploadURL.subscribe (
     url => {
      this.producto.img = url;
      console.log (this.producto.img);
   });
  }) // {{ downloadURL | async }})
  ).subscribe();
}


  clearState() {
   this.editState = false;
    console.log(this.productoToEdit.nombre);
    console.log(this.productoToEdit.id);
    this.productoToEdit = null;
  }
  onUpdateProducto (producto: Producto) {
     if (this.producto.img !== '') {
        producto.img = this.producto.img;
      }
      const iva = parseInt((producto.precio * 0.1).toFixed(2), 10);
      const precioTotal = this.suma(iva , producto.precio);
      producto.iva = iva;
      console.log (iva);
      producto.precioTotal = precioTotal;
    this.productoService.updateProducto(producto);
    this.clearState();
   }
 deleteProducto(event, producto: Producto) {
   console.log (producto.nombre);
    this.productoService.deleteProducto(producto);
    this.clearState();
 }

}
