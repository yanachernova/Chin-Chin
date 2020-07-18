import React, { useContext, useState } from 'react'
import { Context } from '../store/appContext'

const ModalLoginAdmin = props => {
    const { actions } = useContext(Context)
    const [state, setState] = useState({
        view: 1
    })
    const ForgotPassword = () => {
        setState({ view: 2 })
    }
    const BackToLogin = () => {
        setState({ view: 1 })
    }
    const Confirmation = () => {
        BackToLogin()
        actions.getConfirmationAdmin()
        alert("Check your email")
    }
    return (

        <div className="modal" id="modal_login_admin" tabIndex="-1" role="dialog"
            aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div className="modal-dialog" role="document">
                <div className="modal-content">
                    {state.view === 1 && (
                        <>
                            <div className="modal-header">
                                Login
                        <button type="button" className="close" data-dismiss="modal" aria-label="Close" onClick={() => BackToLogin()}>
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div className="form-group modal-body">
                                <div className="form-group">
                                    <label htmlFor="username" className="form-label text-muted">Email:</label>
                                    <input type="text" name="email" id="LoginConsumerEmail" className="form-control" onChange={e => actions.handleChange(e)}></input>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="password" className="form-label text-muted">Password:</label>
                                    <input type="password" name="password_hash" id="LoginConsumerPassword" className="form-control" onChange={e => actions.handleChange(e)}></input>
                                    <small className='text-muted border-bottom' onClick={() => ForgotPassword()}>forgot password</small>
                                </div>
                                <div className="modal-footer d-flex justify-content-end">
                                    <button type="button" className="btn btn-primary mr-1" data-dismiss="modal" onClick={() => actions.loginAdminPost()}>Access</button>
                                    <button type="button" className="btn btn-danger" data-dismiss="modal" onClick={() => BackToLogin()}>Cancel</button>
                                </div>
                            </div>
                        </>

                    )}

                    {
                        state.view === 2 && (
                            <>
                                <div className="modal-header">
                                    Login
                                <button type="button" className="close" data-dismiss="modal" aria-label="Close" onClick={() => BackToLogin()}>
                                        <span aria-hidden="true">&times;</span>
                                    </button>
                                </div>
                                <div className="form-group modal-body">
                                    <label htmlFor="username" className="form-label text-muted">Enter email to reset password</label>
                                    <input type="text" name="email" id="LoginConsumerEmail" onChange={e => actions.handleChange(e)} className="form-control"></input>
                                </div>
                                <div className="modal-footer d-flex justify-content-end">
                                    <button type="button" className="btn btn-primary mr-1" data-dismiss="modal" onClick={() => Confirmation()}>Send</button>
                                    <button type="button" className="btn btn-danger mr-1" data-dismiss="modal" onClick={() => BackToLogin()}>Cancel</button>
                                </div>
                            </>
                        )
                    }
                            }


                        </div>
            </div>
        </div>
    )
}
export default ModalLoginAdmin