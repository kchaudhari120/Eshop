import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { product } from 'src/app/models/product';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  cart = {};
  private _cartObservable: BehaviorSubject<object>;

  constructor() {
    if (!this.isCartExist())
      localStorage.setItem('cart', JSON.stringify(this.cart));
    this.readCartDataFromLocalStorege();
    this._cartObservable = new BehaviorSubject(this.cart);
  }

  readCartDataFromLocalStorege() {
    this.cart = JSON.parse(localStorage.getItem('cart'));
  }

  writeCartDataToLocalStorege() {
    localStorage.setItem('cart', JSON.stringify(this.cart))
  }

  get cartObervable() {
    return this._cartObservable;
  }

  addToCart(product: product) {
    let quantity = this.cart[product._id];
    if (quantity) {
      this.cart[product._id] = (+quantity) + 1;
    } else {
      this.cart[product._id] = 1;
    }

    this._cartObservable.next(this.cart);
    localStorage.setItem('cart', JSON.stringify(this.cart));
  }

  clearCart(){
    localStorage.removeItem('cart');
    this._cartObservable.next({})
  }

  getQuantity(product: product) {
    return this.cart[product._id] ? +this.cart[product._id] : 0
  }

  setQuantity(product: product, quantity: number) {
    if (quantity < 1) {
      delete this.cart[product._id];
    } else {
      this.cart[product._id] = quantity;
    }
    this.writeCartDataToLocalStorege();
    this._cartObservable.next(this.cart);

  }

  isCartExist() {
    if (localStorage.getItem('cart')) {
      return true
    } else {
      return false
    }
  }
}
