import {Component, inject} from '@angular/core';
import {CustomerService} from '../../services/customer.service';
import {ActivatedRoute} from '@angular/router';
import {Product} from '../../types/product';
import {ProductCardComponent} from '../product-card/product-card.component';
import {MatIcon} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {WishlistCartService} from '../../services/wishlist-cart.service';
import {CartService} from '../../services/cart.service';

@Component({
  selector: 'app-product-details',
  imports: [
    ProductCardComponent,
    MatIcon,
    MatButtonModule
  ],
  templateUrl: './product-details.component.html',
  standalone: true,
  styleUrl: './product-details.component.scss'
})
export class ProductDetailsComponent {
customerService=inject(CustomerService);
route=inject(ActivatedRoute);
product!:Product;
mainImage!:string;
wishlistServices=inject(WishlistCartService);
  cartService=inject(CartService);
similarProducts:Product[]=[];
ngOnInit() {
  this.route.params.subscribe((x: any)=>{
    this.getProductDetails(x.id);
  });

}
getProductDetails(id:string){
  this.customerService.getProductById(id).subscribe((result:any)=> {
    this.product=result;
    this.mainImage=this.product.images[0];
    this.customerService.getProducts('',this.product.categoryId,'',-1,'',1,4).subscribe(result=>{
      this.similarProducts=result;
    })
  });
}

  changeImage(url: string) {
    this.mainImage=url;
  }

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
