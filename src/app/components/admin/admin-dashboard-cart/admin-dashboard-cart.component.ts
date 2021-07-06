import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'admin-dashboard-cart',
  templateUrl: './admin-dashboard-cart.component.html',
  styleUrls: ['./admin-dashboard-cart.component.css']
})
export class AdminDashboardCartComponent implements OnInit {

  @Input('value')
  value : Number;

  constructor() { }

  ngOnInit(): void {
  }

}
