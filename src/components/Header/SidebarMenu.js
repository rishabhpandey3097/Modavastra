import React from "react";
import { Link } from "react-router-dom";
import $ from "jquery";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router";
import { userLogout } from "../../redux/actions/UserAccount";

const SidebarMenu = (props) => {
  const dispatch = useDispatch();
  const history = useHistory();

  $(function () {
    $(".sidebar-menu__navigation-item")
      .off()
      .on("click", function () {
        $(this).addClass("active");
        $(this).siblings().removeClass("active");
      });
  });
  return (
    <div className="sidebar-menu">
      <nav className="sidebar-menu__navigation">
        <ul className="sidebar-menu__navigation-group">
          <li className="sidebar-menu__navigation-item">
            <Link className="sidebar-menu__action-item" to="/product/DYOO">
              Design your own outfit
            </Link>
          </li>
          <li className="sidebar-menu__navigation-item">
            <Link
              className="sidebar-menu__action-item"
              to="/subproduct/jewellery/JEW"
            >
              Jewellery
            </Link>
          </li>
          <li className="sidebar-menu__navigation-item">
            <Link
              className="sidebar-menu__action-item"
              to="/clothing/product/CLOTH"
            >
              Clothing
            </Link>
          </li>
          {/* <li className="sidebar-menu__navigation-item">
            <Link
              className="sidebar-menu__action-item"
              to="/subproduct/RAWFAB/RAWFAB"
            >
              Raw Fabric
            </Link>
          </li> */}
          <li className="sidebar-menu__navigation-item">
            <Link className="sidebar-menu__action-item" to="/myaccount">
              My Account
            </Link>
          </li>
          <li className="sidebar-menu__navigation-item">
            <Link
              className="sidebar-menu__action-item"
              to="/login"
              onClick={() => dispatch(userLogout(history, true))}
            >
              Log Out
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default SidebarMenu;
