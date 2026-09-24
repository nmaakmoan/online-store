// AI-GENERATED: ChatGPT
import { Link, useNavigate } from "react-router-dom";

type Props = {
  cartCount: number;
};

export default function Header({ cartCount }: Props) {
  const navigate = useNavigate();
  const loggedIn = Boolean(localStorage.getItem("access"));

  const logout = () => {
    localStorage.removeItem("access");
    localStorage.removeItem("refresh");
    navigate("/login");
  };

  return (
    <header>
      <Link className="logo" to="/">Online Store</Link>
      <nav>
        <Link to="/">Каталог</Link>
        <Link to="/cart">Корзина ({cartCount})</Link>
        {loggedIn ? (
          <>
            <Link to="/profile">Профиль</Link>
            <button className="link-button" onClick={logout}>Выйти</button>
          </>
        ) : (
          <>
            <Link to="/login">Войти</Link>
            <Link to="/register">Регистрация</Link>
          </>
        )}
      </nav>
    </header>
  );
}
