import React, { useRef, useEffect } from "react";
import Moment from "react-moment";

import MessageCSS from "./css/message.module.css";

const Message = ({ msgs, firstUser }) => {
    const scrollRef = useRef();

    useEffect(() => {
        scrollRef.current?.scrolleIntoView({ behavior: "smooth" });
    }, [msgs]);

    return (
        <div className={`${msgs.from === firstUser ? MessageCSS.message_right : MessageCSS.message_left}`}>
            <p>{msgs.text}</p>
            <small>
                <Moment fromNow={msgs.createdAt.toDate()}/>
            </small>
        </div>
    )
};

export default Message; 