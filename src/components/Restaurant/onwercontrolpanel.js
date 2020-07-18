import React, { useContext, useState, useEffect, useRef } from "react";
import { Context } from "../../../src/store/appContext";
import UploadButton from "./upload_file_button";
import RestaurantCard_cp from "./restaurant_card_cp";

export default function ControlPanel(props) {
    const { store, actions } = useContext(Context);
    const [trigger, setTrigger] = useState(false)
    const firstInput = useRef(null)
    const secondInput = useRef(null)
    const thirdInput = useRef(null)
    const [local, setLocal] = useState({
        name: false,
        phone: false,
        address: false,
        email: false,
        user: {},
    });

    const handleEditButton = (nombre, ref) => {
        const newlocal = { ...local }
        newlocal[nombre] = !local[nombre]
        newlocal.user = { ...store.currentRestaurant.restaurantuser }
        setLocal(newlocal)
    };
    const handleChange = (e) => {
        const newlocal = { ...local }
        newlocal.user[e.target.name] = e.target.value
        setLocal(newlocal)
    };
    const handleSave = () => {
        actions.updateUser(
            "http://localhost:5000/restaurantusers/" + local.user["id"],
            local.user
        );
        const newlocal = { ...local };
        actions.updateCurrRest(newlocal.user, store.currentRestaurant);
        newlocal.name = false;
        newlocal.phone = false;
        newlocal.address = false;
        newlocal.email = false;
        setLocal(newlocal);
    };
    useEffect(() => {
        if (firstInput.current !== null) {
            firstInput.current.focus()
        }
    }, [local.name])
    useEffect(() => {
        if (secondInput.current !== null) {
            secondInput.current.focus()
        }
    }, [local.phone])
    useEffect(() => {
        if (thirdInput.current !== null) {
            thirdInput.current.focus()
        }
    }, [local.address])
    useEffect(() => {
        if (thirdInput.current !== null) {
            thirdInput.current.focus()
        }
    }, [local.email])

    useEffect(() => {
        const newlocal = { ...local };
        newlocal.user = store.currentRestaurant.restaurantuser;
        setLocal(newlocal);
    }, []);

    return (
        <>
            {
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-md-12">
                            <div className="card">
                                {/* Titulo block */}
                                <div className="card-header card-header-primary">
                                    <h3 className="card-title"><i className="fas fa-user text-white"></i> Panel de Control</h3>
                                    <p className="card-category">Esta pagina es para editar y actualizar los detalles de tu
                                    restaurant que seran mostrados al los clientes
                                    </p>
                                </div>
                                <div className="card-body">
                                    <form className="col-md-12 ">
                                        {/* Form Group Name */}
                                        <div className="row mb-3">
                                            <div className="col-md-8 ">
                                                <div className="form-group">
                                                    <label className="bmd-label-floating text-primary">Compañia</label>
                                                    {!!local.name&&
                                                        local.name ? (
                                                            <input
                                                                type="text"
                                                                name="name"
                                                                ref={firstInput}
                                                                value={local.user.name}
                                                                className="form-control"
                                                                onChange={(e) => {
                                                                    handleChange(e);
                                                                }}
                                                                id="inputname"
                                                            />
                                                        ) : (
                                                                <div className="form-control">
                                                                    {local.user.name}
                                                                </div>
                                                            )
                                                    }
                                                </div>
                                            </div>
                                            <div className="col-md-4 d-flex justify-content-end" >
                                                {!!local.name&&
                                                local.name ?
                                                    <>
                                                        <a className="btn btn-outline-secondary btn-sm mt-4 text-primary "

                                                            role="button"
                                                            onClick={() => { handleSave() }} >
                                                            <i className="fas fa-save fa-2x mt-2" ></i>
                                                        </a>
                                                        <a className="btn btn-outline-secondary btn-sm mt-4 text-primary" role="button"
                                                            onClick={(e) => { handleEditButton("name") }} >
                                                            <i className="fas fa-minus-circle text-warning fa-2x mt-2" ></i>
                                                        </a>
                                                    </>
                                                    :
                                                    <a className="btn btn-outline-secondary btn-sm mt-4 text-primary "
                                                        role="button" onClick={() => { handleEditButton("name") }} >
                                                        <i className="fas fa-edit fa-2x mt-2" ></i>
                                                    </a>
                                                }
                                            </div>
                                        </div>
                                        {/* Form Group Phone */}
                                        <div className="row mb-3">
                                            <div className="col-md-8">
                                                <div className="form-group">
                                                    <label className="bmd-label-floating text-primary">Telefono</label>
                                                    {!!local.phone&&
                                                        local.phone ? (
                                                            <input
                                                                type="text"
                                                                name="phone"
                                                                ref={secondInput}
                                                                value={local.user.phone}
                                                                className="form-control"
                                                                onChange={(e) => {
                                                                    handleChange(e);
                                                                }}
                                                                id="inputphone"
                                                            />
                                                        ) : (
                                                                <div className="form-control">
                                                                    {local.user.phone}
                                                                </div>
                                                            )
                                                    }
                                                </div>
                                            </div>
                                            <div className="col-md-4 d-flex justify-content-end">
                                                {!!local.phone&&
                                                local.phone ?
                                                    <>
                                                        <a className="btn btn-outline-secondary btn-sm mt-4 text-primary"
                                                            role="button"
                                                            onClick={() => { handleSave() }} >
                                                            <i className="fas fa-save fa-2x mt-2" ></i>
                                                        </a>
                                                        <a className="btn btn-outline-secondary btn-sm mt-4 text-primary" role="button"
                                                            onClick={(e) => { handleEditButton("phone") }} >
                                                            <i className="fas fa-minus-circle text-warning fa-2x mt-2" ></i>
                                                        </a>
                                                    </>
                                                    :
                                                    <a className="btn btn-outline-secondary btn-sm mt-4 text-primary"
                                                        role="button" onClick={() => { handleEditButton("phone") }} >
                                                        <i className="fas fa-edit fa-2x mt-2" ></i>
                                                    </a>
                                                }
                                            </div>
                                        </div>
                                        {/* Form Group Address */}
                                        <div className="row mb-3">
                                            <div className="col-md-8">
                                                <div className="form-group">
                                                    <label className="bmd-label-floating text-primary">Direccion</label>
                                                    {!!local.address&&
                                                        local.address ? (
                                                            <input
                                                                type="text"
                                                                name="address"
                                                                ref={thirdInput}
                                                                value={local.user.address}
                                                                className="form-control"
                                                                onChange={(e) => {
                                                                    handleChange(e);
                                                                }}
                                                                id="inputaddress"
                                                            />
                                                        ) : (
                                                                <div className="form-control">
                                                                    {local.user.address}
                                                                </div>
                                                            )
                                                    }
                                                </div>
                                            </div>
                                            <div className="col-md-4 d-flex justify-content-end">
                                                {!!local.address&&
                                                local.address ?
                                                    <>
                                                        <a className="btn btn-outline-secondary btn-sm mt-4 text-primary"
                                                            role="button"
                                                            onClick={() => { handleSave() }} >
                                                            <i className="fas fa-save fa-2x mt-2" ></i>
                                                        </a>
                                                        <a className="btn btn-outline-secondary btn-sm mt-4 text-primary" role="button"
                                                            onClick={(e) => { handleEditButton("address") }} >
                                                            <i className="fas fa-minus-circle text-warning fa-2x mt-2" ></i>
                                                        </a>
                                                    </>
                                                    :
                                                    <a className="btn btn-outline-secondary btn-sm mt-4 text-primary"
                                                        role="button" onClick={() => { handleEditButton("address") }} >
                                                        <i className="fas fa-edit fa-2x mt-2" ></i>
                                                    </a>
                                                }
                                            </div>
                                        </div>
                                        {/* Form Group Email */}
                                        <div className="row mb-3">
                                            <div className="col-md-8">
                                                <div className="form-group">
                                                    <label className="bmd-label-floating text-primary">Email</label>
                                                    {!!local.email&&
                                                        local.email ? (
                                                            <input
                                                                type="text"
                                                                name="email"
                                                                ref={thirdInput}
                                                                value={local.user.email}
                                                                className="form-control"
                                                                onChange={(e) => {
                                                                    handleChange(e);
                                                                }}
                                                                id="inputemail"
                                                            />
                                                        ) : (
                                                                <div className="form-control">
                                                                    {local.user.email}
                                                                </div>
                                                            )
                                                    }
                                                </div>
                                            </div>
                                        </div>
                                        {/* Form Group Logo */}
                                        <div className="row mb-3">
                                            <div className="col-md-4">
                                                <label className="bmd-label-floating text-primary mb-3">Logo Corporativo</label>
                                                <p>esto es un preview</p>
                                             </div>
                                            <div className="col-md-4 border bg-light">
                                                {!!store.currentRestaurant.restaurantuser&&
                                                <RestaurantCard_cp restaurant={store.currentRestaurant.restaurantuser} trigger={trigger} />

                                                }
                                            </div>
                                            <div className="col-md-4 d-flex justify-content-start align-items-end">
                                                {!!store.currentRestaurant.restaurantuser&&
                                                <UploadButton id={store.currentRestaurant.restaurantuser.id} mode={"restaurant"} setTrigger={setTrigger} />

                                                }
                                            </div>
                                        </div>

                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            }
        </>
    );
}
