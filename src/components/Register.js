import React, {useState} from 'react';
import { Link } from "react-router-dom";

function Register(props) {

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
    props.onRegister(email, password);
  }

  return (
    <div className="register__block">
      <p className="register__registration">Регистрация</p>
      <form className="register__form" onSubmit={handleSubmit}>
        <input className="register__input" type="email" placeholder="Email" value={email} onChange={handleEmailInput} autoComplete="on" required/>
        <input className="register__input" type="password" placeholder="Пароль" value={password} autoComplete="on" onChange={handlePasswordInput} required/>
        <button className="button register__button">Зарегистрироваться</button>
      </form>
      <p className="register__link">Уже зарегистрированы? <Link to="/sign-in" className="register__link button">Войти</Link> </p>  
    </div>
  );
}

export default Register;
