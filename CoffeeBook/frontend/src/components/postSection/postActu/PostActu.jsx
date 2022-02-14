import React from 'react'
import { BsPencilFill } from "react-icons/bs";
import { AiOutlineHeart, AiOutlinePlusCircle } from "react-icons/ai";
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
                    <AiOutlinePlusCircle />
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
