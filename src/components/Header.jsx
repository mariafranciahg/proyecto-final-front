import headerImg from "../assets/img/header2.jpg";
import { NavLink } from "react-router-dom";
import "./Header.css";

const Header = () => {
  return (
    <header className="header-servi">
      <div className="header-overlay"></div>

      <div className="header-content container text-center">
        <h1>Bienvenido a ServiCasa</h1>
        <p>Soluciones para tu hogar a un click de distancia</p>

        <NavLink to="/gallery" className="btn-servi">
          Encuentra un profesional
        </NavLink>
      </div>

      <img src={headerImg} alt="Header ServiCasa" className="header-img" />
    </header>
  );
};

export default Header;
