import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ProductsService } from '../services/products.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from '../models/products';

@Component({
  selector: 'app-edit-product',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './edit-product.component.html',
  styleUrl: './edit-product.component.css',
})
export class EditProductComponent {
  editFormGroup!: FormGroup;
  productId!: string;
  product: Product | any;

  constructor(
    private formBuilder: FormBuilder,
    private productService: ProductsService,
    private router: Router,
    private actRoute: ActivatedRoute
  ) {
    this.productId = actRoute.snapshot.params['id'];
    this.product = productService.getById(this.productId).subscribe((data) => {
      this.product = data;
      this.editFormGroup = this.formBuilder.group({
        productName: [this.product.name, Validators.required],
        productType: [this.product.type, Validators.required],
        productPrice: [this.product.price, Validators.required],
        productImage: [this.product.img, Validators.required],
        productDescription: [this.product.description, Validators.required],
        productCategory: [this.product.category, Validators.required],
      });
    });
  }

  editProduct() {
    this.productId = this.actRoute.snapshot.params['id'];
    this.product = this.productService.getById(this.productId);
    if (this.product) {
      let name = this.editFormGroup.value.productName;
      let type = this.editFormGroup.value.productType;
      let price = this.editFormGroup.value.productPrice;
      let image = this.editFormGroup.value.productImage;
      let description = this.editFormGroup.value.productDescription;
      let category = this.editFormGroup.value.productCategory;
      this.productService.change(
        this.productId,
        name,
        type,
        price,
        image,
        description,
        category
      );
    }
    setTimeout(() => {
      this.router.navigateByUrl('manageproducts');
    }, 1000);
  }
}
