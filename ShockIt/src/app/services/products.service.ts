let count: number = 18;
import { Injectable } from '@angular/core';
import { Product } from '../models/products';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  url: string = 'http://localhost:3000/products';
  headers = { 'content-type': 'application/json' };
  products: Product[] = [];
  constructor(private http: HttpClient) {
    this.refresh();
  }
  refresh() {
    this.initProducts().subscribe((data) => (this.products = data));
  }
  initProducts(): Observable<any> {
    return this.http.get(this.url);
  }

  getProductsByCategory(category: string): Product[] {
    return this.products.filter((product) => product.category === category);
  }
  getproducts(): Observable<Product[]> {
    return this.http.get<Product[]>(this.url);
  }
  getPopular(): Observable<Product[]> {
    return this.http.get<Product[]>(this.url).pipe(
      map((products) => {
        return products.filter((p) => p.price >= 7 && p.price <= 30);
      })
    );
  }

  getById(id: string): Observable<Product> {
    return this.http.get<Product>(`${this.url}/${id}`);
  }
  // service
  insert(product: Product) {
    let body = JSON.stringify(product);
    return this.http.post(`${this.url}/addProduct`, body, {
      headers: this.headers,
    });
  }
  // client
  add(
    name: string,
    type: string,
    price: number,
    img: string,
    description: string,
    category: string,
    stock: number
  ) {
    let p: Product = new Product(
      name,
      type,
      price,
      img,
      description,
      category,
      stock
    );
    this.insert(p).subscribe((data) => this.refresh());
  }

  // service
  update(product: Product): Observable<any> {
    let body = JSON.stringify(product);
    return this.http.put(`${this.url}/updateProduct/${product._id}`, body, {
      headers: this.headers,
    });
  }
  // client
  change(
    id: string,
    name: string,
    type: string,
    price: number,
    image: string,
    description: string,
    category: string
  ) {
    let product = this.products.find((p) => p._id === id);
    if (product) {
      product.name = name;
      product.type = type;
      product.price = price;
      product.image = image;
      product.description = description;
      product.category = category;
      this.update(product).subscribe((data) => this.refresh());
    }
  }
  // service
  delete(product: Product) {
    let urlById = `${this.url}/deleteProduct/${product._id}`;
    return this.http.delete(urlById);
  }
  // // client
  remove(product: Product) {
    this.delete(product).subscribe((data) => this.refresh());
  }

  getByPrice(price: number) {
    return this.products.filter((product) => product.price <= price);
  }
  getByLetter(letter: string) {
    return this.products.filter(
      (product) =>
        product.description.toLowerCase().includes(letter.toLowerCase()) &&
        this.products.filter(
          (product) =>
            product.name.toLowerCase().includes(letter.toLowerCase()) &&
            this.products.filter((product) =>
              product.category.toLowerCase().includes(letter.toLowerCase())
            )
        )
    );
  }
}
