import React, { useContext, useState, useEffect, useRef } from 'react';
import { Context } from '../store/appContext';

export default function NewProduct(props) {
    const { store, actions } = useContext(Context);
    const firstRef=useRef(null)
    const secondRef = useRef(null)
    const thirdRef = useRef(null)
    const fourthRef = useRef(null)
    const [local, setLocal] = useState(
        {
            body: {
                name_product: "",
                description: "",
                price: "",
                id_restaurant: store.currentRestaurant.restaurantuser.id
            },
            error: false,
            modal: props.visible
        }
    )

    const handleChange = (e) => {
        const newlocal = { ...local }
        newlocal.body[e.target.name] = e.target.value
        setLocal(newlocal)
    }
    const handleSubmit = () => {
        actions.newProduct("http://localhost:5000/product",
        local.body,
        actions.getAllProductsOf,
        "http://localhost:5000/product/from/" + local.body.id_restaurant)


        const newlocal = {
            body: {
                name_product: "",
                description: "",
                price: "",
                id_restaurant: local.body.id_restaurant
            },
            error: false
        }
        setLocal(newlocal)
    }
    const firstRefFocus = (e) => {
        if(e.key==="Enter"){
            secondRef.current.focus()
        }
    }
    const secondRefFocus = (e) => {
        if(e.key==="Enter"){
            thirdRef.current.focus()
        }
    }
    const thirdRefFocus = (e) => {
        if(e.key==="Enter"){
            fourthRef.current.focus()
        }
    }

    useEffect(()=>{
        if (firstRef.current!==null){
        firstRef.current.focus()
        }
    },[props.modal])


    return (
        <>
            <div className="col-md-8">
                <div className="modal" id="modal_new_product" tabIndex="-1" role="dialog"
                    aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div className="modal-dialog" role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h4>Nuevo Producto</h4>
                                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <form>
                                <div className="modal-body mb-4">

                                    <div className="input-group">
                                        <input className="form-control"
                                            type="text"
                                            placeholder="Ingrese nombre del producto"
                                            name="name_product"
                                            ref={firstRef}
                                            onChange={(e) => { handleChange(e) }}
                                            onKeyDown={(e) => { firstRefFocus(e) }}
                                            value={local.body.name_product} />
                                    </div>
                                    <div className="input-group">
                                        <input className="form-control"
                                            type="text"
                                            placeholder="Ingrese una descripcion"
                                            name="description"
                                            ref={secondRef}
                                            onChange={(e) => { handleChange(e) }}
                                            onKeyDown={(e) => { secondRefFocus(e) }}
                                            value={local.body.description} />
                                    </div>
                                    <div className="input-group">
                                        <input className="form-control"
                                            type="number"
                                            placeholder="Ingrese valor del producto $"
                                            name="price"
                                            ref={thirdRef}
                                            onChange={(e) => { handleChange(e) }}
                                            onKeyDown={(e) => { thirdRefFocus(e) }}
                                            value={local.body.price} />
                                    </div>
                                </div>
                                <div className="modal-footer">
                                    {local.body.name_product !== "" &&
                                        local.body.description !== "" &&
                                        local.body.price !== ""
                                        ?
                                        < button className="btn btn-primary"
                                            data-dismiss="modal"
                                            ref={fourthRef}
                                            onClick={() => { handleSubmit() }} >
                                            <i class="far fa-paper-plane fa-2x"></i>
                                        </button>
                                        :
                                        < button className="btn btn-primary disabled"
                                            ref={fourthRef}
                                            onClick={(e) => { e.preventDefault()}}>
                                            <i class="far fa-paper-plane fa-2x"></i>
                                        </button>
                                    }
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
