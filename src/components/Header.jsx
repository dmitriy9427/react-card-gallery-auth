import headerLogo from "../images/logoza.ru.png";
import { Link } from "react-router-dom";

function Header(props) {
  return (
    <header className="header">
      <img src={headerLogo} alt="логотип место" className="header__logo" />
      <nav className="header__auth">
        <p className="header__link">{props.mail}</p>
        <Link
          to={props.route}
          className="header__link button"
          type="button"
          onClick={props.onClick}
        >
          {props.title}
        </Link>
      </nav>
    </header>
  );
}

export default Header;
