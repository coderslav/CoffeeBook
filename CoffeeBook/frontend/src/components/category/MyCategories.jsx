import React, { Component } from 'react'
import './category.css'
import '../contact/contact.css'
import SearchCategory from './SearchCategory'
import {AiOutlineMinusCircle} from "react-icons/ai";

export default class MyCategories extends Component {

    render() {
        const categoryList = [
            { id: 1, category: "ecologie" },
            { id: 2, category: "economie" },
            { id: 3, category: "politique" },
        ]
        const maCategorie = categoryList.map(
            elem => {
                return (
                    <div className='d-flex justify-content-center align-items-start ms-5' key={elem.id}>
                        <p>#{elem.category}</p>
                        <div className='ms-3'>
                            <AiOutlineMinusCircle />
                        </div>
                    </div>
                )
            }
        )
        return (
            <>
                <SearchCategory title={"Chercher une catégorie"} placeholder={"catégorie"} />
                <div className='container-fluid text-light'>
                    <div className='d-flex justify-content-center fs-4 marginT'>Mes catégories</div>
                </div>
                <div className='d-flex justify-content-start align-items-start flex-column  mt-1'>
                    {maCategorie}                  
                </div>
                <div className=''>
                <button className='btnSeeMore'>Voir plus</button>
                </div>
                <div className="editList">
                    <button className='bntEdit'>Editer la liste</button>
                </div>
            </>
        )
    }
}
