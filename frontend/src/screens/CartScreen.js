import { parseRequestUrl } from "../helpers/utils";
import { getProduct } from "../services/api";
import { getCartItems, setCartItems } from "../services/localStorage";

const addToCart = (item, forceUpdate = false) => {
  let cartItems = getCartItems();
  const existItem = cartItems.find((x) => x.product === item.product);
  if (existItem) {
    cartItems = cartItems.map((x) =>
      x.product === existItem.product ? item : x
    );
  } else {
    cartItems = [...cartItems, item];
  }
  setCartItems(cartItems);
};

const CartScreen = {
  after_render: () => {},
  render: async () => {
    const request = parseRequestUrl();
    if (request.id) {
      const product = await getProduct(request.id);
      addToCart({
        product: product._id,
        name: product.name,
        image: product.image,
        price: product.price,
        countInStock: product.countInStock,
        qty: 1,
      });
    }
    const cartItems = getCartItems();
    return `
    <div class="cart">
    
            <ul class="cart__list">
                <li>
                    <h3>Shopping Cart</h3>
                    <p>Price</p>
                </li>
            
                ${
                  cartItems.length === 0
                    ? '<div>Cart is Empty. <a href="/#">Go Shopping</a></div>'
                    : cartItems
                        .map(
                          (item) => `
                     <li class="cart-item">
                        <div class="cart-item__infoProduct"> 
                            <div class="cart-item__image">
                                <img src="${item.image}" alt="${item.name}">
                            </div>
                            <div class="cart-item__infoDetail">
                                <div class="cart-item__name">
                                    <a href="/#/product/${item.product}">
                                    <h3>${item.name}</h3></a>
                                </div>
                                <div class="cart-item__qty">
                                    Qty: <select class="cart-item__qtySelect" id="${item.product}">
                                        <option value="1">1</option>
                                    </select>
                                    <button type="button" id="${item.product}" class="cart-item__delete-btn">Delete</button>
                                </div>
                            </div>
                        </div>
                        <div class="cart-item__price">
                            <p>${item.price}€</p>
                        </div>
                     </li>
                    `
                        )
                        .join("\n")
                }
            </ul>
        <div class="cart__action"> 
            <h3>Subtotal (${cartItems.reduce((a, c) => a + c.qty, 0)} items): 
            </h3>
            <p class="cart__totalPrice">
                ${cartItems.reduce((a, c) => a + c.price * c.qty, 0)}€
            </p>
            <button type="button" id="checkout-button" class="cart__btn-action">Proceed to Checkout</button>
        </div>

    </div>
    `;
  },
};

export default CartScreen;
