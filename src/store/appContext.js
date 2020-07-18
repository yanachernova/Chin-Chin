import React, { useState, useEffect} from "react"
import getState from "./flux"

export const Context = React.createContext()

const injectContext = PassedComponent =>{
    const StoreWrapper = props => {
        const [state, setState] = useState(
            getState({
                getStore: ()=>state.store,
                getActions : ()=> state.actions,
                setStore: updateStore => setState({
                    store: Object.assign(state.store, updateStore),
                    actions: {...state.actions}
                })
            })
        )
        useEffect(()=>{
            state.actions.getAllRestaurants("http://localhost:5000/restaurantusers")
            
        },[])
        return (
            <Context.Provider value={state}>
                <PassedComponent {...props}/>
            </Context.Provider>
        )
    }
    return StoreWrapper
}

export default injectContext