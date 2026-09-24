// AI-GENERATED: ChatGPT
import { FormEvent, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { api } from "../services/api";

export default function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const submit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      const r = await api.post("/auth/login/", { username, password });
      localStorage.setItem("access", r.data.access);
      localStorage.setItem("refresh", r.data.refresh);
      navigate("/");
    } catch {
      setError("Неверный логин или пароль");
    }
  };

  return (
    <form className="form" onSubmit={submit}>
      <h1>Вход</h1>
      <input placeholder="Логин" value={username} onChange={(e) => setUsername(e.target.value)} />
      <input placeholder="Пароль" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
      {error && <p className="error">{error}</p>}
      <button className="button">Войти</button>
      <p>Нет аккаунта? <Link to="/register">Регистрация</Link></p>
    </form>
  );
}
