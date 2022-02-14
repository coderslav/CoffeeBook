import React from 'react';
import './logoCB.css'

export default function LogoCB() {
    return (
        <div className='d-flex justify-content-center'>
            <img className="logo" src={process.env.PUBLIC_URL + `./images/iconeCB.png` } alt="Logo CoffeeBook"  />
        </div>
    )
}

