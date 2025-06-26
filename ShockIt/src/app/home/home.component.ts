import { NgFor } from '@angular/common';
import { Component } from '@angular/core';
import { Product } from '../models/products';
import { RouterLink, RouterOutlet } from '@angular/router';
import { ProductsService } from '../services/products.service';
import { Observable, of } from 'rxjs';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [NgFor, RouterLink, RouterOutlet],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {
  products: Product[] = [];
  constructor(private productService: ProductsService) {
    this.productService.getPopular().subscribe((products: Product[]) => {
      this.products = products;
    });
  }
}
