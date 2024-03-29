import React, { useState } from "react";

function Login({ onLogin }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function handleEmailInput(e) {
    setEmail(e.target.value);
  }

  function handlePasswordInput(e) {
    setPassword(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    onLogin(email, password);
  }

  return (
    <div className="login-block">
      <p className="login__authorization">Вход</p>
      <form className="login__form" onSubmit={handleSubmit}>
        <input
          className="login__input"
          type="email"
          placeholder="Email"
          value={email}
          onChange={handleEmailInput}
          autoComplete="on"
          required
        />

        <input
          className="login__input"
          type="password"
          placeholder="Пароль"
          value={password}
          autoComplete="on"
          onChange={handlePasswordInput}
          required
        />
        <button
          disabled={email.length === 0 || password.length === 0 ? true : false}
          className="button login__button"
          type="submit"
        >
          Войти
        </button>
        {}
      </form>
    </div>
  );
}

export default Login;
