import { combineReducers } from "redux";
import store from "store";
import { routerReducer } from "react-router-redux";
import { userAccountReducer } from "./UserAccount";
import { loadingReducer } from "./LoadingReducer";
import { messageReducer } from "./MessageReducer";
import { subProductReducer } from "./SubProductItem";
import { OrderReducer } from "./OrderReducer";
import { wishListReducer } from "./WishListReducer";
import { productCategoryReducer } from "./ProductCategoryReducer";
import { subProductCategoryReducer } from "./SubProductCategoryReducer";
import { productDetailsReducer } from "./ProductDetailsReducer";
import { BagReducer } from "./ProductBagReducer";
import { similarProductsReducer } from "./SimilarProductsReducer";
import { bannerReducer } from "./BannerReducer";
import { searchReducer } from "./SearchReducer";
import { bestSellerReducer } from "./BestSellerReducer";
import { salesReducer } from "./SalesReducer";

const appReducer = combineReducers({
  auth: userAccountReducer,
  loadingState: loadingReducer,
  messageState: messageReducer,
  subProductReducer: subProductReducer,
  orderReducer: OrderReducer,
  wishListReducer,
  bestSellerReducer,
  salesReducer,
  productCategories: productCategoryReducer,
  subProductCategories: subProductCategoryReducer,
  productDetails: productDetailsReducer,
  shoppingBag: BagReducer,
  similarProducts: similarProductsReducer,
  bannerProducts: bannerReducer,
  searchReducer: searchReducer,
});

const initialState = appReducer({}, {});

const reducers = (state, action) => {
  let nextState = state;
  if (store.get("token") === undefined || store.get("token") === null) {
    nextState = initialState;
    store.clearAll();
  }
  return appReducer(nextState, action);
};

export default reducers;
