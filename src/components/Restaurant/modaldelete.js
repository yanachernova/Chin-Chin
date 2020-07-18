import React from 'react'

export default function ModalDelete(props) {
    return (
        <div 
        className="modal" 
        id={"modal_confirmation_delete_"+props.id} 
        tabindex="-1" 
        role="dialog">
            <div className="modal-dialog" role="document">
                <div className="modal-content">
                    <div className="modal-header">
                        <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div className="modal-body">
                        <p>Esta accion borrara el producto PERNAMENTEMENTE </p>
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-primary" data-dismiss="modal" onClick={() => {
                            props.delete(props.url,
                                props.function,
                                props.url2)
                        }}
                        >sure</button>
                        <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                    </div>
                </div>
            </div>
        </div>

    )
}