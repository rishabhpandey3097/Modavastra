import React, { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { useDispatch, useStore } from "react-redux";
import Header from "../Header/Header";
import moment from "moment";

import { getOrdersData } from "../../redux/actions/OrderAction";
import AccountLeftMenu from "./AccountLeftMenu";
import star from "../../assests/images/star.svg";

const Orders = (props) => {
  const [orders, setOrders] = useState([]);
  const dispatch = useDispatch();
  const store = useStore();
  const history = useHistory();
  useEffect(() => {
    dispatch(getOrdersData(history));
  }, []);

  useEffect(() => {
    let subscribe = true;
    store.subscribe(() => {
      const newState = store.getState().orderReducer.getOrdersData;
      if (subscribe) {
        setOrders(newState);
      }
    });

    return () => {
      // setOrders([]);
      subscribe = false;
    };
  }, [store]);
  // console.log("storesData", orders);
  return (
    <>
      <Header pageName={"Your Orders"} headerType={"header--dark"} />
      <div className="container__generic">
        <AccountLeftMenu />

        <div className="right-container">
          {orders.map(
            ({ cartItems, createdOn, status, id }) =>
              cartItems &&
              cartItems.length &&
              cartItems.map(
                (order, index) =>
                  order &&
                  (status !== "NEW" ? (
                    <div key={index} className="product-box">
                      <div className="product-card">
                        <div className="product-image">
                          <img src={order?.items?.imgUrl} alt="" />
                        </div>
                        <div className="product-details">
                          <h3 className="product-names">
                            {order?.items?.name}
                          </h3>
                          <div className="appointment-status">
                            <p>Price : {order.items.price}</p>
                            <h4 className="product-status">
                              Arriving by{" "}
                              {createdOn &&
                                moment(createdOn).format("MMMM DD, YYYY")}
                            </h4>
                          </div>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="product-box">
                      <div className="product-card">
                        <div className="product-image">
                          {" "}
                          <img src={order.items.imgUrl} alt="" />
                        </div>
                        <div className="product-details">
                          <h3 className="product-names">{order.items.name}</h3>
                          <h4 className="product-status">
                            Delivered on{" "}
                            {createdOn &&
                              moment(createdOn).format("MMMM DD, YYYY")}
                          </h4>
                          <div className="product-review">
                            <p>Rate & Review</p>
                            <div className="product-rating">
                              <Link
                                to={{
                                  pathname: `/rate-reviews`,
                                  state: {
                                    selectedItem: order.items,
                                    createdOn: createdOn,
                                  },
                                }}
                              >
                                <img
                                  className="star-rating"
                                  src={star}
                                  alt=""
                                />
                                <img
                                  className="star-rating"
                                  src={star}
                                  alt=""
                                />
                                <img
                                  className="star-rating"
                                  src={star}
                                  alt=""
                                />
                                <img
                                  className="star-rating"
                                  src={star}
                                  alt=""
                                />
                                <img
                                  className="star-rating"
                                  src={star}
                                  alt=""
                                />
                              </Link>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))
              )
          )}
        </div>
      </div>
    </>
  );
};

export default Orders;
