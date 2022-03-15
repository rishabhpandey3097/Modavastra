import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useHistory } from "react-router";
import { useDispatch, useStore, useSelector } from "react-redux";
import Header from "../Header/Header";
import {
  getBagListData,
  removeItemFromBag,
  addToWishList,
  proceedToCheckout,
} from "../../redux/actions/ProductBagAction";
import { userLogout } from "../../redux/actions/UserAccount";
import designer from "../../assests/images/content/designer.png";
import progress_bar from "../../assests/images/product_bag_progress.svg";
import AccountLeftMenu from "./AccountLeftMenu";
import { message } from "antd";

const ProductBag = (props) => {
  const history = useHistory();
  const dispatch = useDispatch();
  const store = useStore();
  const [shoppingItems, setShoppingItems] = useState(null);

  useEffect(() => {
    dispatch(getBagListData(history));
  }, []);

  useEffect(() => {
    const controller = new AbortController();
    const { signal } = controller.signal;
    let subscribe = true;
    store.subscribe(
      () => {
        const newState = store.getState().shoppingBag.bagData;
        const items = newState?.cartItems?.map(({ items, quantity }) => {
          items["quantity"] = quantity;
          return items;
        });
        newState["items"] = items;
        setShoppingItems(newState);
      },
      { signal }
    );

    return () => {
      subscribe = false;
    };
  }, [store]);

  const handleCheckOut = () => {
    if (shoppingItems?.cartItems?.length > 0) {
      dispatch(proceedToCheckout(shoppingItems, history));
    } else {
      message.warning("Add item to Bag.");
    }
  };

  return (
    <>
      <Header pageName={"Bag"} headerType={"header--dark"} />
      <div className="container__generic">
        <AccountLeftMenu />

        <div className="right-container">
          <div className="product-bag__progress-bar">
            <img src={progress_bar} alt="" />
          </div>
          <div className="product-bag__box">
            <p className="product-bag__text" style={{ color: "#1e1e1e" }}>
              {shoppingItems?.cartItems?.length > 0 &&
                `${shoppingItems?.cartItems.length} item(s) in bag:`}
            </p>
            {shoppingItems?.items?.map((item) => (
              <div key={item?.id} className="product-bag__card">
                <div className="product-bag__data">
                  <div className="product-bag__image">
                    <img src={item.imgUrl} alt="" />
                  </div>
                  <div className="product-bag__details">
                    <h3 className="product-bag__names">{item?.name}</h3>
                    {/* <div className="product-bag__select">
                      <span>Qty: </span>
                      <select value={item.quantity}>
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                        <option value="5">5</option>
                      </select>
                    </div> */}
                    <div className="product-bag__price">₹ {item?.price}</div>
                  </div>
                </div>

                <div className="product-bag__action">
                  <button
                    className="btn-secondary product-bag__remove"
                    onClick={() => dispatch(removeItemFromBag(item.id))}
                    style={{ color: "white" }}
                  >
                    Remove
                  </button>
                  <button
                    className="btn-secondary product-bag__wishlist"
                    onClick={() => dispatch(addToWishList(item.id))}
                    style={{ color: "white" }}
                  >
                    Move to Wishlist
                  </button>
                </div>
              </div>
            ))}

            <div className="product-bag__checkout">
              <button className="btn-primary" onClick={handleCheckOut}>
                proceed to checkout
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductBag;
