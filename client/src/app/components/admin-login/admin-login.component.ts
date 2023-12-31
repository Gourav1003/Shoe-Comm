import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError, retry } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import { selectIsAdmin, selectIsLogin } from '../../store/app.selector';
import { take } from 'rxjs/operators';
import * as MyActions from '../../store/app.actions';
import { AuthService } from '../../services/auth.service';
import { ChangeDetectionStrategy } from '@angular/core';
import { Location } from '@angular/common';
import { Router } from '@angular/router';
import { throwError } from 'rxjs';
import { adminLoginUrl } from 'src/app/router/urls';

@Component({
  selector: 'app-admin-login',
  templateUrl: './admin-login.component.html',
  styleUrls: ['./admin-login.component.css']
})
export class AdminLoginComponent implements OnInit{

  error: any;
  responseData: any;
  loginForm!: FormGroup;
  isLogin: boolean | undefined;
  isAdmin: boolean| undefined;
  isAuthenticated: boolean = false;
  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private store: Store,
    private authService: AuthService,
    private location: Location,
    private router: Router
  ) {}

  ngOnInit() {
    this.isAuthenticated = this.authService.isAuthenticated();
    const token = this.authService.getAuthToken();
    if (token) {
      this.store.dispatch(MyActions.login());
      this.router.navigate(['/admin']);
    }
    // console.log(token)

    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });

    this.store.select(selectIsLogin).subscribe((isLogin) => {
      this.isLogin = isLogin;
    });

    this.store.select(selectIsAdmin).subscribe((isAdmin) => {
      this.isAdmin = isAdmin;
    });
  }

  onSubmit() {
    if (this.loginForm.valid) {
      console.log(this.loginForm.value);

      const postData = {
        ...this.loginForm.value,
      };

      const url = adminLoginUrl;

      this.http
        .post(url, postData)
        .pipe(
          catchError((error: HttpErrorResponse) => {
            this.error = error.error.msg;
            console.log(error.error.msg);
            throw error;
          })
        )

        .subscribe((response) => {
          console.log('POST request successful', response);

          this.responseData = response;
          if (this.responseData) {
            const user = this.responseData.user;
            const authToken = this.responseData.token;
            this.authService.setAuthData(user, authToken);
            this.isAuthenticated = true;
            this.store.dispatch(MyActions.login());
            this.store.dispatch(MyActions.adminLogin());
            this.router.navigate(['/admin']);
          }
        });
    }
  }
}