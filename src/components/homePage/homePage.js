import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { collection, query, where, onSnapshot, addDoc, Timestamp, orderBy, setDoc, doc } from "firebase/firestore";

import { auth, db } from "../../firebase";

import Users from "../users/users";
import Messager from "../messager/messager";
import Message from "../message/message";

import HomePageCSS from "./css/homePage.module.css";

const HomePage = () => {
    const navigate = useNavigate();

    const [users, setUsers] = useState([]);
    const [chat, setChat] = useState("");
    const [text, setText] = useState("");
    const [msgs, setMsgs] = useState([]);

    useEffect(() => {
        if (auth.currentUser != null) {
            const firstUser = auth.currentUser.uid;

            const userRef = collection(db, "users");

            const q = query(userRef, where("uid", "not-in", [firstUser]));

            const unsub = onSnapshot(q, querySnapshot => {
                let users = [];

                querySnapshot.forEach(doc => {
                    users.push(doc.data());
                })

                setUsers(users);
            });

            return () => unsub();
        }
        else {
            navigate("/login");
        }
    }, []);

    function selectUser(user) {
        setChat(user);

        const firstUser = auth.currentUser.uid;
        const secondUser = user.uid;
        const id = firstUser > secondUser ? `${firstUser + secondUser}` : `${secondUser + firstUser}`;

        const msgsRef = collection(db, "messages", id, "chat");
        const q = query(msgsRef, orderBy("createdAt", "asc"));

        onSnapshot(q, querySnapshot => {
            let msgs = [];
            querySnapshot.forEach(doc => {
                msgs.push(doc.data());
            })
            setMsgs(msgs);
        });
    };

    async function sendMassage(e) {
        e.preventDefault();

        const firstUser = auth.currentUser.uid;
        const secondUser = chat.uid;

        const id = firstUser > secondUser ? `${firstUser + secondUser}` : `${secondUser + firstUser}`;

        await addDoc(collection(db, "messages", id, "chat"), {
            text,
            from: firstUser,
            to: secondUser,
            createdAt: Timestamp.fromDate(new Date())
        });

        await setDoc(doc(db, "lastMsg", id), {
            text,
            from: firstUser,
            to: secondUser,
            createdAt: Timestamp.fromDate(new Date()),
            unread: true
        });

        setText("");
    };

    const userStandart = users.map((item, pos) => {
        return (
            <Users
                key={pos}
                name={item.name}
                uid={item.uid}
                isOnline={item.isOnline}
                selectUser={selectUser}
            />
        )
    });

    const messagesStandart = msgs.map((msgs, i) => {
        return (
            <Message
                key={i}
                msgs={msgs}
                firstUser={auth.currentUser.uid}
            />
        )
    });

    return (
        <section className={HomePageCSS.home_container}>
            <div className={HomePageCSS.users_container}>
                {userStandart}
            </div>
            <div className={HomePageCSS.messages_container}>
                {chat ?
                    <>
                        <div className={HomePageCSS.messages_container__user}>
                            <span className={HomePageCSS.messages_container__user_name}>{chat.name}</span>
                        </div>
                        <div className={HomePageCSS.messages}>
                            {messagesStandart}
                        </div>
                        <Messager
                            sendMassage={sendMassage}
                            text={text}
                            setText={setText}
                        />
                    </>
                    :
                    <>
                        <div className={HomePageCSS.messages_container__user}>
                            <span className={HomePageCSS.messages_container__user_text}>Выберите пользователя для чата</span>
                        </div>
                    </>
                }
            </div>
        </section>
    )
};

export default HomePage;