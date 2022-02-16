import React from "react";
import SearchCategory from "./category/SearchCategory";
import CategoryFilter from "./category/CategoryFilter";
import MyCategories from "./category/MyCategories";
import Contact from "./contact/Contact";
import HeaderProfile from "./profileSection/HeaderProfile";
import Post from "./postSection/post/Post";
import Actualites from "./postSection/actualites/Actualites";
import LogoCB from "./logo/LogoCB";
import CreatePost from "./postSection/createPost/CreatePost";
import Home from "./home/Home";
import Login from "./login/Login";
import Subscribe from "./subscribe/Subscribe";
import { Route, Redirect } from "react-router-dom";
import axios from "axios";
axios.defaults.withCredentials = true;

const PORT = 5000;

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      newAccount: false,
      createNewPost: false,
      id: 0,
      firstName: "",
      lastName: "",
      isAdmin: false,
      profilePicturePath: "",
      posts: [],
      news: true,
      best: false,
      myCat: 0,
      myContact: 0,
      titleKeyword: "",
      feedMessage: ""
    };
    this.getLatest = this.getLatest.bind(this);
  }

  // METHODS passed as props to posts

  // User has logged in 
  // Save the user data in localStorage to keep the user signed in 
  // until he/she signed out 
  userHasLoggedIn = ({ id, isAdmin, firstName, lastName, profilePicturePath }) => {
    localStorage.setItem("id", id);
    localStorage.setItem("isAdmin", isAdmin);
    localStorage.setItem("firstName", firstName);
    localStorage.setItem("lastName", lastName);
    localStorage.setItem("profilePicturePath", profilePicturePath)
    this.setState({ id, isAdmin, firstName, lastName, profilePicturePath });
  }

  createNewUser = () => {
    this.setState({ newAccount: true });
  }

  newUserCreated = ({ id }) => {
    this.setState({ id, newAccount: false });
  }

  // Get the latest posts created in CoffeeBook
  // - "items" : posts by descending order of their creation date
  getLatest = async () => {
    try {
        const latestReq = `http://localhost:${PORT}/latestposts`;
        const newPosts = await axios.post(latestReq);
        console.log("latest posts : ", newPosts);
        this.setState({
            posts: newPosts.data,
            news: true,
            best: false,
            myCat: 0,
            myContact: 0,
            titleKeyword: "",
            feedMessage: "Les dernières actualités"
        })   
    } catch(err) {
        console.error("Error getting latest posts : ", err);
    }
  } 

  // Get best average vote posts.
  // - "items" : posts by descending order of their average vote
  getBest = async () => {
    try {
      const bestReq = `http://localhost:${PORT}/getbestposts`;
      const bestPosts = await axios.post(bestReq);
      this.setState({
          posts: bestPosts.data,
          news: false,
          best: true,
          myCatId: 0,
          myContactId: 0,
          titleKeyword: "",
          feedMessage: "Les posts les mieux votés" 
      });
    } catch(err) {
      console.error("Error getting best posts by votes: ", err);
    }
  }

  // Get posts by category. 
  // The request should return : 
  // - "categoryName" : The name of the category
  // - "items" : the posts in that category by descending order of their 
  //   creation date
  getCategoryPosts = async (e) => {
    const categoryId = e.target.value;
    const catPosts = await axios.post(`http://localhost:${PORT}/getcategoryposts`, { categoryId });
    this.setState({
      posts: catPosts.data,
      news: false,
      best: false,
      myCatId: categoryId,
      myContactId: 0,
      titleKeyword: "",
      feedMessage: `Les derniers post de la catégorie ${catPosts.name}`
    })
  }

  // Get posts from contacts
  // The request should return :
  // - "firstName","lastName" : the firstname and lastname of the contact
  // - "items" : the posts authored by the contact by descending order 
  //   of their creation date
  getContactPosts = async (e) => {
    const contactId = e.target.value;
    const contactPosts = await axios.post(`http://localhost:${PORT}/getcontactposts`, { contactId });
    this.setState({
      posts: contactPosts.data,
      news: false,
      best: false,
      myCatId: 0,
      myContactId: contactId,
      titleKeyword: "", 
      feedMassage: `Les derniers posts de ${contactPosts.firstName} ${contactPosts.lastName}`
    })
  }

  // Get posts which title contain a keyword
  // The request should return :
  // - 
  getPostsWithKeyword = async (e) => {
    const keyword = e.target.value;
    const keywordPosts = await axios.post(`http://localhost:${PORT}/getpostswithkeyword`, { keyword });
    this.setState({
      posts: keywordPosts.data,
      news: false,
      best: false,
      myCatId: 0,
      myContactId: 0,
      titleKeyword: keyword,
      feedMessage: `Les derniers posts avec ${keyword} en titre`
    })
  }

  // Display the createPost component
  createNewPost = () => {
    this.setState({ createNewPost: true })
  }

  // Save a new post.
  // The server should return the latest posts in CoffeeBook 
  // by descending order of their creation date. It will possibly return the post
  // that has been sent. 
  saveNewPost = async (e) => {
    e.preventDefault();
    const newPostForm = new FormData(e.target);
    const newPost = {};
    for (let [key, value] of newPostForm) {
      newPost[key] = value;
    }
    const newPosts = await axios.post(`http://localhost:${PORT}/post/create`, { newPost });
    this.setState({
      createNewPost: false,
      posts: newPosts.data,
      news: true,
      best: false,
      myCat: 0,
      myContact: 0,
      titleKeyword: "",
      feedMessage: "Les dernières actualités"
    })  
  }

  // Route to delete a post by its id
  // return all posts by descending order of their creation date
  deletePost = async (e) => {
    console.log(`delete post ${e.currentTarget.id}`);
    const updatedPostList = await axios.post(`http://localhost:${PORT}/post/delete`, { id: e.currentTarget.id });
    let refreshedList = updatedPostList.data.slice();
    if (this.state.best) {
      refreshedList.sort((a, b) => a.voteAvg - b.voteAvg);
    }

    if (this.state.myCat) {
      // TODO : need to retrieve the list of post with its categories
      // refreshedList is filtered for items having the myCat category
    }

    if (this.state.myContact) {
      refreshedList = refreshedList.filter(post => post.userId === this.state.myContact );
    }

    if (this.state.keyword) {
      refreshedList = refreshedList.filter(post => post.title.contains(this.state.keyword));
    }
    this.setState({
      posts: refreshedList,
    })
  }

  // In case a previous user signed in to CoffeeBook, his/her info are retrieved from 
  // archive in localStorage. 
  // As there is an user "id" when this component mounts, the Login screen will be called
  componentDidMount() {
    if (localStorage.getItem("id")) {
      this.setState({
        id: localStorage.getItem("id"),
        firstName: localStorage.getItem("firstName"),
        lastName: localStorage.getItem('lastName'),
        isAdmin: localStorage.getItem("isAdmin"),
        profilePicturePath: localStorage.getItem("profilePicturePath")
      })
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.id !== this.state.id) {
      axios.post(`http://localhost:${PORT}/login`)
      .then(this.getLatest());
    } 
  }

  render() {
    return (
      this.state.id == 0 && !this.state.newAccount
        ? <Login loggedUser={this.userHasLoggedIn} createUser={this.createNewUser}/>
        : this.state.newAccount 
        ? <Subscribe newUserCreated={this.newUserCreated} />
        :  <div className="container">
            <Route exact path="/">
              <div className="row ">
                <div className="col-3 category maxHeight">
                  <LogoCB />
                  <CategoryFilter getLatest={this.getLatest} getBest={this.getBest} />
                  <MyCategories getCategoryPosts={this.getCategoryPosts} />
                </div>
                <div className="col-6 profilSection">
                  <div className="headerProfil">
                    <HeaderProfile 
                      userId={this.state.id} 
                      isAdmin={this.state.isAdmin} 
                      firstName={this.state.firstName} 
                      lastName={this.state.lastName} 
                      profilePicturePath={this.profilePicturePath} />
                  </div>
                  <div className="sectionPost">
                    <Post 
                      getPostsWithKeyword={this.getPostsWithKeyword} 
                      createNewPost={this.createNewPost} />
                    {
                     this.state.createNewPost 
                      ? <CreatePost saveNewPost={this.saveNewPost}/>
                      : ""
                    }  
                  </div>
                  <div>
                    <Actualites feedMessage={this.state.feedMessage} posts={this.state.posts}/>
                  </div>
                </div>
                <div className="col-3 contact d-flex flex-row justify-content-center align-items-start ">
                  <Contact getContactPosts={this.getContactPosts}/>
                </div>
              </div>
            </Route>
          </div>
      


      );
  }
}
export default App;
