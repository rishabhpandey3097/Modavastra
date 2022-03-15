import React from 'react';
import Header from "./Header/Header";

const NotFound = (props) => {
    return (
        <>
            <Header pageName={''} headerType={'header--main'}/>
            <div className="not-found">
                <div className="not-found__content">
                    <h2 className="not-found__message"> </h2>
                </div>
            </div>
        </>
    );
};

export default NotFound;