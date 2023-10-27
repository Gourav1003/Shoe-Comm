import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CartComponent } from '../components/cart/cart.component';
import { HomeComponent } from '../components/home/home.component';
import { ShoeDetailComponent } from '../components/shoe-detail/shoe-detail.component';
import { LoginComponent } from '../components/login/login.component';
import { SignupComponent } from '../components/signup/signup.component';
import { AdminLoginComponent } from '../components/admin-login/admin-login.component';
import { AdminPageComponent } from '../components/admin-page/admin-page.component';
import { ShoePageComponent } from '../components/shoe-page/shoe-page.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'product/:id', component: ShoePageComponent },
  { path: 'cart', component: CartComponent },
  { path: 'adminLogin', component : AdminLoginComponent},
  { path: 'admin', component : AdminPageComponent},
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}