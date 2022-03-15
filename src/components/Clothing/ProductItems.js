import React, { useEffect, useState } from "react";
import { useDispatch, useStore, useSelector } from "react-redux";
import { useParams } from "react-router";
import { Link, useHistory } from "react-router-dom";
import Header from "../Header/Header";
import Filter from "../Filter";
import FilterMobile from "../Filtermobile";
import { Modal, Button } from "antd";

import { getSubProductData } from "../../redux/actions/SubProductItem";

import saree1 from "../../assests/images/content/design_your_outfit/saree1.png";
import saree2 from "../../assests/images/content/design_your_outfit/saree2.png";
import saree3 from "../../assests/images/content/design_your_outfit/saree3.png";
import saree4 from "../../assests/images/content/design_your_outfit/saree4.png";

export const ViewClothingSubProductItems = () => {
  let { subSlug } = useParams();

  return <SubProductItems slug={subSlug} />;
};

const SubProductItems = ({ slug }) => {
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
    dispatch(getSubProductData("CLOTH", slug, history));
  }, []);

  useEffect(() => {
    const controller = new AbortController();
    const { signal } = controller.signal;
    let subscribe = true;
    store.subscribe(
      () => {
        const newState = store.getState().subProductReducer.getSubProductsData;
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
    dispatch(getSubProductData("CLOTH", code));
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
              <Link to={`/clothing/items/${res?.id}/${res?.name}`}>
                <img
                  className="product-items__image"
                  src={res?.imgUrl}
                  alt="saree"
                ></img>
              </Link>
              <div className="product-items__description">
                <span className="product-items__title">{res?.name}</span>
                <span className="product-items__price">₹ {res?.price}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};
