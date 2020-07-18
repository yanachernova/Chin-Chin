import React from "react"
import { Link } from 'react-router-dom'

export default function ChinChin() {
    return (
        <Link to="/" className="simple-text logo-normal text-primary navbar-brand">
            <span style={{fontFamily: 'Monoton, cursive'}}> Chin </span>
            <i className="fas fa-utensils"></i> 
            <span style={{fontFamily: 'Monoton, cursive'}}> Chin </span>
           
        </Link>
    )
}