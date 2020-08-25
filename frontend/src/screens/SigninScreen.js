const SigninScreen = {
  after_render: () => {},
  render: () => {
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
