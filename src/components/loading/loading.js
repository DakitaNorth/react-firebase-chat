import React from "react";

import LoadingCSS from "./css/loading.module.css";

const Loading = () => {
    return (
        <div className="universal-form">
            <h1 className={LoadingCSS.loading_text}>Загрузка...</h1>
        </div>
    )
};

export default Loading;