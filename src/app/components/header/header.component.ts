import { Component, OnInit } from '@angular/core';
import { NavigationStart, Router } from '@angular/router';
import { CartService } from 'src/app/services/cart/cart.service';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  isloggedin = false;
  isAdminUrl = false;
  nunbersOfItems: number = 0;
  // isAdmin$: boolean = false;
  isAdmin$ 

  constructor(private cartService: CartService,
    private userService: UserService,
    private router: Router
  ) {

    router.events.subscribe({
      next : (event)=>{
        // console.log(event);
        if(event instanceof NavigationStart)
        {
          let url = (<NavigationStart>event).url
            this.isAdminUrl = url.includes('/admin')
        }
      }
    })


  }

  ngOnInit(): void {
    this.cartService.cartObervable.subscribe({
      next: (cart) => {
        console.log(cart);
        this.nunbersOfItems = Object.keys(cart).length;
      }
    })

    this.userService.loginObservable.subscribe({
      next: () => {
        let token = this.userService.getToken();
        if (token != '') {
          this.checkAdmin();
          this.isloggedin = true
        } else {
          this.isloggedin = false
        }
      }
    })

  }

  checkAdmin() {
    //check user is admin or not
    this.isAdmin$ = this.userService.isAdmin()
  }

  logout() {
    this.userService.logout();
    this.router.navigate(['login']);
  }




}
