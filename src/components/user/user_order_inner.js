import React from 'react'

export default function OrderInner(props) {
    return (

        <tr >
            <th>{props.i + 1}</th>
            <td >{props.elem.id_product}</td>
            <td >{props.elem.product_name}</td>
            <td >$ {props.elem.product_price}</td>
            <td >{props.elem.amount}</td>
            <td> $ {parseInt(props.elem.amount) * parseInt(props.elem.product_price)}</td>
        </tr>


    )
}