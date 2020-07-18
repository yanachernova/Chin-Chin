import React, { useContext, useState, useEffect } from 'react'
import OrderInner from "./order_inner"
import { Context } from '../../../src/store/appContext'

export default function Order(props) {
    const { store, actions } = useContext(Context)
    const [completing, setCompleting] = useState(false)
    const [rejecting, setRejecting] = useState(false)
    const completeOrder = () => {
        actions.completeOrder(store.path + "/finish/" + props.elem.id_order)
    }

    const rejectOrder = () => {
        actions.completeOrder(store.path + "/reject/" + props.elem.id_order)
    }

    useEffect(() => {
        if (completing === true) {
            setTimeout(() => { completeOrder() }, 1000);
        }
    }, [completing])

    useEffect(() => {
        if (rejecting === true) {
            setTimeout(() => { rejectOrder() }, 1000);
        }
    }, [rejecting])
    return (
        <>
            {(props.done === "en espera" && props.elem.done === "en espera") ||
                (props.done === "completada" && props.elem.done === "completada") ||
                (props.done === "rechazada" && props.elem.done === "rechazada") ||
                (props.done === "cancelada" && props.elem.done === "cancelada") ?
                <table className="table table-bordered">
                    <tr>
                        <th colSpan="12" className="tabla-fondo text-left" >Orden Numero {props.elem.order_number}
                        </th>
                    </tr>
                    <tr className="text-center">
                        <td> <span style={{ fontWeight: "bold" }} >Usuario</span>: {props.elem.user_name}</td>
                        <td> <span style={{ fontWeight: "bold" }} >Telefono: </span> {props.elem.user_phone} </td>
                        <td> <span style={{ fontWeight: "bold" }} >Estado de la orden: </span>
                            {

                                props.elem.done === "cancelada" ?
                                    <span > Cancelado por usuario</span>
                                    :
                                    props.elem.done === "rechazada" ?
                                        <span > Cancelado por restoran</span>
                                        :
                                        props.elem.done === "completada" ?
                                            <span> Completado</span>
                                            :
                                            props.elem.done === "en espera" ?
                                                <span> En espera</span>
                                                : ""
                            }
                        </td>
                        <td> <span style={{ fontWeight: "bold" }} >Fecha de Creacion</span>: {props.elem.date_creation}</td>
                        <td> <span style={{ fontWeight: "bold" }} >Fecha de Finalizacion</span>:
                         {props.elem.date_finalization !== null ?
                                props.elem.date_finalization
                                : "en espera"}</td>
                    </tr>
                    <tr >
                        <td colSpan="12">
                            <table className="table" >
                                <tbody>
                                    <tr className="tabla-fondo1 text-center">
                                        <th>#</th>
                                        <th>Id del Producto</th>
                                        <th>Nombre Producto</th>
                                        <th>Precio Unitario</th>
                                        <th>Cantidad</th>
                                        <th>Subtotal</th>
                                    </tr>
                                    {
                                        !!props.elem.order_details &&
                                        props.elem.order_details.map((elem, i) => {
                                            return (
                                                <OrderInner elem={elem} key={elem.id_order_detail} i={i} />
                                            )
                                        })
                                    }
                                </tbody>
                            </table>
                        </td>
                    </tr>
                    <tr>
                        <th>Total:
                       </th>
                        <td colSpan="4" className="text-right pr-5" >
                            <span className="text-success">$ {props.elem.total} </span>
                        </td>
                    </tr>
                    <tr>
                        <th> <span style={{ fontWeight: "bold" }}> Comentarios: </span>
                        </th>
                        <td colSpan="4">
                            {" " + props.elem.comment}
                        </td>
                    </tr>
                    <tr>
                        <td colSpan="5" className="text-right " >
                            <div className="btn-group">                        {
                                (props.done === "en espera" && props.elem.done === "en espera" && completing === false) ?

                                    <a
                                        class="btn btn-success text-white"
                                        role="button"
                                        onClick={() => { setCompleting(true) }}>
                                        Completar
                                    </a>

                                    : props.done === "en espera" && props.elem.done === "en espera" && completing === true ?

                                        <a
                                            className="btn btn-success">
                                            <div class="spinner-border" role="status">
                                                <span class="sr-only">Loading...</span>
                                            </div>
                                        </a>

                                        : ""
                            }
                                {
                                    (props.done === "en espera" && props.elem.done === "en espera" && rejecting === false) ?

                                        <a
                                            class="btn btn-danger text-white"
                                            role="button"
                                            onClick={() => { setRejecting(true) }}>
                                            Rechazar
                                </a>

                                        : props.done === "en espera" && props.elem.done === "en espera" && rejecting === true ?

                                            <a
                                                className="btn btn-danger">
                                                <div class="spinner-border" role="status">
                                                    <span class="sr-only">Loading...</span>
                                                </div>
                                            </a>

                                            : ""
                                }
                            </div>
                        </td>
                    </tr>
                </table>
                : ""
            }
        </>

    )
}