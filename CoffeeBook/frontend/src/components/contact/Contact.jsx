import React, { useState } from 'react'
import styles from './Contact.module.css'

export default function Contact() {
    const contactList = [
        { id: 1, firstName: "David", lastName: "Renard", imgProfile: "../assets/imgfille.jpg" },
        { id: 2, firstName: "laurent", lastName: "sdcs", imgProfile: "./imgfille.jpg" },
        { id: 3, firstName: "dsijfod", lastName: "sdfsd", imgProfile: "./imgfille.jpg" },
    ];
    const contact = contactList.map(
        elem => {
            return (
                <div key={elem.id}>
                    <img src={elem.imgProfile} alt="" />
                    <span>{elem.firstName} {elem.lastName}</span>
                    <img src="icons/bootstrap-fill.svg" width="25" height="25" alt="Bootstrap"></img>
                </div>
            )
        }
    )

    return (
        <div className={styles.containers}>
            <div >
                <h2>Contacts</h2>
                <div>{contact}</div>
            </div>
        </div>
    )
}
