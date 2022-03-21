import React, { useEffect, useState } from "react";
import { useDispatch, useStore, useSelector } from "react-redux";
import { useParams } from "react-router";
import { Link, useHistory } from "react-router-dom";
import Header from "../Header/Header";
import Filter from "../Filter";
import FilterMobile from "../Filtermobile";
import { Modal, Button } from "antd";

import { getProductsOnSale } from "../../redux/actions/SalesAction";

const Sale = (props) => {
  const history = useHistory();
  const [products, setProducts] = useState([]);
  const [items, setItems] = useState([]);
  const store = useStore();
  const dispatch = useDispatch();
  const [isModalVisible, setIsModalVisible] = useState(false);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  // const data = useSelector(
  //   (state) => state.subProductReducer.getSubProductsData
  // );

  useEffect(() => {
    console.log("hello from sales page");
    dispatch(getProductsOnSale(history));
  }, []);

  useEffect(() => {
    const controller = new AbortController();
    const { signal } = controller.signal;
    let subscribe = true;
    store.subscribe(
      () => {
        console.log(store.getState());
        const newState = store.getState().salesReducer.saleProducts;
        if (subscribe) {
          // console.log(newState);
          setProducts(newState);
          setItems(newState);
        }
      },
      { signal }
    );

    return () => {
      console.log("useEffect CleanUP!!!");
      setItems([]);
      setProducts([]);
      subscribe = false;
      controller.abort();
    };
  }, [store]);

  const onChangeDesigner = (code) => {
    // dispatch(getSubProductData("CLOTH", code));
  };
  const onFilter = (range) => {
    const arr = [...items];
    const filteredProducts = arr.filter((prod) => {
      return prod.price >= range[0] && prod.price <= range[1];
    });
    setProducts(filteredProducts);
  };
  return (
    <>
      <Header pageName={"Saree"} headerType={"header--main"} />
      {/* <button className="filter">Filter</button> */}
      <Button type="primary" className="filter" onClick={showModal}>
        Apply Filter
      </Button>
      <Modal
        style={{ width: "0px" }}
        className="modal"
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={null}
      >
        <FilterMobile
          procode={"CLOTH"}
          changeDesigner={onChangeDesigner}
          pageName={"product-filter--clothing-mobile"}
        />
      </Modal>
      <Filter
        procode={"CLOTH"}
        changeDesigner={onChangeDesigner}
        filterProducts={onFilter}
        pageName={"product-filter--clothing"}
      />
      <div className="container--product-items">
        <div className="product-items">
          {products.map((res) => (
            <div key={res?.id} className="product-items__box">
              <Link to={`/products/sale/${res?.itemId}/${res?.items.name}`}>
                <img
                  className="product-items__image"
                  src={res?.items.imgUrl}
                  alt="saree"
                ></img>
              </Link>
              <div className="sale-item__description">
                <div className="sale-items__title">{res?.items.name}</div>
                <div className="sale-items__sale_price">₹ {res?.salePrice}</div>
                <div className="sale-items__sale_price">
                  <del> ₹ {res?.price}</del>
                </div>
                <div className="sale-items__sale_price">({res?.msg})</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Sale;
