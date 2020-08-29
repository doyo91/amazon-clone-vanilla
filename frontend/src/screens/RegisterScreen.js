import { register } from "../services/api";
import { getUserInfo, setUserInfo } from "../services/localStorage";
import { showLoading, hideLoading, showMessage } from "../helpers/utils";

const RegisterScreen = {
  after_render: () => {
    document
      .getElementById("register-form")
      .addEventListener("submit", async (e) => {
        e.preventDefault();
        showLoading();
        const data = await register({
          name: document.getElementById("name").value,
          email: document.getElementById("email").value,
          password: document.getElementById("password").value,
        });

        hideLoading();
        if (data.error) {
          showMessage(data.error);
        } else {
          setUserInfo(data);
          document.location.hash = "/";
        }
      });
  },
  render: () => {
    if (getUserInfo().name) {
      document.location.hash = "/";
    }
    return `
      <div class="form-container">
        <form id="register-form" class="form">
            <h1 class="form__title">
                Crear Cuenta
            </h1>
            <div class="form__name">
                <label for="name">Nombre</label>
                <input type="text" name="name" id="name"/>
            </div>
            <div class="form__email">
                <label for="email">E-mail</label>
                <input type="email" name="email" id="email"/>
            </div>
            <div class="form__password">
                <label for="password">Contraseña</label>
                <input type="password" name="password" id="password"/>
            </div>
            <div class="form__password">
                <label for="repassword">Confirma Contraseña</label>
                <input type="password" name="repassword" id="repassword"/>
            </div>
            <button class="form__btn" type="submit">Registrar</button>
            <div class="form__link">
                Tienes cuenta en Amazon? <a href="/#/signin">Entra en tú cuenta.</a>
            </div>
        </form>
      </div>
      `;
  },
};

export default RegisterScreen;
