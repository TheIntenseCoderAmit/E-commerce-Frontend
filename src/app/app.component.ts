import {Component, inject} from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {MatButtonModule} from '@angular/material/button';
import {HeaderComponent} from './component/header/header.component';
import {FooterComponent} from './component/footer/footer.component';
import {WishlistCartService} from './services/wishlist-cart.service';
import {CartService} from './services/cart.service';
import {AuthService} from './services/auth.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, MatButtonModule, HeaderComponent, FooterComponent,],
  templateUrl: './app.component.html',
  standalone: true,
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'Webapp';
  wishlistServices=inject(WishlistCartService);
  cartService=inject(CartService);
  authService=inject(AuthService);
  ngOnInit(){
    if(this.authService.isLoggedIn) {
      this.wishlistServices.init();
      this.cartService.init();
    }
  }
}
