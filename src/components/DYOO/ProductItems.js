import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import { Link, useHistory } from "react-router-dom";
import { useSelector, useDispatch, useStore } from "react-redux";

import Header from "../Header/Header";
import Filter from "../Filter";

import saree1 from "../../assests/images/content/design_your_outfit/saree1.png";
import saree2 from "../../assests/images/content/design_your_outfit/saree2.png";
import saree3 from "../../assests/images/content/design_your_outfit/saree3.png";
import saree4 from "../../assests/images/content/design_your_outfit/saree4.png";
import { getSubProductData } from "../../redux/actions/SubProductItem";
import { Modal, Button } from "antd";
import FilterMobile from "../Filtermobile";

export const ViewDYOOSubProductItems = () => {
  let { subSlug } = useParams();

  return <SubProductItems slug={subSlug} />;
};

const SubProductItems = ({ slug }) => {
  const history = useHistory();
  const [products, setProducts] = useState([]);
  const [items, setItems] = useState([]);
  const store = useStore();
  const dispatch = useDispatch();

  // modal variable

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

  useEffect(() => {
    dispatch(getSubProductData("DYOO", slug, history));
  }, []);

  useEffect(() => {
    store.subscribe(() => {
      const newState = store.getState().subProductReducer.getSubProductsData;
      setProducts(newState);
      setItems(newState);
    });

    return () => {
      setProducts([]);
      setItems([]);
    };
  }, [store]);

  const onChangeDesigner = (code) => {
    dispatch(getSubProductData("DYOO", code));
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
          procode={"DYOO"}
          changeDesigner={onChangeDesigner}
          pageName={"product-filter--clothing-mobile"}
        />
      </Modal>
      <div className="container--product-items">
        <Filter
          changeDesigner={onChangeDesigner}
          filterProducts={onFilter}
          procode={"DYOO"}
          // pageName={"product-filter--dyoo"}
        />
        <div className="product-items">
          {products.map((res) => (
            <div key={res?.id} className="product-items__box">
              <Link to={`/DYOO/items/${res?.id}/${res?.name}`}>
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

          {/* <div className="product-items__box">
            <Link to="/DYOO/items/saree1">
              <img
                className="product-items__image"
                src={saree2}
                alt="saree"
              ></img>
            </Link>
            <div className="product-items__description">
              <span className="product-items__title">
                Gorgeous Designer Saree
              </span>
              <span className="product-items__price">₹ 2,999.00</span>
            </div>
          </div> */}
        </div>
      </div>
    </>
  );
};
