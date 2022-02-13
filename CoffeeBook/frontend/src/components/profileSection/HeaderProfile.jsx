import React, { Component } from 'react'
import './headerProfile.css'
import man from '../../assets/man.jpg'
import { BsFillGearFill } from "react-icons/bs";

export class HeaderProfile extends Component {
    render() {
        return (
            <div className="imgProfile">
                <img className="imgProfile" src={man} alt="" width="70px" height="70px" />
                <span>Prénom</span>
                <span>Nom</span>
                <div className='parameter'><BsFillGearFill/></div>
            </div>
        )
    }
}

export default HeaderProfile