import React, { useContext, useState, useEffect, useRef } from "react";
import { Context } from "../../../src/store/appContext";

export default function ControlPanelUser(props) {
    const { store, actions } = useContext(Context);
    const firstInput = useRef(null)
    const secondInput = useRef(null)
    const thirdInput = useRef(null)
    const [local, setLocal] = useState({
        name: false,
        phone: false,
        email: false,
        user: {},
    });

    const handleEditButton = (nombre) => {
        const newlocal = { ...local }
        newlocal[nombre] = !local[nombre]
        newlocal.user = { ...store.currentUser.user }
        setLocal(newlocal)
    };
    const handleChange = (e) => {
        const newlocal = { ...local }
        newlocal.user[e.target.name] = e.target.value
        setLocal(newlocal)
    };
    const handleSave = () => {
        actions.updateUser(
            store.path + "/users/" + local.user["id"],
            local.user
        );
        const newlocal = { ...local };
        actions.updateCurrUser(newlocal.user, store.currentUser);
        newlocal.name = false;
        newlocal.phone = false;
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
        actions.isAuthenticatedUser()
        const newlocal = { ...local };
        newlocal.user = store.currentUser.user;
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
                                    <p className="card-category">Esta pagina es para editar y actualizar tu informacion de Usuario y ver las ordenes que tienes activas
                                    </p>
                                </div>
                                <div className="card-body">
                                    <form className="col-md-12 ">
                                        {/* Form Group Name */}
                                        <div className="row mb-3">
                                            <div className="col-md-8 ">
                                                <div className="form-group">
                                                    <label className="bmd-label-floating text-primary">Compañia</label>
                                                    {
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
                                            <div className="col-md-4 d-flex justify-content-end ">
                                                {local.name ?
                                                    <>
                                                        <a className="btn btn-outline-secondary btn-sm mt-4 text-primary pt-3"
                                                            role="button"
                                                            onClick={() => { handleSave() }} >
                                                            <i className="fas fa-save fa-2x" ></i>
                                                        </a>
                                                        <a className="btn btn-outline-secondary btn-sm mt-4 text-primary pt-3" role="button"
                                                            onClick={(e) => { handleEditButton("name") }} >
                                                            <i className="fas fa-minus-circle text-warning fa-2x" ></i>
                                                        </a>
                                                    </>
                                                    :
                                                    <a className="btn btn-outline-secondary btn-sm mt-4 text-primary pt-3"
                                                        role="button" onClick={() => { handleEditButton("name") }} >
                                                        <i className="fas fa-edit fa-2x" ></i>
                                                    </a>
                                                }
                                            </div>
                                        </div>

                                        {/* Form Group Phone */}
                                        <div className="row mb-3">
                                            <div className="col-md-8">
                                                <div className="form-group">
                                                    <label className="bmd-label-floating text-primary">Telefono</label>
                                                    {
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
                                            <div className="col-4 d-flex justify-content-end">
                                                {local.phone ?
                                                    <>
                                                        <a className="btn btn-outline-secondary btn-sm mt-4 text-primary pt-3"
                                                            role="button"
                                                            onClick={() => { handleSave() }} >
                                                            <i className="fas fa-save fa-2x" ></i>
                                                        </a>
                                                        <a className="btn btn-outline-secondary btn-sm mt-4 text-primary pt-3" role="button"
                                                            onClick={(e) => { handleEditButton("phone") }} >
                                                            <i className="fas fa-minus-circle text-warning fa-2x" ></i>
                                                        </a>
                                                    </>
                                                    :
                                                    <a className="btn btn-outline-secondary btn-sm mt-4 text-primary pt-3"
                                                        role="button" onClick={() => { handleEditButton("phone") }} >
                                                        <i className="fas fa-edit fa-2x" ></i>
                                                    </a>
                                                }
                                            </div>
                                        </div>


                                        {/* Form Group Email */}
                                        <div className="row mb-3">
                                            <div className="col-md-8">
                                                <div className="form-group">
                                                    <label className="bmd-label-floating text-primary">Email</label>
                                                    {
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
