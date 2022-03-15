import React, { useEffect, useState } from 'react';
import { useHistory, useLocation, useParams } from "react-router";
import { Link } from "react-router-dom";
import Header from '../Header/Header';

import upload from "../../assests/images/user-circle.svg";


const SendReference = () => {
    return (
        <>
            <Header pageName={'Send reference'} headerType={"header--main"}/>
            <div class="container--send-reference">
                <div className="send-reference">
                    <div className="send-reference__box">
                        <span>Have a particular design stuck in your head? We’ve got you covered!</span>
                        <div className="send-reference__upload">
                            <div className="send-reference__upload-text">
                                <img src={upload} alt="saree"></img>
                                <span>Upload Image</span>
                            </div>
                        </div>
                    </div>

                    <div class="send-reference__desc">
                        <span>Tell us a bit more about it</span>
                        <textarea rows='10' placeholder='Share what you like about the design, what you dont like, what should we definitely include in your dress and what not to include.'></textarea>
                        <Link to="/"><button className="btn-primary send-reference__button">Send reference</button></Link>
                    </div>
                </div>
            </div>
        </>
    );
};

export default SendReference;