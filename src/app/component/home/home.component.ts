import {Component, inject} from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import {CustomerService} from '../../services/customer.service';
import {Product} from '../../types/product';
import {ProductCardComponent} from '../product-card/product-card.component';
import {CarouselModule} from 'ngx-owl-carousel-o';
import {CarouselComponent} from './carousel/carousel.component';
import {WishlistCartService} from '../../services/wishlist-cart.service';
import {CartService} from '../../services/cart.service';


@Component({
  imports: [MatButtonModule, MatCardModule, ProductCardComponent, CarouselModule, CarouselComponent],
  selector: 'app-home',
  standalone: true,
  styleUrl: './home.component.scss',
  templateUrl: './home.component.html'
})
export class HomeComponent {
  customerService = inject(CustomerService);
  newProducts: Product[] = [];
  featuredProducts: Product[] = [];
wishlistServices=inject(WishlistCartService);
cartService=inject(CartService);

  ngOnInit() {
    this.customerService.getNewProducts().subscribe((result) => {
      this.newProducts = result;
    })

    this.customerService.getFeaturedProduct().subscribe((result) => {
      this.featuredProducts = result;

    });

  }


}
