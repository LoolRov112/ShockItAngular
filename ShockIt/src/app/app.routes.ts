import { Routes } from '@angular/router';
import { AboutComponent } from './about/about.component';
import { HomeComponent } from './home/home.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { ProductsDetailsComponent } from './products-details/products-details.component';
import { CatalogComponent } from './catalog/catalog.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { AddProductComponent } from './add-product/add-product.component';
import { ProfileComponent } from './profile/profile.component';
import { UserDetailsComponent } from './user-details/user-details.component';
import { ManageproductsComponent } from './manageproducts/manageproducts.component';
import { ViewProductsComponent } from './view-products/view-products.component';
import { EditProductComponent } from './edit-product/edit-product.component';
import { CartComponent } from './cart/cart.component';
import { OrdersComponent } from './orders/orders.component';

export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'home',
  },
  {
    path: 'about',
    component: AboutComponent,
  },
  {
    path: 'home',
    component: HomeComponent,
  },
  {
    path: 'catalog',
    component: CatalogComponent,
  },
  {
    path: 'cart',
    component: CartComponent,
  },
  {
    path: 'profile',
    component: ProfileComponent,
    children: [
      { path: '', pathMatch: 'full', redirectTo: 'login' },
      { path: 'login', component: LoginComponent },
      { path: 'userDetails', component: UserDetailsComponent },
      { path: 'register', component: RegisterComponent },
    ],
  },
  {
    path: 'manageproducts',
    component: ManageproductsComponent,
    children: [
      { path: '', pathMatch: 'full', redirectTo: 'viewProducts' },
      { path: 'viewProducts', component: ViewProductsComponent },
      { path: 'addProduct', component: AddProductComponent },
      { path: 'updateProduct/:id', component: EditProductComponent },
    ],
  },
  { path: 'products/:id', component: ProductsDetailsComponent },
  { path: 'orders', component: OrdersComponent },
  { path: '**', component: NotFoundComponent },
];
