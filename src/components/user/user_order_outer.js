import React, { useContext, useEffect, useState } from 'react'
import OrderInner from "./user_order_inner"
import { Context } from '../../../src/store/appContext'

export default function Order(props) {
    const { store, actions } = useContext(Context)
    const [loading,setLoading] = useState(false)
    const completeOrder = () => {
        actions.completeOrder(store.path + "/cancel/" + props.elem.id_order, props.i, store.orders,null)
    }
    useEffect(() => {
        if (loading === true) {
            setTimeout(() => { completeOrder() }, 1000);
        }
    }, [loading])
    useEffect(()=>{console.log(props.elem)},[])
    return (
        <>
            {(props.done === "en espera" && props.elem.done === "en espera") ||
                (props.done === "completada" && props.elem.done === "completada") ||
                (props.done === "rechazada" && props.elem.done === "rechazada")||
                (props.done === "cancelada" && props.elem.done === "cancelada") ?
                <table className="table mb-3 table-bordered">
                    <tr>
                        <th colSpan="12" className="tabla-fondo text-left" >Orden Numero {props.elem.order_number}
                        </th>
                    </tr>
                    <tr>
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
                                        props.elem.done === "en espera"?
                                        <span> En espera</span>
                                        :""
                            }
                        </td>
                        <td> <span style={{ fontWeight: "bold" }} >Fecha de Creacion</span>: {props.elem.date_creation}</td>
                        <td> <span style={{ fontWeight: "bold" }} >Fecha de Finalizacion</span>: {props.elem.date_finalization !== null ?
                                props.elem.date_finalization
                                : "en espera"}</td>
                    </tr>
                    <tr >
                        <td colSpan="12">
                            <table className="table" >
                                <tr className="tabla-fondo1">
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
                            </table>
                        </td>
                    </tr>
                    <tr>
                        <th colSpan="4" className="text-right pr-5" >Total:
                       </th>
                        <td className="text-center pr-5" >
                            <span style={{ fontWeight: "bold" }}>$ {props.elem.total} </span>
                        </td>
                    </tr>
                    <tr>
                        <th> <span style={{ fontWeight: "bold" }}> Comentarios: </span>
                        </th>
                        <td colSpan="4">
                            {" " + props.elem.comment}
                        </td>
                    </tr>
                    <tr >
                        {(props.done === "en espera" && props.elem.done === "en espera" && loading === false) ?
                                <td colSpan="5" className="text-right " >
                                    <a
                                        class="btn btn-danger text-white"
                                        role="button"
                                        onClick={() => { setLoading(true) }}>
                                        Cancelar
                                    </a>
                                </td>
                                : props.done === "en espera" && props.elem.done === "en espera" && loading === true ?
                                    <td colSpan="5" className="text-right " >
                                        <button
                                            className="btn btn-danger">
                                            <div class="spinner-border" role="status">
                                                <span class="sr-only">Loading...</span>
                                            </div>
                                        </button>
                                    </td>
                                    :""
                        }
                    </tr>
                </table>
                : ""
            }
        </>

    )
}