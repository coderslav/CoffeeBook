import React, { Component } from 'react'
import './category.css'

export default class SearchCategory extends Component {
    render() {
        return (
            <div className='container-fluid'>
                <span>Rechercher une catégorie</span>
                <input className='container-fluid' type="text" />
            </div>
        )
    }
}
