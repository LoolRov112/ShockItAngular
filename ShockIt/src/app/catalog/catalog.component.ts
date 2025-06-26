import { Component } from '@angular/core';
import { CatalogSidebarComponent } from '../catalog-sidebar/catalog-sidebar.component';
import { ProductsComponent } from '../products/products.component';

@Component({
  selector: 'app-catalog',
  standalone: true,
  imports: [CatalogSidebarComponent, ProductsComponent],
  templateUrl: './catalog.component.html',
  styleUrls: ['./catalog.component.css'],
})
export class CatalogComponent {
  _category: string = 'all';

  setCategory(category: string) {
    this._category = category;
  }
}
