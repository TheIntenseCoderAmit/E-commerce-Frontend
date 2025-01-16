import {Component, inject} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';

import {ActivatedRoute, Router} from '@angular/router';
import {BrandService} from '../../../services/brand.service';
@Component({
  selector: 'app-brand-form',
  imports: [FormsModule, MatInputModule, MatButtonModule],
  templateUrl: './brand-form.component.html',
  standalone: true,
  styleUrl: './brand-form.component.scss'
})
export class BrandFormComponent {
name!:string;
brandService=inject(BrandService);
router=inject(Router);
  isEdit=false;
  route=inject(ActivatedRoute);
  id!:string;
  ngOnInit(){
     this.id=this.route.snapshot.params['id'];
    if(this.id){
      this.isEdit=true;
      this.brandService.getBrandById(this.id).subscribe((result:any)=> {
        this.name=result.name;
      })
    }
  }

  add(){
    this.brandService.addBrand(this.name).subscribe((result:any)=> {
      alert("Brand added successfully.");
      this.router.navigateByUrl("/admin/brands");
    });
  }

  update() {
    this.brandService.updateBrand(this.name,this.id).subscribe((result:any)=> {
      alert("Brand updated successfully.");
      this.router.navigateByUrl("/admin/brands");
    });
  }

  delete(){
    this.brandService.deleteBrandById(this.id).subscribe((result:any)=> {})
  }


}
