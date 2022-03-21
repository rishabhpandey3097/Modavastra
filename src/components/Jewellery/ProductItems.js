import React, { useEffect, useState } from "react";
import { useDispatch, useStore } from "react-redux";
import { useParams } from "react-router";
import { Link, useHistory } from "react-router-dom";
import Header from "../Header/Header";
import Filter from "../Filter";

import jewellery_1 from "../../assests/images/content/jewellery/jewellery_1.png";
import { getSubProductCategoryData } from "../../redux/actions/SubProductCategoryAction";
import { getSubProductData } from "../../redux/actions/SubProductItem";

export const ViewJewellerySubProductItems = () => {
  let { subSlug } = useParams();

  return <SubProductItems slug={subSlug} />;
};

const SubProductItems = ({ slug }) => {
  const history = useHistory();
  const store = useStore();
  const dispatch = useDispatch();
  const [jewelleries, setJewelleries] = useState();
  const [products, setProducts] = useState([]);

  useEffect(() => {
    // dispatch(getSubProductCategoryData("JEW"));
    dispatch(getSubProductData("JEW", "JEW"));
  }, []);

  useEffect(() => {
    store.subscribe(() => {
      const newState = store.getState().subProductReducer.getSubProductsData;
      console.log(newState);
      setJewelleries(newState);
      setProducts(newState);
    });

    return () => {
      setJewelleries([]);
      setProducts([]);
    };
  }, [store]);

  const onChangeDesigner = (code) => {
    // dispatch(getSubProductData("JEW", code));
  };

  const onFilter = (range) => {
    const arr = [...products];
    const filteredProducts = arr.filter((prod) => {
      return prod.price >= range[0] && prod.price <= range[1];
    });
    console.log(filteredProducts);
    setJewelleries(filteredProducts);
  };
  return (
    <>
      <Header headerType={"header--main"} />
      <div className="container--product-items">
        <Filter
          changeDesigner={onChangeDesigner}
          procode={"JEW"}
          pageName={"product-filter--jewellery"}
          filterProducts={onFilter}
        />
        <div className="product-items product-items__jewellery">
          {jewelleries?.map((res) => {
            return (
              <div key={res?.id} className="product-items__box">
                <Link to={`/jewellery/items/${res?.id}/${res?.name}`}>
                  <img
                    className="product-items__image"
                    src={res?.imgUrl}
                    alt={res?.name}
                  ></img>
                </Link>
                <div className="product-items__description">
                  <span className="product-items__title">{res?.name}</span>
                  <span className="product-items__price">₹ {res?.price}</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};
