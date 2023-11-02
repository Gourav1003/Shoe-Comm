import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

// import { reducer } from './store/app.reducers';
import {myReducer} from './store/app.reducers'
import { MyEffects } from './store/app.effects';

import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { HeaderComponent } from './components/header/header.component';
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';
import { CartComponent } from './components/cart/cart.component';
import { AdminPageComponent } from './components/admin-page/admin-page.component';
import { ShoeDetailComponent } from './components/shoe-detail/shoe-detail.component';
import { AdminLoginComponent } from './components/admin-login/admin-login.component';
import { AppRoutingModule } from './router/app-router.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ShoePageComponent } from './components/shoe-page/shoe-page.component';
import { AuthorizationInterceptor } from './router/auth.interceptor';
import { AddAdminComponent } from './components/add-admin/add-admin.component';
import { UpdateProductComponent } from './components/update-product/update-product.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    HeaderComponent,
    LoginComponent,
    SignupComponent,
    CartComponent,
    AdminPageComponent,
    ShoeDetailComponent,
    AdminLoginComponent,
    ShoePageComponent,
    AddAdminComponent,
    UpdateProductComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    StoreModule.forRoot({myFeature: myReducer}),
    EffectsModule.forRoot([MyEffects]),
    
  ],
  providers: [
    {
    provide:HTTP_INTERCEPTORS,
      useClass:AuthorizationInterceptor,
      multi:true
  }
],
  bootstrap: [AppComponent]
})
export class AppModule { }
