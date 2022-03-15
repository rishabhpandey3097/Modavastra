import React, { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { userLogout } from "../../redux/actions/UserAccount";

import { getUserDetails } from "../../redux/actions/UserAccount";
import { useDispatch, useStore } from "react-redux";

const AccountLeftMenu = (props) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const store = useStore();
  const [active, setActive] = useState(false);

  useEffect(() => {
    dispatch(getUserDetails(history));
  }, [dispatch, history]);

  useEffect(() => {
    const controller = new AbortController();
    const { signal } = controller.signal;
    store.subscribe(
      () => {
        const newState = store.getState().auth.loginSuccess;
        setActive(newState);
      },
      { signal }
    );

    return () => controller.abort();
  }, [store.getState()]);

  return (
    <div className="left-container">
      <div className="action-links">
        <Link to="/orders">Your Orders</Link>
        <Link to="/wishlist">Wishlist</Link>
        <Link to="/bag">Shopping Bag</Link>
        {/* <Link to="/payment">Payment Settings</Link>
        <Link to="/wallet">Wallet</Link> */}
        <Link to="/address">Address</Link>
        <Link to="/change-password">Change Password</Link>
        {active ? (
          <Link
            className="logout"
            to="/login"
            onClick={() => dispatch(userLogout(history))}
          >
            Log Out
          </Link>
        ) : (
          <Link className="logout" to="/login">
            Log In
          </Link>
        )}
      </div>
    </div>
  );
};

export default AccountLeftMenu;
