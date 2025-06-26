import { Product } from '../products';

export class CartItem {
  product: Product;
  quantity: number;
  productId: any;

  constructor(product: Product, quantity: number = 1) {
    this.product = product;
    this.quantity = quantity;
  }
}
