import React from "react";
import { Link } from "react-router-dom";

import modalogo from "../assests/images/modavastraa_white.svg";
import instragram from "../assests/images/instagram.svg";
import facebook from "../assests/images/facebook.svg";
import linkedin from "../assests/images/linkedin.svg";
import twitter from "../assests/images/twitter.svg";

const Footer = (props) => {
  return (
    <footer>
      <ul className="footer-moda-details">
        <li>
          <a href="#">
            <img src={modalogo} alt=""></img>
          </a>
        </li>
        <li>Address Line 1,Locality,City, pincode</li>
        <li className="footer-empty-space"></li>
        <li className="footer-column-header"> Contact Us</li>
        <li> +011 1234 5678</li>
        <li> business@modavastra.com</li>
      </ul>
      <ul className="footer-about-us">
        <li className="footer-column-header"> About Us</li>
        <li>
          <a href="#">Blog</a>
        </li>
        <li>
          <a href="#">Careers</a>
        </li>
        <li>
          <a href="#">FAQs</a>
        </li>
      </ul>
      <ul className="footer-shop-now">
        <li className="footer-column-header"> Shop Now</li>
        <li>
          <Link to="/product/DYOO">Design Your Own Outfit</Link>
        </li>
        <li>
          <Link to="/clothing/product/CLOTH">Clothing</Link>
        </li>
        <li>
          <Link to="/subproduct/jewellery/JEW">Jewellery</Link>
        </li>
        <li>
          <Link to="/clothing/product/CLOTH">Shop by Designer</Link>
        </li>
        <li className="footer-empty-space"></li>
        <li>
          <a href="#">Track Your Order</a>
        </li>
        <li>
          <Link to={"/RefundPolicy"}>Returns & Refunds</Link>
        </li>
      </ul>
      <ul className="footer-collaborations">
        <li className="footer-column-header"> Collaborations</li>
        <li>
          <a href="#">Become a Seller</a>
        </li>
        <li>
          <a href="#">Become our Creator</a>
        </li>
        <li>
          <a href="#">Know More</a>
        </li>
        <li className="footer-empty-space"></li>
        <li className="footer-column-header"> Legal</li>
        <li>
          <Link to={"/PrivacyPolicy"}>Privacy Policy</Link>
        </li>
        <li>
          <Link to={"/TermsAndCondition"}>Terms and Conditions</Link>
        </li>
      </ul>
      <ul className="footer-follow-us">
        <li className="footer-column-header"> Follow us on</li>
        <li className="footer-social-links">
          <a href="www.instragram.com">
            <img src={instragram}></img>
          </a>
          <a href="www.facebook.com">
            <img src={facebook}></img>
          </a>
          <a href="www.linkedin.com">
            <img src={linkedin}></img>
          </a>
          <a href="www.twitter.com">
            <img src={twitter}></img>
          </a>
        </li>
      </ul>
    </footer>
  );
};

export default Footer;
