import React, { useContext, useEffect } from 'react'
import { Context } from '../store/appContext'

const ConfirmationAdmin = props => {
    const { actions } = useContext(Context)
    let token = props.match.params.token
    console.log(token)
    useEffect(() => {
    }, [actions, token])
    return (
        <div className="container">
            
            <h1>Confirmacion cuenta</h1>
            <hr />
            <div className="form-group modal-body">
                <label htmlFor="LoginConsuEmail" className="form-label text-muted">Enter new password</label>
                <input type="password" name="password_hash" id="LoginConsuEmail" onChange={e => actions.handleChange(e)} className="form-control"></input>
                <button onClick={() => actions.getPasswordChangeAdmin(token, props.history)}>Confirm</button>
            </div>
        </div>
    )
}
export default ConfirmationAdmin