import React, { useContext, useState } from 'react'
import { Context } from '../../../src/store/appContext'

export default function TableRowDisplay(props) {
    const { store, actions } = useContext(Context)
    const [local, setLocal] = useState(
        {
            amount: 0,
            path:"http://localhost:5000/product/img/"+props.elem.photo
        }
    )

    const handlePlus = () => {
        let newLocal = { ...local }
        newLocal.amount = local.amount + 1
        setLocal(newLocal)
    }

    const handleMinus = () => {
        let newLocal = { ...local }
        newLocal.amount = local.amount - 1
        setLocal(newLocal)
    }

    const addItem = () => {

        let item = {
            id_product: props.elem.id_product,
            name_product: props.elem.name_product,
            price: props.elem.price,
            description: props.elem.description,
            amount: local.amount
        }

        actions.addShoppingCart(item, store.shoppingCart)
    }



    return (
        <>

                <div className="card col-4">
                    {/* Titulo block */}
                    <div className="card-header card-header-primary">
                        <h3 className="card-title">{props.elem.name_product}</h3>
                    </div>
                    <div className="card-body">
                        <img src={local.path}
                             height="250px"
                             width="250px"
                             alt={props.elem.description} />
                        
                        <p className="card-text d-flex justify-content-between"><span style={{ fontWeight: "bold", marginRight: "3px" }}> Descripcion: </span>
                        <span>{props.elem.description} </span></p>
                        <p className="card-text d-flex justify-content-between"> <span style={{ fontWeight: "bold" }}> Precio: $ </span> 
                        {props.elem.price}</p>
                        <div className="d-flex justify-content-between">
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
                            <span className="mx-2 my-auto" style={{ fontWeight: "bold" }}>  {local.amount} </span>

                            <a className="btn btn-outline-secondary mr-2" role="button" onClick={() => { handlePlus() }} >
                                <i className="fas fa-plus" ></i>
                            </a>

                        </div>
                        <div className="d-flex justify-content-end card-footer mt-1 mr-1" style={{height:"25px"}}>
                            {local.amount > 0 ?
                                <a className="btn btn-outline-success"
                                    role="button"
                                    onClick={() => { addItem() }}>
                                    <i className="fas fa-check text-success" ></i>
                                </a>
                                :
                                ""
                            }

                        </div>
                    </div>
                </div >

        </>
    )
}
