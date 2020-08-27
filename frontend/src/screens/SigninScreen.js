import { signin } from "../services/api";
import { getUserInfo, setUserInfo } from "../services/localStorage";
import { showLoading, hideLoading } from "../helpers/utils";

const SigninScreen = {
  after_render: () => {
    document
      .getElementById("signin-form")
      .addEventListener("submit", async (e) => {
        e.preventDefault();
        showLoading();
        const data = await signin({
          email: document.getElementById("email").value,
          password: document.getElementById("password").value,
        });

        hideLoading();
        if (data.error) {
          alert(data.error);
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
        <form id="signin-form" class="form">
            <h1 class="form__title">
                Iniciar Sesión
            </h1>
            <div class="form__email">
                <label for="email">E-mail</label>
                <input type="email" name="email" id="email"/>
            </div>
            <div class="form__password">
                <label for="password">Contraseña</label>
                <input type="password" name="password" id="password"/>
            </div>
            <button class="form__btn" type="submit">Continuar</button>
            <div class="form__link">
                Nuevo en Amazon? <a href="/#/register">Crea tú cuenta.</a>
            </div>
        </form>
      </div>
      `;
  },
};

export default SigninScreen;
