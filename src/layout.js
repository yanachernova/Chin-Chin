import React from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import NotFound from './views/Notfound'
import Home from './views/Home'
import injectContext from './store/appContext'
import Restaurant from './views/HomeBusiness'
import RestaurantDisplay from "./views/RestaurantDisplay"
import Admin from './views/HomeAdmin'
import New_Product from './components/modal_new_product'
import Confirmation from './views/UserConfirmationPass'
import ConfirmationRestaurant from './views/RestaurantConfirmationPass'
import ConfirmationAdmin from './views/AdminConfirmationPass'
import ShoppingCart from "./views/shoppingcart"
import UserPage from "./views/userpage"
const Layout = props => {
    return (
        <BrowserRouter>
            <Switch>
                <Route exact path="/confirmation/:token" component={Confirmation} />
                <Route exact path="/confirmationrestaurant/:token" component={ConfirmationRestaurant} />
                <Route exact path="/confirmationadmin/:token" component={ConfirmationAdmin} />
                <Route exact path="/" component={Home} />
                <Route exact path="/product" component={New_Product} />
                <Route exact path="/business" component={Restaurant} />
                <Route path="/restaurant/:restaurantname" render={props => <RestaurantDisplay {...props} />} />
                <Route exact path="/admin" component={Admin} />
                <Route exact path="/shoppingcart" component={ShoppingCart}/>
                <Route exact path="/user" component={UserPage}/>
                <Route component={NotFound} />
            </Switch>
        </BrowserRouter>
    )
}

export default injectContext(Layout);