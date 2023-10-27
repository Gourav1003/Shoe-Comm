import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../../services/shoes.service';
import { Store } from '@ngrx/store';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { catchError, retry } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-shoe-page',
  templateUrl: './shoe-page.component.html',
  styleUrls: ['./shoe-page.component.css']
})
export class ShoePageComponent implements OnInit{

  productId: any;

  product: any;

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService,
    private authService: AuthService,
    private router: Router,
    private http: HttpClient
  ) {
    this.route.params.subscribe((params) => {
      console.log(params['id']);
      this.productId = params['id'];
    });
  }

  ngOnInit() {
    this.productService.getProduct(this.productId).subscribe((data) => {
      this.product = data;
    });
  }

  addToCart() {
    const token = this.authService.getAuthToken();
    if (!token) {
      this.router.navigate(['/login']);
    }

    const PostData = {
      productId: this.productId,
    };
    console.log(PostData);
    const url = 'http://localhost:3000/cart/products';

    this.http
      .post(url, PostData)
      .pipe(
        catchError((error) => {
          console.error('Error sending POST request', error);
          throw error;
        })
      )
      .subscribe((response) => {
        console.log('POST request successful', response);

        alert('Item Added to Cart.');
      });
  }

}

