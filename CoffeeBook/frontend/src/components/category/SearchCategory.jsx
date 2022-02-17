import React from 'react'
import './category.css'

export default function SearchCategory(props) {
    return (
        <div className='searchCategory mt-3'>
            <span>{props.title}</span>
            <input className='container-fluid' type="text" placeholder={props.placeholder} />
        </div>
    )
}



