import { HttpClient, HttpHeaders } from '@angular/common/http';
import { identifierName } from '@angular/compiler';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/Operators';
import { product } from 'src/app/models/product';
import { UserService } from '../user/user.service';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  productUrl = "http://localhost/api/products"

  constructor(private http: HttpClient, private userService: UserService) { }

  //GET ALL PRODUCT
  getAllProduct(params) {

    let query = new URLSearchParams()

    if (params['category']) {
      query.append('category', params['category'])
    }
    if (params['min']) {
      query.append('min', params['min'])
    }
    if (params['max']) {
      query.append('max', params['max'])
    }

    console.log(query.toString());


    return this.http.get(`${this.productUrl}?${query.toString()}`,
      {
        headers: {
          "authorization": this.userService.getToken()
        }
      }
    )
      .pipe(
        map((result: { count: number, products: product[] }) => {
          return result.products
        })
      )
  }
  //GET PRODUCT BY ID
  getProductById(id: string) {
    return this.http.get(`${this.productUrl}/${id}`,
      {
        headers: {
          "authorization": this.userService.getToken()
        }
      }
    )
      .pipe(
        map((result) => {
          return <product>result
        })
      )
  }

  //SAVE PRODUCT 
  saveProduct(data : FormData) {
    let headers = new HttpHeaders({
      'authorization': this.userService.getToken()
    })
    return this.http.post(this.productUrl, data, { headers })
      .pipe(
        map((result: { message: string, product: product }) => {
          return <product>result.product
        })
      )
  }

  //UPDATE PRODUCT 
  updateProduct(data, id) {
    let headers = new HttpHeaders({
      'authorization': this.userService.getToken()
    })
    return this.http.patch(this.productUrl + '/' + id, data, { headers })
  }

}
