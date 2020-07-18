import React, { useContext, useEffect } from "react"
import { Context } from '../store/appContext'
import NavbarUser from "../components/user/navUser";
import ControlPanelUser from "../components/user/userdata";
import UserOrders from "../components/user/userorders";
import NavbarHome from "../components/navHome";


export default function UserData() {
    const { store, actions } = useContext(Context);
    useEffect(() => {
        actions.isAuthenticatedUser()

    }, []);
    return (

        <>
            {
                store.isAuthenticatedUser ?
                    <>
                        <NavbarUser />
                        <ControlPanelUser />
                        <UserOrders />
                    </>
                    :
                    <>
                        <NavbarHome />
                        <div className="container-fluid">

                            <div className="row">
                                <div className="col d-flex justify-content-center">
                                    <h1>para ver tus Datos de Usuario</h1>
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
                                    <h1>debes hacer login</h1>
                                </div>
                            </div>
                        </div>
                    </>

            }
        </>

    )
}