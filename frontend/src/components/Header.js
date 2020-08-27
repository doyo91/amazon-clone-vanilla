import { getUserInfo } from "../services/localStorage";

const Header = {
  after_render: () => {},
  render: () => {
    const { name } = getUserInfo();
    return `
    <nav class="navbar">
    <div class="navbar__brand">
      <div class="navbar__menu">
        <i class="fas fa-bars"></i>
      </div>
      <a href="/" class="navbar__logo">
        <img
          src="http://pngimg.com/uploads/amazon/amazon_PNG11.png"
          alt="logo"
        />
      </a>
    </div>
    <form class="navbar__search">
      <input
        type="text"
        placeholder="Buscar..."
        class="navbar__searchInput"
      />
      <button class="navbar__searchBtn">
        <i class="fas fa-search"></i>
      </button>
    </form>
    <div class="navbar__nav">
      
      ${
        name
          ? `<a href="/#/profile" class="navbar__link"><span class="navbar__linkLineOne">Hola, ${name}</span>`
          : `<a href="/#/signin" class="navbar__link"><span class="navbar__linkLineOne">Hola, identifícate</span>`
      }
        
        <span class="navbar__linkLineTwo">Cuenta</span>
      </a>
      <a href="#" class="navbar__link">
        <span class="navbar__linkLineOne">Devoluciones</span>
        <span class="navbar__linkLineTwo">y Pedidos</span>
      </a>
      <a href="#" class="navbar__link">
        <span class="navbar__linkLineOne">Subscribete a</span>
        <span class="navbar__linkLineTwo">Prime</span>
      </a>
    </div>
    <div class="navbar__cart">
      <a href="/#/cart/">
        <img class="navbar__cartImg" src="./images/cart.png" alt="cart" />
        <span class="navbar__infoCart">Cesta</span>
        <span class="navbar__countItems">0</span></a
      >
    </div>
  </nav>
      `;
  },
};

export default Header;
