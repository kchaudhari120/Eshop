import { Component, Input, OnInit } from '@angular/core';
import { product } from 'src/app/models/product';
import { CartService } from 'src/app/services/cart/cart.service';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.css']
})
export class ProductCardComponent implements OnInit {
  @Input('product')
 product : product;
  quantity: number = 0;

  constructor(private cardService : CartService) { }

  ngOnInit(): void {
    // console.log(this.product);

    this.cardService.cartObervable.subscribe({
      next : (cart)=>{
        this.quantity = this.cardService.getQuantity(this.product);
      }
    })
  }

 

  addToCart(){
    console.log(this.product);
    this.cardService.addToCart(this.product);
  }
}
