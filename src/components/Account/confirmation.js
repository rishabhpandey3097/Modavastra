import React from 'react';
import {Link} from "react-router-dom";
import Header from '../Header/Header';

import designer from '../../assests/images/content/bangles.png';
import progress_bar from '../../assests/images/confirmation_progress_bar.svg';
import AccountLeftMenu from './AccountLeftMenu';

const Confirmation = (props) => {
    return (
        <>
            <Header pageName={'Bag'} headerType={'header--dark'}/>
            <div className="container__generic">
                <AccountLeftMenu />

                <div className="right-container"> 
                    <div  className="confirmation__progress-bar"><img src={progress_bar} alt="" /></div>
                    <div className="confirmation__box">
                        <p class="confirmation__order-text">Order Confirmed</p>
                        <p class="confirmation__text">You’ll receive a confirmation email shortly with expected delivery date.</p>
                        <div className="confirmation__card">
                            <div className="confirmation__data">
                                <div className="confirmation__image"> <img src={designer} alt=""/>
                                </div>
                                <div className="confirmation__details">
                                    <h3 className="confirmation__names">Gorgeous Designer Saaree</h3>
                                    <div className="confirmation__price">₹ 999.0</div>
                                    <p className="confirmation__delivery">Arriving by 30 Nov 2020</p>
                                </div>
                            </div>
                        </div>
                        
                        <div className="confirmation__review-order"><button className="btn-secondary">Review Order</button></div>
                        <div className="confirmation__shopping"><button className="btn-primary">Continue shopping</button></div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Confirmation;