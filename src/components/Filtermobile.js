import React, { useState, useEffect } from "react";
import { useDispatch, useStore } from "react-redux";
import { getSubProductCategoryData } from "../redux/actions/SubProductCategoryAction";

const FilterMobile = (props) => {
  const [designers, setDesigners] = useState([]);
  const dispatch = useDispatch();
  const store = useStore();

  useEffect(() => {
    dispatch(getSubProductCategoryData(props.procode));
  }, []);

  useEffect(() => {
    store.subscribe(() => {
      console.log(store.getState());
      setDesigners(store.getState().subProductCategories.getSubCategories);
    });

    return () => {
      setDesigners([]);
    };
  }, [store]);

  const designerChangeHandler = (code) => {
    props.changeDesigner(code);
  };

  return (
   <div className="Show">
      <div className={"product-filter " + props.pageName}>
      <div className="product-filter__filter-title">
        <button className="filter-btn">Filter</button>
      </div>
      {/* <div className="product-filter__rent">
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
              <input type="checkbox" id="filter-pricing" />
              <label htmlFor="filter-pricing">Saree</label>
            </li>
            <li className="product-filter__option">
              <input type="checkbox" id="filter-suits" />
              <label htmlFor="filter-suits">Suits</label>
            </li>
            <li className="product-filter__option">
              <input type="checkbox" id="filter-lehenga" />
              <label htmlFor="filter-lehenga">Lehenga</label>
            </li>
            <li className="product-filter__option">
              <input type="checkbox" id="filter-anarkali" />
              <label htmlFor="filter-anarkali">Anarkali</label>
            </li>
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
              <input type="checkbox" id="size-xs" />
              <label htmlFor="size-xs">XS</label>
            </li>
            <li className="product-filter__option">
              <input type="checkbox" id="size-s" />
              <label htmlFor="size-s">S</label>
            </li>
            <li className="product-filter__option">
              <input type="checkbox" id="size-m" />
              <label htmlFor="size-m">M</label>
            </li>
            <li className="product-filter__option">
              <input type="checkbox" id="size-l" />
              <label htmlFor="size-l">L</label>
            </li>
            <li className="product-filter__option">
              <input type="checkbox" id="size-xl" />
              <label htmlFor="size-xl">XL</label>
            </li>
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
            {/* <li className="product-filter__option">
              <input type="checkbox" id="filter-arabella" />
              <label htmlFor="filter-arabella">Arabella</label>
              
            </li>
            <li className="product-filter__option">
              <input type="checkbox" id="filter-bootique" />
              <label htmlFor="filter-bootique">Bootique</label>
              
            </li>
            <li className="product-filter__option">
              <input type="checkbox" id="filter-dress-by-rashmi" />
              <label htmlFor="filter-dress-by-rashmi">Drapes by Rashmi</label>
              
            </li>
            <li className="product-filter__option">
              <input type="checkbox" id="filter-modavastra" />
              <label htmlFor="filter-modavastra">Modavastra</label>
             
            </li>
            <li className="product-filter__option">
              <input type="checkbox" id="filter-sarbear" />
              <label htmlFor="filter-sarbear">Sarbear</label>
            
            </li> */}

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
      </div>
    </div>
   </div>
  );
};

export default FilterMobile;
