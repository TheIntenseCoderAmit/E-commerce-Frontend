import {Component, inject} from '@angular/core';
import {Order} from '../../types/order';
import {OrderService} from '../../services/order.service';
import {DatePipe} from '@angular/common';


@Component({
  selector: 'app-order',
  imports: [
DatePipe
  ],
  templateUrl: './order.component.html',
  standalone: true,
  styleUrl: './order.component.scss'
})
export class OrderComponent {
orders:Order[]=[];
orderService=inject(OrderService);

ngOnInit(){
this.orderService.getCustomerOrder().subscribe((result)=>{
  this.orders=result;

})
}

  protected readonly Math = Math;
}
