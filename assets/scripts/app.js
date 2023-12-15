class Product {
  //   title = 'DEFAULT';
  //   imageUrl;
  //   description;
  //   price;

  constructor(title, image, desc, price) {
    //constructor used
    this.title = title;
    this.imageUrl = image; //here this refers to the class Product's properties
    this.description = desc;
    this.price = price;
  }
}
class ShoppingCart {
  items = [];

  set cartItems(value) {
    this.items = value;
    this.totalOutput.innerHTML = `<h2>Total: \$${this.totalAmount.toFixed(
      2
    )}</h2>`;
  }
  get totalAmount() {
    const sum = this.items.reduce(
      (prevValue, curItem) => prevValue + curItem.price,
      0
    );
    return sum;
  }
  addProduct(product) {
    const updatedItems = [...this.items];
    updatedItems.push(product);
    this.cartItems = updatedItems;
  }
  render() {
    const cartEl = document.createElement('section');
    cartEl.innerHTML = `
        <h2>Total: \$${0}</h2>
        <button>Order Now!</button>
    
    `;
    cartEl.className = 'cart';
    this.totalOutput = cartEl.querySelector('h2');
    return cartEl;
  }
}
class ProductItem {
  constructor(product) {
    this.product = product;
  }
  addToCart() {
    App.addProductToCart(this.product);
  }
  render() {
    const prodEl = document.createElement('li');
    prodEl.className = 'product-item';
    prodEl.innerHTML = `
        <div>
        <img src ="${this.product.imageUrl}" alt = "${this.product.title}">
        <div class="product-item__content">
          <h2>${this.product.title}</h2>
          <h3>\$ ${this.product.price}</h3>
          <p> ${this.product.description}</p>
          <button>Add to Cart</button>
        </div>
        `;
    const addCartButton = prodEl.querySelector('button');
    addCartButton.addEventListener('click', this.addToCart.bind(this));
    return prodEl;
  }
}
class ProductList {
  products = [
    new Product(
      'Pillow',
      'https://th.bing.com/th/id/R.c4edf34366551fded5e68d3c602e876a?rik=D28NTq5N%2fbaT%2fQ&riu=http%3a%2f%2fwww.pngall.com%2fwp-content%2fuploads%2f2%2fWhite-Pillow-PNG-Pic.png&ehk=6mysr3FP9BEt6AfZdbV055Mg1vK7r5FWd3DhkI4pZjM%3d&risl=&pid=ImgRaw&r=0',
      'A soft Pillow',
      19.9
    ),
    new Product(
      'Carpet',
      'https://th.bing.com/th/id/OIP.m-UFoqsFdpb04sh6ahqQgQHaHa?rs=1&pid=ImgDetMain',
      'Permanent Floor carpet',
      90.9
    ),
  ];
  //   constructor() {}
  render() {
    const productList = document.createElement('ul');
    productList.className = 'product-list';
    for (const prod of this.products) {
      const productItem = new ProductItem(prod);
      const prodEl = productItem.render();
      productList.append(prodEl);
    }
    return productList;
  }
}

class Shop {
  render() {
    const renderHook = document.getElementById('app');

    this.cart = new ShoppingCart();
    const cartEl = this.cart.render();
    const productList = new ProductList();
    const prodListEl = productList.render();

    renderHook.append(cartEl);
    renderHook.append(prodListEl);
  }
}
class App {
  static cart;
  static init() {
    const shop = new Shop();
    shop.render();
    this.cart = shop.cart;
  }

  static addProductToCart(product) {
    this.cart.addProduct(product);
  }
}

App.init();
