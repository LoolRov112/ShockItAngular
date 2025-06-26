import { Component } from '@angular/core';
import { Cart } from '../models/Cart/cart';
import { CartService } from '../services/cart.service';
import { UsersService } from '../services/users.service';
import { CommonModule } from '@angular/common';
import { Product } from '../models/products';
import { Router } from '@angular/router';
@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css',
})
export class CartComponent {
  [x: string]: any;
  currentCart: Cart | undefined;
  userEmail: string | undefined;
  cartItems: Product[] = [];
  totalPrice: number = 0;
  qty: Number = 1;
  cartService: CartService | undefined;

  constructor(
    cartService: CartService,
    userService: UsersService,
    private router: Router
  ) {
    this.cartService = cartService;
    if (
      typeof window !== 'undefined' &&
      typeof sessionStorage !== 'undefined'
    ) {
      this.userEmail = sessionStorage.getItem('mail') || '';
      if (this.userEmail) {
        cartService.getCartByEmail(this.userEmail).subscribe((cart: Cart) => {
          this.currentCart = cart;
          this.cartItems = cart.items.map((item) => {
            const p = item.productId;
            this.qty = item.quantity;
            this.totalPrice += p.price * item.quantity;
            return new Product(
              p.name,
              p.type,
              p.price,
              p.image,
              p.description,
              p.category,
              item.quantity
            );
          });
          // cart.items.forEach((item, index) => {
          //   console.log(`Item #${index}`, item);
          // });
        });
      } else {
        console.error('User email not found in session storage.');
      }
    }
  }
  goToCatalog() {
    this.router.navigateByUrl('/catalog');
  }
  goToOrders() {
    this.router.navigateByUrl('/orders');
  }

  payment() {
    if (!this.userEmail) {
      console.error('User email is not defined for payment.');
      return;
    }

    if (!this.cartService) {
      console.error('Cart service is not defined.');
      return;
    }
    this.cartService.payment(this.userEmail).subscribe({
      next: () => {
        console.log('Payment successful');
        this.currentCart = undefined;
        this.cartItems = [];
        this.totalPrice = 0;
      },
      error: (err) => console.error('Payment failed:', err),
    });
  }
}
