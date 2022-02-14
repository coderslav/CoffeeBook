import React from 'react'
import { BsPencilFill } from "react-icons/bs";
import { AiOutlineHeart } from "react-icons/ai";
import { BsFillPlusCircleFill } from "react-icons/bs";
import { FiAlertTriangle } from "react-icons/fi";
import { ImCross } from "react-icons/im";
import Rating from '../rating/Rating'
import '../actualites/actualites.css'

export default function PostActu() {
    return (
        <div className="postActu">
            <div className="postActuHeader">
                <p>#environnement</p>
                <p>auteur<button className='btnSuivre'>suivre</button></p>
                <div className="icones">
                    <BsPencilFill />
                    <AiOutlineHeart />
                    <div className="nav-item dropdown">
                        <a className="nav-link gearAppearance" data-bs-toggle="dropdown" href="#" role="button" aria-expanded="false"><BsFillPlusCircleFill /></a>
                        <ul className="dropdown-menu menuParameter">
                            <li className='d-flex justify-content-start align-items-center ml-2'><a className="dropdown-item" href="#"><FiAlertTriangle />Modifier les données</a></li>
                            <li className='d-flex justify-content-start align-items-center'><a className="dropdown-item" href="#"><ImCross />Se déconnecter</a></li>
                        </ul>
                    </div>
                </div>
            </div>
            <div className="main">
                <div className="postTitle">Titre</div>
                <div className="postcontent">
                    <img src="" alt="" />
                    <div className="postComment">Lorem, ipsum dolor sit amet consectetur adipisicing elit. Debitis voluptas hic, consequuntur atque consectetur at quia suscipit ullam inventore, officiis expedita! Aut necessitatibus dolorem commodi saepe numquam minus temporibus odio?</div>
                </div>
                <div>
                    <Rating />
                </div>
            </div>
        </div>
    )
}
