import React, { useEffect, useState } from 'react';
import { useHistory, useLocation, useParams } from "react-router";
import Header from '../Header/Header';
import $ from 'jquery';

import raw_fab1 from '../../assests/images/raw_fabric/raw_fab1.png';
import raw_fab2 from '../../assests/images/raw_fabric/raw_fab2.png';
import raw_fab3 from '../../assests/images/raw_fabric/raw_fab3.png';
import star_normal from '../../assests/images/star.svg';
import star_colored from '../../assests/images/star-colored.svg';
import { useDispatch, useStore } from 'react-redux';
import { getProductDetailsData, getProductReviewsData, getProductSuggestionsData } from '../../redux/actions/ProductDetailsAction';
import server from '../../redux/actions/apis';
import { errorMessage, successMessage } from '../../redux/actions/MessageAction';
import { Image, Modal } from 'antd';
import AwesomeSlider from 'react-awesome-slider';
import Logo from "../../assests/images/logo.png";
import { Link } from 'react-router-dom';
import { userLogout } from '../../redux/actions/UserAccount';
import ProductImageSlider from '../ProductImageSlider'
import Cookies from 'js-cookie';

export const ViewRawFabricItems = () => {
  let { slug } = useParams();
  const location = useLocation();
  const history = useHistory();
  location.state == undefined && history.push("/");
  const { selectedItem } = location.state;

  return <RawFabricItems slug={slug} selectedItem={selectedItem} history={history} />
};

const RawFabricItems = ({ slug, selectedItem, history }) => {

  $(function () {
    // Decrease the length count
    $('.raw-fabric-items__minus').off().on('click', function () {
      if (lengthCount <= 1) {
        return;
      } else {
        setLengthCount(lengthCount - 1);
      }
    });

    // Increase the length count
    $('.raw-fabric-items__plus').off().on('click', function () {
      if (lengthCount >= 100) {
        return;
      } else {
        setLengthCount(lengthCount + 1);
      }
    });

    // Adjust the padding of the count
    if (lengthCount <= 9) {
      $('.raw-fabric-items__length').css('padding', "8px 180px 0");
    } else {
      $('.raw-fabric-items__length').css('padding', "8px 172px 0");
    }
  });

  const reviewStepCount = 5;
  const statingRange =
    selectedItem.price <= 1000
      ? 0
      : selectedItem.price - (selectedItem.price % 1000);
  const endRange = statingRange + 1000;

  const [visible, setVisible] = useState(false);
  const [itemDetail, getItemDetail] = useState();
  const [itemReview, getItemReview] = useState();
  const [productSuggestion, getProductSuggestion] = useState([]);
  const [itemReviewCount, getItemReviewCount] = useState(reviewStepCount);
  const [itemReviewMore, getItemReviewMore] = useState(true);
  const [lengthCount, setLengthCount] = useState(1);

  const dispatch = useDispatch();
  const store = useStore();

  useEffect(() => {
    dispatch(getProductDetailsData(selectedItem.id, history));
    dispatch(getProductReviewsData(selectedItem.id, history));
    dispatch(getProductSuggestionsData(endRange, statingRange, history));
    window.scrollTo(0, 0);
  }, [slug]);

  useState(() => {
    store.subscribe(() => {
      const { productDetails, productReviews, productSuggestions } =
        store.getState().productDetails;
      getItemDetail(productDetails);
      getItemReview(productReviews);
      getProductSuggestion(productSuggestions);
    });
  }, [store]);

  const topReviews = itemReview
    ? itemReview.reviews.filter((review, index) => index < itemReviewCount)
    : [];

  const handleShowMoreReviews = () => {
    if (itemReview && itemReview.reviews.length > itemReviewCount) {
      itemReviewCount + reviewStepCount >= itemReview.reviews.length &&
        getItemReviewMore(false);
      getItemReviewCount((preState) => preState + reviewStepCount);
    } else {
      getItemReviewMore(false);
    }
  };
  const handleShowLessReviews = () => {
    getItemReviewCount(reviewStepCount);
    getItemReviewMore(true);
  };

  function showConfirm() {
    Modal.confirm({
      title: 'Please login to add item in bag.',
      onOk() {
        console.log('OK');
        dispatch(userLogout(history, true));
      },
      onCancel() {
        console.log('Cancel');
      },
    });
  }

  const handleAddToBag = () => {

    const isGuest = Cookies.get('isGuest');

    if (isGuest == "true") {
      showConfirm();
      return;
    }

    server
      .post(`v1/api/cart/add/item`,
        {
          "itemId": selectedItem.id,
          "color": "White",
          "quantity": lengthCount
        })
      .then((response) => {
        console.log("response----", response);
        if (response.data.success) {
          successMessage("Added to cart successfully.");
        }
        //dispatch(getWishListData());
      })
      .catch((error) => {
        console.log("err---", error);
        let message = "Something went wrong please try again!";
        if (!error.response) {
          message = "Network Error!";
        } else {
          message = error.response.message;
        }
        errorMessage(message);
        dispatch(userLogout(history));
      });
  };


  return (
    <>
      <Header pageName={'Raw Fabric'} headerType={'header--main'} />
      <div className="container--raw-fabric-items">
        <div className="raw-fabric-items__content">
          <div className="raw-fabric-items__action-items">
            {/* <img className="raw-fabric-items__image" src={raw_fab} alt="fabric"></img> */}
            <div className="raw-fabric-items__action-items-carousel" style={{ width:'560px' }}>
            <div style={{ display: 'none', width:'560px' }}>
              {itemDetail && itemDetail.imageUrls && (
                <Image.PreviewGroup
                  preview={{
                    visible,
                    onVisibleChange: (vis) => setVisible(vis),
                  }}
                >
                  {itemDetail && itemDetail.imageUrls ? (
                    itemDetail.imageUrls.map((p_img) => <Image src={p_img} />)
                  ) : (
                    <Image src={Logo} />
                  )}
                </Image.PreviewGroup>
              )}
            </div>

            <ProductImageSlider
              images={
                itemDetail && itemDetail.imageUrls
                  ? itemDetail.imageUrls.map((p_img) => p_img)
                  : [{ Logo }]
              }
              openModal={setVisible}
            />
              <div className="raw-fabric-items__length-grp">
                <button className="btn-secondary raw-fabric-items__minus">-</button>
                <p className="raw-fabric-items__length">{lengthCount} meter</p>
                <button className="btn-secondary raw-fabric-items__plus">+</button>
              </div>
              <button className="btn-primary raw-fabric-items__add-bag"
                onClick={() => handleAddToBag()}
              >Add to Bag</button>
            </div>
          </div>

          <div className="raw-fabric-items__description">
            <h2 className="raw-fabric-items__title">{selectedItem.name}</h2>
            <p className="raw-fabric-items__price">₹ {itemDetail && itemDetail.price} <span>per meter</span></p>

            <div className="raw-fabric-items__specifications">
              <h4 className="raw-fabric-items__specs-title">Specifications</h4>
              <p className="raw-fabric-items__specs-desc">
                {itemDetail && itemDetail.specifications}
              </p>
            </div>

            <div className="raw-fabric-items__sub-desc">
              <h4 className="raw-fabric-items__sub-desc-title">Description</h4>
              <p className="raw-fabric-items__sub-desc-desc">
                {itemDetail && itemDetail.description}</p>
            </div>

            {/* <div className="raw-fabric-items__pincode">
              <input className="raw-fabric-items__pincode-input" type="number" placeholder="Enter Pincode" />
              <button className="btn-primary raw-fabric-items__pincode-check">Check Availaibility</button>
            </div> */}
          </div>
        </div>

        <div className="raw-fabric-items__rating">
          <div className="raw-fabric-items__heading">
            <h5>Reviews & Ratings</h5>
            <div className="raw-fabric-items__rating-data">
              <img className="raw-fabric-items__rating-icon" src={star_colored} alt="" />
              <p className="raw-fabric-items__rating-count">
                {itemReview && itemReview.rating ? itemReview.rating : 0}/10</p>
            </div>
          </div>

          {topReviews.map((review) => (
            <div className="raw-fabric-items__individual-rating">
              <div className="raw-fabric-items__individual-rating-count">
                <img
                  src={review.rating > 0 ? star_colored : star_normal}
                  alt=""
                />
                <img
                  src={review.rating > 1 ? star_colored : star_normal}
                  alt=""
                />
                <img
                  src={review.rating > 2 ? star_colored : star_normal}
                  alt=""
                />
                <img
                  src={review.rating > 3 ? star_colored : star_normal}
                  alt=""
                />
                <img
                  src={review.rating > 4 ? star_colored : star_normal}
                  alt=""
                />
              </div>
              <h5 className="raw-fabric-items__rating-title">
                {review.shortReview}
              </h5>
              <p className="raw-fabric-items__rating-desc">
                {review.longReview}
              </p>
              <p className="raw-fabric-items__rating-author">
                {review.reviewPerson}
              </p>
            </div>
          ))}

          {itemReview && itemReview.reviews.length > reviewStepCount && (
            <div className="raw-fabric-items__rating-show-button">
              <button
                className="btn-secondary raw-fabric-items__rating-show-more"
                onClick={() =>
                  itemReviewMore
                    ? handleShowMoreReviews()
                    : handleShowLessReviews()
                }
              >
                {itemReviewMore ? "Show More..." : "Show Less..."}
              </button>
            </div>
          )}
        </div>
        {productSuggestion && productSuggestion.length > 0 && (
          <div className="raw-fabric-items__suggestions">
            <h5 className="raw-fabric-items__suggestions-title">You may also like</h5>
            <div className="raw-fabric-items__all-suggested-items">
              {productSuggestion.map((p_suggest) => (
                <div className="raw-fabric-items__suggested-items" key={p_suggest.id}>
                  <Link
                    to={{
                      pathname: `/raw-fabric/${p_suggest.name}`,
                      state: {
                        selectedItem: p_suggest,
                      },
                    }}
                  >
                    <div className="raw-fabric-items__items-details">
                      <img className="raw-fabric-items__items-image"
                        src={p_suggest.imgUrl}
                        alt={p_suggest.name} />
                      <p className="raw-fabric-items__items-name">
                        {p_suggest.name}
                      </p>
                    </div>
                  </Link>
                </div>
              ))}
              
            </div>
          </div>
        )}
      </div>
    </>
  );
};
