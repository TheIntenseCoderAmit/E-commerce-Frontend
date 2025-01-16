import {Component, inject} from '@angular/core';
import {CartService} from '../../services/cart.service';
import {Product} from '../../types/product';
import {FormBuilder, FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatStepperModule} from '@angular/material/stepper';
import {MatRadioModule} from '@angular/material/radio';
import {OrderService} from '../../services/order.service';
import {Order} from '../../types/order';
import {Router} from '@angular/router';



@Component({
  selector: 'app-shopping-cart',
  imports: [
    ReactiveFormsModule, MatStepperModule, MatRadioModule, FormsModule,
  ],
  templateUrl: './shopping-cart.component.html',
  standalone: true,
  styleUrl: './shopping-cart.component.scss'
})
export class ShoppingCartComponent {
  router=inject(Router);
cartService=inject(CartService);

ngOnInit(){

  this.cartService.init();
}

get cartItems(){
  return this.cartService.items;
}
sellingPrice(product:Product){
  return product.Price;
}

addToCart(productId:string,quantity:number){
this.cartService.addToCart(productId,quantity).subscribe(result=>{
  this.cartService.init()
})
}
get totalAmount(){
  let amount=0;

  for(let i=0;i<this.cartItems.length;i++){
    const element =this.cartItems[i];
    amount += this.sellingPrice(element.product) * element.quantity
  }
  return amount;
}
cardCompany:string[]=[
"https://1000logos.net/wp-content/uploads/2021/11/VISA-logo-tumb.jpg",
  "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b7/MasterCard_Logo.svg/450px-MasterCard_Logo.svg.png",
"https://upload.wikimedia.org/wikipedia/commons/thumb/f/fa/American_Express_logo_%282018%29.svg/225px-American_Express_logo_%282018%29.svg.png"
];
orderStep=0;
fromBuilder=inject(FormBuilder);
paymentType='cash';
addressForm=this.fromBuilder.group({
  name:[''],
  address1:[''],
  address2:[''],
  city:[''],
  state:[''],
  pin_code:['']

})
  checkout() {
    this.orderStep=1;
  }

  addAddress() {
    this.orderStep=2;
  }

  orderService=inject(OrderService);

  completeOrder(){
  let order:Order={
    items:this.cartItems,
    paymentType:this.paymentType,
    address:this.addressForm.value,
    date:new Date(),

  }
  this.orderService.addOrder(order).subscribe(result=>{
    alert("Your order is successful");
    this.cartService.init();
    this.orderStep=0;
    this.router.navigateByUrl('/order');
  });

  }
}
