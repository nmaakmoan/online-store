// AI-GENERATED: ChatGPT
import { FormEvent, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { api } from "../services/api";

export default function RegisterPage() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const submit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      await api.post("/auth/register/", { username, email, password });
      navigate("/login");
    } catch (err: any) {
      setError(JSON.stringify(err.response?.data || "Ошибка регистрации"));
    }
  };

  return (
    <form className="form" onSubmit={submit}>
      <h1>Регистрация</h1>
      <input placeholder="Логин" value={username} onChange={(e) => setUsername(e.target.value)} />
      <input placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
      <input placeholder="Пароль" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
      {error && <p className="error">{error}</p>}
      <button className="button">Создать аккаунт</button>
      <p>Уже есть аккаунт? <Link to="/login">Войти</Link></p>
    </form>
  );
}
