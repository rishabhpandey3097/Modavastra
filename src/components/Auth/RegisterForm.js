import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { userRegister } from '../../redux/actions/UserAccount'
import { Link } from 'react-router-dom'
import { registerSchema } from '../../utils/Validations'
import logo from '../../assests/images/modavastraa.svg'

const RegisterForm = () => {
  let dispatch = useDispatch()
  let history = useHistory()
  const formOptions = { resolver: yupResolver(registerSchema) }
  const { register, handleSubmit, formState } = useForm(formOptions)
  const { errors } = formState

  const handleSubmitRegister = (registerData) => {
    const { name, email, password, mobile } = registerData
    dispatch(
      userRegister(
        { name, email, type: 'CUSTOMER', password, mobile },
        history,
      ),
    )
  }

  return (
    <React.Fragment>
      <div className="container-login signup">
        <div className="left-container">
          <Link to="/"><img src={logo} alt="Moda Logo" /></Link>
        </div>
        <div className="right-container">
          <form onSubmit={handleSubmit(handleSubmitRegister)}>
            <div className="name">
              <div className='name-box'>
                <input
                  type="text"
                  id="name"
                  name="name"
                  placeholder="Enter Your Name"
                  {...register('name')}
                />
                <i>{errors.name ? errors.name.message : ''}</i>
              </div>
            </div>
            <div className="email">
              <div className='email-box'>
                <input
                  type="text"
                  id="email"
                  name="email"
                  placeholder="E-mail"
                  {...register('email')}
                />
                <i>{errors.email ? errors.email.message : ''}</i>
              </div>
            </div>
            {/* <div className="user-type">
              <select id="type" name="type" {...register("type")}>
                <option value="">--Select UserType--</option>
                <option value="ADMIN">Admin</option>
                <option value="CUSTOMER">Customer</option>
                <option value="DESIGNER">Designer</option>
                <option value="GUEST">Guest</option>
              </select>
              <br />
              <i>{errors.type ? errors.type.message : ""}</i>
            </div> */}
            <div className="password">
              <div className='password-box'>
                <input
                  type="password"
                  id="password"
                  name="password"
                  placeholder="Password"
                  {...register('password')}
                />
                <i>{errors.password ? errors.password.message : ''}</i>
              </div>
            </div>
            <div className="mobile">
              <div className='mobile-box'>
                <input
                  type="text"
                  id="mobile"
                  name="mobile"
                  placeholder="Phone Number"
                  {...register('mobile')}
                />
                <i>{errors.mobile ? errors.mobile.message : ''}</i>
              </div>
            </div>
            <div className="submit">
              <button className="btn-primary" type="submit">
                Sign up
              </button>
            </div>
          </form>

          {/* <div className="social-login">
            <p>
              <span> or signup with </span>
            </p>
            <div className="social-icons">
              <a href="https://www.google.com" target="_blank">
                <img src={googleImg} alt="Google Logo" />
              </a>
              <a href="https://www.facebook.com" target="_blank">
                <img src={facebookImg} alt="Google Logo" />
              </a>
            </div>
          </div> */}

          <div className="user-check">
            <p>Already have an account?</p>
            <Link to="/login">
              <button className="btn-secondary" type="button">
                Login
              </button>
            </Link>
          </div>
        </div>
      </div>
    </React.Fragment>
  )
}

export default RegisterForm
