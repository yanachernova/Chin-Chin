import React, { useContext, useState, useEffect, useRef } from 'react'
import { Context } from '../../../src/store/appContext'
import ModalDelete from './modaldelete'
import UploadButton from './upload_file_button'

export default function TableRow(props) {
    const { actions } = useContext(Context)
    const firstInput = useRef(null)
    const secondInput = useRef(null)
    const thirdInput = useRef(null)
    const [local, setLocal] = useState(
        {
            edit: false,
            user: props.elem,
            small: true
        }
    )
    const handleChange = (e) => {
        const newlocal = { ...local }
        newlocal.user[e.target.name] = e.target.value
        setLocal(newlocal)
    }
    const handleEditButton = () => {
        const newlocal = { ...local }
        newlocal.edit = !local.edit
        newlocal.user = { ...props.elem }
        setLocal(newlocal)
    }
    const handleSmall = () => {
        const newlocal = { ...local }
        newlocal.small = !local.small
        newlocal.user = { ...props.elem }
        setLocal(newlocal)
    }
    const handleDeleteButton = (url, getAllProductsOf, url2) => {
        actions.deleteProduct(url, getAllProductsOf, url2)
    }
    const handleSaveButton = () => {
        actions.updateProduct("http://localhost:5000/product/" + local.user.id_product, local.user)
        const newlocal = { ...local }
        newlocal.edit = false
        setLocal(newlocal)
    }
    const firstInputFocus = (e) => {
        if (e.key === "Enter") {
            secondInput.current.focus()
        }
    }
    const secondInputFocus = (e) => {
        if (e.key === "Enter") {
            thirdInput.current.focus()
        }
    }
    useEffect(() => {
        if (firstInput.current !== null) {
            firstInput.current.focus()
        }
    }, [local.edit])

    return (
        <>
            <tr>

                {
                    local.edit ?
                        <>
                            <th scope="row" key={props.i}>{props.i + 1}</th>
                            <td>
                                {local.small ?
                                    <img src={"http://localhost:5000/product/img/" + props.elem.photo}
                                        height="50px"
                                        width="50px"
                                        onClick={() => { handleSmall() }}
                                        alt={props.elem.description} />
                                    :
                                    <img src={"http://localhost:5000/product/img/" + props.elem.photo}
                                        height="200px"
                                        width="200px"
                                        onClick={() => { handleSmall() }}
                                        alt={props.elem.description} />

                                }
                            </td>
                            <td><input type="text"
                                name="name_product"
                                value={local.user.name_product}
                                className="form-control"
                                ref={firstInput}
                                onKeyDown={(e) => { firstInputFocus(e) }}
                                onChange={(e) => { handleChange(e) }} />
                            </td>
                            <td><input type="text"
                                name="price"
                                value={local.user.price}
                                className="form-control"
                                ref={secondInput}
                                onKeyDown={(e) => { secondInputFocus(e) }}
                                onChange={(e) => { handleChange(e) }} />
                            </td>
                            <td><input type="text"
                                name="description"
                                value={local.user.description}
                                className="form-control"
                                ref={thirdInput}
                                onChange={(e) => { handleChange(e) }} />
                            </td>
                            <td scope="col">
                                <a className="btn btn-outline-secondary py-1 px-2"
                                    role="button"
                                    onClick={() => { handleEditButton() }} >
                                    <i className="fas fa-minus-circle text-warning fa-2x" ></i>
                                </a>
                            </td>
                            <td scope="col">
                                <a className="btn btn-outline-secondary py-1 px-2"
                                    role="button"
                                    onClick={() => { handleSaveButton() }} >
                                    <i className="fas fa-save fa-2x" ></i>
                                </a>
                            </td>
                            <td scope="col">
                                <UploadButton id={props.elem.id_product} mode={"product"} setTrigger={props.setTrigger}/>
                            </td>
                            <td scope="col">
                                <a className="btn btn-outline-secondary py-1 px-2"
                                    role="button"
                                    data-toggle="modal"
                                    data-target={"#modal_confirmation_delete_" + local.user.id_product}
                                    onClick={(e) => { handleDeleteButton() }}>
                                    <i className="fas fa-trash text-danger fa-2x" ></i>
                                </a>
                            </td>
                        </>
                        :
                        <>
                            <th scope="row">{props.i + 1}</th>
                            <td>
                                {local.small ?
                                    <img src={"http://localhost:5000/product/img/" + props.elem.photo}
                                        height="50px"
                                        width="50px"
                                        onClick={() => { handleSmall() }}
                                        alt={props.elem.description} />
                                    :
                                    <img src={"http://localhost:5000/product/img/" + props.elem.photo}
                                        height="200px"
                                        width="200px"
                                        onClick={() => { handleSmall() }}
                                        alt={props.elem.description} />

                                }
                            </td>
                            <td>{local.user.name_product}</td>
                            <td>{local.user.price}</td>
                            <td>{local.user.description}</td>
                            <td scope="col">
                                <a className="btn btn-outline-secondary py-1 px-2"
                                    role="button"
                                    onClick={() => { handleEditButton() }} >
                                    <i className="fas fa-edit fa-2x" ></i>
                                </a>
                            </td>
                        </>
                }

            </tr>
            <ModalDelete delete={handleDeleteButton}
                url={"http://localhost:5000/product/" + local.user.id_product}
                function={actions.getAllProductsOf}
                url2={"http://localhost:5000/product/from/" + local.user.id_restaurant}
                id={local.user.id_product} />
        </>
    )
}