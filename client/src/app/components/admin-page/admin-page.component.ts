import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../services/shoes.service';

@Component({
  selector: 'app-admin-page',
  templateUrl: './admin-page.component.html',
  styleUrls: ['./admin-page.component.css']
})
export class AdminPageComponent implements OnInit {
  products: any = {
    name: "hey",
  }

  constructor(private productService: ProductService) {}

  ngOnInit() {
    this.productService.getStoredProducts().subscribe((data) => {
      this.products = data;
      // console.log(this.products);
    });

    // this.productService.getAllProducts().subscribe((data: any) => {
    //   this.products = data;
    // })
  }
}