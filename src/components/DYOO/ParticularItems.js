import React, { useEffect, useState } from "react";
import { useSelector, useDispatch, useStore } from "react-redux";
import Logo from "../../assests/images/logo.png";
import { Link, useParams, useHistory, useLocation } from "react-router-dom";
import Header from "../Header/Header";
import { Slider, Switch, Image, message } from "antd";
import ProductImageSlider from "../ProductImageSlider";
import $ from "jquery";

import star_normal from "../../assests/images/star.svg";
import star_colored from "../../assests/images/star-colored.svg";
import {
  getProductSizesData,
  getProductDetailsData,
  getProductReviewsData,
  getProductCustomizationData,
  getCustomView,
  clearProductDetails,
  getProductSuggestionsData,
} from "../../redux/actions/ProductDetailsAction";
import { addItemToShoppingBag } from "../../redux/actions/ProductBagAction";

export const ViewDYOOParticularItems = () => {
  let { slug, itemName } = useParams();

  return <ParticularItems slug={slug} name={itemName} />;
};

const reviewStepCount = 3;

const ParticularItems = ({ slug, name }) => {
  const store = useStore();
  const history = useHistory();
  const dispatch = useDispatch();
  const location = useLocation();

  // State Variables
  const [buyingSize, setBuyingSize] = useState("");
  const [bust, setBust] = useState(null);
  const [waist, setWaist] = useState(null);
  const [hips, setHips] = useState(null);
  const [visible, setVisible] = useState(false);
  const [item, setItem] = useState([]);
  const [price, setPrice] = useState(1999);
  const [initialPrice, setInitialPrice] = useState(null);
  const [updatedPrice, setUpdatedPrice] = useState(null);
  const [similarProducts, setSimilarProducts] = useState([]);
  const [itemReview, setItemReview] = useState();
  const [itemReviewCount, getItemReviewCount] = useState(reviewStepCount);
  const [itemReviewMore, getItemReviewMore] = useState(true);
  const [productSizes, setProductSizes] = useState([]);
  const [viewName, setViewName] = useState([]);
  const [customView, setCustomView] = useState([]);
  const [customViewItem, setCustomViewItem] = useState([]);
  const [pincode, setPincode] = useState("");
  const [availablePincodes, setAvailablePincodes] = useState([]);
  const [isAvailable, setIsAvailable] = useState();
  const [isClicked, setIsClicked] = useState(false);

  // Custom Size states
  const [selectedSize, setSelectedSize] = useState([""]);
  const [color, setColor] = useState("");
  const [isSizeSelected, setSizeSelected] = useState(false);
  const [isCustomViewSelected, setCustomViewSelected] = useState(false);

  useEffect(() => {
    dispatch(getProductDetailsData(slug, history));
    dispatch(getProductCustomizationData(slug, history));
    dispatch(getProductReviewsData(slug, history));
    dispatch(getProductSizesData(slug, history));
    dispatch(getCustomView(slug));
    window.scroll(0, 0);
  }, [slug, location, history]);

  useEffect(() => {
    store.subscribe(() => {
      const newItem = store.getState();
      // console.log(newItem);
      setPrice(newItem.productDetails.productDetails.price);
      setUpdatedPrice(newItem.productDetails.productDetails.price);
      setInitialPrice(newItem.productDetails.productDetails.price);
      setItem(newItem.productDetails.productDetails);
      setItemReview(newItem.productDetails.productReviews);
      setProductSizes(newItem.productDetails.productSizes);
    });

    return () => {
      dispatch(clearProductDetails);
      setItemReview([]);
      setProductSizes([]);
    };
  }, [store, location, slug]);

  const view_name = useSelector(
    (state) => state.productDetails.productCustomization
  );
  const custom_view = useSelector(
    (state) => state.productDetails.productCustomView
  );

  const createCustomView = (viewName, customView) => {
    setViewName(view_name);
    setCustomView(custom_view);
    const distinctViewName = viewName.map((view) => {
      return view.viewName;
    });
    const newArray = distinctViewName.map((el, index) => {
      const arr = customView.filter((view) => {
        return view.viewName === el;
      });
      return arr;
    });
    setCustomViewItem(newArray);
  };

  useEffect(() => {
    createCustomView(view_name, custom_view);

    return () => {
      createCustomView([], []);
    };
  }, [view_name, custom_view]);

  useEffect(() => {
    dispatch(getProductSuggestionsData(price - 500, price + 500));
  }, [price, dispatch, store]);

  useEffect(() => {
    store.subscribe(() => {
      setSimilarProducts(store.getState().productDetails.productSuggestions);
    });

    return () => {
      setSimilarProducts([]);
    };
  }, [store, location, slug]);

  // Review Logic
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

  //////// Random Key Generator ///////////////
  function makeid(length) {
    var result = "";
    var characters =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    var charactersLength = characters.length;
    for (var i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
  }

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

  ////////////// ADD TO SHOPPING BAG ///////////////
  const addToBagHandler = () => {
    let token = JSON.parse(localStorage.getItem("token"));
    if (!token) {
      message.error("Please Login!");
      return;
    }
    if (color.length === 0) {
      message.error("Please select your custom design");
      return;
    }
    if (updatedPrice === null) {
      message.error("Please select custom view!");
      return;
    }
    if (isSizeSelected === false) {
      message.error("Please select a size before adding item to bag!");
      return;
    }
    if (isSizeSelected && color.length !== 0 && selectedSize) {
      const data = {
        itemId: slug,
        size: selectedSize,
        color: color,
        quantity: 1,
      };
      console.log(data);
      dispatch(addItemToShoppingBag(data));
    }
  };

  const onSettingCustomSize = (itemSize, type, value) => {
    if (type === "Bust") {
      setBust(value);
    } else if (type === "Waist") {
      setWaist(value);
    } else if (type === "Hips") {
      setHips(value);
    }
    const size = `${itemSize}-Bust${bust}, Waist${waist}, Hips${hips}`;
    setSelectedSize(size);
  };

  //////////// Handle Customization //////////////////
  const onSelectingCustomSize = (id) => {
    const [selectedCustomSize] = productSizes.filter((el) => {
      return el.id === id;
    });
    selectedCustomSize.sizeGroup.forEach((el, index) => {
      if (el.part === "Bust") {
        setBust(el.size);
      }
      if (el.part === "Waist") {
        setWaist(el.size);
      }
      if (el.part === "Hips") {
        setHips(el.size);
      }
    });
    setSizeSelected(true);
  };

  const onSelectCustomiseYourDesign = (id) => {
    console.log(id);
    setColor((prev) => {
      return prev, id;
    });
    // console.log(color);
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
                      item.imageUrls.map((p_img) => (
                        <Image key={makeid(5)} src={p_img} />
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
          </div>

          <div className="particular-items__description">
            <h2 className="particular-items__product-title">{name}</h2>
            <p className="particular-items__designer">
              SOLD BY-<span>{item?.designerName}</span>
            </p>
            <p className="particular-items__price">
              ₹ {updatedPrice} <span>onwards</span>
            </p>

            <div className="particular-items__customise">
              <p className="particular-items__title">Customise Your Design</p>
              <div className="particular-items__action">
                {viewName?.map((name, index) => {
                  return (
                    <div
                      key={makeid(9)}
                      className="particular-items__design-item"
                    >
                      {name?.viewName}
                    </div>
                  );
                })}
                <div className="particular-items__custom-design">
                  {customViewItem.map((view, index) => {
                    return (
                      <div
                        key={makeid(8)}
                        className="particular-items__product-list"
                      >
                        {view.map((item, index) => {
                          let itemView = item.customViews[0];
                          return (
                            <div
                              key={makeid(7)}
                              className="particular-items__products"
                            >
                              <img
                                src={itemView?.viewFile}
                                alt={itemView?.viewDescription}
                                onClick={() => {
                                  setUpdatedPrice(
                                    initialPrice + itemView?.viewCharge
                                  );
                                  onSelectCustomiseYourDesign(itemView?.id);
                                }}
                              />
                              <span className="particular-items__products-name">
                                {itemView?.viewDescription}
                              </span>
                              <span className="particular-items__products-price">
                                ₹ {itemView?.viewCharge}
                              </span>
                            </div>
                          );
                        })}
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            <div className="particular-items__size">
              <p className="particular-items__title">Select Size</p>
              <div className="particular-items__action">
                {productSizes?.map((size, index) => (
                  <div
                    key={makeid(3)}
                    to="#"
                    className="particular-items__size-item"
                    onClick={() => onSelectingCustomSize(size?.id)}
                  >
                    {size.size}
                  </div>
                ))}

                <div className="particular-items__custom-size">
                  {productSizes?.map((size, index) => {
                    return (
                      <div
                        key={makeid(9)}
                        className="particular-items__size-list"
                      >
                        {size?.sizeGroup.map((element, index) => {
                          return (
                            <div
                              key={makeid(7)}
                              className="particular-items__size-data"
                            >
                              <div className="particular-items__size-name">
                                {element?.part}
                              </div>
                              <div className="particular-items__size-slider">
                                <Slider
                                  min={25}
                                  max={42}
                                  defaultValue={element?.size}
                                  onAfterChange={(value) => {
                                    onSettingCustomSize(
                                      size.size,
                                      element?.part,
                                      value
                                    );
                                  }}
                                />
                              </div>
                              {/* <div className="particular-items__size-range">
                                <span>0</span>
                                <span>100</span>
                              </div> */}
                            </div>
                          );
                        })}
                      </div>
                    );
                  })}

                  {/* <div className="particular-items__suggest-text">
                    <p>Don't know your perfect size? Leave it on us!</p>
                    <p>Get a specialist at home to take your measurements.</p>
                    <Link to="#">Know More</Link>
                  </div> */}
                </div>
              </div>

              <div className="particular-items__size-button">
                <button className="btn-secondary particular-items__size-chart">
                  Size Chart
                </button>
              </div>
              <div className="particular-items__size-table">
                <table>
                  <tbody>
                    <tr className="particular-items__table-header">
                      <th colSpan="11">Size Chart</th>
                    </tr>
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
                {/* <p>
                  or <Link to="/">Customise your size</Link>
                </p> */}
              </div>
            </div>
            <button className="btn-secondary particular-items__add-bag_mobile">
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
                {itemReview && itemReview.rating ? itemReview?.rating : 0}
                /10
              </p>
            </div>
          </div>

          {topReviews?.map((review) => (
            <div
              key={makeid(5)}
              className="particular-items__individual-rating"
            >
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
            {similarProducts?.map((product) => (
              <div
                key={makeid(6)}
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
                    }/items/${product?.id}/${product?.name}`}
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
            ))}
          </div>
        </div>
      </div>
    </>
  );
};
