import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private products$: any;
  products: any;
  private product$: any;
  product: any;
  private baseUrl = 'http://localhost:3000/product/allProducts';

  constructor(private http: HttpClient) {
  }

  getAllProducts() : any {
    return this.http.get(this.baseUrl);
  }

  fetchProducts(): Observable<any[]> {
    this.products$ = this.http.get<any[]>(this.baseUrl).pipe(
      catchError((error) => {
        console.error('Error sending get request', error);
        throw error;
      }),
      tap((data) => {
        this.products$ = of(data);
      })
    );

    return this.products$;
  }

  getStoredProducts(): Observable<any[]> {
    if (this.products$) {
      return this.products$;
    } else {
      return this.fetchProducts();
    }
  }

  fetchProductById(id: any): Observable<any[]> {
    const productUrl = 'http://localhost:3000/product/product/' + id;

    this.product$ = this.http.get<any[]>(productUrl).pipe(
      catchError((error) => {
        console.error('Error sending get request', error);
        throw error;
      }),
      tap((data) => {
        this.product$ = of(data);
      })
    );

    return this.product$;
  }

  fetchProduct(id: any): Observable<any | null> {
    if (this.products$) {
      this.products$.subscribe((data: any) => {
        this.products = data;
        console.log(data);
        
      });

      const myproduct = this.products.find((product: { _id: any; }) => product._id == id);
      return of(myproduct || null);
    } else {
      return this.fetchProductById(id);

    }
  }

  getProduct(id: any): Observable<any | null> {
    return this.fetchProduct(id);
  }
}