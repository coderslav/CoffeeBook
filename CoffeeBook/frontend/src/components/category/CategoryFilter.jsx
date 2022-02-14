import React, { Component } from 'react'
import './category.css'

export default class CategoryFilter extends Component {
    render() {
        return (
            <div className='container-fluid text-light d-flex justify-content-center flex-column marginT mb-3'>
                <div>#les dernières actus</div>
                <div>#les meilleures actus</div>
            </div>
        )
    }
}
