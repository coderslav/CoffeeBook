import React, { Component } from 'react'
import './category.css'
import axios from 'axios'
import { AiOutlinePlusCircle } from "react-icons/ai";
axios.defaults.withCredentials = true;

const PORT = 5000;

// export default class SearchCategory extends Component {
//     render() {
//         return (
//             <div className='container-fluid searchCategory'>
//                 <span>{props.title}</span>
//                 <input className='container-fluid' type="text" placeholder={props.placeholder} />
//             </div>
//         )
//     }
// }

export default class SearchCategory extends Component {
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

        const categoryKeyword = e.target.value;
        // const userId = this.props.userId;

        this.searchTimeout = setTimeout(() => {
            axios.post(`http://localhost:${PORT}/user/filter`, {
                filter: categoryKeyword,
                userId: this.props.userId
            })
                .then(res => {
                    console.log("results from category search by keyword : ", res);
                    if (res.data.length) {
                        this.setState({ searchResults: res.data })
                    } else {
                        this.setState({ searchResults: [] })
                    }
                })
                .catch(err => console.log("Error while searching categories by keyword", err))
        }, 600);


    }

    render() {
        return (
            <div className='container-fluid searchCategory'>
                <span>{this.props.title}</span>
                <input
                    className='container-fluid' type="text" placeholder={this.props.placeholder}
                    onChange={this.searchCategories} />
                {
                    this.state.searchResults.length
                        ?
                        this.state.searchResults.map(category => {
                            return (
                                <div className='d-flex justify-content-center align-items-start ms-5' key={category.id}>
                                    <p>#{category.firstName} {category.lastName}</p>
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



