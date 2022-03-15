import React, { useEffect, useState } from 'react';
import { useHistory, useLocation, useParams } from "react-router";
import { Link } from "react-router-dom";
import Header from '../Header/Header';
import $ from 'jquery';

import necklace from '../../assests/images/rentals/necklace.png';
import star_normal from '../../assests/images/star.svg';
import star_colored from '../../assests/images/star-colored.svg';
import { useDispatch, useStore } from 'react-redux';
import { getProductDetailsData, getProductReviewsData } from '../../redux/actions/ProductDetailsAction';
import server from '../../redux/actions/apis';
import { errorMessage, successMessage } from '../../redux/actions/MessageAction';
import { Image } from 'antd';
import AwesomeSlider from 'react-awesome-slider';
import Logo from "../../assests/images/logo.png";

export const ViewParticularNecklaceRental = () => {
  let { slug } = useParams();
  const location = useLocation();
  const history = useHistory();
  if (location.state == undefined) {
    history.push("/");
    return;
  }

  const { selectedItem } = location.state;

  return <ParticularNecklaceRental slug={slug} selectedItem={selectedItem} />
};

const ParticularNecklaceRental = ({ slug, selectedItem }) => {
  $(function () {
    $('.particular-rental-items__size-chart').off().on('click', function () {
      $('.particular-rental-items__size-button').hide();
      $('.particular-rental-items__size-table').show();
    });
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
  const [itemReviewCount, getItemReviewCount] = useState(reviewStepCount);
  const [itemReviewMore, getItemReviewMore] = useState(true);
  const [customise, setCustomise] = useState({
    color: "white",
  });
  const [search, setSearch] = useState("");
  const [showChart, setShowChart] = useState(false);

  const dispatch = useDispatch();
  const store = useStore();
  useEffect(() => {
    dispatch(getProductDetailsData(selectedItem.id));
    dispatch(getProductReviewsData(selectedItem.id));
    window.scrollTo(0, 0);
  }, [slug]);

  useState(() => {
    store.subscribe(() => {
      const { productDetails, productReviews } =
        store.getState().productDetails;
      getItemDetail(productDetails);
      getItemReview(productReviews);
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

  const handleAddToBag = () => {
    server
      .post(`v1/api/cart/add/item`,
        {
          "itemId": selectedItem.id,
          "color": "White",
          "quantity": "4"
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
      });
  };

  const onSearch = () => {
    console.log("search", search);
  }


  return (
    <>
      <Header pageName={'Suit'} headerType={'header--main'}/>
      <div className="container--particular-rental-items">
        <div className="particular-rental-items__content">
          <div className="particular-rental-items__action-items">
            <div className="particular-rental-items__action-items-carousel">
              {/* <Link to="/items"><img className="particular-rental-items__image" src={necklace} alt="saree"></img></Link> */}
              <div style={{ display: "none" }}>
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
              <AwesomeSlider>
                {itemDetail && itemDetail.imageUrls ? (
                  itemDetail.imageUrls.map((p_img) => (
                    <div data-src={p_img} onClick={() => setVisible(true)} />
                  ))
                ) : (
                  <div data-src={Logo} />
                )}
              </AwesomeSlider>
              <div className="particular-rental-items__period">
                <p>Rent Period</p>
                <input type="text" placeholder="From" />
                <input type="text" placeholder="To" />
              </div>
              <button className="btn-primary particular-rental-items__confirm"
                onClick={() => handleAddToBag()}>Confirm Rental</button>
            </div>
          </div>

          <div className="particular-rental-items__description">
            <h2 className="particular-rental-items__title">{selectedItem.name}</h2>
            <p className="particular-rental-items__price">₹ {itemDetail && itemDetail.price} <span>per day</span></p>

            <div className="particular-rental-items__specifications">
              <h4 className="particular-rental-items__specs-title">Specifications</h4>
              <p className="particular-rental-items__specs-desc">
                {itemDetail && itemDetail.specifications}
              </p>
            </div>

            <div className="particular-rental-items__sub-desc">
              <h4 className="particular-rental-items__sub-desc-title">Description</h4>
              <p className="particular-rental-items__sub-desc-desc">
                {itemDetail && itemDetail.description}
              </p>
            </div>

            {/* <div className="particular-rental-items__pincode">
              <input className="particular-rental-items__pincode-input" type="number" placeholder="Enter Pincode" />
              <button className="btn-primary particular-rental-items__pincode-check">Check Availaibility</button>
            </div> */}
          </div>
        </div>

        <div className="particular-rental-items__rating">
          <div className="particular-rental-items__heading">
            <h5>Reviews & Ratings</h5>
            <div className="particular-rental-items__rating-data">
              <img className="particular-rental-items__rating-icon" src={star_colored} alt="" />
              <p className="particular-rental-items__rating-count">
                {itemReview && itemReview.rating ? itemReview.rating : 0}/10</p>
            </div>
          </div>
          {topReviews.map((review) => (
            <div className="particular-rental-items__individual-rating">
              <div className="particular-rental-items__individual-rating-count">
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
              <h5 className="particular-rental-items__rating-title">
                {review.shortReview}
              </h5>
              <p className="particular-rental-items__rating-desc">Great fit, fabrix and colors.</p>
              {review.longReview}
              <p className="particular-rental-items__rating-author">
                {review.reviewPerson}
              </p>
            </div>
          ))}

          <div className="particular-rental-items__rating-show-button">
            <button className="btn-secondary particular-rental-items__rating-show-more"
              onClick={() =>
                itemReviewMore
                  ? handleShowMoreReviews()
                  : handleShowLessReviews()
              }>{itemReviewMore ? "Show More..." : "Show Less..."}</button>
          </div>
        </div>
      </div>
    </>
  );
};
