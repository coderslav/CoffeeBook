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
    this.addContact = this.addContact.bind(this);
  }

  componentDidMount() {
    axios.post(`http://localhost:${PORT}/user/contacts`, { userId: this.props.userId })
      .then(res => {
        console.log("userContacts : ", res);
        if (res.data.length) {
          this.setState({ contacts: res.data })
        } 
      })
      .catch(err => console.log("Error while fetch user contacts :", err))
  }



  allowRemove = () => {
    this.setState({ removeContact: !this.state.removeContact });
  }

  eraseContact = (e) => {
    e.stopPropagation();

    if (e.target.dataset.contactid) {
      axios.post(`http://localhost:${PORT}/user/contacts/delete`, {
        userId: this.props.userId,
        contactId: e.target.dataset.contactid
      })
      .then(res => {
        this.setState({ contacts: res.data})
      })
    }
  }

  addContact = (e) => {
    e.stopPropagation();
    if (e.target.dataset.contactid) {
      axios.post(`http://localhost:${PORT}/user/contacts/create`, {
        userId: this.props.userId,
        contactId: e.target.dataset.contactid
      })
      .then(res => {
        console.log("result from add contact : ", res)
        if (res.data.length) {
          this.setState({ contacts: res.data });
        }
      })
      .catch(err => {
        console.log("Error while saving new contact", err);
      }) 
    }
  }

  render() {
    return (
      <div className='d-flex flex-column'>
        <span className='titreContact'>Contacts</span>
        <div>
          {
            this.state.contacts != undefined && this.state.contacts.map(contact => {
              return (
                <div key={contact.id} className='blocContacts d-flex justify-content-start align-items-center' >
                  <div className="contact d-flex align-items-center" data-contactid={contact.id} onClick={this.props.getContactPosts}>
                    <img src={contact.profilePicturePath} alt={`${contact.firstName} ${contact.lastName}`} data-contactid={contact.id}/>
                    <p data-contactid={contact.id}>{contact.firstName} {contact.lastName}</p>
                  </div>
                  {
                    this.state.removeContact
                    ? <button data-contactid={contact.id} onClick={this.eraseContact} >
                        {/* <AiOutlineMinusCircle /> */} Remove
                      </button>
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
