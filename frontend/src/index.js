import HomeScreen from "./screens/HomeScreen.js";
import ProductScreen from "./screens/ProductScreen.js";
import { parseRequestUrl, showLoading, hideLoading } from "./helpers/utils.js";
import Error404Screen from "./screens/Error404Screen.js";
import CartScreen from "./screens/CartScreen.js";
import SigninScreen from "./screens/SigninScreen.js";
import RegisterScreen from "./screens/RegisterScreen.js";
import Header from "./components/Header";

const routes = {
  "/": HomeScreen,
  "/product/:id": ProductScreen,
  "/cart/:id": CartScreen,
  "/cart": CartScreen,
  "/signin": SigninScreen,
  "/register": RegisterScreen,
};

const router = async () => {
  showLoading();
  const request = parseRequestUrl();
  const parseUrl =
    (request.resource ? `/${request.resource}` : "/") +
    (request.id ? "/:id" : "") +
    (request.verb ? `/${request.verb}` : "");
  const screen = routes[parseUrl] ? routes[parseUrl] : Error404Screen;
  const header = document.getElementById("header-container");
  header.innerHTML = await Header.render();
  await Header.after_render();

  const main = document.getElementById("main-container");
  main.innerHTML = await screen.render();
  await screen.after_render();
  hideLoading();
};

window.addEventListener("load", router);
window.addEventListener("hashchange", router);
