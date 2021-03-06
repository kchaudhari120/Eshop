import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  error: string;
  success: string;

  constructor(private userService : UserService, private router : Router) { }

  ngOnInit(): void {
  }

  navigateToLoginPage(){
    this.router.navigate(['login'])
  }

  readValuesFromForm(form : HTMLFormElement){
    
    let name = (<HTMLInputElement>form.elements.namedItem('name')).value;
    let email = (<HTMLInputElement>form.elements.namedItem('email')).value;
    let phone = (<HTMLInputElement>form.elements.namedItem('phone')).value;
    let password = (<HTMLInputElement>form.elements.namedItem('password')).value;

    let user: User = {
      name, email, phone, password,
    }

    return user;
  }

  singup(event: Event) {
    event.preventDefault();
    let form = <HTMLFormElement>event.target;
    let user = this.readValuesFromForm(form);
    this.createUser(user, form);
        
  }

  createUser(user : User, form : HTMLFormElement){
    this.userService.signup(user).subscribe({
      next:(result)=>{
        console.warn(result);
        this.success = result.message;
        this.error = undefined;
        form.reset();
        this.navigateToLoginPage();
      },
      error:(responce : HttpErrorResponse)=>{
        console.warn(responce);
        this.error = responce.error.error.message;
        this.success = undefined;
      }
    })
  }
}
