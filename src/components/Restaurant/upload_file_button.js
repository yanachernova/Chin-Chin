import React, { useState, useContext, useEffect } from "react"
import { Context } from "../../store/appContext"

export default function UploadButton(props) {
    const { store, actions } = useContext(Context)
    const [local, setLocal] = useState(null)
    const [ready, setReady] = useState(null)
    const handleChangeFile = e => {
        setLocal(e.target.files[0])
    }

    useEffect(() => {
        if (local !== null && props.mode == "product") {
            actions.uploadFile(store.path + "/product/upload/" + props.id, local, setReady)
        }
        if (local !== null && props.mode == "restaurant") {
            actions.uploadFile(store.path + "/restaurant/upload/" + props.id, local, setReady)
        }
    }, [local])

    useEffect(()=>{
        if (ready===true){
            if (props.mode == "restaurant"){
                props.setTrigger(true)
            setTimeout(() => { setReady(null);props.setTrigger(false) }, 1000);
            }
            if (props.mode == "product"){
                props.setTrigger(true)
                setTimeout(() => { setReady(null);props.setTrigger(false) }, 1000);
            }
        }
    },[ready])

    return (

        <>
            {
                ready === null ?
                    <label className="mt-2">
                        <input
                            name="avatar"
                            type="file"
                            style={{ display: "none" }}
                            onChange={(e) => { handleChangeFile(e) }}
                        />
                        <a className="btn btn-outline py-1 px-2">
                            <i class="fas fa-arrow-circle-up fa-2x text-info"></i>
                        </a>
                    </label>
                    : ready === false ?
                        <>
                            <a className="btn btn-outline py-1 px-2">
                            <i class="fas fa-spinner fa-spin fa-2x text-info"></i>
                            </a>
                        </>
                        : ready === true ?
                            <>
                            <a className="btn btn-outline py-1 px-2">
                            <i class="fas fa-check-circle fa-2x text-info"></i>
                            </a>
                            </>
                            : ""
            }
        </>
    )

} 