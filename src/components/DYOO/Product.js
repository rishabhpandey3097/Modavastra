import React, { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router";
import { useSelector, useDispatch, useStore } from "react-redux";
import { Link } from "react-router-dom";
import Header from "../Header/Header";

// import sarees from "../../assests/images/content/design_your_outfit/sarees.png";
// import suits from "../../assests/images/content/design_your_outfit/suits.png";
// import anarkalis from "../../assests/images/content/design_your_outfit/anarkalis.png";
// import blouse_corsets from "../../assests/images/content/design_your_outfit/blouse_corsets.png";
// import fusionwear from "../../assests/images/content/design_your_outfit/fusionwear.png";
// import lehengas from "../../assests/images/content/design_your_outfit/lehengas.png";
import { getSubProductCategoryData } from "../../redux/actions/SubProductCategoryAction";

export const ViewDYOOSubProduct = () => {
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

  const data = useSelector(
    (state) => state.subProductCategories.getSubCategories
  );

  useEffect(() => {
    let subscribe = true;
    if (subscribe) {
      setSubCategories(data);
    }

    return () => {
      subscribe = false;
    };
  }, [data]);

  return (
    <>
      <Header pageName={"Design your own outfit"} headerType={"header--main"} />
      <div className="container--subproduct">
        <div className="subproduct-box__box">
          {subCategories.map((res) => (
            <div key={res?.id} className="subproduct-box">
              <img
                className="subproduct-box__image"
                src={res?.imgUrl}
                alt="saree"
              ></img>
              <div className="subproduct-box__link">
                <Link to={`/subproduct/DYOO/${res?.code}`}>{res?.name}</Link>
              </div>
            </div>
          ))}
        </div>

        {/* <div class="subproduct-reference">
                    <p>Didn't find the design you were looking for? Send us a reference picture of your perfect dress and we will design it for you!</p>
                    <Link to="/product/DYOO/send-reference"><button className="btn-primary subproduct-reference__button">Send us a reference</button></Link>
                </div> */}
      </div>
    </>
  );
};
