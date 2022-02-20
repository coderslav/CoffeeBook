import React from 'react'
import { BsPencilFill } from "react-icons/bs";
import { FavoriteBorderOutlined, FavoriteOutlined } from "@mui/icons-material"
import { BsFillPlusCircleFill } from "react-icons/bs";
import { FiAlertTriangle } from "react-icons/fi";
import { ImCross } from "react-icons/im";
import Rating from '../rating/Rating'
import '../actualites/actualites.css'
import axios from 'axios';
axios.defaults.withCredentials = true;

const PORT = 5000;
const commentsURL = `http://localhost:${PORT}/comments/`;

export default class PostActu extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      isFavorite: false,
      favoriteCommentId: null,
      vote: 0,
      voteCommentId: null,
      hasAbuse: false,
      hasAbuseCommentId: null
    }
  }

  // Set the initial state values that will be controlled by UI 
  static getDerivedStateFromProps(nextProps, prevState) {
    console.log("getDerivedStateFromProps is called");
    console.log("Next props : ", nextProps);
    console.log('Previous State : ', prevState);
    const { postUserComment } = nextProps.post
    let nextState = {}

    console.log("post User Comment", postUserComment);

    // Get all the comments added by the connected user
    const connectedUserComments = postUserComment.filter(user => user.id === nextProps.userId)
    console.log("connected User Comments : ", connectedUserComments);
    
    // identify the comment about the post being favorited by the connected user
    let fav = [];
    if (connectedUserComments.length) {
      fav = connectedUserComments.filter( ({ PostComment: item }) => { 
        console.log("comment item : ", item);
        return item.favorited !== null ? true : false;
      });
      console.log("favorite comment : ", fav);
    }
    nextState = {
      ...nextState,
      isFavorite: fav.length ? fav[0].PostComment.favorited : false,
      favoriteCommentId: fav.length ? fav[0].PostComment.id : null
    }
    
    // // identify the comment about the post being votre by the user
    // const voted = connectedUserComments.filter( ({ postComment: item }) => {
    //   return item.vote !== null ? true : false;
    // })
    // console.log("vote comment by user : ", voted);
    // nextState = {
    //   ...nextState,
    //   vote: voted.length ? voted[0].vote : 0,
    //   voteCommentId: voted.length ? voted[0].id : null
    // }

    // // identify the comment about the post being reported by the user
    // const reported = connectedUserComments.filter( ({ postComment: item }) => {
    //   return item.hasAbuse !== null ? true : false;
    // })
    // console.log("hasAbuse comment by user :", reported);
    // nextState = {
    //   ...nextState,
    //   hasAbuse: reported.length ? reported[0].hasAbuse : false,
    //   hasAbuseCommentId: reported.length ? reported[0].id : null
    // }

    return nextState;
  }

  // { postId, userId, favorite, vote, hasAbuse, comment, commentId }
  toggleFavorite = postid => async (_) => {
    // console.log("toggle target : ", e);
    // console.log("post to toggle : ", e.target.dataset.postid);
    const toggleData = {
      postId: parseInt(postid),
      userId: this.props.userId,
      favorited: !this.state.isFavorite,
    }

    let toggleURL = commentsURL;
    if (this.state.favoriteCommentId) {
      toggleData.commentId = parseInt(this.state.favoriteCommentId);
      console.log("favorite update data : ", toggleData);
      toggleURL += "update";
    } else {
      console.log("favorite created data : ", toggleData);
      toggleURL += "create";      
    }
    console.log("toggle URL : ", toggleURL); 
    let favComment = await axios.post(toggleURL, toggleData)
    console.log("favorited comment : ", favComment);
    // this.setState({ isFavorite: favComment.favorited })

    console.log("response from comment routes : ",  favComment)
  }

  changeVote = (e, { postId, userId }) => {
    console.log("post getting vote : ", postId, userId, e.target.value);
  }

  reportPost = (e) => {
    console.log("post being reported : ", e.target.dataset.postid);
  }

  render() {
    const currentPost = this.props.post;
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
              {this.state.isFavorite
                ? <FavoriteOutlined sx={{ color: "#EC4027" }} onClick={this.toggleFavorite(currentPost.id)}/>
                : <FavoriteBorderOutlined onClick={this.toggleFavorite(currentPost.id)} />
              }
            <div className="nav-item dropdown">
              <div className="nav-link gearAppearance" data-bs-toggle="dropdown" role="button" aria-expanded="false"><BsFillPlusCircleFill /></div>
              <ul className="dropdown-menu menuParameter">
                <li className='d-flex justify-content-start align-items-center ml-2'><div className="dropdown-item" data-postid={currentPost.id} onClick={this.reportPost}><FiAlertTriangle />Signaler le post</div></li>
                <li className='d-flex justify-content-start align-items-center'><div className="dropdown-item" ><ImCross />Supprimer le post</div></li>
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
            <Rating voteAvg={this.props.post.voteAvg} userVote={this.state.vote} changeVote={this.changeVote} userId={this.props.userId} postId={currentPost.id} />
          </div>
        </div>
      </div>
    )
  }
}
