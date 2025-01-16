import { Routes } from '@angular/router';
import {AppComponent} from './app.component';
import {HomeComponent} from './component/home/home.component';
import {CategoriesComponent} from './component/manage/categories/categories.component';
import {CategoryFormComponent} from './component/manage/category-form/category-form.component';
import {BrandsComponent} from './component/manage/brands/brands.component';
import {BrandFormComponent} from './component/manage/brand-form/brand-form.component';
import {ProductComponent} from './component/manage/product/product.component';
import {ProductFormComponent} from './component/manage/product-form/product-form.component';
import {ProductListComponent} from './component/product-list/product-list.component';
import {ProductDetailsComponent} from './component/product-details/product-details.component';
import {RegisterComponent} from './component/register/register.component';
import {LoginComponent} from './component/login/login.component';
import {authGuard} from './core/auth-guard';
import {AdminDashboardComponent} from './component/manage/admin-dashboard/admin-dashboard.component';
import {adminGuard} from './core/admin-guard';
import {CustomerProfileComponent} from './component/customer-profile/customer-profile.component';
import {PageNotFoundComponent} from './component/page-not-found/page-not-found.component';
import {WishlistComponent} from './component/wishlist/wishlist.component';
import {ShoppingCartComponent} from './component/shopping-cart/shopping-cart.component';
import {OrderComponent} from './component/order/order.component';
import {OrdersComponent} from './component/manage/orders/orders.component';

export const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    canActivate:[authGuard],
  },
  {
    path: 'admin',
    component:AdminDashboardComponent,
    canActivate:[adminGuard],
  },
  {
    path:"admin/categories",
    component: CategoriesComponent,
    canActivate:[adminGuard],
  },
  {
    path:"admin/categories/add",
    component: CategoryFormComponent,
    canActivate:[adminGuard],
  },
  {
    path:"admin/categories/:id",
    component: CategoryFormComponent,
    canActivate:[adminGuard],
  },
  {
    path:"admin/brands",
    component: BrandsComponent,
    canActivate:[adminGuard],
  },
  {
    path:"admin/brands/add",
    component: BrandFormComponent,
    canActivate:[adminGuard],
  },
  {
    path:"admin/brands/:id",
    component: BrandFormComponent,
    canActivate:[adminGuard],
  },
  {
    path:"admin/product",
    component: ProductComponent,
    canActivate:[adminGuard],
  },
  {
    path:"admin/product/add",
    component: ProductFormComponent,
    canActivate:[adminGuard],
  },
  {
    path:"admin/product/:id",
    component: ProductFormComponent,
    canActivate:[adminGuard],
  },
  {
    path:"admin/orders",
    component:OrdersComponent ,
    canActivate:[adminGuard],
  },
  {
    path:"products",
    component: ProductListComponent,
    canActivate:[authGuard],
  },
  {
    path:"product/:id",
    component:ProductDetailsComponent,
    canActivate:[authGuard],
  },
  {
    path:"profile",
    component:CustomerProfileComponent,
    canActivate:[authGuard],
  },
  {
    path:"register",
    component:RegisterComponent,
  },
  {
    path:"login",
    component:LoginComponent,
  },
  {
    path:"wishlist",
    component:WishlistComponent,
    canActivate:[authGuard],
  },
  {
    path:"cart",
    component:ShoppingCartComponent,
    canActivate:[authGuard],
  },
  {
    path:"order",
    component:OrderComponent,
    canActivate:[authGuard],
  },

  {
    path:"**",
    component:PageNotFoundComponent,
  }

];
