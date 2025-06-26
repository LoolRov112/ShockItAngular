import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ProductsService } from '../services/products.service';
import { Router } from '@angular/router';
import { Product } from '../models/products';

@Component({
  selector: 'app-add-product',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './add-product.component.html',
  styleUrl: './add-product.component.css',
})
export class AddProductComponent {
  addProductForm!: FormGroup;
  products: Product[] = [];

  constructor(
    private formBuilder: FormBuilder,
    private productService: ProductsService,
    private router: Router
  ) {
    this.addProductForm = this.formBuilder.group({
      productName: ['', Validators.required],
      productType: ['', Validators.required],
      productPrice: ['', Validators.required],
      productImage: ['', Validators.required],
      productDescription: ['', Validators.required],
      productCategory: ['', Validators.required],
    });
  }
  add() {
    this.productService.getproducts().subscribe((products: Product[]) => {
      this.products = products;
    });
    let name = this.addProductForm.value.productName;
    let type = this.addProductForm.value.productType;
    let price = this.addProductForm.value.productPrice;
    let image = this.addProductForm.value.productImage;
    let description = this.addProductForm.value.productDescription;
    let category = this.addProductForm.value.productCategory;
    let stock = this.addProductForm.value.productStock;

    for (let p of this.products) {
      if (name == p.name && type == p.type) {
        alert('This Products alredy exists');
        return;
      }
    }
    this.productService.add(
      name,
      type,
      price,
      image,
      description,
      category,
      stock
    );
    setTimeout(() => {
      this.router.navigateByUrl('manageproducts');
    }, 1000);
  }
}
