import { Component } from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import {RouterLink} from '@angular/router';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown'


@Component({
  selector: 'app-admin-dashboard',
  imports: [MatButtonModule, RouterLink, BsDropdownModule],
  templateUrl: './admin-dashboard.component.html',
  providers: [],
  standalone: true,
  styleUrl: './admin-dashboard.component.scss'
})
export class AdminDashboardComponent {

}
