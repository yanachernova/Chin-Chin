import React, { useContext, useState, useEffect } from 'react'
import { Context } from '../../../src/store/appContext'
import TableRowDisplay from "./tablerowdisplay"
import RestaurantInfo from './restaurantInfo'


export default function RestaurantProducts(props) {
    const { store, actions } = useContext(Context)
    const [local, setLocal] = useState(
        {
            contact: false,
        }
    )
    return (
        <>
            <div className="container-fluid">
                <div className="row">
                    <div className="col-md-12">
                        <div className="card">
                            <div className="card-header col-md-8 card-header-primary">
                                <div className="col-8">
                                <h4 className="card-title">{!!store.restaurant.products && store.restaurant.restaurant.name}</h4>
                                </div>
                                <div className="col-12">
                                    <RestaurantInfo /> 
                                </div>
                            </div>
                            <div className="container-fluid">
                                <div className="card-body row card-column">

                                    {
                                        !!store.restaurant.products &&
                                        store.restaurant.products.map((element, i) => {
                                            return (<>
                                                <TableRowDisplay elem={element} i={i} key={i} />
                                            </>
                                            )
                                        })

                                    }

                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}