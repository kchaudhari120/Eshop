import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/Operators';
import { category } from 'src/app/models/category';
import { UserService } from '../user/user.service';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  categoryURL = "http://localhost/api/categories"
  constructor(private http: HttpClient, private userService: UserService) { }



  saveCategory(data  : {title : string }){
    let headers = new HttpHeaders({
      'authorization' : this.userService.getToken()
    })
    return this.http.post(this.categoryURL  , data   , {headers})
    .pipe(map((result : {message : string , category : category})=>{
      return result.category;
    }))
  }


  getAllCategories() {
    return this.http.get(this.categoryURL)
      .pipe(
        map(result => {
          return <category[]>result['categories']
        })
      )
  }

}
