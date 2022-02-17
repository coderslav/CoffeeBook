import React, { Component } from 'react'
import './category.css'
import '../contact/contact.css'
import SearchCategory from './SearchCategory'
import { AiOutlineMinusCircle } from "react-icons/ai";
import axios from 'axios'

const PORT = 5000;

export default class MyCategories extends Component {
    constructor(props) {
        super(props)
        this.state = {
            categories: [],
            removeCategory: false
        }
    }
    componentDidMount() {
        console.log("current user id : ", this.props.userId);
        axios.post(`http://localhost:${PORT}/user/category`, { userId: this.props.userId })
            .then(res => {
                console.log("userCategory : ", res);
                if (res.data.length) {
                    this.setState({ categories: res.data.categories })
                }
            })
            .catch(err => console.log("Error while fetch user category :", err))
    }

    allowRemove = () => {
        this.setState({ removeCategory: true });
    }

    eraseCategory = (e) => {
        axios.post(`http://localhost:${PORT}/category/delete`, {
            userId: this.props.userId,
            category: e.target.value
        })
            .then(res => {
                const newCategory = res.data.category;
                this.setState()
            })
    }

    addContact = (e) => {
        axios.post(`http://localhost:${PORT}/category/create`, {
            userId: this.props.userId,
            contactId: e.target.value
        })
            .then(res => {
                if (res.data.length && res.data.categories.length) {
                    this.setState({ categories: res.data.categories });
                }
            })
            .catch(err => {
                console.log("Error while saving new category", err);
            })
    }

    render() {

        return (
            <>
                <SearchCategory title={"Chercher une catégorie"} placeholder={"catégorie"} />
                <div className='container-fluid text-light'>
                    <div className='d-flex justify-content-center fs-4 marginT'>Mes catégories</div>
                </div>
                <div className='d-flex justify-content-start align-items-start flex-column  mt-1'>
                    {this.state.categories.map(
                        cat => {
                            return (
                                <div className='d-flex justify-content-center align-items-start ms-5' key={cat.id}>
                                    <p>#{cat.category}</p>
                                    <div className='ms-3'>
                                        <AiOutlineMinusCircle />
                                    </div>
                                </div>
                            )
                        }
                    )
                    }

                </div>
                <div className=''>
                    <button className='btnSeeMore'>Voir plus</button>
                </div>
                <div className="editList">
                    <button className='bntEdit'>Editer la liste</button>
                </div>
            </>
        )
    }
}
