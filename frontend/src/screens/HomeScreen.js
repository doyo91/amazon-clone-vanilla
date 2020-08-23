const HomesScreen = {
  render: async () => {
    const response = await fetch("http://localhost:5000/api/products", {
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response || !response.ok) {
      return `<div>Error in getting data</div>`;
    }

    const products = await response.json();

    return `
        <ul class="products">
        ${products
          .map(
            (product) => `
        <li class="product">
            <a
            class="product__linkImage"
            href="/#/product/${product._id}"
            
            >
                <img
                    class="product__image"
                    src="${product.image}"
                    alt="${product.name}"
                />
            </a>
            <div class="product__info">
                <h3 class="product__brand">
                    ${product.brand}
                </h3>
                <a href="/#/product/${product._id}" >
                    <h4 class="product__name">
                    ${product.name}
                    </h4>
                </a>
                <div class="product__rating">
                    <i class="fas fa-star"></i>
                    <i class="fas fa-star"></i>
                    <i class="fas fa-star"></i>
                    <i class="fas fa-star-half-alt"></i>
                    <i class="far fa-star"></i>
                </div>
                <div class="product__price">${product.price}<span>€</span></div>
            </div>
        </li>

        `
          )
          .join("\n")} 
    `;
  },
};

export default HomesScreen;
