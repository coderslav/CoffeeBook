import React, { Component } from 'react'
import './category.css'
import SearchCategory from './SearchCategory'

export default class MyCategories extends Component {
    render() {
        return (
            <>
                <SearchCategory title={"Chercher une catégorie"} placeholder={"catégorie"} />
                <div className='container-fluid text-light'>
                    <div className='d-flex justify-content-center fs-4 marginT'>Mes catégories</div>
                </div>
            </>
        )
    }
}
