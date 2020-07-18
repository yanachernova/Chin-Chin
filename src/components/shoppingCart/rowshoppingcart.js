import React, { useContext, useState, useEffect } from 'react'
import { Context } from "../../store/appContext"

export default function TableRowShopping(props) {
    const { store, actions } = useContext(Context)
    const [local, setLocal] = useState(
        {
            amount: store.shoppingCart[props.i].amount,
            subtotal:store.shoppingCart[props.i].price*store.shoppingCart[props.i].amount
            
        }
    )

    const handlePlus = () => {
        let newLocal = { ...local }
        newLocal.amount = local.amount + 1
        setLocal(newLocal)
        props.reload(props.value+1)
        actions.updateShoppingCart("+",store.shoppingCart,props.i,local.amount)
    }

    const handleMinus = () => {
        let newLocal = { ...local }
        newLocal.amount = local.amount - 1
        setLocal(newLocal)
        props.reload(props.value-1)
        actions.updateShoppingCart("-",store.shoppingCart,props.i,local.amount)
    }


    useEffect(()=>{
        let newLocal = { ...local }
        newLocal.subtotal = store.shoppingCart[props.i].price*store.shoppingCart[props.i].amount
        setLocal(newLocal)
    },[local.amount])

    return (
        <tr>
            <th scope="row">#{props.i + 1}</th>
            <td>{store.shoppingCart[props.i].name_product}</td>
            <td>$ {store.shoppingCart[props.i].price}</td>
            <td>{store.shoppingCart[props.i].description}</td>
            <td style={{ textAlign: "center" }}>
                {
                    local.amount <= 0 ?
                        <a className="btn btn-outline-secondary disabled" role="button" >
                            <i className="fas fa-minus" ></i>
                        </a>
                        :
                        <a className="btn btn-outline-secondary" role="button" onClick={() => { handleMinus() }} >
                            <i className="fas fa-minus" ></i>
                        </a>

                }
                <span className="mx-2" > {local.amount} </span>

                <a className="btn btn-outline-secondary mr-2" role="button" onClick={() => { handlePlus() }} >
                    <i className="fas fa-plus" ></i>
                </a>

            </td>
            <td className="text-info">
                {local.subtotal}
            </td>
        </tr >
    )
}