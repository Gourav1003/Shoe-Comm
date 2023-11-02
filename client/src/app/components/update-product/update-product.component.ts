import { Component, OnInit} from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl, AbstractControl } from '@angular/forms';

import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import * as MyActions from '../../store/app.actions';
import { AuthService } from 'src/app/services/auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { HttpClient } from '@angular/common/http';
import { ProductService } from 'src/app/services/shoes.service';
import { updateProductUrl } from 'src/app/router/urls';

@Component({
  selector: 'app-update-product',
  templateUrl: './update-product.component.html',
  styleUrls: ['./update-product.component.css']
})
export class UpdateProductComponent  implements OnInit {
  updateForm: any;
  responseData:any;
  productId:any
  product:any

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router:Router,
    private http:HttpClient,
    private route : ActivatedRoute,
    private productService:ProductService
  ) {
    this.updateForm = this.fb.group({
      // firstName: ['', Validators.required],
      // lastName: ['', Validators.required],
      // contactNumber: ['', [Validators.required, this.exactLengthValidator(10)]],
      // email: ['', [Validators.required, Validators.email]],

      title:['',Validators.required],
      price:['',Validators.required],
      description:['',Validators.required],
      image_url:['',Validators.required],
      sizes:['',Validators.required],
      colour:['',Validators.required],
    });
    this.route.params.subscribe(params=>{
      this.productId=params['id']
    })

    const token = this.authService.getAuthToken();
    if (!token) {
      this.router.navigate(['/login']);
    }
  }

  ngOnInit(): void {
    this.productService.getProduct(this.productId).subscribe(data=>{
      this.product = data
      console.log(this.product)
      this.updateForm.patchValue({
        title: this.product.title,
        price: this.product.price,
        description: this.product.description,
        image_url: this.product.image_url,
        sizes:this.product.sizes,
        colour:this.product.colour
      });
      console.log(this.updateForm.value)
    })    
  }


  onSubmit() {
    
    if (this.updateForm.valid) {
      console.log('Product Updated:', this.updateForm.value);
      //send the data to server

      const postData = {
        ...this.updateForm.value,
        
      };
    

    const url = updateProductUrl + this.productId;

      this.http
        .post(url, postData)
        .pipe(
          catchError((error) => {
            console.error('Error sending POST request', error);
            throw error;
          })
        )
        .subscribe((response) => {
          console.log('POST request successful', response);

          this.responseData = response;
          if (this.responseData) {
            this.productService.fetchProducts();
            // .subscribe((data) => {
            //   this.contacts = data;
            // });
            alert('Product updated successfully');
            this.router.navigate(['/admin']);
          }

        });
    }
  }
}