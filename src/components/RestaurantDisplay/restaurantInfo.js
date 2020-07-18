import React, { useContext, useState, useEffect } from 'react'
import { Context } from '../../../src/store/appContext'

export default function RestaurantInfo(props) {
    const { store } = useContext(Context)
    const [local, setLocal] = useState(
        {
            contact: false,
            user: false
        }
    )

    const handleContact = () => {
        let newLocal = { ...local }
        newLocal.contact = !local.contact
        setLocal(newLocal)
    }

    return (
        <>
            {!!store.restaurant.restaurant &&
                <div className="container-fluid">
                    <div className="row">
                        <div className="col">
                            <h4 class="text-white" onClick={() => { handleContact() }}><i class="fas fa-info-circle"></i></h4>
                        </div>
                    </div>
                    {local.contact ?
                        <>
                            <div className="row">
                                <div className="col-md-12 d-flex d-inline card-header bg-dark">
                                    <small className="col-md-4 text-white">Email: {store.restaurant.restaurant.email}</small>  
                                    <small className="col-md-4 text-white">Telefono: {store.restaurant.restaurant.phone}</small>
                                    <small className="col-md-4 text-white">Direccion: {store.restaurant.restaurant.address}</small>                                        
                                </div>
                            </div>
                        </>
                        : ""
                    }
                </div>
            }

        </>
    )
}