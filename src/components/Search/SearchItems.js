import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import { Link, useHistory } from "react-router-dom";
import { useSelector, useDispatch, useStore } from "react-redux";

import Header from "../Header/Header";
import Filter from "../Filter";

import saree2 from "../../assests/images/content/design_your_outfit/saree2.png";

export const ViewSearchSubProductItems = () => {
  //   let { subSlug } = useParams();

  return <SubProductItems />;
};

const SubProductItems = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const searchItems = useSelector((state) => state.searchReducer.searchResults);
  const [items, setItems] = useState([]);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    setItems(searchItems);
    setProducts(searchItems);

    return () => {
      setItems([]);
      setProducts([]);
    };
  }, [searchItems]);

  const onFilter = (range) => {
    const arr = [...products];
    const filteredProducts = arr.filter((prod) => {
      return prod.price >= range[0] && prod.price <= range[1];
    });
    console.log(filteredProducts);
    setItems(filteredProducts);
  };

  return (
    <>
      <Header pageName={"Saree"} headerType={"header--main"} />
      <div className="container--product-items">
        <Filter
          filterProducts={onFilter}
          pageName={"product-filter--jewellery"}
        />
        <div className="product-items search-items">
          {/* Dynamic Products List */}
          {items?.map((res) => (
            <div key={res?.id} className="product-items__box">
              <Link
                to={`/${
                  res.proCode === "CLOTH"
                    ? "clothing"
                    : res.proCode === "DYOO"
                    ? "DYOO"
                    : res.proCode === "JEW"
                    ? "jewellery"
                    : null
                }/items/${res?.id}/${res?.name}`}
              >
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
          ))}
          {/* Dynamic Products List */}
        </div>
      </div>
    </>
  );
};
