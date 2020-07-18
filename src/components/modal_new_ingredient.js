import React from 'react'


const New_Ingredient = props => {
    return (

        <div className="wrapper wrapper--w680">
            <div className="card card-2">
                <div className="card-heading-edit"></div>
                <div className="card-body">
                    <h2 className="title">New Ingredient</h2>
                    <form method="POST">
                        <div className="input-group">
                            <input className="input--style-2" type="text" placeholder="Ingrese nombre del ingrediente" name="name_ingredient" />
                        </div>
                        <div className="input-group">
                            <input className="input--style-2" type="number" placeholder="Ingrese valor del ingrediente $" name="price" />
                        </div>
                        <div className="p-t-30">
                            <button className="btn btn--radius btn--green" type="submit">Search</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default New_Ingredient;