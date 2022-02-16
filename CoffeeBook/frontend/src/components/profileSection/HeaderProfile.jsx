import React, { Component } from 'react';
import './headerProfile.css';
import man from '../../assets/man.jpg';
import { BsFillGearFill } from 'react-icons/bs';
import { BsFillPencilFill } from 'react-icons/bs';
import { VscDebugDisconnect } from 'react-icons/vsc';
import { MdDeleteForever } from 'react-icons/md';

export class HeaderProfile extends Component {
    render() {
        return (
            <div className='imgProfile'>
                <img className='imgProfile' src={man} alt='' width='70px' height='70px' />
                <span>Prénom</span>
                <span>Nom</span>
                <div className='parameter'>
                    <div className='nav-item dropdown'>
                        <a className='nav-link gearAppearance' data-bs-toggle='dropdown' href='#' role='button' aria-expanded='false'>
                            {' '}
                            <BsFillGearFill />
                        </a>
                        <ul className='dropdown-menu menuParameter'>
                            <li className='d-flex justify-content-start align-items-center ml-2'>
                                <button className='dropdown-item'>
                                    <BsFillPencilFill />
                                    Modifier les données
                                </button>
                            </li>
                            <li className='d-flex justify-content-start align-items-center'>
                                <button className='dropdown-item' onClick={this.props.userHasLogout}>
                                    <VscDebugDisconnect />
                                    Se déconnecter
                                </button>
                            </li>
                            <li className='d-flex justify-content-start align-items-center'>
                                <button className='dropdown-item'>
                                    <MdDeleteForever />
                                    Supprimer son compte
                                </button>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        );
    }
}

export default HeaderProfile;
