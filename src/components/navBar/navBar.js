import React from "react";
import { signOut } from "firebase/auth";
import { updateDoc, doc } from "firebase/firestore";
import { NavLink, useNavigate } from "react-router-dom";

import { auth, db } from "../../firebase";

import NavBarCSS from "./css/navBar.module.css";

const NavBar = () => {
    const navigate = useNavigate();

    async function handleSignout() {
        await updateDoc(doc(db, "users", auth.currentUser.uid), {
            isOnline: false
        });

        await signOut(auth);

        navigate("/login");
    };

    return (
        <nav className={NavBarCSS.nav_bar}>
            <NavLink to="/" className={NavBarCSS.nav_bar__home_link}>Главная</NavLink>
            <div className={NavBarCSS.nav_bar__links_wrapper}>
                {auth.currentUser ?
                    <>
                        <NavLink to="/profile" className={NavBarCSS.nav_bar__profile_link}>Профиль</NavLink>
                        <button className={NavBarCSS.nav_bar__logout} onClick={handleSignout}>Выйти</button>
                    </>
                    :
                    <>
                        <NavLink to="/register" className={NavBarCSS.nav_bar__reg_link}>Регистрация</NavLink>
                        <NavLink to="/login" className={NavBarCSS.nav_bar__sign_link}>Войти</NavLink>
                    </>
                }
            </div>
        </nav>
    )
};

export default NavBar;