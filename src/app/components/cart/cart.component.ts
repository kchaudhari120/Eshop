import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { forkJoin, Subscription } from 'rxjs';
import { map } from 'rxjs/Operators';
import { product } from 'src/app/models/product';
import { CartService } from 'src/app/services/cart/cart.service';
import { OrderInfo, OrderService, ProductInfo } from 'src/app/services/order/order.service';
import { ProductService } from 'src/app/services/product/product.service';


interface CartItem {
  product: product,
  quantity: number
}

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  constructor(private cartService: CartService,
    private modalService: BsModalService,
    private orderService : OrderService,
    private router: Router,
    private productService: ProductService) { }
  total: number = 0;
  cart;
  cartItems: CartItem[] = [];
  cartSubscription: Subscription
  modalRef: BsModalRef

  ngOnInit(): void {
    this.subcribeCart();
  }

  ngOnDestroy(): void {
    this.cartSubscription.unsubscribe();
  }

  subcribeCart() {
    let total = 0;
    this.cartSubscription = this.cartService.cartObervable.subscribe({
      next: (cart) => {
        let observables = [];
        total = 0;
        if (Object.keys(cart).length == 0) {
          this.cartItems = []
        }
        for (let id in cart) {
          console.log(id);
          observables.push(
            this.productService.getProductById(id)
              .pipe(
                map(product => {
                  total += (<any>product.price * cart[id]);
                  let item: CartItem = {
                    product: product,
                    quantity: cart[id]
                  }
                  return item;

                })
              )
          );

        }
        forkJoin(observables).subscribe({
          next: (cartItems: CartItem[]) => {
            this.total = total;
            this.cartItems = cartItems
            console.log(this.cartItems)
          }
        })

      }
    })
  }
  //openModal
  openModal(form) {
    this.modalRef = this.modalService.show(form, {
      animated: true,
      class: 'modal-lg'
    })
  }

  //checkout
  checkout(event: Event, form: HTMLFormElement) {
    event.preventDefault();
    let firstName = (<HTMLInputElement>form.elements.namedItem('firstName')).value;
    let lastName = (<HTMLInputElement>form.elements.namedItem('lastName')).value;
    let address = (<HTMLInputElement>form.elements.namedItem('address')).value;

    let orderInfo: OrderInfo;
    let productInfos: ProductInfo[] = [];
    this.cartItems.forEach(e => {
      productInfos.push({
        price: <any>e.product.price,
        productId: e.product._id,
        quantity: e.quantity
      })
    })

    orderInfo = {
      address,
      firstName,
      lastName,
      products: productInfos
    }
    console.log({
      orderInfo
    });

    this.orderService.placeOrder(orderInfo).subscribe({
      next : (result)=>{
        this.modalRef.hide();
        this.cartService.clearCart();
        this.router.navigate(['orders'])
      },
      error : (err)=>{
        console.log({'err': 'cant place order'})
      }
    })

    return false;

  }

}
