import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import { Input } from "antd";
import SidebarMenu from "./SidebarMenu";
import $ from "jquery";

import modalogo from "../../assests/images/modavastraa.svg";
import search from "../../assests/images/search.svg";
import searchBlack from "../../assests/images/searchBlack.svg";
import favourite from "../../assests/images/favourite.svg";
import shopping from "../../assests/images/shopping-bag.svg";
import user_circle from "../../assests/images/user-circle.svg";
import hamburger from "../../assests/images/hamburger.svg";
import close from "../../assests/images/close.svg";
import back_button from "../../assests/images/back_button.svg";

import Cookies from "js-cookie";
import { getSearchResults } from "../../redux/actions/SearchAction";

const Header = (props) => {
  let [hamburgerOpen, setHamburgerOpen] = useState(false);
  const [searchString, setSearchString] = useState("");
  const { setSearch, input, onSearch } = props;
  const dispatch = useDispatch();
  const history = useHistory();

  const searchResults = useSelector(
    (state) => state.searchReducer.searchResults
  );

  $(function () {
    $(".hamburger-menu")
      .off()
      .on("click", function () {
        $(".sidebar-menu").toggle();
        $(".overlay--except-header").toggle();
        $("body").toggleClass("hidden");

        if (hamburgerOpen) {
          setHamburgerOpen(false);
        } else {
          setHamburgerOpen(true);
        }
      });

    $(".search-tablet__icon img")
      .off()
      .on("click", function () {
        $(".search-tablet").css("display", "flex");
      });

    $(".search-tablet__close")
      .off()
      .on("click", function () {
        $(".search-tablet").hide();
      });
  });

  const searchItems = (e) => {
    setSearchString(e.target.value);
  };

  const searchHandler = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      if (searchString.trim() === "") return;
      dispatch(getSearchResults(searchString));
      console.log(searchResults);
      history.push("/search-results");
    }
  };

  return (
    <>
      <header className={"header " + props.headerType}>
        <nav>
          <div className="nav-items-left">
            <div className="nav-items nav-items__hamburger">
              <img
                className="icons hamburger-menu"
                src={hamburgerOpen ? close : hamburger}
              />
            </div>
            <div className="nav-items nav-items__moda-logo">
              <Link to="/">
                <img className="moda-logo" src={modalogo} alt="" />
              </Link>
            </div>
            <div className="nav-items nav-items__links">
              <Link to="/product/DYOO">Design Your Own Outfit</Link>
              <Link to="/clothing/product/CLOTH">Clothing</Link>
              <Link to="/subproduct/jewellery/JEW">Jewellery</Link>
            </div>
          </div>
          <div className="nav-items-right">
            <div className="nav-items search-desktop">
              <img className="icons" src={search} alt="" />
              <input
                value={searchString}
                onChange={(e) => searchItems(e)}
                onKeyPress={(e) => searchHandler(e)}
                type="text"
                placeholder="Search for products & brands"
              />
            </div>
            <div className="nav-items search-tablet__icon">
              <img className="icons" src={search} alt="" />
            </div>
            <div className="nav-items">
              <Link to="/wishlist">
                <img className="icons" src={favourite} alt="" />
              </Link>
            </div>
            <div className="nav-items">
              <Link to="/bag">
                <img className="icons" src={shopping} alt="" />
              </Link>
            </div>
            <div className="nav-items nav-items__login">
              <Link className="" to="/myaccount">
                <img className="icons" src={user_circle} alt="" />
              </Link>
            </div>
          </div>
        </nav>
      </header>
      <div className="search-tablet__wrapper">
        <div className="search-tablet">
          <div className="nav-items search-tablet__close">
            <img className="icons" src={back_button} alt="" />
          </div>
          <div className="nav-items search-tablet__input">
            <input
              onChange={(e) => searchItems(e)}
              onKeyPress={(e) => searchHandler(e)}
              placeholder="Search for products & brands"
            ></input>
          </div>
          <div className="nav-items">
            <a onClick={onSearch}>
              <img className="icons" src={search} alt="" />
            </a>
          </div>
        </div>
      </div>
      <SidebarMenu />
      <div className="overlay overlay--mobile"></div>
      <div className="overlay overlay--wholepage"></div>
      <div className="overlay overlay--except-header"></div>
    </>
  );
};

export default Header;
