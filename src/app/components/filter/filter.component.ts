import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { category } from 'src/app/models/category';
import { CategoryService } from 'src/app/services/category/category.service';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.css']
})
export class FilterComponent implements OnInit {

  categories: category[] = [];
  min: number[] = [];
  max: any[] = [];
  category = ''

  constructor(private categoryService: CategoryService, private router: Router) { }

  ngOnInit(): void {
    Array(10).fill('').forEach((e, index) => {
      this.min.push((index + 1) * 100);

    })

    this.collectAllCategory();
  }

  setMaxvalue(minValue: number) {
    // console.log(minValue);
    this.max = []
    Array(10).fill('').forEach((e, index) => {
      this.max.push(+minValue + (index + 1) * 100);
    })
    this.max.push(this.max[this.max.length - 1] + "+")
  }

  categorySelected(category_id: string) {
    console.log(category_id);
    this.category = category_id
    this.router.navigate(['home'], {
      queryParams: {
        'category': category_id
      }
    })

  }

  collectAllCategory() {
    this.categoryService.getAllCategories()
      .subscribe({
        next: (categories) => {
          this.categories = categories
          console.log(categories)
        },
        error: (responce: HttpErrorResponse) => {
          console.log(responce)
        }
      })
  }

  filter(minValue, maxValue) {
    let queryParams = {
      'category': this.category
    }
    if (!isNaN(minValue)) {
      queryParams['min'] = minValue;
      console.log({ minValue });
    }
    if (!isNaN(maxValue)) {
      queryParams['max'] = maxValue;
      console.log({ maxValue });
    }

    this.router.navigate(['home'], {
      queryParams
    })

  }


}
