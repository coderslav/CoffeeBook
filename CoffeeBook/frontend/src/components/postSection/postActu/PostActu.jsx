import React from 'react'
import { BsPencilFill } from "react-icons/bs";
// import { AiOutlineHeart } from "react-icons/ai";
import { FavoriteBorderOutlined, FavoriteOutlined } from "@mui/icons-material"
import { BsFillPlusCircleFill } from "react-icons/bs";
import { FiAlertTriangle } from "react-icons/fi";
import { ImCross } from "react-icons/im";
import Rating from '../rating/Rating'
import '../actualites/actualites.css'
import axios from 'axios';
axios.defaults.withCredentials = true;

const PORT = 5000;

export default class PostActu extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            isFavorite: true,
        }
    }

    // componentDidMount() {
    //     console.log('Props sent to PostActu : ', this.props);
    //     axios.post(`http://localhost:${PORT}/comments`, { postId: this.props.post.id })
    //         .then(res => {
    //             console.log("Post comments on the post : ", res);
    //         })
    //         .catch(err => {
    //             console.log(`Error while fetching comments for post ${this.props.post.id} `, err)
    //         }) 
    // }

    render() {
        return (
            <div className="postActu">
            {
                this.props.post.postCategory.length
                    ? <div>{this.props.post.postCategory.map(c => <span style={{ "marginRight": "8px" }} key={c.id}>{c.name}</span>)}</div>
                    : ""
            }
            <div className="postActuHeader">
                <p>{this.props.post.postUser.firstName} {this.props.post.postUser.lastName}<button className='btnSuivre'>suivre l'auteur</button></p>
                <div className="icones">
                    <BsPencilFill />
                    {/* <AiOutlineHeart /> */}
                    { this.state.isFavorite  
                        ? <FavoriteOutlined sx={{ color: "#EC4027" }} />
                        : <FavoriteBorderOutlined />
                    }
                    <div className="nav-item dropdown">
                        <a className="nav-link gearAppearance" data-bs-toggle="dropdown" href="#" role="button" aria-expanded="false"><BsFillPlusCircleFill /></a>
                        <ul className="dropdown-menu menuParameter">
                            <li className='d-flex justify-content-start align-items-center ml-2'><a className="dropdown-item" href="#"><FiAlertTriangle />Signaler le post</a></li>
                            <li className='d-flex justify-content-start align-items-center'><a className="dropdown-item" href="#"><ImCross />Supprimer le post</a></li>
                        </ul>
                    </div>
                </div>
            </div>
            <div className="main">
                <div className="postTitle">{this.props.post.title}</div>
                <div className="postcontent">
                    <img src="" alt="" />
                    <div className="postComment">{this.props.post.content}</div>
                </div>
                <div>
                    <Rating voteAvg={this.props.post.voteAvg}/>
                </div>
            </div>
            </div>
        )
    }
}
