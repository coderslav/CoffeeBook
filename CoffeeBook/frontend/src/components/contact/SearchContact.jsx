import React from 'react';
import "../category/category.css";
import { AiOutlinePlusCircle } from "react-icons/ai";

import axios from 'axios';
axios.defaults.withCredentials = true;

const PORT = 5000;

export default class SearchContact extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      searchResults: []
    }
    this.searchTimeout = null;
    this.searchContacts = this.searchContacts.bind(this);
  }

  searchContacts = (e) => {
    if (this.searchTimeout) {
      clearTimeout(this.searchTimeout);
    }

    if (!e.target.value) 
      return;

    const contactKeyword = e.target.value;
    this.searchTimeout = setTimeout(() => {
      console.log("contact keyword for search :", contactKeyword);
      console.log("userId : ", this.props.userId);

      axios.post(`http://localhost:${PORT}/user/filter`, {
        filter: contactKeyword,
        userId: this.props.userId
      })
        .then(res => {
          console.log("results from contact search by keyword : ", res);
          if (res.data.length) {
            this.setState({ searchResults: res.data })
          } else {
            this.setState({ searchResults: [] })
          }
        })
        .catch(err => console.log("Error while searching contacts by keyword", err))
    }, 600);


  }

  render() {
    return (
      <div className='container-fluid searchCategory'>
        <span>{this.props.title}</span>
        <input 
          className='container-fluid' type="text" placeholder={this.props.placeholder} 
          onChange={this.searchContacts}/>
        {
          this.state.searchResults.length
            ?
            this.state.searchResults.map(contact => {
              return (
                <div className='d-flex justify-content-center align-items-start ms-5' key={contact.id}>
                  <p>#{contact.firstName} {contact.lastName}</p>
                  <div className='ms-3'>
                    <AiOutlinePlusCircle />
                  </div>
                </div>
              )
            })
            : ""
        }
      </div>
    )
  }
}