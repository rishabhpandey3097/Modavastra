import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useHistory } from "react-router";
import Header from "../Header/Header";
import { useDispatch, useStore } from "react-redux";
import designer from "../../assests/images/content/designer.png";
import {
  getWishListData,
  removeItemFromWishList,
  addToBag,
} from "../../redux/actions/WishListAction";

const Wishlist = (props) => {
  const [wishList, setWishList] = useState([]);
  const [quantity, setQuantity] = useState(1);
  const dispatch = useDispatch();
  const store = useStore();
  const history = useHistory();

  useEffect(() => {
    dispatch(getWishListData(history));
  }, []);

  useEffect(() => {
    let subscribe = true;
    store.subscribe(() => {
      const newState = store.getState().wishListReducer.getWishListData;
      if (subscribe) {
        console.log(newState);
        setWishList(newState);
      }
    });

    return () => {
      subscribe = false;
    };
  }, [store]);

  const removeItemFromList = (id) => {
    dispatch(removeItemFromWishList(id, history));
  };

  const onQuantityChange = (e) => {
    setQuantity(e.target.value);
  };
  return (
    <>
      <Header pageName={"Wishlist"} headerType={"header--dark"} />
      <div className="container__generic">
        <div className="left-container">
          <div className="action-links">
            <Link to="/orders">Your Orders</Link>
            <Link to="/wishlist">Wishlist</Link>
            <Link to="/bag">Shopping Bag</Link>
            {/* <Link to="payment">Payment Settings</Link>
            <Link to="/wallet">Wallet</Link> */}
            <Link to="/address">Address</Link>
            <Link to="/change-password">Change Password</Link>
            <Link className="logout" to="/logout">
              Log Out
            </Link>
          </div>
        </div>

        <div className="right-container">
          <div className="wishlist-box">
            <p className="wishlist-box__text">
              Showing {wishList?.length} item(s) in wishlist:
            </p>
            {wishList &&
              wishList.map(
                (item) =>
                  item && (
                    <div key={item.id} className="wishlist-card">
                      <div className="wishlist-image">
                        <img src={item.imgUrl} alt="" />
                      </div>
                      <div className="wishlist-details">
                        <h3 className="wishlist-names">{item.name}</h3>
                        {/* <div className="wishlist-select">
                          <span>Qty: </span>
                          <select
                            value={quantity}
                            onChange={(e) => onQuantityChange(e)}
                          >
                            <option value="1">1</option>
                            <option value="2">2</option>
                            <option value="3">3</option>
                            <option value="4">4</option>
                            <option value="5">5</option>
                          </select>
                        </div> */}
                        <div className="wishlist-price">₹ {item.price}</div>
                        <div className="wishlist-action">
                          <button
                            className="btn-secondary wishlist-remove"
                            onClick={() => removeItemFromList(item.id)}
                            style={{ color: "white" }}
                          >
                            Remove
                          </button>
                          <button
                            className="btn-primary wishlist-add-bag"
                            onClick={() => {
                              dispatch(addToBag(item, quantity));
                            }}
                          >
                            Add to Bag
                          </button>
                        </div>
                      </div>
                    </div>
                  )
              )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Wishlist;
