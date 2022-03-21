import React, { useEffect, useState } from "react";
import { useDispatch, useStore } from "react-redux";
import { Link, useHistory, useParams } from "react-router-dom";
import Header from "../Header/Header";

import suits from "../../assests/images/content/design_your_outfit/suits.png";
import { getSubProductCategoryData } from "../../redux/actions/SubProductCategoryAction";

export const ViewCLOTHINGSubProduct = () => {
  let { slug } = useParams();

  return <SubProduct slug={slug} />;
};

const SubProduct = ({ slug }) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const store = useStore();
  const [subCategories, setSubCategories] = useState([]);

  useEffect(() => {
    dispatch(getSubProductCategoryData(slug, history));
  }, []);

  useEffect(() => {
    // let subscribe = true;
    store.subscribe(() => {
      const products = store.getState().subProductCategories.getSubCategories;
      // console.log(products);
      setSubCategories(products);
    });

    return () => {
      // subscribe = false;
      setSubCategories([]);
    };
  }, [store, history]);
  return (
    <>
      <Header pageName={"Design your own outfit"} headerType={"header--main"} />
      <div className="container--subproduct__clothing">
        <div className="subproduct-box-clothing__box">
          {subCategories.map((res) => (
            <div key={res?.id} className="subproduct-box__clothing">
              <Link to={`/subproduct/clothing/${res?.code}`}>
                <img
                  className="subproduct-box--clothing__image"
                  src={res?.imgUrl}
                  alt="saree"
                />
              </Link>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};
