import React, { useEffect, useState } from "react";
import { useDispatch, useStore } from "react-redux";
import { useHistory, useLocation, useParams } from "react-router";
import Logo from "../../assests/images/logo.png";
import { message, Image } from "antd";
import ProductImageSlider from "../ProductImageSlider";
import { Link } from "react-router-dom";
import Header from "../Header/Header";
import $ from "jquery";

import star_normal from "../../assests/images/star.svg";
import star_colored from "../../assests/images/star-colored.svg";
import {
  clearProductDetails,
  getAvailablePincodes,
  getProductDetailsData,
  getProductReviewsData,
  getProductSuggestionsData,
} from "../../redux/actions/ProductDetailsAction";
import { addItemToShoppingBag } from "../../redux/actions/ProductBagAction";

export const ViewClothingParticularItems = () => {
  let { slug, itemName } = useParams();
  console.log(slug, itemName);

  return <ParticularItems slug={slug} name={itemName} />;
};

const reviewStepCount = 3;

const ParticularItems = ({ slug, name }) => {
  const store = useStore();
  const history = useHistory();
  const location = useLocation();
  const dispatch = useDispatch();

  // State Variables
  const [buyingSize, setBuyingSize] = useState("");
  const [visible, setVisible] = useState(false);
  const [item, setItem] = useState({});
  const [price, setPrice] = useState(1999);
  const [sizes, setSizes] = useState([]);
  const [similarProducts, setSimilarProducts] = useState([]);
  const [itemReview, setItemReview] = useState();
  const [itemReviewCount, getItemReviewCount] = useState(reviewStepCount);
  const [itemReviewMore, getItemReviewMore] = useState(true);
  const [pincode, setPincode] = useState("");
  const [availablePincodes, setAvailablePincodes] = useState([]);
  const [isAvailable, setIsAvailable] = useState(false);
  const [isClicked, setIsClicked] = useState(false);

  useEffect(() => {
    dispatch(getProductDetailsData(slug, history));
    dispatch(getProductReviewsData(slug, history));
    // dispatch(getAvailablePincodes(slug));
  }, [dispatch, slug, history, location]);

  useEffect(() => {
    store.subscribe(() => {
      const newItem = store.getState();
      setPrice(newItem.productDetails.productDetails.price);
      setItem(newItem.productDetails.productDetails);
      setSizes(newItem.productDetails.productDetails.sizes);
      setItemReview(newItem.productDetails.productReviews);
      // setAvailablePincodes(newItem.productDetails.pincodes);
    });

    return () => {
      dispatch(clearProductDetails);
      setSizes([]);
      setItemReview([]);
      // setAvailablePincodes([]);
    };
  }, [store, location, slug]);

  useEffect(() => {
    dispatch(getProductSuggestionsData(price - 500, price + 500));
    dispatch(getAvailablePincodes(slug));
  }, [price, dispatch, store, slug]);

  useEffect(() => {
    store.subscribe(() => {
      setSimilarProducts(store.getState().productDetails.productSuggestions);
      setAvailablePincodes(store.getState().productDetails.pincodes);
    });

    return () => {
      setSimilarProducts([]);
      setAvailablePincodes([]);
    };
  }, [store, location, slug]);

  const addToBagHandler = () => {
    let token = JSON.parse(localStorage.getItem("token"));
    // if (availablePincodes.length === 0) {
    //   message.error("This Product is not available in your area!");
    //   return;
    // }
    if (buyingSize.trim() === "") {
      message.error("Please select a size before adding to bag!");
      return;
    }
    if (!token) {
      message.error("Please Login!");
      return;
    }
    // if (!isAvailable && pincode.trim() === "") {
    //   message.error("Please Enter Pincode");
    //   return;
    // }
    if (!isAvailable && pincode.trim() !== "") {
      message.error(
        `This Product is not available at this pincode: ${pincode}`
      );
    }
    if (token && buyingSize !== "") {
      const data = {
        itemId: slug,
        size: buyingSize,
        color: "",
        quantity: 1,
      };
      dispatch(addItemToShoppingBag(data));
    }
  };

  // Reviews Logic
  const topReviews = itemReview
    ? itemReview?.reviews?.filter((review, index) => index < itemReviewCount)
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

  $(function () {
    $(".particular-items__size-chart")
      .off()
      .on("click", function () {
        $(".particular-items__size-button").hide();
        $(".particular-items__size-table").show();
      });

    $(".particular-items__action .particular-items__design-item").each(
      function (index, element) {
        $(element)
          .off()
          .on("click", function () {
            $(this).addClass("active").siblings().removeClass("active");

            const subItems = $(
              ".particular-items__custom-design .particular-items__product-list"
            ).toArray();

            if ($(subItems[index]).hasClass("active")) {
              $(subItems[index]).removeClass("active");
              $(element).removeClass("active");
              return;
            }
            $(subItems).removeClass("active");
            $(subItems[index])
              .addClass("active")
              .siblings()
              .removeClass("active");
          });
      }
    );

    $(".particular-items__action .particular-items__size-item").each(function (
      index,
      element
    ) {
      $(element)
        .off()
        .on("click", function () {
          $(this).addClass("active").siblings().removeClass("active");
          $(".particular-items__suggest-text").show();

          const subItems = $(
            ".particular-items__custom-size .particular-items__size-list"
          ).toArray();

          if ($(subItems[index]).hasClass("active")) {
            $(subItems[index]).removeClass("active");
            $(element).removeClass("active");
            $(".particular-items__suggest-text").hide();
            return;
          }
          $(subItems).removeClass("active");
          $(subItems[index])
            .addClass("active")
            .siblings()
            .removeClass("active");
        });
    });

    $(".particular-items__size-data .particular-items__size-slider").each(
      function (index, element) {
        const slider = $(element).find(".particular-items__slider-bar");
        const thumb = $(element).find(".particular-items__slider-thumb");
        const tooltip = $(element).find(".particular-items__thumb-tooltip");
        const progress = $(element).find(".particular-items__progress-bar");

        function customSlider() {
          const maxVal = slider.attr("max");
          const val = (slider.value / maxVal) * 100 + "%";
          tooltip.text(slider.value);
          progress.css("width", val);
          thumb.css("left", val);
        }
        customSlider();
        slider.off().on("input", function () {
          customSlider();
        });
      }
    );
  });

  // Pincode Logic

  const pincodeHandler = () => {
    if (pincode === "" || availablePincodes.length === 0) return;
    for (let i = 0; i < availablePincodes.length; i++) {
      if (availablePincodes[i] === pincode) {
        setIsAvailable(true);
        break;
      }
      setIsAvailable(false);
    }
    setIsClicked(true);
  };

  return (
    <>
      <Header pageName={"Saree"} headerType={"header--main"} />
      <div className="container--particular-items">
        <div className="particular-items__content">
          <div className="particular-items__action-items">
            <div className="particular-items__product-actions">
              <div style={{ display: "none" }}>
                {item && item.imageUrls && (
                  <Image.PreviewGroup
                    preview={{
                      visible,
                      onVisibleChange: (vis) => setVisible(vis),
                    }}
                  >
                    {item && item.imageUrls ? (
                      item.imageUrls.map((p_img, index) => (
                        <Image key={index} src={p_img} />
                      ))
                    ) : (
                      <Image src={Logo} />
                    )}
                  </Image.PreviewGroup>
                )}
              </div>
              <ProductImageSlider
                images={
                  item && item.imageUrls
                    ? item.imageUrls.map((p_img) => p_img)
                    : [{ Logo }]
                }
                openModal={setVisible}
              />
              <button
                onClick={addToBagHandler}
                className="btn-secondary particular-items__add-bag"
              >
                ADD TO BAG
              </button>
            </div>
            {/* <button className="btn-primary particular-items__buy-now">
              ADD TO WISHLIST
            </button> */}
          </div>

          <div className="particular-items__description">
            <h2 className="particular-items__product-title">{name}</h2>
            <p className="particular-items__designer">
              SOLD BY-<span>{item?.designerName}</span>
            </p>
            <p className="particular-items__price">₹ {item?.price} </p>

            <div className="particular-items__size">
              <p className="particular-items__title">Select Size</p>
              <div className="particular-items__action">
                {sizes?.map((size, index) => (
                  <div
                    key={index}
                    onClick={(e) => setBuyingSize(e.target.textContent)}
                    to="#"
                    className="particular-items__size-item"
                  >
                    {size}
                  </div>
                ))}
              </div>

              <div className="particular-items__size-button">
                <button className="btn-secondary particular-items__size-chart">
                  Size Chart
                </button>
              </div>
              <div className="particular-items__size-table">
                <table>
                  <thead>
                    <tr className="particular-items__table-header">
                      <th colSpan="11">Size Chart</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="particular-items__table-row">
                      <td>(inches)</td>
                      <td>XS</td>
                      <td>S</td>
                      <td>M</td>
                      <td>L</td>
                      <td>XL</td>
                      <td>2XL</td>
                      <td>3XL</td>
                      <td>4XL</td>
                      <td>5XL</td>
                      <td>6XL</td>
                    </tr>
                    <tr className="particular-items__table-row">
                      <td>Bust</td>
                      <td>32</td>
                      <td>34</td>
                      <td>36</td>
                      <td>38</td>
                      <td>40</td>
                      <td>42</td>
                      <td>44</td>
                      <td>46</td>
                      <td>48</td>
                      <td>50</td>
                    </tr>
                    <tr className="particular-items__table-row">
                      <td>Waist</td>
                      <td>26</td>
                      <td>28</td>
                      <td>30</td>
                      <td>32</td>
                      <td>34</td>
                      <td>36</td>
                      <td>38</td>
                      <td>40</td>
                      <td>42</td>
                      <td>44</td>
                    </tr>
                    <tr className="particular-items__table-row">
                      <td>Hip</td>
                      <td>36</td>
                      <td>38</td>
                      <td>40</td>
                      <td>42</td>
                      <td>44</td>
                      <td>46</td>
                      <td>48</td>
                      <td>50</td>
                      <td>52</td>
                      <td>54</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
            <button
              onClick={addToBagHandler}
              className="btn-secondary particular-items__add-bag_mobile"
            >
              ADD TO BAG
            </button>

            <div className="particular-items__specifications">
              <h4 className="particular-items__specs-title">Specifications</h4>
              <p className="particular-items__specs-desc">
                {item?.specifications}
              </p>
            </div>

            <div className="particular-items__sub-desc">
              <h4 className="particular-items__sub-desc-title">Description</h4>
              <p className="particular-items__sub-desc-desc">
                {item?.description}
              </p>
            </div>

            {/* <div className="particular-items__pincode">
              <input
                className="particular-items__pincode-input"
                type="number"
                placeholder="Enter Pincode"
                value={pincode}
                onChange={(e) => setPincode(e.target.value)}
              />
              <button
                onClick={pincodeHandler}
                className="btn-primary particular-items__pincode-check"
              >
                Check Availaibility
              </button>
            </div> */}
            {/* <div className="availability-status availability-status__available">
              {isAvailable && <p>Product is available!</p>}
            </div>
            <div className="availability-status">{!isAvailable && <p></p>}</div>
            <div className="availability-status availability-status__not-available">
              {!isAvailable &&
                availablePincodes.length > 0 &&
                pincode &&
                isClicked && <p>Product is not Available</p>}
            </div>
            <div className="availability-status availability-status__not-available">
              {availablePincodes.length === 0 && (
                <p>This Product is Not Available in your area!</p>
              )}
            </div> */}
          </div>
        </div>

        <div className="particular-items__rating">
          <div className="particular-items__heading">
            <h5>Reviews & Ratings</h5>
            <div className="particular-items__rating-data">
              <img
                className="particular-items__rating-icon"
                src={star_colored}
                alt=""
              />
              <p className="particular-items__rating-count">
                {itemReview && itemReview.rating ? itemReview.rating : 0}
                /10
              </p>
            </div>
          </div>

          {topReviews?.map((review, index) => (
            <div key={index} className="particular-items__individual-rating">
              <div className="particular-items__individual-rating-count">
                <img
                  src={review?.rating > 0 ? star_colored : star_normal}
                  alt=""
                />
                <img
                  src={review?.rating > 1 ? star_colored : star_normal}
                  alt=""
                />
                <img
                  src={review?.rating > 2 ? star_colored : star_normal}
                  alt=""
                />
                <img
                  src={review?.rating > 3 ? star_colored : star_normal}
                  alt=""
                />
                <img
                  src={review?.rating > 4 ? star_colored : star_normal}
                  alt=""
                />
              </div>
              <h5 className="particular-items__rating-title">
                {review?.shortReview}
              </h5>
              <p className="particular-items__rating-desc">
                {review?.longReview}
              </p>
              <p className="particular-items__rating-author">
                {review?.reviewPerson}
              </p>
            </div>
          ))}

          {itemReview && itemReview?.reviews?.length > reviewStepCount && (
            <div className="particular-items__rating-show-button">
              <button
                className="btn-secondary particular-items__rating-show-more"
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

        <div className="particular-items__suggestions">
          <h5 className="particular-items__suggestions-title">
            You may also like
          </h5>
          <div className="particular-items__all-suggested-items">
            {similarProducts?.map((product) => {
              console.log(product);
              return (
                <div
                  key={product.id}
                  className="particular-items__suggested-items"
                >
                  <div className="particular-items__items-details">
                    <Link
                      to={`/${
                        product.proCode === "CLOTH"
                          ? "clothing"
                          : product.proCode === "DYOO"
                          ? "DYOO"
                          : product.proCode === "JEW"
                          ? "jewellery"
                          : null
                      }/items/${product?.id}/${product.name}`}
                    >
                      <img
                        className="particular-items__items-image"
                        src={product?.imgUrl}
                        alt={product?.name}
                      />
                    </Link>

                    <p className="particular-items__items-name">
                      {product?.name}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
};
