import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

export default function RestaurantCard(props) {
    const [local, setLocal] = useState(
        {
            path: "http://localhost:5000/restaurant/img/" + props.restaurant.logo
        }
    )

    return (
        <>
            <Link to={"/restaurant/" + props.restaurant.name.replace(/\s+/g, '_')} >
                <div className="card" style={{height:"350px", paddingBottom:"10px"}}>
                    <img src={local.path} alt={props.restaurant.name} style={{height:"75%"}}/>
                    <div className="card-body bg-light" style={{height:"25%"}}>
                        <h5 className="card-title font-italic " style={{fontWeight: "bold"}}>{props.restaurant.name}</h5>
                        <div className="d-flex justify-content-end">
                        <button className="btn btn-primary text-white"><i className="fas fa-shopping-cart"></i>
                        </button>
                        </div>
                        
                    </div>
                </div>
            </Link>

        </>
    )
}