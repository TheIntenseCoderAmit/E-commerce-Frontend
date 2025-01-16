import {Component, inject, Input} from '@angular/core';

import {Product} from '../../types/product';
import {RouterLink} from '@angular/router';
import {MatIcon, MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {WishlistCartService} from '../../services/wishlist-cart.service';
import {CartService} from '../../services/cart.service';


@Component({
  selector: 'app-product-card',
  imports: [
    RouterLink,
    MatIcon,
    MatIconModule, MatButtonModule

  ],
  templateUrl: './product-card.component.html',
  standalone: true,
  styleUrl: './product-card.component.scss'
})
export class ProductCardComponent {
  @Input() product!: Product;
  wishlistServices = inject(WishlistCartService);
  cartService=inject(CartService);

  addToWishlist(product: Product) {
    if (this.isInWishlist(product)) {
      this.wishlistServices.removeFromWishLists(product._id!).subscribe((result) => {
        this.wishlistServices.init();
      });
    } else {
      this.wishlistServices.addInWishLists(product._id!).subscribe((result) => {
        this.wishlistServices.init();
      });
    }
  }

  isInWishlist(product: Product) {
    let isExists = this.wishlistServices.wishlists.find((x) => x._id == product._id);
    if (isExists) return true;
    else return false;
  }

  addToCart(product:Product){
if(!this.isProductInCart(product._id!)){
  this.cartService.addToCart(product._id!,1).subscribe(()=>{
    this.cartService.init();
  });
}
else{
  this.cartService.removeFromCart(product._id!).subscribe(()=>{
    this.cartService.init();
  });
}
  }

  isProductInCart(productId:string){
    if(this.cartService.items.find(x=>x.product._id==productId)){
      return true;
    }else {
      return false;
    }
  }



}
