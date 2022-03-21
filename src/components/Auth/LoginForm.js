import React, { useEffect } from "react";

import { useHistory } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { loginSchema } from "../../utils/Validations";
import { userLogin } from "../../redux/actions/UserAccount";
import googleImg from "../../assests/images/google.png";
import facebookImg from "../../assests/images/facebook.svg";
import logo from "../../assests/images/modavastraa.svg";
import { message, Button } from "antd";

const LoginForm = () => {
  let history = useHistory();
  let dispatch = useDispatch();
  let { messageState } = useSelector((state) => state);
  const formOptions = { resolver: yupResolver(loginSchema) };
  const { register, handleSubmit, reset, formState } = useForm(formOptions);
  const { errors } = formState;

  const handleSubmitLogin = (loginData) => {
    const { email, password } = loginData;
    dispatch(
      userLogin(
        { username: email, password: password, grant_type: "password" },
        history,
        false
      )
    );
  };

  const handleSkipForNow = () => {
    dispatch(
      userLogin(
        {
          username: "gust@gust.com",
          password: "password",
          grant_type: "password",
        },
        history,
        true
      )
    );
  };

  return (
    <React.Fragment>
      <div className="container-login">
        <div className="left-container">
          <Link to="/">
            <img src={logo} alt="Moda Logo" />
          </Link>
        </div>
        <div className="right-container">
          <form onSubmit={handleSubmit(handleSubmitLogin)} autoComplete="off">
            <div className="email">
              <div className="email-box">
                <input
                  type="text"
                  id="username"
                  name="email"
                  placeholder="E-mail"
                  {...register("email")}
                />
                <i>{errors.email ? errors.email?.message : ""}</i>
              </div>
            </div>
            <div className="password">
              <div className="password-box">
                <input
                  type="password"
                  id="password"
                  name="password"
                  placeholder="Password"
                  {...register("password")}
                />
                <i>{errors.password ? errors.password.message : ""}</i>
              </div>
            </div>
            <div className="submit">
              <button className="btn-primary" type="submit">
                Log in
              </button>
            </div>
          </form>

          <div className="user-check">
            <p>New here?</p>
            <Link to="/signup">
              <button className="btn-secondary" type="button">
                Create an account
              </button>
            </Link>
            <Button type="link" onClick={handleSkipForNow}>
              Skip for now
            </Button>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default LoginForm;
