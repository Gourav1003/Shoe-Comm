import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../services/shoes.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
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