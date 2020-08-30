import { update } from "../services/api";
import { getUserInfo, setUserInfo, clearUser } from "../services/localStorage";
import { showLoading, hideLoading, showMessage } from "../helpers/utils";

const ProfileScreen = {
  after_render: () => {
    document.getElementById("signout-btn").addEventListener("click", () => {
      clearUser();
      document.location.hash = "/";
    });
    document
      .getElementById("profile-form")
      .addEventListener("submit", async (e) => {
        e.preventDefault();
        showLoading();
        const data = await update({
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
    const { name, email } = getUserInfo();
    if (!name) {
      document.location.hash = "/";
    }
    return `
      <div class="form-container">
        <form id="profile-form" class="form">
            <h1 class="form__title">
                Perfil Usuario
            </h1>
            <div class="form__name">
                <label for="name">Nombre</label>
                <input type="text" name="name" id="name" value="${name}" />
            </div>
            <div class="form__email">
                <label for="email">E-mail</label>
                <input type="email" name="email" id="email" value="${email}"/>
            </div>
            <div class="form__password">
                <label for="password">Contraseña</label>
                <input type="password" name="password" id="password"/>
            </div>
            <button class="form__btn" type="submit">Actualizar</button>
            <button class="form__btn" id="signout-btn" type="button">Cerrar Sesión</button>
            
        </form>
      </div>
      `;
  },
};

export default ProfileScreen;
