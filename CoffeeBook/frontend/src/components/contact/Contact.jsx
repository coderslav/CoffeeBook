import React from 'react'
import SearchContact from './SearchContact.jsx';
import './contact.css'
import { AiOutlineMinusCircle } from "react-icons/ai";
import axios from "axios";
axios.defaults.withCredentials = true;

const PORT = 5000;

export default class Contact extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      contacts: [],
      removeContact: false
    }
  }

  componentDidMount() {
    console.log("current user id : ", this.props.userId);
    axios.post(`http://localhost:${PORT}/user/contacts`, { userId: this.props.userId })
      .then(res => {
        console.log("userContacts : ", res);
        if (res.data.length) {
          this.setState({ contacts: res.data.contacts })
        } 
      })
      .catch(err => console.log("Error while fetch user contacts :", err))
  }

  allowRemove = () => {
    this.setState({ removeContact: true });
  }

  eraseContact = (e) => {
    axios.post(`http://localhost:${PORT}/contacts/delete`, {
      userId: this.props.userId,
      contactId: e.target.value
    })
    .then(res => {
      const newContact = res.data.contacts;
      this.setState()
    })
  }

  addContact = (e) => {
    axios.post(`http://localhost:${PORT}/contacts/create`, {
      userId: this.props.userId,
      contactId: e.target.value
    })
    .then(res => {
      if (res.data.length && res.data.contacts.length) {
        this.setState({ contacts: res.data.contacts });
      }
    })
    .catch(err => {
      console.log("Error while saving new contact", err);
    }) 
  }

  render() {
    console.log("my current state : ", this.state);
    return (
      <div className='d-flex flex-column'>
        <span className='titreContact'>Contacts</span>
        <div>
          {
            this.state.contacts.map(contact => {
              return (
                <div key={contact.id} className='blocContacts d-flex justify-content-start align-items-center' >
                  <div onClick={this.props.getContactPosts}>
                    <img src={contact.imgProfile} alt="img_profil" />
                    <p>{contact.firstName} {contact.lastName}</p>
                  </div>
                  {
                    this.state.removeContact
                    ? <div>
                        <AiOutlineMinusCircle value={contact.id} onClick={this.eraseContact}/>
                      </div>
                    : "" 
                  }
                </div>
              )
            })
          }
        </div>
        <div className=''>
          <button className='btnSeeMore'>Voir plus</button>
        </div>
        <div className="editList">
          <button className='bntEdit' onClick={this.allowRemove}>Editer la liste</button>
        </div>
        <SearchContact 
          title={"Chercher un contact"} 
          placeholder={"contact"} 
          userId={this.props.userId} 
          addContact={this.addContact} />
      </div>
    )
  }
}
