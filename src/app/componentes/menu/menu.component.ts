import { Component, OnInit } from '@angular/core';
import {Producto} from '../../models/producto';
import {ProductService} from '../../services/product.service';
@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  constructor(private productService: ProductService) {



   }

  ngOnInit() {

    this.productService.getProductos().subscribe(productos => {
      console.log(productos);
    });
  }

}
