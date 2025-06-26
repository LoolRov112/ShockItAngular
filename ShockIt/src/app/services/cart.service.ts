import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Cart } from '../models/Cart/cart';
import { Observable } from 'rxjs';
import { Product } from '../models/products';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private url = 'http://localhost:3000/carts';
  products: Product[] = [];

  constructor(private http: HttpClient) {}

  getCartByEmail(email: string): Observable<Cart> {
    return this.http.get<Cart>(`${this.url}/${email}`);
  }
  addToCart(email: string, productId: string, quantity: number = 1) {
    return this.http.post(`${this.url}/addToCart`, {
      email,
      productId,
      quantity,
    });
  }

  createCart(cart: Cart): Observable<Cart> {
    return this.http.post<Cart>(this.url, cart);
  }

  updateCart(email: string, cart: Cart): Observable<Cart> {
    return this.http.put<Cart>(`${this.url}/${email}`, cart);
  }

  deleteCart(email: string): Observable<any> {
    return this.http.delete(`${this.url}/${email}`);
  }
  payment(email: string): Observable<any> {
    return this.http.put(`${this.url}/cart/pay/${email}`, {
      email,
    });
  }

  getLatestCart(email: string): Observable<Cart> {
    return this.http.get<Cart>(`http://localhost:3000/orders/${email}`);
  }
}
