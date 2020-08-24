import { parseRequestUrl } from "../helpers/utils";
import { getProduct } from "../services/api";
import Rating from "../components/Rating";

const ProductScreen = {
  after_render: () => {
    const request = parseRequestUrl();
    document.getElementById("add-btn").addEventListener("click", () => {
      document.location.hash = `/cart/${request.id}`;
    });
  },
  render: async () => {
    const request = parseRequestUrl();
    const product = await getProduct(request.id);
    if (product.error) {
      return `<div>${product.error}</div>`;
    }
    return `
    <div class="content-product">
      <div class="back-to-result">
        <a href="/#/">Back to result </a>
      </div>
      <div class="product-details">
    <div class="product-details__image">
        <img src="${product.image}" alt="${product.name}">
    </div>
    <div class="details-info">
        <h1 class="details-info__title">
            ${product.brand} ${product.name}
        </h1>
        <div class="details-info__rating">
            ${Rating.render({
              value: product.rating,
              text: `${product.numReviews} reviews`,
            })}
        </div>
        <p class="details-info__price">
            Price: <strong>${product.price}<span>€</span></strong>
        </p>
        <div class="details-info__description">
            Description:
            <p>
                ${product.description}
            </p>
        </div>
    </div>
    <div class="details-action">
        <ul>
            <li><strong>${
              product.countInStock > 0 ? `${product.price}<span>€</span>` : "-"
            }</strong></li>
            <li>Status: ${
              product.countInStock > 0
                ? `<span class="details-action__success">In Stock</span>`
                : `<span class="details-action__error">Unavailable</span>`
            }</li>
            <li>${
              product.countInStock > 0
                ? `<button id="add-btn" class="details-action__btn">Add to Cart</button>`
                : `<button class="details-action__btn-wish">Add to Wish List</button>`
            }
                
            </li>
        </ul>
    </div>
</div>
    </div>
    `;
  },
};

export default ProductScreen;
