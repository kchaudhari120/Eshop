import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {AdminAuthGuardService} from './auth-gaurd/admin-auth-gaurd.service'
import { UserAuthGaurdService } from './auth-gaurd/user-auth-gaurd.service';
import { AdminCustomersComponent } from './components/admin/admin-customers/admin-customers.component';
import { AdminDashboardComponent } from './components/admin/admin-dashboard/admin-dashboard.component';
import { AdminHomeComponent } from './components/admin/admin-home/admin-home.component';
import { AdminNewProductComponent } from './components/admin/admin-new-product/admin-new-product.component';
import { AdminOrderComponent } from './components/admin/admin-order/admin-order.component';
import { AdminProductsComponent } from './components/admin/admin-products/admin-products.component';
import { CartComponent } from './components/cart/cart.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';
import { UserOrdersComponent } from './components/user-orders/user-orders.component'
const routes: Routes = [
  { path: '', canActivate: [UserAuthGaurdService], component: HomeComponent },
  { path: 'home', canActivate: [UserAuthGaurdService], component: HomeComponent },
  { path: 'orders', canActivate: [UserAuthGaurdService], component: UserOrdersComponent },
  { path: 'cart', canActivate: [UserAuthGaurdService], component: CartComponent },
  { path: 'login', component: LoginComponent },
  { path: 'singup', component: SignupComponent },
  {
    path: 'admin',
    canActivate :[AdminAuthGuardService],
    component: AdminHomeComponent,
    children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      { path: 'dashboard', component: AdminDashboardComponent },
      { path: 'order', component: AdminOrderComponent },
      { path: 'products', component: AdminProductsComponent },
      { path: 'new-products', component: AdminNewProductComponent },
      { path: 'customers', component: AdminCustomersComponent },

    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
