import React, { useState, useEffect } from "react";
import { Slider } from "antd";
import { useDispatch, useStore } from "react-redux";
import { getSubProductCategoryData } from "../redux/actions/SubProductCategoryAction";

const Filter = (props) => {
  const [designers, setDesigners] = useState([]);
  const dispatch = useDispatch();
  const store = useStore();

  useEffect(() => {
    dispatch(getSubProductCategoryData(props.procode));
  }, []);

  useEffect(() => {
    store.subscribe(() => {
      // console.log(store.getState());
      setDesigners(store.getState().subProductCategories.getSubCategories);
    });

    return () => {
      setDesigners([]);
    };
  }, [store]);

  const designerChangeHandler = (code) => {
    props.changeDesigner(code);
  };

  const triggerFilter = (range) => {
    props.filterProducts(range);
  };

  return (
    <div className="ShoworHide">
      <div className={"product-filter " + props.pageName}>
        <div className="product-filter__filter-title">
          <button className="filter-btn">Filter</button>
        </div>
        {/* <div className={"product-filter__rent"}>
          <div className="product-filter__rent-text">Available for rent</div>
          <label className="product-filter__rent-toggle">
            <input type="checkbox" />
            <span className="product-filter__rent-slider"></span>
          </label>
        </div> */}
        <div className="product-filter__line"></div>
        <div className="product-filter__wrapper">
          {/* <div className="product-filter__category">
          <div className="product-filter__title">Categories</div>
          <ul className="product-filter__types">
            <li className="product-filter__option">
              <input type="checkbox" id="filter-fusion-wear" />
              <label htmlFor="filter-fusion-wear">Fusion Wear</label>
            </li>
          </ul>
          <div className="product-filter__line"></div>
        </div> */}

          {/***************** Sizes ***************/}
          {/* <div className="product-filter__size">
          <div className="product-filter__title">Size</div>
          <ul className="product-filter__types">
            <li className="product-filter__option">
              <input type="checkbox" id="size-xxl" />
              <label htmlFor="size-xxl">XXL</label>
            </li>
          </ul>
          <div className="product-filter__line"></div>
        </div> */}

          <div className="product-filter__designers">
            <div className="product-filter__title">Designers</div>
            <ul className="product-filter__types">
              {designers?.map((res) => (
                <li
                  key={res?.id}
                  onClick={() => designerChangeHandler(res?.code)}
                  className="product-filter__option"
                >
                  {res?.name}
                </li>
              ))}
            </ul>
          </div>

          {/* Price Range Filter */}
          <div className="price-range__filter">
            <div className="product-filter__title">Filter By Price</div>
            <ul className="product-filter__types">
              {/* <li className="product-filter__option">Something</li> */}
              <Slider
                // tooltipVisible={true}
                step={500}
                range
                min={1000}
                max={5000}
                defaultValue={[1000, 2000]}
                onAfterChange={(value) => triggerFilter(value)}
              />
            </ul>
          </div>
          {/* Price Range Filter */}
        </div>
      </div>
    </div>
  );
};

export default Filter;
