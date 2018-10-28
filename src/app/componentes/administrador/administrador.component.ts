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
    descripcion: '',
    categoria: '',
    disponibilidad: false,
    ing1: '',
    ing2: '',
    ing3: '',
    img: '',
  };
 editState: any = false;
  productoToEdit: Producto;
  productos: Producto [];
uploadProgress: Observable<number>;
uploadURL: Observable <string>;
  constructor(private productoService: ProductService, private _storage: AngularFireStorage) {
}
 ngOnInit() {
  this.productoService.getProductos().subscribe( productos => {
   this.getProduct(productos); });
  }
  getProduct(data) {
    this.productos = data;
   }
  onGuardarProducto(myForm: NgForm) {
    if (myForm.valid) {
    const fecha = Date.now();
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

 upload(event) {
   // obtiene el input file
 const file: File = event.target.files[0];
  const randomId = Math.random().toString(36).substring(2);
  const filepath = `images/${randomId}`;
  const fileRef = this._storage.ref(filepath);
  // Upload image
  const task = this._storage.upload(filepath, file);

  this.uploadProgress = task.percentageChanges();

  task.snapshotChanges().pipe (finalize( () => this.uploadURL = fileRef.getDownloadURL())
  ).subscribe();
}


  clearState() {
   this.editState = false;
    this.productoToEdit = null;
  }
  onUpdateProducto (producto: Producto) {
    this.productoService.updateProducto(producto);
    this.clearState();
   }
 deleteProducto(event, producto: Producto) {
    this.productoService.deleteProducto(producto);
    this.clearState();
 }

}
