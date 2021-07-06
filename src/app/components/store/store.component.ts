import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Params } from '@angular/router';
import { product } from 'src/app/models/product';
import { ProductService } from 'src/app/services/product/product.service';

@Component({
  selector: 'app-store',
  templateUrl: './store.component.html',
  styleUrls: ['./store.component.css']
})
export class StoreComponent implements OnInit {

  products: product[] = [];
  constructor(private productServices: ProductService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.queryParamMap.subscribe({
      next: (paramMap: ParamMap) => {
        let categoriID = paramMap.get('category');
        let min = paramMap.get('min');
        let max = paramMap.get('max');

        // console.log(categoriID);
        this.collectAllProduct({ category: categoriID, min, max })
      }
    })

  }


  collectAllProduct(params) {
    this.productServices.getAllProduct(params)
      .subscribe(
        {
          next: (product) => {
            // console.log(product);
            this.products = product

          },
          error: (responce: HttpErrorResponse) => {
            console.log(responce);

          }
        }
      )
  }

}
