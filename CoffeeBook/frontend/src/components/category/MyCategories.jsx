import React, { Component } from 'react'
import './category.css'
import '../contact/contact.css'
import SearchCategory from './SearchCategory'
import { AiOutlineMinusCircle } from "react-icons/ai";
import axios from 'axios';
axios.defaults.withCredentials = true;

const PORT = 5000;

export default class MyCategories extends Component {
  constructor(props) {
    super(props)
    this.state = {
      categories: [],
      removeCategory: false,
    }
  }

  componentDidMount() {
    axios.post(`http://localhost:${PORT}/user/${this.props.userId}/categories`)
      .then(res => {
        console.log("userCategories : ", res);
        if (res.data.length) {
          this.setState({ categories: res.data });
        }
      })
      .catch(err => console.log("Error while fetching user categories : ", err))
  }

  allowRemove = () => {
    this.setState({ removeCategory : !this.state.removeCategory });
  }

  eraseCategory = (e) => {
    e.stopPropagation();
    let catId = parseInt(e.target.dataset.catid);
    console.log(`remove category ${catId} for user ${this.props.userId}`);
    if (catId) {
      axios.delete(`http://localhost:${PORT}/user/${this.props.userId}/category/${catId}`)
        .then(res => {
          console.log("new user categories : ", res);
          this.setState({ categories: res.data });
        })
        .catch(err => {
          console.log("Error while removing category from user : ", err)
        })
    }
  }

  addCategory = (e) => {
    e.stopPropagation();
    let catId = parseInt(e.target.dataset.catid);
    console.log(`remove category ${catId} for user ${this.props.userId}`);
    if (catId) {
      axios.post(`http://localhost:${PORT}/user/${this.props.userId}/category`, {
        categoryId: catId
      })
        .then(res => {
          console.log("results from add Category : ", res);
          if (res.data.length) {
            this.setState({ categories: res.data });
          }
        })
        .catch(err => {
          console.log("Error while saving new category for user : ", err)
        })
    }
  }

  render() {
    return (
      <>
        <div className='text-light'>
          <div className='d-flex justify-content-start fs-4 marginT'>Mes catégories</div>
        </div>
        <div className='d-flex justify-content-start align-items-start flex-column mt-3'>
          {
            this.state.categories !== undefined && this.state.categories.map(cat => {
              return (
                <div className='d-flex justify-content-center align-items-start ms-5' key={cat.id}>
                  <p data-catid={cat.id} onClick={this.props.getCategoryPosts}>#{cat.name}</p>
                  {
                    this.state.removeCategory
                      ? <button data-catid={cat.id} onClick={this.eraseCategory} className='ms-3'>
                        {/* <AiOutlineMinusCircle /> */}Remove
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
        <SearchCategory title={"Chercher une catégorie"} placeholder={"catégorie"} addCategory={this.addCategory} userId={this.props.userId} />
      </>
    )
  }
}
