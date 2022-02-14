import React from 'react'
import './contact.css'

export default function Contact() {
    const contactList = [
        { id: 1, firstName: "David", lastName: "Renard", imgProfile: "/images/woman.jpg" },
        { id: 2, firstName: "laurent", lastName: "sdcs", imgProfile: "./images/woman2.jpg" },
        { id: 3, firstName: "dsijfod", lastName: "sdfsd", imgProfile: "./images/man.jpg" },
    ];
    
    const contact = contactList.map(
        elem => {
            return (
                <div className='blocContacts d-flex justify-content-start align-items-center' key={elem.id}>
                    <img src={elem.imgProfile} alt="img_profil" />
                    <p>{elem.firstName} {elem.lastName}</p>
                    <div>
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-dash-circle" viewBox="0 0 16 16">
                            <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z" />
                            <path d="M4 8a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7A.5.5 0 0 1 4 8z" />
                        </svg>
                    </div>
                    
                </div>
            )
        }
    )
    return (

        <div className='d-flex flex-column'>
            <span className='titreContact'>Contacts</span>
            <div>{contact}</div><i className="bi bi-dash-circle"></i>
        </div>

    )
}
