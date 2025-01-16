import {Component, inject} from '@angular/core';
import {WishlistCartService} from '../../services/wishlist-cart.service';
import {ProductCardComponent} from '../product-card/product-card.component';
import {Product} from '../../types/product';

@Component({
  selector: 'app-wishlist',
  imports: [
    ProductCardComponent
  ],
  templateUrl: './wishlist.component.html',
  standalone: true,
  styleUrl: './wishlist.component.scss'
})
export class WishlistComponent {
wishlistService=inject(WishlistCartService);
wishlist:Product[]=[];

ngOnInit(){
  this.wishlistService.init();
}

}
