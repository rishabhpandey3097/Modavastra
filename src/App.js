import "antd/dist/antd.css";
import React, { useEffect } from "react";
import {
  BrowserRouter,
  Route,
  Switch,
  useHistory,
  Redirect,
} from "react-router-dom";
import PrivateRoute from "./routes/privateRoute";
import "./assests/sass/App.scss";
import Home from "./components/Home";

// Account pages
import Address from "./components/Account/Address";
import Checkout from "./components/Account/Checkout";
import Confirmation from "./components/Account/confirmation";
import MyAccount from "./components/Account/MyAccount";
import Orders from "./components/Account/Orders";
import ProductBag from "./components/Account/ProductBag";
import RateReviews from "./components/Account/RateReviews";
import Wishlist from "./components/Account/Wishlist";
import Payment from "./components/Account/Payment";

// Authentication ages
import LoginForm from "./components/Auth/LoginForm";
import RegisterForm from "./components/Auth/RegisterForm";
import ChangePassword from "./components/Auth/ChangePassword";

// DYOO pages
import { ViewDYOOSubProduct } from "./components/DYOO/Product";
import { ViewDYOOSubProductItems } from "./components/DYOO/ProductItems";
import { ViewDYOOParticularItems } from "./components/DYOO/ParticularItems";
import SendReference from "./components/DYOO/SendReference";

// Clothing pages
import { ViewClothingParticularItems } from "./components/Clothing/ParticularItems";
import { ViewClothingSubProductItems } from "./components/Clothing/ProductItems";
import { ViewCLOTHINGSubProduct } from "./components/Clothing/products";

// Jewellary pages
import { ViewJewelleryParticularItems } from "./components/Jewellery/ParticularItems";
import { ViewJewellerySubProductItems } from "./components/Jewellery/ProductItems";

// Searched Products
import { ViewSearchSubProductItems } from "./components/Search/SearchItems";
import { ViewSearchParticularItems } from "./components/Search/SearchParticularItem";

// Sale Products

// Rental pages
import ViewRentalItems from "./components/Rentals/RentalItems";
import { ViewParticularDressRental } from "./components/Rentals/ParticularDressRental";
import { ViewParticularNecklaceRental } from "./components/Rentals/ParticularNecklaceRental";

// Raw Fabrics pages
import RawFabric from "./components/RawFabric/RawFabric";
import { ViewRawFabricItems } from "./components/RawFabric/RawFabricItems";

// Policy pages
import TermsAndCondition from "./components/Policy/TermsAndCondition";
import RefundPolicy from "./components/Policy/RefundPolicy";

import NotFound from "./components/NotFound";
import PrivacyPolicy from "./components/Policy/PrivacyProlicy";
import Sale from "./components/Sale/Sale";
import { ViewSaleItem } from "./components/Sale/SaleItem";

const App = () => {
  return (
    <div className="App">
      <BrowserRouter>
        <Switch>
          {/* Authentication routes */}
          <Route exact path="/login" component={LoginForm} />
          <Route exact path="/signup" component={RegisterForm} />
          <Route exact path="/not-found" component={NotFound} />

          <PrivateRoute exact path="/" component={Home} />

          {/* DYOO Routes */}
          <Route exact path="/product/:slug" component={ViewDYOOSubProduct} />

          <Route
            exact
            path="/product/DYOO/send-reference"
            children={<SendReference />}
          />

          <Route
            exact
            path="/subproduct/DYOO/:subSlug"
            component={ViewDYOOSubProductItems}
          />
          <Route
            exact
            path="/DYOO/items/:slug/:itemName"
            component={ViewDYOOParticularItems}
          />

          {/* Clothing Routes */}
          <Route
            exact
            path="/clothing/product/:slug"
            component={ViewCLOTHINGSubProduct}
          />
          <Route
            exact
            path="/subproduct/clothing/:subSlug"
            component={ViewClothingSubProductItems}
          />
          <Route
            exact
            path="/clothing/items/:slug/:itemName"
            component={ViewClothingParticularItems}
          />

          {/* Sale Products */}
          <Route exact path={"/products/sale"} component={Sale} />
          <Route
            exact
            path={"/products/sale/:slug/:itemName"}
            component={ViewSaleItem}
          />

          {/* Jewellery Routes */}
          <Route
            exact
            path="/subproduct/jewellery/:subSlug"
            component={ViewJewellerySubProductItems}
          />
          <Route
            exact
            path="/jewellery/items/:slug/:name"
            component={ViewJewelleryParticularItems}
          />

          {/* Search Results */}
          <Route
            exact
            path="/search-results"
            component={ViewSearchSubProductItems}
          />
          <Route
            exact
            path="/Search/items/:slug/:name"
            component={ViewSearchParticularItems}
          />
          <Route
            exact
            path="/TermsAndCondition"
            component={TermsAndCondition}
          />
          <Route exact path="/RefundPolicy" component={RefundPolicy} />
          <Route exact path="/PrivacyPolicy" component={PrivacyPolicy} />

          {/* Account Routes  */}
          <Route exact path="/myaccount" component={MyAccount} />
          <Route exact path="/address" component={Address} />
          <Route exact path="/orders" component={Orders} />
          <Route exact path="/rate-reviews" component={RateReviews} />
          <Route exact path="/wishlist" component={Wishlist} />
          <Route exact path="/bag" component={ProductBag} />
          <Route exact path="/checkout" component={Checkout} />
          <Route exact path="/payment" component={Payment} />

          {/* <PrivateRoute exact path="/payment" component={Payment} /> */}
          {/* <Route exact path="/confirmation" component={Confirmation} /> */}
          <Route exact path="/change-password" component={ChangePassword} />

          {/* Raw Fabric routes  */}
          <PrivateRoute
            exactpath="/subproduct/RAWFAB/RAWFAB"
            children={<RawFabric />}
          />

          <PrivateRoute
            exact
            path="/raw-fabric/:slug"
            children={<ViewRawFabricItems />}
          />

          {/* Rental routes  */}
          <PrivateRoute exact path="/rentals" children={<ViewRentalItems />} />
          <PrivateRoute
            exact
            path="/rental/dress/:slug"
            children={<ViewParticularDressRental />}
          />
          <PrivateRoute
            exact
            path="/rental/necklace/:slug"
            children={<ViewParticularNecklaceRental />}
          />

          <Redirect to="/not-found" />
        </Switch>
      </BrowserRouter>
    </div>
  );
};

export default App;
