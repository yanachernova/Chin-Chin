import React, { useContext, useEffect, useRef, useState } from 'react'
import { Context } from '../store/appContext'

const ModalRegister = props => {
    const { store, actions } = useContext(Context)
    const [local, setLocal] = useState({
        email: null,
    })
    const firstRef = useRef(null)
    const secondRef = useRef(null)
    const thirdRef = useRef(null)
    const fourthRef = useRef(null)
    const fifthRef = useRef(null)

    const firstRefFocus = (e) => {
        if (e.key === "Enter") {
            secondRef.current.focus()
        }
    }
    const secondRefFocus = (e) => {
        if (e.key === "Enter") {
            thirdRef.current.focus()
        }
    }
    const thirdRefFocus = (e) => {
        if (e.key === "Enter") {
            fourthRef.current.focus()
        }
    }
    const fourthRefFocus = (e) => {
        if (e.key === "Enter") {
            fifthRef.current.focus()
        }
    }
    useEffect(() => {
        if (firstRef !== null) {
            firstRef.current.focus()
        }
    }, [props.register])

    const validEmail = (e) => {
        if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,4})+$/.test(e.target.value)) {
            let oldLocal = { ...local }
            oldLocal["email"] = true
            setLocal(oldLocal)
        }
        else {
            let oldLocal = { ...local }
            oldLocal["email"] = false
            setLocal(oldLocal)
        }
    }

    return (
        <div className="modal" id="modal_register" tabIndex="-1" role="dialog"
            aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div className="modal-dialog" role="document">
                <div className="modal-content">
                    {
                        local.email !== null ?
                            local.email == false ?
                                <div class="alert alert-danger" role="alert">
                                    Ingrese email valido
                        </div>
                                :
                                ""
                            :
                            ""
                    }

                    <div className="modal-header">
                        Register
                        <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>

                    <div className="form-group modal-body">
                        <div className="form-group">
                            <label htmlFor="username" className="form-label text-muted">Full Name:</label>
                            <input
                                value={store.name}
                                ref={firstRef}
                                type="text"
                                name="name"
                                id="RegisterConsumerEmail"
                                className="form-control"
                                onKeyDown={(e) => { firstRefFocus(e) }}
                                onChange={e => actions.handleChange(e)}>
                            </input>
                        </div>
                        <div className="form-group">
                            <label htmlFor="phone" className="form-label text-muted">Phone number:</label>
                            <input
                                value={store.phone}
                                ref={secondRef}
                                type="text"
                                name="phone"
                                className="form-control"
                                onKeyDown={(e) => { secondRefFocus(e) }}
                                onChange={e => actions.handleChange(e)}>
                            </input>
                        </div>
                        <div className="form-group">
                            <label htmlFor="email" className="form-label text-muted">Email:</label>
                            <input
                                ref={thirdRef}
                                value={store.email}
                                type="text"
                                name="email"
                                className="form-control"
                                onKeyDown={(e) => { thirdRefFocus(e) }}
                                onChange={e => {
                                    actions.handleChange(e)
                                    validEmail(e)
                                }}>
                            </input>
                        </div>
                        <div className="form-group">
                            <label htmlFor="password" className="form-label text-muted">Password:</label>
                            <input
                                value={store.password_hash}
                                ref={fourthRef}
                                type="password"
                                name="password_hash"
                                className="form-control"
                                onKeyDown={(e) => { fourthRefFocus(e) }}
                                onChange={e => actions.handleChange(e)}></input>
                            <small>la contraseña necesita al menos 8 caracteres</small>
                        </div>
                    </div>
                    <div className="modal-footer d-flex justify-content-end">
                        {
                            local.email !== null ?
                                local.email === true &&
                                    store.name !== "" &&
                                    store.password_hash !== "" &&
                                    store.password_hash.length > 7 &&
                                    store.phone !== "" ?
                                    <button
                                        ref={fifthRef}
                                        type="button"
                                        className="btn btn-primary mr-1"
                                        data-dismiss="modal"
                                        onClick={() => actions.registerUserPost()}>
                                        Register
                                    </button>
                                    : <button
                                        ref={fifthRef}
                                        type="button"
                                        className="btn btn-primary mr-1 disabled">
                                        Register
                                    </button>
                                :
                                <button
                                    ref={fifthRef}
                                    type="button"
                                    className="btn btn-primary mr-1 disabled">
                                    Register
                                </button>
                        }
                        <button type="button" className="btn btn-danger" data-dismiss="modal">Cancel</button>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default ModalRegister