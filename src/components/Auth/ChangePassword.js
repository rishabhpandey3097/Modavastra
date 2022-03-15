import React from 'react'
import { Link, useHistory } from 'react-router-dom'
import Header from '../Header/Header'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { changePasswordApi } from '../../redux/actions/UserAccount'
import { useDispatch } from 'react-redux'
import { changePasswordValidation } from '../../utils/Validations'

const ChangePassword = (props) => {
  let dispatch = useDispatch()
  let history = useHistory()
  const formOptions = { resolver: yupResolver(changePasswordValidation) }
  const { register, handleSubmit, reset, formState } = useForm(formOptions)
  const { errors } = formState

  const handleChangePassword = (data) => {
    dispatch(changePasswordApi(data, history))
  }

  return (
    <>
      <Header pageName={'Change Password'} headerType={'header--dark'}/>
      <div className="container__generic">
        <div className="left-container">
          <div className="action-links">
            <Link to="/orders">Your Orders</Link>
            <Link to="/wishlist">Wishlist</Link>
            <Link to="/bag">Shopping Bag</Link>
            {/* <Link to="/payment">Payment Settings</Link>
            <Link to="/wallet">Wallet</Link> */}
            <Link to="/address">Address</Link>
            <Link to="/change-password">Change Password</Link>
            <Link className="logout" to="/logout">
              Log Out
            </Link>
          </div>
        </div>

        <div className="right-container">
          <div className="change-password__box">
            <form onSubmit={handleSubmit(handleChangePassword)}>
              <div className="change-password__fields">
                <h3 className="change-password__text">
                  Change current password
                </h3>
                <input
                  type="text"
                  placeholder="Current password*"
                  name="oldPassword"
                  {...register('oldPassword')}
                  type="password"
                />
                <i>{errors.password ? errors.password.message : ''}</i>
                <input
                  type="text"
                  placeholder="New password*"
                  name="newPassword"
                  {...register('newPassword')}
                  type="password"
                />
                <i>{errors.newPassword ? errors.newPassword.message : ''}</i>
                <input
                  type="text"
                  placeholder="Confirm new password*"
                  {...register('confirmPassword')}
                  type="password"
                />
                <i>
                  {errors.confirmPassword ? errors.confirmPassword.message : ''}
                </i>
              </div>

              <div className="change-password__button">
                <button className="btn-primary">Change password</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  )
}

export default ChangePassword
