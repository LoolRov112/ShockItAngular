export class Product {
  _id?: string;
  name: string;
  type: string;
  price: number;
  image: string;
  description: string;
  stock: number;
  category: string;

  constructor(
    name: string,
    type: string,
    price: number,
    image: string,
    description: string,
    category: string,
    stock: number,
    _id?: string
  ) {
    this.name = name;
    this.type = type;
    this.price = price;
    this.image = image;
    this.description = description;
    this.category = category;
    this.stock = stock;
    if (_id) this._id = _id;
  }
}
