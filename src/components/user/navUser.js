import React, { useContext, useState } from 'react'
import { Context } from '../../store/appContext'
import ChinChin from "../chinchin"

export default function NavbarUser() {

    const {  actions } = useContext(Context)
    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <ChinChin />
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse d-flex justify-content-end" id="navbarNav">
                <ul className="navbar-nav mr-2">
                        <li className="nav-item btn-group">
                            <a
                                className='nav-link btn btn-secondary bg-light text-danger'
                                onClick={() => actions.Logout()}>
                                Logout<i className="fas fa-sign-out-alt ml-3" ></i>
                            </a>
                        </li>
                </ul>
            </div>

        </nav >
    )
}