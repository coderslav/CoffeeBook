import React, { Component } from 'react'
import './category.css'

export default class CategoryFilter extends Component {
    render() {
        return (
            <div className='text-light d-flex justify-content-center flex-column marginT mb-3'>
                <div className="mt-2 h6"># les dernières actus</div>
                <div className="mt-2 h6"># les meilleures actus</div>
            </div>
        )
    }
}
