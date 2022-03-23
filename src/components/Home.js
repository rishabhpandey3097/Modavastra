import React, { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import { useDispatch, useStore } from "react-redux";
import classes from "./Home.module.scss";
import { Carousel } from "antd";

import Header from "./Header/Header";
import Footer from "./Footer";

// Actions
import { getSubProductCategoryData } from "../redux/actions/SubProductCategoryAction";

import design_your_outfit from "../assests/images/content/design_your_outfit.png";
import best_seller_1 from "../assests/images/content/designer.png";
import best_seller_2 from "../assests/images/content/best_seller_2.png";
import best_seller_3 from "../assests/images/content/best_seller_3.png";
import best_seller_4 from "../assests/images/content/best_seller_4.png";
import clothing from "../assests/images/content/clothing.png";
import jewellary from "../assests/images/content/jewellery.png";
import sale_banner from "../assests/images/content/sale_banner.png";
import { getBannerImages } from "../redux/actions/BannerAction";
import { getBestSellerProducts } from "../redux/actions/BestSeller";

const Home = (props) => {
  const [designers, setDesigners] = useState([]);
  const [bannerImages, setBannerImages] = useState([]);
  const [bestSeller, setBestSeller] = useState([]);
  const dispatch = useDispatch();
  const store = useStore();
  const history = useHistory();

  useEffect(() => {
    dispatch(getSubProductCategoryData("CLOTH", history));
    dispatch(getBestSellerProducts(history));
    dispatch(getBannerImages(history));
  }, []);

  useEffect(() => {
    let subscribe = true;
    store.subscribe(() => {
      const newState = store.getState();
      if (subscribe) {
        console.log(newState);
        setDesigners(newState.subProductCategories.getSubCategories);
        setBannerImages(newState.bannerProducts.bannerImages);
        setBestSeller(newState.bestSellerReducer.bestSeller);
      }
    });

    return () => {
      // setDesigners([]);
      setBestSeller([]);
      subscribe = false;
    };
  }, [store]);
  return (
    <>
      <Header pageName="" headerType="header--home" />
      <div className="container-home">
        <div className="product-types">
          <Carousel dots={false} autoplay effect="fade">
            {bannerImages?.map((banner) => (
              <div key={banner.id}>
                <img src={banner?.imgUrl} alt={banner?.name} />
              </div>
            ))}
          </Carousel>
          <div className="product-name">
            <div className="product-name__type">DESIGN YOUR OWN OUTFIT</div>
            <div className="product-name__desc">
              One outfit, many styles, choose what you like
            </div>
          </div>
          <div className="view-more">
            <Link to="/product/DYOO">
              <button type="button">Take A Look</button>
            </Link>
          </div>
        </div>

        <div className="product-best-seller">
          <div className="product-best-seller__title">
            <span>BEST SELLER</span>
          </div>
          {/* <div className="product-best-seller__view-more">
            <Link to="/product/DYOO">View More</Link>
          </div> */}
          <div className="product-best-seller__items">
            {bestSeller.map((item) => {
              return (
                <div key={item?.id} className="product-best-seller__item">
                  <Link
                    to={`/${
                      item.proCode === "CLOTH"
                        ? "clothing"
                        : item.proCode === "DYOO"
                        ? "DYOO"
                        : item.proCode === "JEW"
                        ? "jewellery"
                        : null
                    }/items/${item?.id}/${item?.name}`}
                  >
                    <img src={item?.imgUrl} alt=""></img>
                  </Link>
                  <div>{item?.name}</div>
                  <div>₹ {item?.price}</div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="product-category">
          <div className="product-category__type">
            <Link to="/clothing/product/CLOTH">
              <img src={clothing}></img>
            </Link>
            <span className="product-category__clothing">Clothing</span>
          </div>
          <div className="product-category__type">
            <Link to="/subproduct/jewellery/JEW">
              <img src={jewellary}></img>
            </Link>
            <span className="product-category__jewellary">Jewellery</span>
          </div>
        </div>

        <div className="product-designers">
          <div className="product-designers__title">
            <span>DESIGNERS ON MODAVASTRA</span>
          </div>
          <div className="product-designers__view-all">
            {/* <Link to="/product/CLOTH">
              <a>View all</a>
            </Link> */}
          </div>
          <div className="product-designers__list">
            {designers.map((res) => {
              return (
                <div key={res.id} className="product-designers__item">
                  <Link to={`/subproduct/clothing/${res?.code}`}>
                    <img src={res?.imgUrl} alt={res?.name} />
                  </Link>
                </div>
              );
            })}
          </div>
        </div>

        <div className="product-sale-banner">
          <Link to={"/products/sale"}>
            <img src={sale_banner}></img>
          </Link>
        </div>

        {/* <div className='product-creative-partners'>
                <div className='product-creative-partners__title'><span>our creative partners</span></div>
                <div className='product-creative-partners__view-all'><a href="#">View all</a></div>
                <div className='product-creative-partners__list'>
                    <div className='product-creative-partners__item'>
                        <a href="#"><img src={creative_partner_1} alt=""></img></a>
                    </div>
                    <div className='product-creative-partners__item'>
                        <a href="#"><img src={creative_partner_2} alt=""></img></a>
                    </div>
                    <div className='product-creative-partners__item'>
                        <a href="#"><img src={creative_partner_3} alt=""></img></a>
                    </div>
                    <div className='product-creative-partners__item'>
                        <a href="#"><img src={creative_partner_4} alt=""></img></a>
                    </div>
                    <div className='product-creative-partners__item'>
                        <a href="#"><img src={creative_partner_5} alt=""></img></a>
                    </div>
                    <div className='product-creative-partners__item'>
                        <a href="#"><img src={creative_partner_6} alt=""></img></a>
                    </div>
                    <div className='product-creative-partners__item'>
                        <a href="#"><img src={creative_partner_7} alt=""></img></a>
                    </div>
                    <div className='product-creative-partners__item'>
                        <a href="#"><img src={creative_partner_8} alt=""></img></a>
                    </div>
                    <div className='product-creative-partners__item'>
                        <a href="#"><img src={creative_partner_9} alt=""></img></a>
                    </div>
                    <div className='product-creative-partners__item'>
                        <a href="#"><img src={creative_partner_10} alt=""></img></a>
                    </div>
                    <div className='product-creative-partners__item'>
                        <a href="#"><img src={creative_partner_2} alt=""></img></a>
                    </div>
                    <div className='product-creative-partners__item'>
                        <a href="#"><img src={creative_partner_3} alt=""></img></a>
                    </div>
                    <div className='product-creative-partners__item'>
                        <a href="#"><img src={creative_partner_4} alt=""></img></a>
                    </div>
                    <div className='product-creative-partners__item'>
                        <a href="#"><img src={creative_partner_5} alt=""></img></a>
                    </div>
                    <div className='product-creative-partners__item'>
                        <a href="#"><img src={creative_partner_6} alt=""></img></a>
                    </div>
                    <div className='product-creative-partners__item'>
                        <a href="#"><img src={creative_partner_7} alt=""></img></a>
                    </div>
                </div>
            </div> */}

        <div className="product-join-community">
          <div className="product-join-community__box">
            <div className="product-join-community__title">
              Join Our Community of
            </div>
            <div className="product-join-community__type">
              <div className="product-join-community__creators">
                <div className="product-join-community__text">
                  Growing Creators!
                </div>
                <a
                  href="https://docs.google.com/forms/d/e/1FAIpQLSdy1DdJJLf3B765qu5prUoDbPsMKzZ5zZWsOLf6WBGEOe41wA/viewform"
                  target={"_blank"}
                >
                  <button>Become a Creator</button>
                </a>
              </div>
              <div className="product-join-community__line"></div>
              <div className="product-join-community__sellers">
                <div className="product-join-community__text">
                  Growing Sellers!
                </div>
                <a href="https://forms.gle/tZCCDiA8TRV6wgyX8" target="_blank">
                  <button>Become a Seller</button>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Home;
