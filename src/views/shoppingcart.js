import React, { useContext, useEffect, useState, useRef } from 'react'
import { Context } from "../store/appContext"

import NavbarDisplay from '../components/RestaurantDisplay/navdisplay'
import RestaurantInfo from '../components/RestaurantDisplay/restaurantInfo'
import TableRowShopping from '../components/shoppingCart/rowshoppingcart'


export default function ShoppingCart() {
    const { store, actions } = useContext(Context)
    const firstRef = useRef(null)
    const [local, setLocal] = useState({
        comentario: "",
        total: 0
    })
    const [recalculate, setRecalculate] = useState(0)

    const [sent, setSent] = useState(false)
    const handleChange = (e) => {
        const newlocal = { ...local }
        newlocal[e.target.name] = e.target.value
        setLocal(newlocal)
    }
    const Total = () => {
        let total = 0
        for (let i = 0; i < store.shoppingCart.length; i++) {
            total = total + ((parseInt(store.shoppingCart[i].price)) * parseInt(store.shoppingCart[i].amount))
        }
        const newlocal = { ...local }
        newlocal.total = total
        setLocal(newlocal)
    }

    useEffect(() => {
        actions.isAuthenticatedUser()
        if (firstRef.current !== null) {
            firstRef.current.focus()
        }
        Total()
        actions.enviadoCleanup()
    }, [])

    const confirmOrder = () => {
        actions.sendOrder(
            store.path + "/neworder",
            store.shoppingCart,
            store.currentUser.user.id,
            store.restaurant.restaurant.id,
            local.comentario,
            local.total
        )
    }

    useEffect(() => {
        Total()
    }, [recalculate])
    return (
        <>
            <NavbarDisplay />
            <div className="container fondo">
                <div className="col-md-12">
                    <div className="card card-plain">
                        {
                            store.isAuthenticatedUser ?
                                <>
                                    <div className="card-header card-header-primary text-center">
                                        <h3 className="card-title mt-0">the details of your order are here</h3>
                                        <RestaurantInfo />
                                    </div>
                                    <div className="card-body">
                                        <div className="col">
                                            <div className="table-responsive">
                                                <table className="table table-hover">
                                                    <thead className="bg-secondary text-white">
                                                        <tr>
                                                            <th scope="col">#</th>
                                                            <th scope="col">Nombre</th>
                                                            <th scope="col">Precio</th>
                                                            <th scope="col">Descripcion</th>
                                                            <th scope="col" style={{ textAlign: "center" }}>Cantidad</th>
                                                            <th scope="col">Subtotal    </th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        {
                                                            !!store.shoppingCart &&
                                                            store.shoppingCart.map((element, i) => {
                                                                return (<>
                                                                    <TableRowShopping i={i} key={i} reload={setRecalculate} value={recalculate} />
                                                                </>
                                                                )
                                                            })
                                                        }
                                                        <tr className=" text-success" style={{fontWeight:"bold", fontSize:"18px"}}>
                                                        <th colSpan="5" className="text-right pr-5" >
                                                            <span>Total: </span>
                                                        </th>
                                                        <td>

                                                            <span>{local.total}</span>
                                                        </td>
                                                    </tr>
                                                    </tbody>
                                                </table>
                                            </div>
                                        </div>
                                    </div>
                                        <div className="row">
                                            <div className="col">
                                                <div className="form-group">
                                                    <label for="comentarios">Añada comentarios a su orden</label>
                                                    <textarea
                                                        ref={firstRef}
                                                        className="form-control"
                                                        id="comentarios"
                                                        name="comentario"
                                                        onChange={(e) => { handleChange(e) }}
                                                        value={local.comentario}
                                                        rows="3">
                                                    </textarea>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="col d-flex justify-content-end">
                                                {sent === false && store.enviado === false ?
                                                    <button
                                                        className="btn btn-primary"
                                                        onClick={() => { confirmOrder(); setSent(!sent) }}
                                                    >confirm
                                            </button>
                                                    : sent === true && store.enviado === false ?
                                                        <button
                                                            className="btn btn-primary">
                                                            <div className="spinner-border" role="status">
                                                                <span className="sr-only">Loading...</span>
                                                            </div>
                                                        </button>
                                                        :
                                                        <button
                                                            className="btn btn-success" disabled>
                                                            Orden Enviada!
                                            </button>
                                                }
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="col" style={{ height: "250px" }}>

                                            </div>
                                        </div>
                            </>
                            :
                            <>
                                        <div className="row">
                                            <div className="col d-flex justify-content-center">
                                                <h1>para ver tu carrito de compra</h1>
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="col d-flex justify-content-center m-0">
                                                <img
                                                    src={require("../resource/img/lock.png")}
                                                    height="450px"
                                                    alt="LOCK" />
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="col d-flex justify-content-center">
                                                <h1>debes hacer login con una cuenta de usuario</h1>
                                            </div>
                                        </div>
                                    </>
                    }
                    </div>
                </div>
                </div>
        </>
    )
}