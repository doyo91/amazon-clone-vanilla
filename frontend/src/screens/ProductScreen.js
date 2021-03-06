import { parseRequestUrl, showLoading, hideLoading } from "../helpers/utils";
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
    showLoading();
    const product = await getProduct(request.id);
    if (product.error) {
      return `<div>${product.error}</div>`;
    }
    hideLoading();
    return `
    <div class="content-product">
      <div class="back-to-result">
        <a href="/#/">&larr; Volver</a>
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
            Precio: <strong>${product.price}<span>€</span></strong>
        </p>
        <div class="details-info__description">
            Descripción:
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
                ? `<span class="details-action__success">En stock</span>`
                : `<span class="details-action__error">No disponible</span>`
            }</li>
            <li>${
              product.countInStock > 0
                ? `<button id="add-btn" class="details-action__btn">Añadir a la cesta</button>`
                : `<button class="details-action__btn-wish">Añadir a la lista de deseos</button>`
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
