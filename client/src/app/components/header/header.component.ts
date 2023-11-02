import { Component,OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { selectIsAdmin, selectIsLogin } from '../../store/app.selector';
import { take } from 'rxjs/operators';
import * as MyActions from '../../store/app.actions';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { MyState, myReducer } from 'src/app/store/app.reducers';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  isLoggedIn$: Observable<Boolean>;
  isLoggedIn: Boolean = false;

  isAdmin$: Observable<Boolean>;
  isAdmin: Boolean=false;

  constructor(
    private store: Store,
    private authService: AuthService,
    private router: Router
  ) {
    this.isLoggedIn$ = store.select(selectIsLogin);
    this.isLoggedIn$.subscribe((res) => {
      console.log(res);
      this.isLoggedIn = res;
    });

    this.isAdmin$ = store.select(selectIsAdmin);
    this.isAdmin$.subscribe((res) =>{
      console.log(res);
      this.isAdmin = res;
    })
  }
  ngOnInit() {
    const token = this.authService.getAuthToken();
    console.log(token);
    if (token) {
      this.store.dispatch(MyActions.login());
    }
    // this.store.select(selectIsLogin).subscribe((isLogin) => {
      // this.isLogin = isLogin;
    // });



  }
  login() {
    // this.store.dispatch(MyActions.login());
    // this.store.dispatch(MyActions.adminLogin());

    this.router.navigate(['/login']);
  }
  logout() {
    this.authService.logout();
    this.store.dispatch(MyActions.logout());
    this.store.dispatch(MyActions.adminLogout());
    this.router.navigate(['/']);
  }

  adminlogin() {
    // this.store.dispatch(MyActions.login());
    // this.store.dispatch(MyActions.adminLogin());

    this.router.navigate(['/adminlogin']);
  }
}