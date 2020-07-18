import React, { useContext, useState } from 'react'
import { Context } from '../store/appContext'
import ModalRegisterRestaurant from "../components/modal_register_restaurant"
import ModalLoginRestaurant from "../components/modal_login_restaurant"
import ChinChin from './chinchin'

export default function NavbarRest() {
    const [register, setRegister] = useState(false)
    const [login, setLogin] = useState(false)
    const { store, actions } = useContext(Context)
    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <ChinChin />
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button> 
            <div className="collapse navbar-collapse d-flex justify-content-end" id="navbarNav">
                <ul className="navbar-nav mr-2">
                    {(store.isAuthenticatedUser || store.isAuthenticatedRestorantUser || store.isAuthenticatedAdmin) ?
                            <>
                            <li className="nav-item">
                                <a
                                    className="nav-link btn btn-secundary bg-light text-danger"
                                    onClick={() => actions.Logout()}>
                                    Logout<i className="fas fa-sign-out-alt ml-3" ></i>
                                </a>
                            </li>
                            </>
                            :
                            <>
                                <li className="nav-item">
                                    <a
                                        className='nav-link btn btn-primary text-white'
                                        data-toggle="modal"
                                        data-target="#modal_login_restaurant"
                                        onClick={()=>{setLogin(!login)}}
                                        >
                                        Login
                                    </a>
                                </li>
                                <li className="nav-item">
                                    
                                    <a
                                        className='nav-link btn btn-primary text-white'
                                        data-toggle="modal"
                                        data-target="#modal_register_restaurant"
                                        onClick={()=>{setRegister(!register)}}>
                                        Register
                                    </a>
                                </li>
                            </>
                    }
                </ul>
            </div>
            <ModalRegisterRestaurant register={register} />
            <ModalLoginRestaurant login={login} />
        </nav>
    )
}

