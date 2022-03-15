import React, { useEffect, useState } from 'react';
import { Redirect, useHistory, useLocation, useParams } from "react-router";
import { Link } from "react-router-dom";
import Header from '../Header/Header';
import $ from 'jquery';

import dress from '../../assests/images/rentals/dress.png';
import star_normal from '../../assests/images/star.svg';
import star_colored from '../../assests/images/star-colored.svg';
import { useDispatch, useStore } from 'react-redux';
import { getProductDetailsData, getProductReviewsData, getProductSizesData } from '../../redux/actions/ProductDetailsAction';
import { errorMessage, successMessage } from '../../redux/actions/MessageAction';
import server from '../../redux/actions/apis';
import { Image } from 'antd';
import AwesomeSlider from 'react-awesome-slider';
import Logo from "../../assests/images/logo.png";

export const ViewParticularDressRental = () => {
  let { slug } = useParams();
  const location = useLocation();
  const history = useHistory();
  if (location.state == undefined) {
    history.push("/");
    return;
  }

  const { selectedItem } = location.state;

  return <ParticularDressRental slug={slug} selectedItem={selectedItem} />
};

const ParticularDressRental = ({ slug, selectedItem }) => {
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
  const [productSize, getProductSize] = useState([]);
  const [itemReviewCount, getItemReviewCount] = useState(reviewStepCount);
  const [itemReviewMore, getItemReviewMore] = useState(true);
  const [customise, setCustomise] = useState({
    size: "",
    color: "white",
  });
  const [search, setSearch] = useState("");
  const [showChart, setShowChart] = useState(false);

  const dispatch = useDispatch();
  const store = useStore();
  useEffect(() => {
    dispatch(getProductDetailsData(selectedItem.id));
    dispatch(getProductReviewsData(selectedItem.id));
    dispatch(getProductSizesData(selectedItem.id));
    window.scrollTo(0, 0);
  }, [slug]);

  useState(() => {
    store.subscribe(() => {
      const { productDetails, productReviews, productSizes } =
        store.getState().productDetails;
      getItemDetail(productDetails);
      getItemReview(productReviews);
      getProductSize(productSizes);
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
      <Header pageName={'Suit'} headerType={'header--main'} />
      <div className="container--particular-rental-items">
        <div className="particular-rental-items__content">
          <div className="particular-rental-items__action-items">
            {/* <Link to="/items"><img className="particular-rental-items__image" src={dress} alt="saree"></img></Link> */}
            <div className="particular-rental-items__action-items-carousel">
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
                onClick={() => handleAddToBag()}
              >Confirm Rental</button>
            </div>
          </div>

          <div className="particular-rental-items__description">
            <h2 className="particular-rental-items__title">{selectedItem.name}</h2>
            <p className="particular-rental-items__price">₹ {itemDetail && itemDetail.price} <span>per day</span></p>

            <div className="particular-rental-items__size">
              <p className="particular-rental-items__title">Customise Your Design</p>
              <div className="particular-rental-items__action">
                {productSize &&
                  productSize.map((p) => (
                    <a
                      className={
                        customise.size == p.size
                          ? "particular-rental-items__size-item particular-items__size-selected"
                          : "particular-rental-items__size-item"
                      }
                      onClick={() => setCustomise({ ...customise, size: p.size })}
                    >
                      {p.size}
                    </a>
                  ))}
              </div>


              <div className="particular-rental-items__size-button">
                <button className="btn-secondary particular-rental-items__size-chart">Size Chart</button>
              </div>

              {productSize.length > 0 && (
                <div className="particular-rental-items__size-table">
                  <table>
                    <tr className="particular-rental-items__table-header">
                      <th colSpan="11">Size Chart</th>
                    </tr>
                    <tr className="particular-rental-items__table-row">
                      <td>(inches)</td>
                      {productSize.map(p => <td>{p.size}</td>)}
                    </tr>
                    {productSize[0].sizeGroup.map(size =>
                      <tr className="particular-rental-items__table-row">
                        <td>{size.part}</td>
                        {productSize.map(p => <td>{p.sizeGroup.find(sg => sg.part == size.part)?.size}</td>)}
                      </tr>
                    )}

                  </table>
                </div>
              )}


            </div>

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
              <p className="particular-rental-items__rating-desc">
                {review.longReview}
              </p>
              <p className="particular-rental-items__rating-author">
                {review.reviewPerson}
              </p>
            </div>
          ))}
          {itemReview && itemReview.reviews.length > reviewStepCount && (
            <div className="particular-rental-items__rating-show-button">
              <button className="btn-secondary particular-rental-items__rating-show-more"
                onClick={() =>
                  itemReviewMore
                    ? handleShowMoreReviews()
                    : handleShowLessReviews()
                }
              >
                {itemReviewMore ? "Show More..." : "Show Less..."}</button>
            </div>
          )}
        </div>
      </div>
    </>
  );
};
