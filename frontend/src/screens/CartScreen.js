import { parseRequestUrl, rerender } from "../helpers/utils";
import { getProduct } from "../services/api";
import { getCartItems, setCartItems } from "../services/localStorage";

const addToCart = (item, forceUpdate = false) => {
  let cartItems = getCartItems();
  const existItem = cartItems.find((x) => x.product === item.product);
  if (existItem) {
    if (forceUpdate) {
      cartItems = cartItems.map((x) =>
        x.product === existItem.product ? item : x
      );
    }
  } else {
    cartItems = [...cartItems, item];
  }

  setCartItems(cartItems);

  if (forceUpdate) {
    rerender(CartScreen);
  }
};

const removeFromCart = (id) => {
  setCartItems(getCartItems().filter((x) => x.product !== id));
  if (id === parseRequestUrl().id) {
    document.location.hash = "/cart";
  } else {
    rerender(CartScreen);
  }
};

const CartScreen = {
  after_render: () => {
    const qtySelects = document.getElementsByClassName("cart-item__qtySelect");
    Array.from(qtySelects).forEach((qtySelect) => {
      qtySelect.addEventListener("change", (e) => {
        const item = getCartItems().find((x) => x.product === qtySelect.id);
        addToCart({ ...item, qty: Number(e.target.value) }, true);
      });
    });
    const deleteButtons = document.getElementsByClassName(
      "cart-item__delete-btn"
    );
    Array.from(deleteButtons).forEach((deleteButton) => {
      deleteButton.addEventListener("click", () => {
        removeFromCart(deleteButton.id);
      });
    });
    document.getElementById("checkout-button").addEventListener("click", () => {
      document.location.hash = "/signin";
    });
  },
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
                                    Qty: <select class="cart-item__qtySelect" id="${
                                      item.product
                                    }">
                                        ${[
                                          ...Array(item.countInStock).keys(),
                                        ].map((x) =>
                                          item.qty === x + 1
                                            ? `<option selected value="${
                                                x + 1
                                              }">${x + 1}</option>`
                                            : `<option value="${x + 1}">
                                              ${x + 1}
                                            </option>`
                                        )}
                                    </select>
                                    <button type="button" id="${
                                      item.product
                                    }" class="cart-item__delete-btn">Delete</button>
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
