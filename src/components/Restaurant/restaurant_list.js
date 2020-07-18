import React, { useContext } from 'react'
import { Context } from '../../../src/store/appContext'
import RestaurantCard from "./restaurant_card"

export default function RestaurantList() {
    const { store} = useContext(Context)

    return (
        <>
            <div className="container-fluid">
                <div className="row card-deck">
                    {
                        !!store.allRestaurants&&
                            store.allRestaurants.map((element,i)=>{
                                return (
                                    <div className="col-4 my-1 px-1" key={i}> <RestaurantCard restaurant={element}/> </div>
                                    
                                )
                            })
                        
                    }
                    
                </div>
            </div>
        </>
    )
}