import React, { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { updateDoc, doc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";

import { auth, db } from "../../firebase";

import LoginCSS from "./css/login.module.css";

const Login = () => {
    const navigate = useNavigate();

    const [data, setData] = useState({
        email: "",
        password: "",
        error: null,
        loading: false
    });

    const { email, password, error, loading } = data;

    function handleChange(e) {
        setData({ ...data, [e.target.name]: e.target.value });
    };

    async function handleSubmit(e) {
        e.preventDefault();

        setData({ ...data, error: null, loading: true });

        if (!email || !password) {
            setData({ ...data, error: "Все поля обязательны для заполнения" });
        }
        try {
            const result = await signInWithEmailAndPassword(auth, email, password);

            await updateDoc(doc(db, "users", result.user.uid), {
                isOnline: true
            });

            setData({ email: "", password: "", error: null, loading: false });

            console.log(result.user);

            navigate("/");
        }
        catch (err) {
            setData({ ...data, error: err.message, loading: false });
        }
    };

    return (
        <section className={LoginCSS.login}>
            <h1 className="page_main__heading">Желаете войти в аккаунт?</h1>
            <form className={LoginCSS.login__form} onSubmit={handleSubmit}>
                <ul className={LoginCSS.login__list}>
                    <li className={LoginCSS.login__item}>
                        <label htmlFor="email">Почта</label>
                        <input type="text" name="email" value={email} onChange={handleChange} />
                    </li>
                    <li className={LoginCSS.login__item}>
                        <label htmlFor="password">Пароль</label>
                        <input type="password" name="password" autoComplete="on" value={password} onChange={handleChange} />
                    </li>
                </ul>
                {error ? <p className={LoginCSS.login__error}>{error}</p> : null}
                <button className={LoginCSS.login__button} disabled={loading}>
                    {loading ? "Авторизация..." : "Войти"}
                </button>
            </form>
        </section>
    )
};

export default Login;