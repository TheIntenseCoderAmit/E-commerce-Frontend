import {inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Product} from '../types/product';
import {environment} from '../../environments/environment';
import {CartItem} from '../types/cart-item';

@Injectable({
  providedIn: 'root'
})
export class CartService {
http=inject(HttpClient);

  constructor() { }
items:CartItem[]=[];
  init(){
    this.getCartItem().subscribe(result=>{
this.items=result;
    })
  }

getCartItem(){
    return this.http.get<CartItem[]>(environment.apiUrl+"/customer/cart")
}

addToCart(productId:string,quantity:number){
  return this.http.post(environment.apiUrl+"/customer/cart/"+productId,{
    quantity:quantity,
  });
}
removeFromCart(productId:string){
  return this.http.delete(environment.apiUrl+"/customer/cart/"+productId);
}

}
