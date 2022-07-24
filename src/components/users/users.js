import React from "react";

import UsersCSS from "./css/users.module.css";

const Users = props => {
    return (
        <div className={UsersCSS.users} onClick={() => {props.selectUser(props)}}>
            <div className={UsersCSS.users_info}>
                <div className={UsersCSS.users_detail}>
                    <div className={UsersCSS.users_detail__avatar}></div>
                    <span className={UsersCSS.users_detail__text}>{props.name}</span>
                </div>
                <div className={`${props.isOnline ? UsersCSS.user_status__online : UsersCSS.user_status__offline}`}>
                </div>
            </div>
        </div>
    )
};

export default Users; 