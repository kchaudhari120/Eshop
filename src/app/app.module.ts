import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule, NgbPaginationModule, NgbAlertModule } from '@ng-bootstrap/ng-bootstrap';
import { HomeComponent } from './components/home/home.component';
import { FooterComponent } from './components/footer/footer.component';
import { HeaderComponent } from './components/header/header.component';
import { StoreComponent } from './components/store/store.component';
import { FilterComponent } from './components/filter/filter.component';
import { ProductCardComponent } from './components/product-card/product-card.component';
import { CartComponent } from './components/cart/cart.component';
import { UserOrdersComponent } from './components/user-orders/user-orders.component';
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';
import {HttpClientModule} from '@angular/common/http';
import { ProductQuantityComponent } from './components/product-quantity/product-quantity.component'
import {ModalModule} from 'ngx-bootstrap/modal';
import { AdminHomeComponent } from './components/admin/admin-home/admin-home.component';
import { AdminDashboardComponent } from './components/admin/admin-dashboard/admin-dashboard.component';
import { AdminNewProductComponent } from './components/admin/admin-new-product/admin-new-product.component';

import { AdminOrderComponent } from './components/admin/admin-order/admin-order.component';
import { AdminProductsComponent } from './components/admin/admin-products/admin-products.component';
import { AdminCustomersComponent } from './components/admin/admin-customers/admin-customers.component';
import { AdminDashboardCartComponent } from './components/admin/admin-dashboard-cart/admin-dashboard-cart.component'

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    FooterComponent,
    HeaderComponent,
    StoreComponent,
    FilterComponent,
    ProductCardComponent,
    CartComponent,
    UserOrdersComponent,
    LoginComponent,
    SignupComponent,
    ProductQuantityComponent,
    AdminHomeComponent,
    AdminDashboardComponent,
    AdminNewProductComponent,
    AdminOrderComponent,
    AdminProductsComponent,
    AdminCustomersComponent,
    AdminDashboardCartComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    NgbAlertModule,
    NgbPaginationModule,
    HttpClientModule,
    ModalModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
