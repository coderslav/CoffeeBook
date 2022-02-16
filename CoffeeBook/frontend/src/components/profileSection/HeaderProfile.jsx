import React, { Component } from 'react'
import './headerProfile.css'
import man from '../../assets/man.jpg'
import { BsFillGearFill } from "react-icons/bs";
import { BsFillPencilFill } from "react-icons/bs";
import { VscDebugDisconnect } from "react-icons/vsc";
import { MdDeleteForever } from "react-icons/md";


export class HeaderProfile extends Component {
    render() {
        return (
            <div className="imgProfile">
                <img className="imgProfile" src={man} alt="" width="70px" height="70px" />
                <span>Prénom</span>
                <span>Nom</span>
                <div className='parameter'>                   
                    <div className="nav-item dropdown">
                        <a className="nav-link gearAppearance" data-bs-toggle="dropdown" href="#" role="button" aria-expanded="false"> <BsFillGearFill /></a>
                        <ul className="dropdown-menu menuParameter">
                            <li className='d-flex justify-content-start align-items-center ml-2'><a className="dropdown-item" href="#"><BsFillPencilFill/>Modifier les données</a></li>
                            <li className='d-flex justify-content-start align-items-center'><a className="dropdown-item" href="#"><VscDebugDisconnect/>Se déconnecter</a></li>
                            <li className='d-flex justify-content-start align-items-center'><a className="dropdown-item" href="#"><MdDeleteForever/>Supprimer son compte</a></li>
                        </ul>
                    </div>                   
                </div>
            </div>
        )
    }
}

export default HeaderProfile