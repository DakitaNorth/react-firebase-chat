import React, { useEffect } from "react";

import MessagerCSS from "./css/messager.module.css";

const Messager = props => {
    return (
        <form className={MessagerCSS.message_form} onSubmit={props.sendMassage}>
            <div>
                <input
                    type="text"
                    placeholder="Введите сообщение"
                    value={props.text}
                    onChange={e => props.setText(e.target.value)}
                />
            </div>
            <div>
                <button className={MessagerCSS.message_form__btn_send}>
                    Отправить
                </button>
            </div>
        </form>
    )
};

export default Messager; 