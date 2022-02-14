import React from 'react'
import './category.css'

export default function SearchCategory(props) {
    return (
        <div className='container-fluid searchCategory'>
            <span>{props.title}</span>
            <input className='container-fluid' type="text" placeholder={props.placeholder} />
        </div>
    )
}



