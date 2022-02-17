import axios from 'axios'
import React, { Component } from 'react'
import './category.css'

export default class CategoryFilter extends Component {

    render() {
        return (
            <div className='container-fluid text-light d-flex justify-content-center flex-column marginT mb-3' >
                <button onClick={this.props.getLatest}>#les dernières actus</button>
                <button onClick={this.props.getBest}>#les meilleures actus</button>
            </div>
        )
    }
}
