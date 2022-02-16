import React from 'react'
import SearchCategory from '../category/SearchCategory';
import './contact.css'
import { AiOutlineMinusCircle } from "react-icons/ai";

export default class Contact extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            firstName: "vincent",
            lastName: "Fouque"
        }

        // const contactList = [
        //     { id: 1, firstName: "David", lastName: "Renard", imgProfile: "/images/woman.jpg" },
        //     { id: 2, firstName: "laurent", lastName: "sdcs", imgProfile: "./images/woman2.jpg" },
        //     { id: 3, firstName: "dsijfod", lastName: "sdfsd", imgProfile: "./images/man.jpg" },
        // ];
        const contact = this.state.map(
            elem => {
                return (
                    <div className='blocContacts d-flex justify-content-start align-items-center' key={elem.id}>
                        <img src={elem.imgProfile} alt="img_profil" />
                        <p value={elem.id} onClick={this.props.getContactPosts}>{elem.this.state.firstName} {elem.this.state.lastName}</p>
                        <div>
                            <AiOutlineMinusCircle />
                        </div>
                    </div>
                )
            }
        )
    }
    render() {
        return (
            <div className='d-flex flex-column' >
                <span className='titreContact'>Contacts</span>
                <div>{contact}</div>
                <div className=''>
                    <button className='btnSeeMore'>Voir plus</button>
                </div>
                <div className="editList">
                    <button className='bntEdit'>Editer la liste</button>
                </div>
                <SearchCategory title={"Chercher un contact"} placeholder={"contact"} />
            </div>
        )
    }
}
