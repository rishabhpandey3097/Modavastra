import React, { useEffect, useState } from 'react';
import { Link } from "react-router-dom";
import Header from '../Header/Header';

import suit from '../../assests/images/rentals/suit.png';
import necklace from '../../assests/images/rentals/necklace.png';
import { useDispatch, useStore } from 'react-redux';
import { getSearchSubProductData, getSubProductData } from '../../redux/actions/SubProductItem';

const ViewRentalItems = () => {

  const [subProducts, Products] = useState([]);
  const [search, setSearch] = useState("");
  const dispatch = useDispatch();
  const store = useStore();

  useEffect(() => {
    dispatch(getSubProductData("RENTALS", "rentals"));
    // dispatch(getSubProductData("DYOO", "SAR"));
  }, []);

  useEffect(() => {
    store.subscribe(() => {
      const newState = store.getState().subProductReducer.getSubProductsData;
      Products(newState);
    })
  }, [store]);

  const onSearch = () => {
    console.log("search", search);
    search && dispatch(getSearchSubProductData(search));
  }

  return (
    <>
      <Header pageName={'Rentals'}  headerType={'header--main'} setSearch={setSearch} onSearch={onSearch} />
      <div className="container--rental-items">
        {subProducts.length > 0 ? subProducts.map(item =>
          <div className="rental-items" key={item.id}>
            <Link to={{
              pathname: `/rental/necklace/${item.code}`,
              state: {
                selectedItem: item
              }
            }}>
              <img className="rental-items__image"
                src={item.imgUrl}
                alt={item.name}
              ></img>
              <div className="rental-items__description">
                <p className="rental-items__title">{item.name}</p>
                <p className="rental-items__price">₹ {item.price} onwards</p>
              </div>
            </Link>
          </div>
        ) : <div style={{ fontSize: "5rem" }}>No Product Available</div>}


        <div className="rental-items">
          <Link to="/rental/dress/suit"><img className="rental-items__image" src={suit} alt="saree"></img></Link>
          <div className="rental-items__description">
            <p className="rental-items__title">Yellow Dress</p>
            <p className="rental-items__price">₹ 599 onwards</p>
          </div>
        </div>
        <div className="rental-items">
          <Link to="/rental/necklace/gold"><img className="rental-items__image" src={necklace} alt="saree"></img></Link>
          <div className="rental-items__description">
            <p className="rental-items__title">Necklace Set</p>
            <p className="rental-items__price">₹ 499 onwards</p>
          </div>
        </div>
        <div className="rental-items">
          <Link to="/rental/dress/suit"><img className="rental-items__image" src={suit} alt="saree"></img></Link>
          <div className="rental-items__description">
            <p className="rental-items__title">Yellow Dress</p>
            <p className="rental-items__price">₹ 599 onwards</p>
          </div>
        </div>
        <div className="rental-items">
          <Link to="/rental/necklace/gold"><img className="rental-items__image" src={necklace} alt="saree"></img></Link>
          <div className="rental-items__description">
            <p className="rental-items__title">Necklace Set</p>
            <p className="rental-items__price">₹ 499 onwards</p>
          </div>
        </div>
        <div className="rental-items">
          <Link to="/rental/dress/suit"><img className="rental-items__image" src={suit} alt="saree"></img></Link>
          <div className="rental-items__description">
            <p className="rental-items__title">Yellow Dress</p>
            <p className="rental-items__price">₹ 599 onwards</p>
          </div>
        </div>
        <div className="rental-items">
          <Link to="/rental/dress/suit"><img className="rental-items__image" src={necklace} alt="saree"></img></Link>
          <div className="rental-items__description">
            <p className="rental-items__title">Necklace Set</p>
            <p className="rental-items__price">₹ 499 onwards</p>
          </div>
        </div>
        <div className="rental-items">
          <Link to="/rental/dress/suit"><img className="rental-items__image" src={suit} alt="saree"></img></Link>
          <div className="rental-items__description">
            <p className="rental-items__title">Yellow Dress</p>
            <p className="rental-items__price">₹ 599 onwards</p>
          </div>
        </div>
        <div className="rental-items">
          <Link to="/rental/dress/suit"><img className="rental-items__image" src={necklace} alt="saree"></img></Link>
          <div className="rental-items__description">
            <p className="rental-items__title">Necklace Set</p>
            <p className="rental-items__price">₹ 499 onwards</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default ViewRentalItems;