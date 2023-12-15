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
class ElementAttribute {
  constructor(attrName, attrValue) {
    this.name = attrName;
    this.value = attrValue;
  }
}

class Component {
  constructor(renderHook, shouldRender = true) {
    this.hookId = renderHook;
    if (shouldRender) {
      this.render();
    }
  }
  render() {}

  createRootElement(tag, cssClasses, attributes) {
    const rootElement = document.createElement(tag);
    if (cssClasses) {
      rootElement.className = cssClasses;
    }
    if (attributes && attributes.length > 0) {
      for (const attr of attributes) {
        rootElement.setAttribute(attr.name, attr.value);
      }
    }
    document.getElementById(this.hookId).append(rootElement);
    return rootElement;
  }
}

class ShoppingCart extends Component {
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

  constructor(renderHookId) {
    super(renderHookId);
  }

  addProduct(product) {
    const updatedItems = [...this.items];
    updatedItems.push(product);
    this.cartItems = updatedItems;
  }

  orderProducts() {
    console.log('Ordering...');
    alert('Placing your order please wait...');
    alert('Redirecting to payment page, please dont close the browser');
    alert(`Payment confirmed, your order has been placed.`);
    console.log(this.items);
  }
  render() {
    const cartEl = this.createRootElement('section', 'cart');
    cartEl.innerHTML = `
        <h2>Total: \$${0}</h2>
        <button>Order Now!</button>
    `;
    const orderButton = cartEl.querySelector('button');
    orderButton.addEventListener('click', () => this.orderProducts());
    this.totalOutput = cartEl.querySelector('h2');
  }
}

class ProductItem extends Component {
  constructor(product, renderHookId) {
    super(renderHookId, false);
    this.product = product;
    this.render();
  }

  addToCart() {
    App.addProductToCart(this.product);
  }

  render() {
    const prodEl = this.createRootElement('li', 'product-item');
    prodEl.innerHTML = `
        <div>
        <img src ="${this.product.imageUrl}" alt = "${this.product.title}">
        <div class="product-item__content">
          <h2>${this.product.title}</h2>
          <h3>\$ ${this.product.price}</h3>
          <p> ${this.product.description}</p>
          <button>Add to Cart</button>
        </div>
        </div>
        `;
    const addCartButton = prodEl.querySelector('button');
    addCartButton.addEventListener('click', this.addToCart.bind(this));
  }
}

class ProductList extends Component {
  products = [];

  constructor(renderHookId) {
    super(renderHookId);
    this.fetchProducts();
  }

  fetchProducts() {
    this.products = [
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
    this.renderProducts();
  }

  renderProducts() {
    for (const prod of this.products) {
      new ProductItem(prod, 'prod-list');
    }
  }
  render() {
    this.createRootElement('ul', 'product-list', [
      new ElementAttribute('id', 'prod-list'),
    ]);
    if (this.products && this.products.length > 0) {
      this.renderProducts();
    }
  }
}

class Shop {
  constructor() {
    this.render();
  }
  render() {
    this.cart = new ShoppingCart('app');
    new ProductList('app');
  }
}

class App {
  static cart;

  static init() {
    const shop = new Shop();
    this.cart = shop.cart;
  }

  static addProductToCart(product) {
    this.cart.addProduct(product);
  }
}

App.init();
