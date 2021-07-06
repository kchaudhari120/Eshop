import { Component, OnInit } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { Observable } from 'rxjs';
import { Order } from 'src/app/models/order';
import { OrderService } from 'src/app/services/order/order.service';

@Component({
  selector: 'app-admin-order',
  templateUrl: './admin-order.component.html',
  styleUrls: ['./admin-order.component.css']
})
export class AdminOrderComponent implements OnInit {

  orders$: Observable<Order[]>
  modalRef: BsModalRef;
  selectedOrder: Order;

  constructor(private orderService: OrderService,
    private modalService: BsModalService
  ) { }

  ngOnInit(): void {
    this.collectOrders();
  }

  collectOrders() {
    this.orders$ = this.orderService.getAdminOrder()
    this.orders$.toPromise().then(r => {
      console.log(r);

    })
  }

  changeStatus(status: string, order: Order) {
    this.orderService.updateStatus({ status: status }, order._id)
      .subscribe({
        next: result => {
          console.log(result);
          order.status = status

        }
      })
  }

  viewInfo(order: Order, table) {
    this.selectedOrder = order;
    this.modalRef = this.modalService.show(table, {class : 'modal-lg'});
  }
  close() {
    this.modalRef.hide();
  }

}
