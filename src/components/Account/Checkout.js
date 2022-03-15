import React, { useState, useEffect } from 'react'
import { Link, useHistory } from 'react-router-dom'
import Header from '../Header/Header'
import { useDispatch, useStore } from 'react-redux'
import designer from '../../assests/images/content/designer.png'
import progress_bar from '../../assests/images/AddressChanges.svg'
import AccountLeftMenu from './AccountLeftMenu'
import { proceedToPay } from '../../redux/actions/ProductBagAction'
import {
  getAddressDetails,
  createAddress,
  createAddressEmpty,
} from '../../redux/actions/UserAccount'

const Checkout = (props) => {
  const history = useHistory()
  const [cartItems, setCartItems] = useState(null)
  const [address, setAddress] = useState({})
  const dispatch = useDispatch()
  const store = useStore()

  useEffect(() => {
    if (history?.location?.state) {
      const data = history.location.state
      setCartItems(data)
    }
    dispatch(createAddressEmpty())
  }, [])

  const handleProceedToPay = (e) => {
    e.preventDefault()

    if (address.id) {
      dispatch(proceedToPay(cartItems, history, address.id))
    } else {
      dispatch(createAddress(address, null))
    }
  }

  useEffect(() => {
    dispatch(getAddressDetails(history))
  }, [])

  useEffect(() => {
    store.subscribe(() => {
      const newState = store.getState().auth.addresses
      setAddress(newState && newState.length > 0 ? newState[0] : {})
    })
  }, [store.getState().auth.addresses])

  useEffect(() => {
    store.subscribe(() => {
      const newState = store.getState().auth.addressCreate
      if (newState) {
        dispatch(proceedToPay(history.location.state, history, newState.id))
      }
    })
  }, [store.getState().auth.addressCreate])

  const handleAddressChange = (e, address) => {
    setAddress((pre) => {
      return {
        ...pre,
        [address]: e.target.value,
      }
    })
  }

  return (
    <>
      <Header pageName={'Bag'} headerType={'header--dark'}/>
      <div className="container__generic">
        <AccountLeftMenu />

        <div className="right-container">
          <div className="checkout__progress-bar">
            <img src={progress_bar} alt="" />
          </div>
          <div className="checkout__box">
            <p class="checkout__text">
              {cartItems?.cartItems?.length &&
                `${cartItems?.cartItems?.length} item(s) in bag:`}
            </p>
            {cartItems &&
              cartItems?.items?.map((item) => (
                <div className="checkout__card">
                  <div className="checkout__data">
                    <div className="checkout__image">
                      <img src={item.imgUrl} alt="" />
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
                  value={address.address ? address.address : ''}
                  onChange={(e) => handleAddressChange(e, 'address')}
                />
                <input
                  type="text"
                  placeholder="Locality/Town*"
                  required
                  value={address.locality ? address.locality : ''}
                  onChange={(e) => handleAddressChange(e, 'locality')}
                />
              </div>
              <div className="checkout__address-city-state">
                <input
                  type="text"
                  placeholder="City*"
                  required
                  value={address.city ? address.city : ''}
                  onChange={(e) => handleAddressChange(e, 'city')}
                />
                <input
                  type="text"
                  placeholder="State*"
                  required
                  value={address.state ? address.state : ''}
                  onChange={(e) => handleAddressChange(e, 'state')}
                />
              </div>
              <input
                type="text"
                placeholder="Pin Code*"
                required
                value={address.pincode ? address.pincode : ''}
                onChange={(e) => handleAddressChange(e, 'pincode')}
              />
              {/* <div className="checkout__checkbox">
                <input type="checkbox" id="defaultAdd" name="defaultAdd" />
                <label for="defaultAdd">Set as Default Address</label>
              </div> */}
            </div>

            <div className="checkout__checkout-button">
              <button className="btn-primary" onClick={handleProceedToPay}>
                Proceed to pay
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Checkout
