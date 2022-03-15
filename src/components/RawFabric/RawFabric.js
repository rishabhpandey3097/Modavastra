import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import Header from '../Header/Header'
import { useHistory, useLocation } from 'react-router'
import { useDispatch, useStore } from 'react-redux'
import {
  getSearchSubProductData,
  getSubProductData,
} from '../../redux/actions/SubProductItem'
import ProductNotFound from '../ProductNotFound'

const RawFabric = () => {
  const [subProducts, Products] = useState([])
  const [search, setSearch] = useState('')
  const dispatch = useDispatch()
  const store = useStore()
  const history = useHistory()
  const queryParams = useLocation().search
  const urlParams = new URLSearchParams(queryParams).get('search')

  useState(() => {
    store.subscribe(() => {
      const newState = store.getState().subProductReducer.getSubProductsData
      Products(newState)
    })
  }, [store])

  useEffect(() => {
    if (urlParams) {
      setSearch(urlParams)
      dispatch(getSearchSubProductData(urlParams, null, null, history))
    } else {
      dispatch(getSubProductData('RAWFAB', 'RAWFAB'), history)
      // dispatch(getSubProductData("DYOO", "SAR", null, null, history));
    }
  }, [urlParams])

  const onSearch = () => {
    history.push({
      pathname: `${history.location.pathname}`,
      search: `search=${search}`,
    })
  }

  return (
    <>
      <Header
        pageName={'Raw Fabric'}
        headertType={'header--main'}
        setSearch={setSearch}
        onSearch={onSearch}
      />
      <div className="container--raw-fabric">
        {subProducts.length > 0 ? (
          subProducts.map((item) => (
            <div className="raw-fabric">
              <Link
                to={{
                  pathname: `/raw-fabric/${item.name}`,
                  state: {
                    selectedItem: item,
                  },
                }}
              >
                <img
                  className="raw-fabric__image"
                  src={item.imgUrl}
                  alt={item.name}
                ></img>
                <div className="raw-fabric__description">
                  <p className="raw-fabric__title">{item.name}</p>
                  <div className="raw-fabric__status">
                    <p className="raw-fabric__price">₹ {item.price}/mtr.</p>
                    {/* <p className="raw-fabric__length">16 meters left</p> */}
                  </div>
                </div>
              </Link>
            </div>
          ))
        ) : (
          <ProductNotFound />
        )}
      </div>
    </>
  )
}

export default RawFabric
