import { Component } from '@angular/core';
import { Product } from '../models/products';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductsService } from '../services/products.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-products-details',
  standalone: true,
  imports: [],
  templateUrl: './products-details.component.html',
  styleUrl: './products-details.component.css',
})
export class ProductsDetailsComponent {
  selectedProduct: Product | undefined;
  constructor(
    private actRoute: ActivatedRoute,
    private router: Router,
    private productService: ProductsService
  ) {
    let id = actRoute.snapshot.params['id'];
    this.productService.getById(id).subscribe((product: Product) => {
      this.selectedProduct = product;
    });
  }
  goBackHome() {
    this.router.navigateByUrl('home');
  }
}
