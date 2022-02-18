import React from 'react'
import './category.css'
import axios from 'axios';
axios.defaults.withCredentials = true;

const PORT = 5000;

export default class SearchCategory extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      searchResults: []
    }
    this.searchTimeout = null;
    this.searchCategories = this.searchCategories.bind(this);
  }

  searchCategories = (e) => {
    if (this.searchTimeout) {
      clearTimeout(this.searchTimeout);
    }

    if (!e.target.value) 
      return;

    const categoryKeyword = e.target.value;
    console.log("category keyword :", categoryKeyword)
    this.searchTimeout = setTimeout(() => {
      axios.post(`http://localhost:${PORT}/categories/filter`, {
        userId: this.props.userId,
        keyword: categoryKeyword
      })
      .then( res => {
        if (res.data.length) {
          console.log("Categories filtered by keyword : ", res.data)
          this.setState({ searchResults: res.data });
        } else {
          this.setState({ searchResults: [] })
        }
      })
      .catch(err => console.log("Error while searching for categories by keyword : ", err))
    }, 600);

  }

  render() {
    return (
      <div className='searchCategory mt-3'>
        <span>{this.props.title}</span>
        <input 
          className='container-fluid' type="text" placeholder={this.props.placeholder} 
          onChange={this.searchCategories} />
        {
          this.state.searchResults.length 
          ? 
          this.state.searchResults.map(category => {
            return (
              <div className='d-flex justify-content-center align-items-start ms-5'
              key={category.id}>
              <p># {category.name}</p>
              <button className='ms-3' data-catid={category.id} onClick={this.props.addCategory}>
                {/* <AiOutlinePlusCircle /> */} +
              </button>
            </div>
            )
          })
          : "" 
        }
      </div>
    )
  }
}



