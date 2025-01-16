import {Component, inject} from '@angular/core';

import {DatePipe} from '@angular/common';
import {Order} from '../../../types/order';
import {OrderService} from '../../../services/order.service';
import {MatButtonToggleModule} from '@angular/material/button-toggle';

@Component({
  selector: 'app-orders',
  imports: [
    DatePipe, MatButtonToggleModule,
  ],
  templateUrl: './orders.component.html',
  standalone: true,
  styleUrl: './orders.component.scss'
})
export class OrdersComponent {
orderService=inject(OrderService);
orders:Order[]=[];
  protected readonly Math = Math;

  ngOnInit(){
    this.orderService.getAdminOrder().subscribe(result=>{
      this.orders=result;
    })
  }

  statusChange(button: any,order:Order) {
    console.log(button.value);
    this.orderService.updateOrderStatus(order._id!,button.value).subscribe(result=>{
      alert("Order status updated");
    })
  }
}
