import { Component } from '@angular/core';
import { CartService } from '../services/cart.service';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-orders',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './orders.component.html',
  styleUrl: './orders.component.css',
})
export class OrdersComponent {
  orders: any[] = [];
  constructor(private cartService: CartService, private router: Router) {
    if (
      typeof window !== 'undefined' &&
      typeof sessionStorage !== 'undefined'
    ) {
      const email = sessionStorage.getItem('mail') || '';
      this.cartService.getLatestCart(email).subscribe((cart: any) => {
        this.orders = cart || [];
        console.log('Raw orders from server:', cart);
        console.log(this.orders);
      });
    }
  }
  goBack() {
    this.router.navigateByUrl('/cart');
  }
}
