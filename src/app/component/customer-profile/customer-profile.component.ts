import {Component, inject} from '@angular/core';
import {AuthService} from '../../services/auth.service';
import {RouterLink} from '@angular/router';

@Component({
  selector: 'app-customer-profile',
  imports: [
    RouterLink
  ],
  templateUrl: './customer-profile.component.html',
  standalone: true,
  styleUrl: './customer-profile.component.scss'
})
export class CustomerProfileComponent {
authService=inject(AuthService);
}
