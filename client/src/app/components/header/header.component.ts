import { Component,OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { selectIsLogin } from '../../store/app.selector';
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

  constructor(
    private store: Store,
    private authService: AuthService,
    private router: Router
  ) {
    this.isLoggedIn$ = store.select(selectIsLogin);
    this.isLoggedIn$.subscribe((res) => {
      console.log(res);
      this.isLoggedIn = res;
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
    this.store.dispatch(MyActions.login());

    this.router.navigate(['/login']);
  }
  logout() {
    this.authService.logout();
    this.store.dispatch(MyActions.logout());
    this.router.navigate(['/']);
  }
}