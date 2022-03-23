import React, { useEffect, useState } from "react";
import { useDispatch, useStore } from "react-redux";
// import { Link } from "react-router-dom";
import { useHistory } from "react-router";
import { getUserDetails, updateName } from "../../redux/actions/UserAccount";
import { Input } from "antd";
import Header from "../Header/Header";
import user_circle from "../../assests/images/user-circle.svg";
import AccountLeftMenu from "./AccountLeftMenu";

const MyAccount = (props) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const store = useStore();
  const [name, setName] = useState(null);
  const [active, setActive] = useState(false);

  useEffect(() => {
    dispatch(getUserDetails(history));
  }, []);

  useEffect(() => {
    const controller = new AbortController();
    const { signal } = controller.signal;
    store.subscribe(
      () => {
        const newState = store.getState().auth.user.name;
        setName(newState);
      },
      { signal }
    );

    return () => {
      setName([]);
    };
  }, [store.getState()]);

  const handleChange = (e) => {
    const {
      target: { value },
    } = e;
    setName(value);
  };

  return (
    <>
      <Header pageName={"My Account"} headerType={"header--dark"} />
      <div className="container__my-account">
        <AccountLeftMenu />

        <div className="right-container">
          <div className="user-profile">
            <img src={user_circle} alt={name} />
            {!active ? (
              <h3 onClick={() => setActive(true)}>{name}</h3>
            ) : (
              <Input
                onChange={handleChange}
                value={name}
                onPressEnter={() => {
                  dispatch(updateName(name));
                  setActive(false);
                }}
                onBlur={() => {
                  dispatch(updateName(name));
                  setActive(false);
                }}
                className="user-name"
              />
            )}
            <p>
              This name will be shown on reviews you post and other activities
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default MyAccount;
