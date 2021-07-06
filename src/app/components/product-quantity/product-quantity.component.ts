import { Component, Input, OnInit } from '@angular/core';
import { product } from 'src/app/models/product';
import { CartService } from 'src/app/services/cart/cart.service';

@Component({
  selector: 'app-product-quantity',
  templateUrl: './product-quantity.component.html',
  styleUrls: ['./product-quantity.component.css']
})
export class ProductQuantityComponent implements OnInit {

  @Input('product')
  product : product;

  constructor(private cardService : CartService) { }
  quantity: number = 0;

  ngOnInit(): void {
    
    this.cardService.cartObervable.subscribe({
      next : (cart)=>{
        this.quantity = this.cardService.getQuantity(this.product);
      }
    })
  }

  minusQuantity(){
    this.quantity --;
    this.cardService.setQuantity(this.product, this.quantity);
  }

  plusQuantity(){
    this.quantity ++;
    this.cardService.setQuantity(this.product, this.quantity);
  }

}
