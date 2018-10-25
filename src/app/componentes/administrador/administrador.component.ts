import { Component, OnInit } from '@angular/core';
import {Producto} from '../../models/producto';
import {ProductService} from '../../services/product.service';
import {NgForm} from '@angular/forms/src/directives/ng_form';
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

  productos: Producto [];
  constructor(private productoService: ProductService) {

  }
  editState: any = false;
  productoToEdit: Producto;
  ngOnInit() {
   this.productoService.getProductos().subscribe( productos => {
     this.productos = productos;
     console.log(productos);
   });
  }
  onGuardarProducto(myForm: NgForm) {
    const fecha = Date.now();
    this.producto.fecha = fecha;
    this.productoService.addProducto(this.producto);
  }
 editProducto( event, producto: Producto) {
 this.editState = true;
 this.productoToEdit = producto;
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
