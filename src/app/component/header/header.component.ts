import {Component, inject} from '@angular/core';
import {CategoryService} from '../../services/category.service';
import {Category} from '../../types/category';
import {Router, RouterLink} from '@angular/router';
import {AuthService} from '../../services/auth.service';
import {CustomerService} from '../../services/customer.service';
import {FormsModule} from '@angular/forms';

import {MatButtonModule} from '@angular/material/button';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown'


@Component({
  selector: 'app-header',
  imports: [
    RouterLink,
    FormsModule,
    MatButtonModule,
    BsDropdownModule

  ],
  templateUrl: './header.component.html',
  standalone: true,
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
path="/new-icon.svg";
searchTerm!: string;
customerService=inject(CustomerService);
categoryList:Category[]=[];

authService=inject(AuthService);
ngOnInit(){
  this.customerService.getCategories().subscribe((result)=> {
    this.categoryList=result;
  })
}
router=inject(Router);
  onSearch(e:any) {
if(e.target.value){
this.router.navigateByUrl("/products?search="+e.target.value);
};
   }

  searchCategory(_id: string) {
    this.searchTerm="";
    this.router.navigateByUrl("/products?categoryId="+_id!);
  }

  logout() {
this.authService.logout();
this.router.navigateByUrl("/login");
  }
}
