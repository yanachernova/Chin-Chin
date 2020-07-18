import React, { useContext } from 'react'
import { Context } from '../store/appContext'

const ModalRegisterAdmin = props => {
    const { actions } = useContext(Context)
    return (
        <div className="modal fade" id="modal_register_admin" tabIndex="-1" role="dialog"
            aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div className="modal-dialog" role="document">
                <div className="modal-content">
                    <div className="modal-header">
                        Register
                        <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>

                    <div className="form-group modal-body">
                        <div className="form-group">
                            <label htmlFor="username" className="form-label text-muted">Name:</label>
                            <input type="text" name="name" id="RegisterConsumerEmail" className="form-control" onChange={e => actions.handleChange(e)}></input>
                        </div>
                        <div className="form-group">
                            <label htmlFor="email" className="form-label text-muted">Email:</label>
                            <input type="text" name="email" className="form-control" onChange={e => actions.handleChange(e)}></input>
                        </div>
                        <div className="form-group">
                            <label htmlFor="password" className="form-label text-muted">Password:</label>
                            <input type="password" name="password_hash" className="form-control" onChange={e => actions.handleChange(e)}></input>
                        </div>
                    </div>
                    <div className="modal-footer d-flex justify-content-end">
                        <button type="button" className="btn btn-primary mr-1" data-dismiss="modal" onClick={() => actions.registerAdminPost()}>Register</button>
                        <button type="button" className="btn btn-danger" data-dismiss="modal">Cancel</button>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default ModalRegisterAdmin