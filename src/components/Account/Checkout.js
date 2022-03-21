// import React, { useState, useEffect } from "react";
// import { Link, useHistory } from "react-router-dom";
// import Header from "../Header/Header";
// import { useDispatch, useStore, useSelector } from "react-redux";
// import designer from "../../assests/images/content/designer.png";
// import progress_bar from "../../assests/images/AddressChanges.svg";
// import AccountLeftMenu from "./AccountLeftMenu";
// import { proceedToPay } from "../../redux/actions/ProductBagAction";
// import {
//   getAddressDetails,
//   createAddress,
//   createAddressEmpty,
// } from "../../redux/actions/UserAccount";
// import server from "../../redux/actions/apis";

// const Checkout = (props) => {
//   const history = useHistory();
//   const [cartItems, setCartItems] = useState(null);
//   const [loading, setLoading] = useState(false);
//   const [address, setAddress] = useState({});
//   const dispatch = useDispatch();
//   const store = useStore();

//   useEffect(() => {
//     if (history?.location?.state) {
//       const data = history.location.state;
//       setCartItems(data);
//     }
//     dispatch(createAddressEmpty());
//   }, []);

//   const shoppingBag = useSelector((state) => state);
//   console.log(shoppingBag);

//   const handleProceedToPay = (e) => {
//     e.preventDefault();

//     if (address.id) {
//       dispatch(proceedToPay(cartItems, history, address.id));
//     } else {
//       dispatch(createAddress(address, null));
//     }
//   };

//   useEffect(() => {
//     dispatch(getAddressDetails(history));
//   }, []);

//   useEffect(() => {
//     store.subscribe(() => {
//       const newState = store.getState().auth.addresses;
//       setAddress(newState && newState.length > 0 ? newState[0] : {});
//     });
//   }, [store.getState().auth.addresses]);

//   useEffect(() => {
//     store.subscribe(() => {
//       const newState = store.getState().auth.addressCreate;
//       if (newState) {
//         dispatch(proceedToPay(history.location.state, history, newState.id));
//       }
//     });
//   }, [store.getState().auth.addressCreate]);

//   const handleAddressChange = (e, address) => {
//     setAddress((pre) => {
//       return {
//         ...pre,
//         [address]: e.target.value,
//       };
//     });
//   };

//   const makePayment = (paymentData) => {
//     setLoading(true);
//     console.log("jkhcbh----", paymentData);
//     var config = {
//       root: "",
//       style: {
//         bodyBackgroundColor: "#fafafb",
//         bodyColor: "",
//         themeBackgroundColor: "#0FB8C9",
//         themeColor: "#ffffff",
//         headerBackgroundColor: "#284055",
//         headerColor: "#ffffff",
//         errorColor: "",
//         successColor: "",
//         card: {
//           padding: "",
//           backgroundColor: "",
//         },
//       },
//       data: {
//         orderId: paymentData.orderId,
//         token: paymentData.token,
//         tokenType: "TXN_TOKEN",
//         amount: paymentData.amount /* update amount */,
//       },
//       payMode: {
//         labels: {},
//         filter: {
//           exclude: [],
//         },
//         order: ["CC", "DC", "NB", "UPI", "PPBL", "PPI", "BALANCE"],
//       },
//       website: "WEBSTAGING",
//       flow: "DEFAULT",
//       merchant: {
//         mid: "vBeZBA81488018694208",
//         redirect: false,
//       },
//       handler: {
//         transactionStatus: function transactionStatus(paymentStatus) {
//           console.log("paymentStatus => ", paymentStatus);
//           setLoading(false);
//         },
//         notifyMerchant: function notifyMerchant(eventName, data) {
//           console.log("Closed");
//           setLoading(false);
//         },
//       },
//     };

//     if (window.Paytm && window.Paytm.CheckoutJS) {
//       // initialze configuration using init method
//       window.Paytm.CheckoutJS.init(config)
//         .then(function onSuccess() {
//           console.log("Before JS Checkout invoke");
//           setLoading(false);
//           // after successfully update configuration invoke checkoutjs
//           window.Paytm.CheckoutJS.invoke();
//         })
//         .catch(function onError(error) {
//           console.log("Error => ", error);
//         });
//     }
//   };

//   const handlePayment = (e) => {
//     console.log("Hello World!");
//     e.preventDefault();
//     // dispatch(paymentData(shoppingBag.bagData.orderId))
//     server
//       .post(`v1/api/order/${shoppingBag.shoppingBag.bagData.orderId}/payment`)
//       .then((response) => {
//         console.log(response);
//         let payload = {
//           orderId: response.data.data.orderId,
//           token: response.data.data.token,
//           tokenType: "TXN_TOKEN",
//           amount: response.data.data.amount,
//         };
//         //  console.log("payload----", payload);

//         makePayment(payload);
//         // if(response.data.success){
//         //     dispatch(getOrders(response.data.data.orders));
//         // }
//       });
//   };

//   return (
//     <>
//       <Header pageName={"Bag"} headerType={"header--dark"} />
//       <div className="container__generic">
//         <AccountLeftMenu />

//         <div className="right-container">
//           <div className="checkout__progress-bar">
//             <img src={progress_bar} alt="" />
//           </div>
//           <div className="checkout__box">
//             <p class="checkout__text">
//               {cartItems?.cartItems?.length &&
//                 `${cartItems?.cartItems?.length} item(s) in bag:`}
//             </p>
//             {cartItems &&
//               cartItems?.items?.map((item) => (
//                 <div className="checkout__card">
//                   <div className="checkout__data">
//                     <div className="checkout__image">
//                       <img src={item.imgUrl} alt="" />
//                     </div>
//                     <div className="checkout__details">
//                       <h3 className="checkout__names">{item.name}</h3>
//                       {/* <div className="checkout__select">
//                         <span>Qty: </span>
//                         <select value={item.quantity}>
//                           <option value="1">1</option>
//                           <option value="2">2</option>
//                           <option value="3">3</option>
//                           <option value="4">4</option>
//                           <option value="5">5</option>
//                         </select>
//                       </div> */}
//                       <div className="checkout__price">₹ {item.price}</div>
//                     </div>
//                   </div>
//                 </div>
//               ))}

//             <div className="checkout__address">
//               <h3 className="checkout__address-text">Delivery Address</h3>
//               <div className="checkout__address-locality">
//                 <input
//                   type="text"
//                   placeholder="Address (House No, Building, Street, Area)*"
//                   required
//                   value={address.address ? address.address : ""}
//                   onChange={(e) => handleAddressChange(e, "address")}
//                 />
//                 <input
//                   type="text"
//                   placeholder="Locality/Town*"
//                   required
//                   value={address.locality ? address.locality : ""}
//                   onChange={(e) => handleAddressChange(e, "locality")}
//                 />
//               </div>
//               <div className="checkout__address-city-state">
//                 <input
//                   type="text"
//                   placeholder="City*"
//                   required
//                   value={address.city ? address.city : ""}
//                   onChange={(e) => handleAddressChange(e, "city")}
//                 />
//                 <input
//                   type="text"
//                   placeholder="State*"
//                   required
//                   value={address.state ? address.state : ""}
//                   onChange={(e) => handleAddressChange(e, "state")}
//                 />
//               </div>
//               <input
//                 type="text"
//                 placeholder="Pin Code*"
//                 required
//                 value={address.pincode ? address.pincode : ""}
//                 onChange={(e) => handleAddressChange(e, "pincode")}
//               />
//               {/* <div className="checkout__checkbox">
//                 <input type="checkbox" id="defaultAdd" name="defaultAdd" />
//                 <label for="defaultAdd">Set as Default Address</label>
//               </div> */}
//             </div>

//             <div className="checkout__checkout-button">
//               {loading ? (
//                 <img src="https://c.tenor.com/I6kN-6X7nhAAAAAj/loading-buffering.gif" />
//               ) : (
//                 <button
//                   className="btn-primary"
//                   onClick={(e) => handlePayment(e)}
//                 >
//                   proceed to pay
//                 </button>
//               )}
//             </div>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// };

// export default Checkout;

////////////////////// NEW CHECKOUT COMPONENT ///////////////////////

import React, { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
// import HeaderDark from "./Header/HeaderDark";
import { useDispatch, useStore, useSelector } from "react-redux";
// import designer from "../assests/images/content/designer.png";
import progress_bar from "../../assests/images/AddressChanges.svg";
import AccountLeftMenu from "./AccountLeftMenu";
import { proceedToPay } from "../../redux/actions/ProductBagAction";
// import { paymentData } from "../redux/actions/PaymentAction";
import {
  getAddressDetails,
  createAddress,
  createAddressEmpty,
} from "../../redux/actions/UserAccount";
import server from "../../redux/actions/apis";
import Header from "../Header/Header";

const Checkout = (props) => {
  const history = useHistory();
  const [cartItems, setCartItems] = useState(null);
  const [loading, setLoading] = useState(false);
  const [address, setAddress] = useState({});
  const dispatch = useDispatch();
  const store = useStore();
  let { shoppingBag } = useSelector((state) => state);
  // console.log(shoppingBag);
  useEffect(() => {
    if (history?.location?.state) {
      const data = history.location.state;
      setCartItems(data);
    }
    dispatch(createAddressEmpty());
  }, []);

  const handleProceedToPay = (e) => {
    e.preventDefault();

    if (address.id) {
      dispatch(proceedToPay(cartItems, history, address.id));
    } else {
      dispatch(createAddress(address, null));
    }
  };
  function isDate(val) {
    // Cross realm comptatible
    return Object.prototype.toString.call(val) === "[object Date]";
  }

  function isObj(val) {
    return typeof val === "object";
  }

  function stringifyValue(val) {
    if (isObj(val) && !isDate(val)) {
      return JSON.stringify(val);
    } else {
      return val;
    }
  }

  function buildForm({ action, params }) {
    const form = document.createElement("form");
    form.setAttribute("method", "post");
    form.setAttribute("action", action);

    Object.keys(params).forEach((key) => {
      const input = document.createElement("input");
      input.setAttribute("type", "hidden");
      input.setAttribute("name", key);
      input.setAttribute("value", stringifyValue(params[key]));
      form.appendChild(input);
    });

    return form;
  }
  function post(details) {
    const form = buildForm(details);
    document.body.appendChild(form);
    form.submit();
    form.remove();
  }

  const makePayment = (paymentData) => {
    setLoading(true);
    console.log("jkhcbh----", paymentData);
    var config = {
      root: "",
      style: {
        bodyBackgroundColor: "#fafafb",
        bodyColor: "",
        themeBackgroundColor: "#0FB8C9",
        themeColor: "#ffffff",
        headerBackgroundColor: "#284055",
        headerColor: "#ffffff",
        errorColor: "",
        successColor: "",
        card: {
          padding: "",
          backgroundColor: "",
        },
      },
      data: {
        orderId: paymentData.orderId,
        token: paymentData.token,
        tokenType: "TXN_TOKEN",
        amount: paymentData.amount /* update amount */,
      },
      payMode: {
        labels: {},
        filter: {
          exclude: [],
        },
        order: ["CC", "DC", "NB", "UPI", "PPBL", "PPI", "BALANCE"],
      },
      website: "WEBSTAGING",
      flow: "DEFAULT",
      merchant: {
        mid: "vBeZBA81488018694208",
        redirect: false,
      },
      handler: {
        transactionStatus: function transactionStatus(paymentStatus) {
          setLoading(false);
          console.log("paymentStatus => ", paymentStatus);
          if (paymentStatus.RESPCODE === "227" || "501") {
            alert(paymentStatus.RESPMSG);
          }
        },
        notifyMerchant: function (eventName, data) {
          console.log("Closed");
          setLoading(false);
        },
      },
    };

    if (window.Paytm && window.Paytm.CheckoutJS) {
      // initialze configuration using init method
      window.Paytm.CheckoutJS.init(config)
        .then(function onSuccess() {
          console.log("Before JS Checkout invoke");
          setLoading(false);
          window.Paytm.CheckoutJS.invoke();
        })
        .catch(function onError(error) {
          console.log("Error => ", error);
        });
    } else {
      setLoading(false);
      console.log(window.Paytm);
      console.log(window.Paytm.CheckoutJS);
    }
  };

  const handlePayment = (e) => {
    e.preventDefault();
    // dispatch(paymentData(shoppingBag.bagData.orderId))
    server
      .post(`v1/api/order/${shoppingBag.bagData.orderId}/payment`)
      .then((response) => {
        console.log(response);
        let payload = {
          orderId: response.data.data.orderId,
          token: response.data.data.token,
          tokenType: "TXN_TOKEN",
          amount: response.data.data.amount,
        };
        //  console.log("payload----", payload);

        makePayment(payload);
        // if(response.data.success){
        //     dispatch(getOrders(response.data.data.orders));
        // }
      });
  };

  useEffect(() => {
    dispatch(getAddressDetails(history));
  }, []);

  useEffect(() => {
    store.subscribe(() => {
      const newState = store.getState().auth.addresses;
      setAddress(newState && newState.length > 0 ? newState[0] : {});
    });
  }, [store.getState().auth.addresses]);

  useEffect(() => {
    store.subscribe(() => {
      const newState = store.getState().auth.addressCreate;
      if (newState) {
        dispatch(proceedToPay(history.location.state, history, newState.id));
      }
    });
  }, [store.getState().auth.addressCreate]);

  const handleAddressChange = (e, address) => {
    setAddress((pre) => {
      return {
        ...pre,
        [address]: e.target.value,
      };
    });
  };

  return (
    <>
      <Header pageName={"Bag"} headerType={"header--dark"} />
      <div className="container__generic">
        <AccountLeftMenu />

        <div className="right-container">
          <div className="checkout__progress-bar">
            <img src={progress_bar} alt="" />
          </div>
          <div className="checkout__box">
            <p class="checkout__text">
              {cartItems?.cartItems?.length &&
                `${cartItems?.cartItems?.length} item(s) in wishlist:`}
            </p>
            {cartItems &&
              cartItems?.items?.map((item) => (
                <div className="checkout__card">
                  <div className="checkout__data">
                    <div className="checkout__image">
                      <img src={item.imgUrl} alt="" width="200" height="300" />
                    </div>
                    <div className="checkout__details">
                      <h3 className="checkout__names">{item.name}</h3>
                      {/* <div className="checkout__select">
                        <span>Qty: </span>
                        <select value={item.quantity}>
                          <option value="1">1</option>
                          <option value="2">2</option>
                          <option value="3">3</option>
                          <option value="4">4</option>
                          <option value="5">5</option>
                        </select>
                      </div> */}
                      <div className="checkout__price">₹ {item.price}</div>
                    </div>
                  </div>
                </div>
              ))}

            <div className="checkout__address">
              <h3 className="checkout__address-text">Delivery Address</h3>
              <div className="checkout__address-locality">
                <input
                  type="text"
                  placeholder="Address (House No, Building, Street, Area)*"
                  required
                  value={address.address ? address.address : ""}
                  onChange={(e) => handleAddressChange(e, "address")}
                />
                <input
                  type="text"
                  placeholder="Locality/Town*"
                  required
                  value={address.locality ? address.locality : ""}
                  onChange={(e) => handleAddressChange(e, "locality")}
                />
              </div>
              <div className="checkout__address-city-state">
                <input
                  type="text"
                  placeholder="City*"
                  required
                  value={address.city ? address.city : ""}
                  onChange={(e) => handleAddressChange(e, "city")}
                />
                <input
                  type="text"
                  placeholder="State*"
                  required
                  value={address.state ? address.state : ""}
                  onChange={(e) => handleAddressChange(e, "state")}
                />
              </div>
              <input
                type="text"
                placeholder="Pin Code*"
                required
                value={address.pincode ? address.pincode : ""}
                onChange={(e) => handleAddressChange(e, "pincode")}
              />
              {/* <div className="checkout__checkbox">
                <input type="checkbox" id="defaultAdd" name="defaultAdd" />
                <label for="defaultAdd">Set as Default Address</label>
              </div> */}
            </div>

            <div className="checkout__checkout-button">
              {loading ? (
                <img src="https://c.tenor.com/I6kN-6X7nhAAAAAj/loading-buffering.gif" />
              ) : (
                <button
                  className="checkout_btn"
                  onClick={(e) => handlePayment(e)}
                >
                  Proceed To Pay
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Checkout;
