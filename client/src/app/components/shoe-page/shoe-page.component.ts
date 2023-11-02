import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../../services/shoes.service';
import { Store } from '@ngrx/store';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { catchError, retry } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import * as MyActions from '../../store/app.actions';
import { Observable } from 'rxjs';
import { selectIsAdmin, selectIsLogin } from 'src/app/store/app.selector';
import { deleteProductUrl} from 'src/app/router/urls'

@Component({
  selector: 'app-shoe-page',
  templateUrl: './shoe-page.component.html',
  styleUrls: ['./shoe-page.component.css'],
})
export class ShoePageComponent implements OnInit {
  productId: any;
  product: any;

  isLoggedIn$: Observable<Boolean>;
  isLoggedIn: Boolean = false;

  isAdmin$: Observable<Boolean>;
  isAdmin: Boolean=false;

  constructor(
    private store :Store,
    private route: ActivatedRoute,
    private productService: ProductService,
    private authService: AuthService,
    private router: Router,
    private http: HttpClient
  ) {
    this.route.params.subscribe((params) => {
      // console.log(params['id']);
      this.productId = params['id'];
    });

    this.isLoggedIn$ = store.select(selectIsLogin);
    this.isLoggedIn$.subscribe((res) => {
      console.log(res);
      this.isLoggedIn = res;
    });

    this.isAdmin$ = store.select(selectIsAdmin);
    this.isAdmin$.subscribe((res) =>{
      console.log(res);
      this.isAdmin = res;
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
    } else {
      const PostData = {
        productId: this.productId,
      };
      // console.log(PostData);
      // console.log(token);

      const url = 'http://localhost:3000/cart/products';

      const headers = new HttpHeaders().set('Authorization', token);

      this.http
        .post(url, PostData, {headers:headers})
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

  delete1(id: any){
    {
      const url = deleteProductUrl + id;
      this.http
        .delete(url)
        .pipe(
          catchError((error) => {
            console.error('Error sending POST request', error);
            throw error;
          })
        )
        .subscribe((response) => {
          console.log('POST request successful', response);
        });
        alert('Item Deleted Successfully');
        this.router.navigate(['/admin']);
    }
  }

  update(id: any){
    this.router.navigate(['/update',id]);
  }
}
