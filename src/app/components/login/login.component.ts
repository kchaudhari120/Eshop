import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  error: string;
  success: string;
  form : HTMLFormElement;
  returnUrl: string;

  constructor(private userServices : UserService ,
    private route : ActivatedRoute,
    private router : Router) { }

  ngOnInit(): void {
  
    this.route.queryParamMap.subscribe((params : ParamMap)=>{
      this.returnUrl = params.get('returnUrl')
    })

  }

  nevigateToHome(){

    let url = this.returnUrl ? this.returnUrl : '/';
    this.router.navigateByUrl(url);

  }

  login(event : Event){
    event.preventDefault();
    console.log();
    this.form = <HTMLFormElement>event.target;
    this.readFormValues();
  }

  readFormValues(){
    let email = (<HTMLInputElement>this.form.elements.namedItem('email')).value;
    let password = (<HTMLInputElement>this.form.elements.namedItem('password')).value;

    let credintial = {
      email, password
    }
    console.log(credintial);
    this.userServices.login(credintial).subscribe(
      {
        next : (result)=>{
          console.warn(result);
          this.success = result.message;
          this.error = undefined
          this.nevigateToHome()
        },
        error : (responce : HttpErrorResponse)=>{
          console.warn(responce.error);
          this.error = responce.error.error.message;  
          this.success =undefined
        }
      } 
    )
  }

  
}
