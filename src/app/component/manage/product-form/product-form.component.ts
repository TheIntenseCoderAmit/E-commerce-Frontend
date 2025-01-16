import {Component, inject} from '@angular/core';
import {FormArray, FormBuilder, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import {MatSelectModule} from '@angular/material/select';
import {MatCheckboxModule} from '@angular/material/checkbox';
import { Brand } from '../../../types/brand';
import {Category} from '../../../types/category';
import {CategoryService} from '../../../services/category.service';
import {BrandService} from '../../../services/brand.service';
import {ProductService} from '../../../services/product.service';
import {Product} from '../../../types/product';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-product-form',
  imports: [FormsModule, MatInputModule, MatButtonModule,ReactiveFormsModule,MatSelectModule,MatCheckboxModule],
  templateUrl: './product-form.component.html',
  standalone: true,
  styleUrl: './product-form.component.scss'
})
export class ProductFormComponent {
formBuilder=inject(FormBuilder);
name!:string;
productForm=this.formBuilder.group({

  name: [null,[Validators.required,Validators.minLength(5)]],
  shortDescription: [null,[Validators.required,Validators.minLength(10)]],
  description: [null,[Validators.required,Validators.minLength(50)]],
  Price: [null,[Validators.required]],
  discount: [],
  images: this.formBuilder.array([]),
  categoryId: [null,[Validators.required]],
  brandId: [null,[Validators.required]],
  isFeatured:[false],
  isNewProducts:[false],
})
categoryService=inject(CategoryService);
brandService=inject(BrandService);
productService=inject(ProductService);

  brands:Brand[]=[];
  categories:Category[]=[];
id!:string;
route=inject(ActivatedRoute);
  ngOnInit(){

  this.categoryService.getCategories().subscribe((result)=> {
    this.categories=result;
  })

    this.brandService.getBrands().subscribe((result)=> {
      this.brands=result;
    })

    this.id=this.route.snapshot.params['id'];

  if(this.id){
  this.productService.getProductById(this.id).subscribe((result)=> {
    for (let index=0;index< result.images.length;index++){
      this.addImage();
    }
  this.productForm.patchValue(result as any);
})
  }else{
    this.addImage();
  }
  }
  router=inject(Router);
  addProduct(){
  let value=this.productForm.value;
  this.productService.addProduct(value as any).subscribe((result)=> {
    alert("Product added successfully.");
    this.router.navigateByUrl("/admin/product");
  });
  }
  updateProduct() {
    let value=this.productForm.value;
    this.productService.updateProduct(value as any,this.id).subscribe((result)=> {
      alert("Product updated successfully.");
      this.router.navigateByUrl("/admin/product");
    });
  }

  addImage(){
  this.images.push(this.formBuilder.control(null))
  }

  removeImage(){
  this.images.removeAt(this.images.controls.length - 1);
  }
  get images(){
  return this.productForm.get('images') as FormArray;
  }


}
