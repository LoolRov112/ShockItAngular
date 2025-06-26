import { Component, ElementRef, Input, ViewChild } from '@angular/core';
import { Product } from '../models/products';
import { CommonModule } from '@angular/common';
import { ProductsService } from '../services/products.service';
import { RouterLink } from '@angular/router';

declare var bootstrap: any;

import {
  FormGroup,
  ReactiveFormsModule,
  Validators,
  FormBuilder,
  FormsModule,
} from '@angular/forms';
import { CartService } from '../services/cart.service';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink, FormsModule],
  templateUrl: './products.component.html',
  styleUrl: './products.component.css',
})
export class ProductsComponent {
  productsToShow: Product[] = [];
  allProduct: Product[] = [];
  selectedProduct: Product | null = null;
  selectedQuantity: number = 1;
  searchForm!: FormGroup;
  id!: string;
  email = '';
  isLoggedIn: boolean = false;

  constructor(
    private productService: ProductsService,
    private formBuilder: FormBuilder,
    private cartService: CartService
  ) {
    if (
      typeof window !== 'undefined' &&
      typeof sessionStorage !== 'undefined'
    ) {
      this.email = sessionStorage.getItem('mail') || '';
      this.isLoggedIn = sessionStorage.getItem('loggedIn') === 'true';
    }
    this.productService.getproducts().subscribe((products: Product[]) => {
      this.allProduct = products;
      this.productsToShow = products;
    });
    this.searchForm = this.formBuilder.group({
      price: ['', Validators.required],
    });
  }
  @Input() set category(cat: string) {
    if (cat == 'all') this.productsToShow = this.allProduct;
    else {
      this.productsToShow = [];
      for (let p of this.allProduct)
        if (p.category == cat) this.productsToShow.push(p);
    }
  }
  search() {
    let price = this.searchForm.value.price;
    if (!isNaN(price)) {
      if (price == null || price == '')
        this.productService.getproducts().subscribe((products: Product[]) => {
          this.productsToShow = products;
        });
      else this.productService.getByPrice(price);
    }
  }
  add(email: string, productId: string, qty: number = 1) {
    if (!email) {
      console.error('Email is required to add a product to the cart.');
      return;
    }
    if (
      qty <= 0 ||
      (this.selectedProduct &&
        this.selectedProduct.stock !== undefined &&
        qty > this.selectedProduct.stock)
    ) {
      alert(
        'Quantity must be greater than zero and less than or equal to available stock.'
      );
      this.closeModal();
      return;
    }
    this.cartService.addToCart(email, productId, qty).subscribe((response) => {
      this.closeModal();
    });
  }
  @ViewChild('quantityModal') quantityModal!: ElementRef;
  closeModal() {
    const modal = bootstrap.Modal.getInstance(this.quantityModal.nativeElement);
    if (modal) {
      modal.hide();
    }
  }
}
