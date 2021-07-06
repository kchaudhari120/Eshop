import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { Order } from 'src/app/models/order';
import { UserService } from '../user/user.service';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  orderURL = "http://localhost/api/orders"
  userAllOrderURL = "http://localhost/api/orders"


  constructor(private http: HttpClient, private userService: UserService) { }

  placeOrder(orderInfo: OrderInfo) {
    let headers = new HttpHeaders({
      'authorization': this.userService.getToken()
    })
    return this.http.post(this.orderURL, orderInfo, { headers })
  }

  getUserOrder(all ?:boolean) {
    let url = this.userAllOrderURL;
    if(all){
      url = url + '?all=true';
    }

    let headers = new HttpHeaders({
      'authorization': this.userService.getToken()
    })
    return this.http.get(url, { headers })
      .pipe(
        map((result: { count: Number, orders: Order[] }) => {
          return result.orders
        })
      )
  }

  getAdminOrder(){
    return this.getUserOrder(true);
  }

  updateStatus(data : {status : String}, orderId : String) {
    let headers = new HttpHeaders({
      'authorization': this.userService.getToken()
    })
    return this.http.patch(this.orderURL+'/'+orderId, data, { headers })
  }

}



export interface ProductInfo {
  productId: string;
  quantity: number;
  price: number;
}

export interface OrderInfo {
  firstName: string;
  lastName: string;
  address: string;
  products: ProductInfo[];
}


