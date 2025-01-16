import { Injectable ,inject} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Category} from '../types/category';
import {environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})

export class CategoryService {
  http = inject(HttpClient);

  constructor() {
  }

  getCategories() {
    return this.http.get<Category[]>(environment.apiUrl+'/category');
  }

  addCategory(name: string,) {
    return this.http.post(environment.apiUrl+'/category', {
      name: name,
    });
  }

  getCategoryById(id: string) {
    return this.http.get<Category>(environment.apiUrl+'/category/' + id);
  }

  updateCategory(name: string, id: string) {
    return this.http.put(environment.apiUrl+'/category/' + id, {
      name: name,
    });

  }

  deleteCategoryById(id: string) {
    return this.http.delete(environment.apiUrl+'/category/'+id);
  }

}
