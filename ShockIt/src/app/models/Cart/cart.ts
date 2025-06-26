import { CartItem } from './cartItem';

export class Cart {
  email: string;
  items: CartItem[];
  constructor(email: string, items: CartItem[] = []) {
    this.email = email;
    this.items = items;
  }

  addItem(item: CartItem) {
    const existingItem = this.items.find(
      (i) => i.product._id === item.product._id
    );
    if (existingItem) {
      existingItem.quantity += item.quantity;
    } else {
      this.items.push(item);
    }
  }

  removeItem(productId: string) {
    this.items = this.items.filter((item) => item.product._id !== productId);
  }

  clearCart() {
    this.items = [];
  }
}
