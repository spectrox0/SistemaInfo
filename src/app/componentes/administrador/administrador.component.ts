import { Component, OnInit } from '@angular/core';
import {Producto} from './../../models/producto';
import {ProductService} from './../../services/product.service';
import {NgForm} from '@angular/forms/src/directives/ng_form';
import {ComprasService} from './../../services/compras.service';
import {map} from 'rxjs/operators';
import {AngularFireStorage} from 'angularfire2/storage';
import {AuthService} from './../../services/auth.service';
import {Usuario} from './../../models/usuario';
import {finalize} from 'rxjs/operators';
import {Observable} from 'rxjs';
import {combineLatest} from 'rxjs';
import { Subject } from 'rxjs';
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
    img: '',
    idImg: '',
    extras: [] ,
    isPersonalizable: true
  };
  Busquedad: string;
 editState: any = false;
  productoToEdit: Producto;
  productos: Producto [];
uploadProgress: Observable<number>;
uploadURL: Observable <string>;
startAt = new Subject ();
  endAt = new Subject ();
  starobs = this.startAt.asObservable();
  endobs = this.endAt.asObservable();
  ingrediente = '';
  vista = true;
  constructor(private productoService: ProductService, private _storage: AngularFireStorage, public afs: AuthService
   , private compraService: ComprasService) {
}
 ngOnInit() {
  this.getProduct();
  this.getPedidos();
  }
  getProduct() {
    combineLatest(this.starobs, this.endobs).subscribe((value) => {
      this.productoService.firequery( value[0] , value[1] ).subscribe( productos => {
        this.productos = productos;
        }) ;
       }) ;
       this.startAt.next('');
       this.endAt.next('\uf8ff');
  }
  getPedidos () {
    this.afs.getUsuarios().subscribe((usuarios) => {
      usuarios.forEach(element => {
        const id = element.id;
        this.compraService.getHistorial(id);

      });
    });
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
  search($event) {
    const q = $event.target.value ;
    this.startAt.next(q);
    this.endAt.next(q + '\uf8ff');
  }
 editProducto( event, producto: Producto) {
 this.editState = true;
 this.productoToEdit = producto;
 this.producto.extras = this.productoToEdit.extras;
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
      this.producto.idImg = randomId;
      this.producto.img = url;
   });
  }) // {{ downloadURL | async }})
  ).subscribe();
}


  clearState() {
   this.editState = false;
    this.productoToEdit = null;
  }
  onUpdateProducto (producto: Producto) {
     if (this.producto.img !== '') {
        producto.img = this.producto.img;
        const filepath = `images/${producto.idImg}`;
        const fileRef = this._storage.ref(filepath);
        producto.idImg = this.producto.idImg;
        fileRef.delete();
      }
      const iva = parseInt((producto.precio * 0.1).toFixed(2), 10);
      const precioTotal = this.suma(iva , producto.precio);
      producto.iva = iva;
      console.log (iva);
      producto.precioTotal = precioTotal;
    this.productoService.updateProducto(producto);
    this.clearState();
   }
   getProductoFilterNombre() {
    this.productoService.getProductoFilterName(this.Busquedad).subscribe( productos => {
     this.productos = productos;
     });
  }
 deleteProducto(event, producto: Producto) {
  const filepath = `images/${producto.idImg}`;
  const fileRef = this._storage.ref(filepath);
  fileRef.delete();
    this.productoService.deleteProducto(producto);
    this.clearState();
 }
 getProductoFilterCategory(categoria: string) {
  this.productoService.getProductoFilterCategory(categoria).subscribe( productos => {
    this.productos = productos;
    });

 }

 agregaIng(myForm: NgForm) {
   if (myForm.valid) {
   console.log(this.ingrediente);
   this.producto.extras.push(this.ingrediente);
  }
 }
 borraExtra(extra: string) {
  const index = this.producto.extras.indexOf(extra);
  this.producto.extras.splice(index, 1);
 }

changeTP() {
 if (!this.vista) {
  this.vista = true;
 }}

 changeTC() {
   if (this.vista) { this.vista = false; }
 }



}
