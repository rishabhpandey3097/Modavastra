import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Header from "../Header/Header";
import { useHistory } from "react-router-dom";
import designer from "../../assests/images/content/bangles.png";
import progress_bar from "../../assests/images/payment_progress_bar.svg";
import AccountLeftMenu from "./AccountLeftMenu";

const Payment = (props) => {
  const [data, setData] = useState(null);
  const history = useHistory();

  useEffect(() => {
    if (history?.location) {
      setData(history?.location?.state);
    }
  }, []);

  return (
    <>
      <Header pageName={"Bag"} headerType={"header--dark"} />
      <div className="container__generic">
        <AccountLeftMenu />
        <div className="right-container">
          <div className="payment__progress-bar">
            <img src={progress_bar} alt="" />
          </div>
          <div className="payment__box">
            <p class="payment__text">1 item(s) in wishlist:</p>
            <div className="payment__card">
              {data &&
                data?.items.map((item) => (
                  <div className="payment__data">
                    <div className="payment__image">
                      <img src={item.imgUrl} alt="" />
                    </div>
                    <div className="payment__details">
                      <h3 className="payment__names">{item.name}</h3>
                      {/* <div className="payment__select">
                        <span>Qty: </span>
                        <select value={item.quantity}>
                          <option value="1">1</option>
                          <option value="2">2</option>
                          <option value="3">3</option>
                          <option value="4">4</option>
                          <option value="5">5</option>
                        </select>
                      </div> */}
                      <div className="payment__price">₹ {item.price}</div>
                    </div>
                  </div>
                ))}
            </div>

            <div className="payment__payment-mode">
              <h3 className="payment__payment-mode-text">Enter New Address</h3>
              <div className="checkout__select-mode">
                <select className="payment__select-cards">
                  <option value="">Credit/Debit Card</option>
                </select>
                <select className="payment__select-upi">
                  <option value="">UPI</option>
                </select>
                <div className="payment__cod">
                  <label for="cod">Cash on Delivery</label> {" "}
                  <input
                    type="radio"
                    id="code"
                    name=""
                    value="Cash on Delivery"
                  />
                </div>
              </div>
              <p className="payment__delivery-text">
                Estimated Delivery by <span>30th November, 2020</span>
              </p>
            </div>

            <div className="payment__checkout-button">
              <button className="btn-primary">proceed to checkout</button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Payment;
