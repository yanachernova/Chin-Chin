import React, { useContext, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Context } from '../store/appContext'
import RestaurantList from '../components/Restaurant/restaurant_list'
import Navbar from '../components/navHome'

const Home = props => {
    const { store, actions } = useContext(Context)
    useEffect(() => {
        actions.isAuthenticatedUser()
        actions.enviadoCleanup()
    }, []);
    return (
        <> 
         <Navbar />
            <div className="container fondo">
               
                <div className="row pt-3">
                    <div className="col-md-12 p-3">
                        <h5>Restaurants</h5>
                        <hr></hr>
                        <ul className='pl-3 pr-3 pt-2'>
                            <RestaurantList />
                        </ul>
                    </div>
                </div>
               
            </div>
            <footer className="footer bg-white text-right">
                    <div className="container">
                        <Link to='/business'className="mr-3 font-weight-bold font-italic" >mira nuestra area de negocios!</Link>
                    </div>
                </footer>

        </>
    )
}

export default Home;