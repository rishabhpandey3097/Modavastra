import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router'
import { useDispatch, useStore } from 'react-redux'
import { Link, useHistory } from 'react-router-dom'
import API from '../../axios'
import Header from '../Header/Header'
import { useForm } from 'react-hook-form'
import { getAddressDetails, createAddress } from '../../redux/actions/UserAccount'
import { yupResolver } from '@hookform/resolvers/yup'
import { createAddressSchema } from '../../utils/Validations'
import AccountLeftMenu from './AccountLeftMenu'

const Address = (props) => {
  const dispatch = useDispatch()
  const store = useStore()
  const [addresses, setAddresses] = useState([])
  const [heading, setHeading] = useState({
    formHeading: 'Enter New Address',
    buttonHeading: 'Add Address',
  })
  const formOptions = { resolver: yupResolver(createAddressSchema) }
  const {
    register,
    handleSubmit,
    reset,
    formState,
    setValue,
    getValues,
  } = useForm(formOptions)
  const { errors } = formState
  const history = useHistory()
  useEffect(() => {
    dispatch(getAddressDetails(history))
  }, [])

  useEffect(() => {
    store.subscribe(() => {
      const newState = store.getState().auth.addresses
      setAddresses(newState)
    })
  }, [store.getState().auth.addresses])

  const handleSubmitAddress = (data) => {
    data['type'] = 'HOME'
    dispatch(createAddress(data, reset, history))
    setHeading({
      formHeading: 'Enter New Address',
      buttonHeading: 'Add Address',
    })
  }

  const editAddress = (data) => {
    setHeading({ formHeading: 'Edit Address', buttonHeading: 'Edit Address' })
    setValue('address', data.address)
    setValue('pincode', data.pincode)
    setValue('state', data.state)
    setValue('city', data.city)
    setValue('locality', data.locality)
    setValue('addressId', data.id)
    window.scrollTo(0, document.body.scrollHeight)
  }

  return (
    <>
      <Header pageName={'Address'} headerType={'header--dark'} />
      <div className="container__generic">
        <AccountLeftMenu />
        <div className="right-container">
          <div className="address-details">
            <div className="current-address">
              {addresses.length > 0 && (
                <h3 className="address-details-text">Current Addresses</h3>
              )}
              {addresses.map((item, index) => (
                <div className='current-address__textarea' key={index}>
                  <textarea
                    id="txtCurrAdd"
                    rows="7"
                    placeholder="Address"
                    value={item.address}
                    readOnly
                  ></textarea>
                  <button
                    key={item.id}
                    className="btn-secondary edit-address"
                    type="button"
                    onClick={() => editAddress(item)}
                  >
                    Edit
                  </button>
                </div>
              ))}
            </div>
            <form onSubmit={handleSubmit(handleSubmitAddress)}>
              <div className="new-address">
                <h3 className="address-details-text">{heading.formHeading}</h3>
                <div className="address-locality">
                  <div className="address-field__box">
                    <input
                      type="text"
                      placeholder="Address (House No, Building, Street, Area)*"
                      id="address"
                      name="address"
                      {...register('address')}
                    />
                    <i>{errors.address ? errors.address.message : ''}</i>
                  </div>
                  <div className="address-field__box">
                    <input
                      type="text"
                      placeholder="Locality/Town*"
                      name="locality"
                      id="locality"
                      {...register('locality')}
                    />
                    <i>{errors.locality ? errors.locality.message : ''}</i>
                  </div>
                </div>
                <div className="city-state">
                  <div className="address-field__box">
                    <input
                      type="text"
                      placeholder="City*"
                      name="city"
                      id="city"
                      {...register('city')}
                    />
                    <i>{errors.city ? errors.city.message : ''}</i>
                  </div>

                  <div className="address-field__box">
                    <input
                      type="text"
                      placeholder="State*"
                      name="state"
                      id="state"
                      {...register('state')}
                    />
                    <i>{errors.state ? errors.state.message : ''}</i>
                  </div>
                </div>

                <div className="address-field__box">
                  <input
                    type="text"
                    placeholder="Pin Code*"
                    name="pincode"
                    id="pincode"
                    {...register('pincode')}
                  />
                  <i>{errors.pincode ? errors.pincode.message : ''}</i>
                </div>

                <button className="btn-primary" type="submit">
                  {heading.buttonHeading}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  )
}

export default Address
