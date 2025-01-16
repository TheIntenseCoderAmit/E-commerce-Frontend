import {Component, inject} from '@angular/core';
import {CustomerService} from '../../services/customer.service';
import {Product} from '../../types/product';
import {ProductCardComponent} from '../product-card/product-card.component';
import {ActivatedRoute, RouterLink} from '@angular/router';
import {Category} from '../../types/category';
import {Brand} from '../../types/brand';
import {FormsModule} from '@angular/forms';
import {MatFormField, MatLabel, MatOption, MatSelect, MatSelectModule} from '@angular/material/select';
import {MatButtonModule} from '@angular/material/button';
@Component({
  selector: 'app-product-list',
  imports: [ProductCardComponent, FormsModule, MatFormField, MatSelect, MatOption,MatLabel,MatSelectModule,MatButtonModule],
  templateUrl: './product-list.component.html',
  standalone: true,
  styleUrl: './product-list.component.scss'
})
export class ProductListComponent {
  customerService = inject(CustomerService);
  searchTerm: string = "";
  categoryId: string = "";
  sortBy: string = "";
  sortOrder: number = -1;
  brandId: string = "";
  page= 1;
  pageSize= 6;
  products: Product[] = [];
route=inject(ActivatedRoute);
category:Category[]=[];
brands:Brand[]=[];

  ngOnInit() {
    this.customerService.getCategories().subscribe((result)=> {
      this.category=result;
    })
    this.customerService.getBrands().subscribe((result)=> {
      this.brands=result;
    })

this.route.queryParams.subscribe((x:any )=> {
  this.searchTerm=x.search || '';
  this.categoryId=x.categoryId || '';

this.getProducts();
})
  }

  getProducts() {
  setTimeout(()=>{
    this.customerService.getProducts(this.searchTerm, this.categoryId, this.sortBy, this.sortOrder, this.brandId,this.page,this.pageSize).subscribe((result) => {
      this.products = result;
      if(result.length > this.pageSize){
        this.isNext=false;
      }
    });
  },500)
  }

  orderChange(event:any) {
  this.sortBy = 'price',
  this.sortOrder = event;
  this.getProducts();

  }
isNext=true;
  pageChange(page: number) {
    this.page=page;
    this.isNext=true;
    this.getProducts();
  }
}
