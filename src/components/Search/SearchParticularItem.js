import React, { useEffect } from "react";
import { useParams } from "react-router";
import { Link } from "react-router-dom";
import Header from "../Header/Header";
import $ from "jquery";

import jewellery from "../../assests/images/content/jewellery/jewellery.png";
import suggestions from "../../assests/images/content/suggestions.png";
import wishlist_active from "../../assests/images/wishlist_active.svg";
import wishlist_inactive from "../../assests/images/wishlist_inactive.svg";
import jewellery_1 from "../../assests/images/content/jewellery/jewellery_1.png";
import jewellery_2 from "../../assests/images/content/jewellery/jewellery_2.png";
import jewellery_3 from "../../assests/images/content/jewellery/jewellery_3.png";
import star_normal from "../../assests/images/star.svg";
import star_colored from "../../assests/images/star-colored.svg";

export const ViewSearchParticularItems = () => {
  let { slug } = useParams();

  return <ParticularItems slug={slug} />;
};

const ParticularItems = (slug) => {
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

  return (
    <>
      <Header headerType={"header--main"} />
      <div className="container--particular-items">
        <div className="particular-items__content">
          <div className="particular-items__action-items">
            <div className="particular-items__product-actions">
              <Link to="/items">
                <img
                  className="particular-items__product-image"
                  src={jewellery}
                  alt="saree"
                ></img>
              </Link>
              <img
                className="particular-items__wishlist"
                src={wishlist_inactive}
                alt="saree"
              ></img>
              <button className="btn-secondary particular-items__add-bag">
                ADD TO BAG
              </button>
            </div>
          </div>

          <div className="particular-items__description">
            <h2 className="particular-items__product-title">
              American Diamond Bangles
            </h2>
            <p className="particular-items__designer">
              SOLD BY-<span>Drapes by Rashmi</span>
            </p>
            <p className="particular-items__price">₹ 2,999.00 </p>

            <div className="particular-items__specifications">
              <h4 className="particular-items__specs-title">Specifications</h4>
              <p className="particular-items__specs-desc">
                American Diamond Bangles
              </p>
            </div>

            <div className="particular-items__sub-desc">
              <h4 className="particular-items__sub-desc-title">Description</h4>
              <p className="particular-items__sub-desc-desc">
                Keep the allure of traditional artistry alive and ablaze with
                these ornately crafted stud earrings. This pair is the perfect
                match to your heirloom sarees.
              </p>
            </div>

            <div className="particular-items__pincode">
              <input
                className="particular-items__pincode-input"
                type="number"
                placeholder="Enter Pincode"
              />
              <button className="btn-primary particular-items__pincode-check">
                Check Availaibility
              </button>
            </div>
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
              <p className="particular-items__rating-count">4.7/10</p>
            </div>
          </div>

          <div className="particular-items__individual-rating">
            <div className="particular-items__individual-rating-count">
              <img src={star_colored} alt="" />
              <img src={star_colored} alt="" />
              <img src={star_colored} alt="" />
              <img src={star_colored} alt="" />
              <img src={star_normal} alt="" />
            </div>
            <h5 className="particular-items__rating-title">Loved it!</h5>
            <p className="particular-items__rating-desc">
              Great fit, fabrix and colors.
            </p>
            <p className="particular-items__rating-author">Preeti Verma</p>
          </div>

          <div className="particular-items__individual-rating">
            <div className="particular-items__individual-rating-count">
              <img src={star_colored} alt="" />
              <img src={star_colored} alt="" />
              <img src={star_colored} alt="" />
              <img src={star_colored} alt="" />
              <img src={star_colored} alt="" />
            </div>
            <h5 className="particular-items__rating-title">Bit bigger</h5>
            <p className="particular-items__rating-desc">
              A bit bigger in size as expected, other than...
            </p>
          </div>

          <div className="particular-items__rating-show-button">
            <button className="btn-secondary particular-items__rating-show-more">
              Show More...
            </button>
          </div>
        </div>

        <div className="particular-items__suggestions">
          <h5 className="particular-items__suggestions-title">
            You may also like
          </h5>
          <div className="particular-items__all-suggested-items">
            <div className="particular-items__suggested-items">
              <div className="particular-items__items-details">
                <Link to="/">
                  <img
                    className="particular-items__items-image"
                    src={jewellery_1}
                    alt=""
                  />
                </Link>
                <p className="particular-items__items-name">
                  Net Multi Wear saree
                </p>
              </div>
            </div>

            <div className="particular-items__suggested-items">
              <div className="particular-items__items-details">
                <Link to="/">
                  <img
                    className="particular-items__items-image"
                    src={jewellery_2}
                    alt=""
                  />
                </Link>
                <p className="particular-items__items-name">
                  Traditional Sarees
                </p>
              </div>
            </div>

            <div className="particular-items__suggested-items">
              <div className="particular-items__items-details">
                <Link to="/">
                  <img
                    className="particular-items__items-image"
                    src={jewellery_3}
                    alt=""
                  />
                </Link>
                <p className="particular-items__items-name">
                  Net Multi Wear saree
                </p>
              </div>
            </div>

            <div className="particular-items__suggested-items">
              <div className="particular-items__items-details">
                <Link to="/">
                  <img
                    className="particular-items__items-image"
                    src={jewellery_1}
                    alt=""
                  />
                </Link>
                <p className="particular-items__items-name">
                  Traditional Sarees
                </p>
              </div>
            </div>

            <div className="particular-items__suggested-items">
              <div className="particular-items__items-details">
                <Link to="/">
                  <img
                    className="particular-items__items-image"
                    src={jewellery_2}
                    alt=""
                  />
                </Link>
                <p className="particular-items__items-name">
                  Net Multi Wear saree
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
