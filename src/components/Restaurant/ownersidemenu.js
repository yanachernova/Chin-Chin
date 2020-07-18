import React, { useContext, useState, useEffect } from 'react'
import { Context } from '../../../src/store/appContext'
import TableRow from "./tablerow"
import NewProduct from '../modal_new_product'



export default function OwnerSideMenu(props) {
    const { store, actions } = useContext(Context)
    const [trigger,setTrigger] = useState(false)
    const [local, setLocal] = useState(
        {
            user: false,
        }
    )
    const [modal,setModal]=useState(false)

    useEffect(()=>{
        const newlocal = { ...local }
        newlocal.user = store.currentRestaurant.restaurantuser
        setLocal(newlocal)
        actions.getAllProductsOf(store.path +"/product/from/" + newlocal.user.id)
        
    },[])

    useEffect(() => {
        if(trigger===true){const newlocal = { ...local }
        newlocal.user = store.currentRestaurant.restaurantuser
        setLocal(newlocal)
        actions.getAllProductsOf(store.path +"/product/from/" + newlocal.user.id)}
    }, [trigger])

    return (
        <>
            <div className="container-fluid">
                {/* Text block */}
                <div className="row">
                    <div className="col-md-12">
                        <div className="card">
                            {/* Titulo block */}
                            <div className="card-header card-header-primary">             
                                <h3 className="card-title "><i className="fas fa-cogs text-white"></i>  Product Table</h3>           
                                <p className="card-category"> Esta pagina es para editar y actualizar los detalles de los productos disponibles para la venta</p>
                            </div>
                            <div className="card-body">
                            <div className="table-responsive">

                                    {/* Product Table */}
                                <table className="table table-hover text-center">

                                    {/* Header */}
                                    <thead className="text-primary">
                                        <th scope="col">#</th>
                                        <th scope="col">Preview</th>
                                        <th scope="col">Nombre</th>
                                        <th scope="col">Precio</th>
                                        <th scope="col">Descripcion</th>
                                    </thead>

                                    {/* Body */}
                                    <tbody>
                                        {
                                            !!store.allProducts &&
                                            store.allProducts.map((element, i) => {
                                                return (<>
                                                    <TableRow elem={element} i={i} key={i} setTrigger={setTrigger} />

                                                </>
                                                )
                                            })

                                        }

                                    </tbody>
                                </table>
               
                                <button
                                    className="btn btn-primary"
                                    data-toggle="modal"
                                    data-target="#modal_new_product"
                                    onClick={()=>{setModal(!modal)}}
                                >
                                    <i className="fas fa-plus"> </i>
                                </button>
                                <NewProduct modal={modal}/>
                            </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            
        </>
    )
}