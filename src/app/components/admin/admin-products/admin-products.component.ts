import { Component, OnInit } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { category } from 'src/app/models/category';
import { product } from 'src/app/models/product';
import { CategoryService } from 'src/app/services/category/category.service';
import { ProductService } from 'src/app/services/product/product.service';

@Component({
  selector: 'app-admin-products',
  templateUrl: './admin-products.component.html',
  styleUrls: ['./admin-products.component.css']
})
export class AdminProductsComponent implements OnInit {
  categorySubcription;
  categories: category[];
  products: product[] = [];
  selectedProduct: product;
  modalRef: BsModalRef;

  constructor(private productService: ProductService,
    private modalService: BsModalService,
    private categoryService: CategoryService
  ) { }


  ngOnInit(): void {
    this.collectAllProducts();
    this.collectCategary();
  }


  collectAllProducts() {
    this.productService.getAllProduct({}).subscribe({
      next: (products) => {
        this.products = products
      }
    })
  }

  //COLECT ALL CATEGORY
  collectCategary() {
    this.categorySubcription = this.categoryService.getAllCategories().subscribe({
      next: (categories) => {
        this.categories = categories
      }
    })
  }

  //OPEN MODAL
  openModel(formTemplate, product: product) {
    this.selectedProduct = product;
    this.modalRef = this.modalService.show(formTemplate)
  }

  //UPADET FORM
  updateProduct(productForm: HTMLFormElement) {
    let name = (<HTMLInputElement>productForm.elements.namedItem('name')).value;
    let price = (<HTMLInputElement>productForm.elements.namedItem('price')).value;
    let category = (<HTMLSelectElement>productForm.elements.namedItem('category')).value;

    let values = {
      name,
      price,
      category
    }

    this.productService.updateProduct(values, this.selectedProduct._id).subscribe({
      next: (values) => {
        this.selectedProduct.name = name;
        this.selectedProduct.price = price;
        this.categories.find((el, index, arr) => {
          if (el._id == category) {
            this.selectedProduct.category = el;
          }
        })
        this.modalRef.hide()
      },
      error: (error) => {

      }
    })
  }
}
