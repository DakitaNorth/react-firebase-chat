import React, { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { setDoc, doc, Timestamp } from "firebase/firestore";
import { useNavigate } from "react-router-dom";

import { auth, db } from "../../firebase";

import RegisterCSS from "./css/register.module.css";

const Register = () => {
    const navigate = useNavigate();

    const [data, setData] = useState({
        name: "",
        email: "",
        password: "",
        error: null,
        loading: false
    });

    const { name, email, password, error, loading } = data;

    function handleChange(e) {
        setData({ ...data, [e.target.name]: e.target.value });
    };

    async function handleSubmit(e) {
        e.preventDefault();

        setData({ ...data, error: null, loading: true });

        if (!name || !email || !password) {
            setData({ ...data, error: "Все поля обязательны для заполнения" });
        }
        try {
            const result = await createUserWithEmailAndPassword(auth, email, password);

            await setDoc(doc(db, "users", result.user.uid), {
                uid: result.user.uid,
                name,
                email,
                createdAt: Timestamp.fromDate(new Date()),
                isOnline: true
            });

            setData({ name: "", email: "", password: "", error: null, loading: false });

            console.log(result.user);

            navigate("/");
        }
        catch (err) {
            setData({ ...data, error: err.message, loading: false });
        }
    };

    return (
        <section className={RegisterCSS.register}>
            <h1 className="page_main__heading">Желаете создать аккаунт?</h1>
            <form className={RegisterCSS.register__form} onSubmit={handleSubmit}>
                <ul className={RegisterCSS.register__list}>
                    <li className={RegisterCSS.register__item}>
                        <label htmlFor="name">Имя</label>
                        <input type="text" name="name" value={name} onChange={handleChange} />
                    </li>
                    <li className={RegisterCSS.register__item}>
                        <label htmlFor="email">Почта</label>
                        <input type="text" name="email" value={email} onChange={handleChange} />
                    </li>
                    <li className={RegisterCSS.register__item}>
                        <label htmlFor="password">Пароль</label>
                        <input type="password" name="password" autoComplete="on" value={password} onChange={handleChange} />
                    </li>
                </ul>
                {error ? <p className={RegisterCSS.register__error}>{error}</p> : null}
                <button className={RegisterCSS.register__button} disabled={loading}>
                    {loading ? "Регистрация..." : "Регистрация"}
                </button>
            </form>
        </section>
    )
};

export default Register;