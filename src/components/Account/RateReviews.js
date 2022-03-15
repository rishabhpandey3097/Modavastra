import React, { useState } from "react";
import { useHistory, useLocation } from "react-router";
import { Link } from "react-router-dom";
import moment from "moment";
import Header from "../Header/Header";
import designer from "../../assests/images/content/designer.png";
import star from "../../assests/images/star.svg";
import star_colored from "../../assests/images/star-colored.svg";
import AccountLeftMenu from "./AccountLeftMenu";
import {
  errorMessage,
  successMessage,
} from "../../redux/actions/MessageAction";
import server from "../../redux/actions/apis";

const RateReviews = (props) => {
  const history = useHistory();
  const location = useLocation();
  location.state = undefined && history.push("/");
  const { selectedItem, createdOn } = location.state;

  const [rating, setRating] = useState(0);
  const [shortReview, setShortReview] = useState("");
  const [longReview, setLongReview] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleRatingSubmit = () => {
    if (rating === 0) {
      errorMessage("Select Rating");
      return;
    }
    server
      .post(`v1/api/items/${selectedItem.id}/reviews`, {
        shortReview: shortReview,
        longReview: longReview,
        rating: rating,
      })
      .then((response) => {
        if (response.data.success) {
          successMessage(response.data.message);
          setSubmitted(true);
        }
      })
      .catch((error) => {
        let message = "Something went wrong please try again!";
        if (!error.response) {
          message = "Network Error!";
        } else {
          message = error.response.message;
        }
        errorMessage(message);
      });
  };

  return (
    <>
      <Header pageName={"Rate & Reviews"} headerType={"header--dark"} />
      <div className="container__generic">
        <AccountLeftMenu />

        <div className="right-container">
          <div className="product-box">
            <div className="product-card">
              <div className="product-image">
                {" "}
                <img src={selectedItem.imgUrl} alt="" />
              </div>
              <div className="product-details">
                <h3 className="product-names">{selectedItem.name}</h3>
                <h4 className="product-status">
                  Delivered on{" "}
                  {createdOn && moment(createdOn).format("MMMM DD, YYYY")}
                </h4>
                <div className="product-review">
                  <p>Rate & Review</p>
                  <div className="product-rating">
                    <img
                      className="star-rating"
                      onClick={() => setRating(1)}
                      src={rating > 0 ? star_colored : star}
                      alt=""
                    />
                    <img
                      className="star-rating"
                      onClick={() => setRating(2)}
                      src={rating > 1 ? star_colored : star}
                      alt=""
                    />
                    <img
                      className="star-rating"
                      onClick={() => setRating(3)}
                      src={rating > 2 ? star_colored : star}
                      alt=""
                    />
                    <img
                      className="star-rating"
                      onClick={() => setRating(4)}
                      src={rating > 3 ? star_colored : star}
                      alt=""
                    />
                    <img
                      className="star-rating"
                      onClick={() => setRating(5)}
                      src={rating > 4 ? star_colored : star}
                      alt=""
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="rate-review">
              {!submitted ? (
                <div className="rate-review__fields">
                  <p>Title</p>
                  <input
                    type="text"
                    className="rate-review__input"
                    placeholder="A brief overview of your review"
                    value={shortReview}
                    onChange={(e) => setShortReview(e.target.value)}
                  />
                  <p>Your Review</p>
                  <textarea
                    rows="6"
                    placeholder="Explain what you liked, what you didn't like, and everything that we can improve."
                    value={longReview}
                    onChange={(e) => setLongReview(e.target.value)}
                  ></textarea>
                  <div className="rate-review__submit">
                    <button
                      className="btn-primary rate-review__submit-button"
                      onClick={handleRatingSubmit}
                    >
                      Submit Review
                    </button>
                  </div>
                </div>
              ) : (
                <div className="rate-review__text">
                  <div className="rate-review__fields-text">
                    <p className="rate-review__text-title">Title</p>
                    <p className="rate-review__text-value">{shortReview}</p>
                    <p className="rate-review__text-title">Your Review</p>
                    <p className="rate-review__text-value">{longReview}</p>
                  </div>

                  <div className="rate-review__edit">
                    <p>Your review has been submitted</p>
                    <button
                      className="btn-secondary rate-review__edit-button"
                      onClick={() => setSubmitted(false)}
                    >
                      Edit Review
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default RateReviews;
