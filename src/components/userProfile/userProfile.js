import React, { useState, useEffect } from "react";
import { getDoc, doc } from "firebase/firestore";

import { auth, db } from "../../firebase";

import UserProfileCSS from "./css/userProfile.module.css";

const UserProfile = () => {
    const [user, setUser] = useState();

    useEffect(() => {
        getDoc(doc(db, "users", auth.currentUser.uid)).then((docSnap) => {
            if (docSnap.exists) {
                setUser(docSnap.data());
            }
        });
    });

    return user ? (
        <section className={UserProfileCSS.profile}>
            <div className={UserProfileCSS.profile__img}>
            </div>
            <div className={UserProfileCSS.profile__data}>
                <ul className={UserProfileCSS.profile__data_list}>
                    <li className={UserProfileCSS.profile__data_item}>
                        <span className={UserProfileCSS.profile__data_label}>Имя: </span>
                        <span>{user.name}</span>
                    </li>
                    <li className={UserProfileCSS.profile__data_item}>
                        <span className={UserProfileCSS.profile__data_label}>Почта: </span>
                        <span>{user.email}</span>
                    </li>
                    <li className={UserProfileCSS.profile__data_item}>
                        <span className={UserProfileCSS.profile__data_label}>Присоединился в: </span>
                        <span>{user.createdAt.toDate().toDateString()}</span>
                    </li>
                </ul>
            </div>
        </section>
    ) : null
};

export default UserProfile;