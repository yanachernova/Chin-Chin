import React, { useContext, useState, useEffect } from 'react'
import { Context } from '../../../src/store/appContext'
import Order from "./user_order_outer"



export default function UserOrders(props) {
    const { store, actions } = useContext(Context)
    const [local, setLocal] = useState("en espera")



    useEffect(() => {
        actions.getOrders(store.path + "/orderby/" + store.currentUser.user.id)
    }, [local])

    return (
        <>
            <div className="container-fluid">
                {/* Text block */}
                <div className="row">
                    <div className="col-md-12">
                        <div className="card">
                            {/* Titulo block */}
                            <div className="card-header card-header-primary">
                                <h3 className="card-title "><i className="fas fa-cogs text-white"></i> Tabla de Ordenes</h3>
                                <p className="card-category"> Esta pagina es para ver y actualizar las ordenes desde los usuarios</p>
                            </div>
                            <div className="card-body">
                                <div className="table-responsive">
                                    {/* Product Table */}
                                    <table className="table table-hover">
                                        {/* Header */}
                                        <thead className="text-primary text-justify">
                                            <th scope="col">Ordenes</th>
                                        </thead>
                                        {
                                            local === "en espera" ?
                                                <div className="btn-group" role="group">
                                                    <a className="btn btn-primary text-white disabled"
                                                        role="button">
                                                        Ordenes en espera
                                                    </a>
                                                    <a className="btn btn-primary text-white"
                                                        role="button"
                                                        onClick={() => { setLocal("rechazada") }} >
                                                        Ordenes rechazadas
                                                    </a>
                                                    <a className="btn btn-primary text-white"
                                                        role="button"
                                                        onClick={() => { setLocal("cancelada") }} >
                                                        Ordenes canceladas
                                                    </a>
                                                    <a className="btn btn-primary text-white "
                                                        role="button"
                                                        onClick={() => { setLocal("completada") }}>
                                                        Ordenes completadas
                                                    </a>
                                                </div>
                                                :
                                                local === "completada" ?
                                                    <div className="btn-group" role="group">
                                                        <a className="btn btn-primary text-white"
                                                            onClick={() => { setLocal("en espera") }}
                                                            role="button">
                                                            Ordenes en espera
                                                        </a>
                                                        <a className="btn btn-primary text-white"
                                                            role="button"
                                                            onClick={() => { setLocal("rechazada") }} >
                                                            Ordenes rechazadas
                                                        </a>
                                                        <a className="btn btn-primary text-white"
                                                            role="button"
                                                            onClick={() => { setLocal("cancelada") }} >
                                                            Ordenes canceladas
                                                        </a>
                                                        <a className="btn btn-primary text-white disabled "
                                                            role="button">
                                                            Ordenes completadas
                                                        </a>
                                                    </div>
                                                    :
                                                    local === "rechazada" ?
                                                        <div className="btn-group" role="group">
                                                            <a className="btn btn-primary text-white"
                                                                onClick={() => { setLocal("en espera") }}
                                                                role="button">
                                                                Ordenes en espera
                                                            </a>
                                                            <a className="btn btn-primary text-white disabled"
                                                                role="button">
                                                                Ordenes rechazadas
                                                            </a>
                                                            <a className="btn btn-primary text-white"
                                                                role="button"
                                                                onClick={() => { setLocal("cancelada") }} >
                                                                Ordenes canceladas
                                                            </a>
                                                            <a className="btn btn-primary text-white"
                                                                onClick={() => { setLocal("completada") }}
                                                                role="button">
                                                                Ordenes completadas
                                                            </a>
                                                        </div>
                                                        :
                                                        local === "cancelada" ?
                                                            <div className="btn-group" role="group">
                                                                <a className="btn btn-primary text-white"
                                                                    onClick={() => { setLocal("en espera") }}
                                                                    role="button">
                                                                    Ordenes en espera
                                                                </a>
                                                                <a className="btn btn-primary text-white"
                                                                    role="button"
                                                                    onClick={() => { setLocal("rechazada") }}>
                                                                    Ordenes rechazadas
                                                                </a>
                                                                <a className="btn btn-primary text-white disabled"
                                                                    role="button">
                                                                    Ordenes canceladas
                                                                </a>
                                                                <a className="btn btn-primary text-white"
                                                                    onClick={() => { setLocal("completada") }}
                                                                    role="button">
                                                                    Ordenes completadas
                                                                </a>
                                                            </div>
                                                            : ""
                                        }

                                        {/* Body */}
                                        <tbody>
                                            <tr>
                                                {

                                                    !!store.orders.length > 0 &&
                                                        local === "en espera" ?
                                                        store.orders.map((element, i) => {
                                                            return (<>
                                                                <Order elem={element} i={i} key={i} done={local} />

                                                            </>
                                                            )
                                                        })
                                                        :
                                                        store.orders.slice(0).reverse().map((element, i) => {
                                                            return (<>
                                                                <Order elem={element} i={i} key={i} done={local} />

                                                            </>
                                                            )
                                                        })
                                                }
                                            </tr>
                                        </tbody>
                                    </table>
                                    <div className="row mb-5"></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </>
    )
}