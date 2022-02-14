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

const PORT = 5000;

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userId: 0,
      isAdmin: false,
      posts: [],
      news: true,
      best: false,
      myCat: "",
      myContact: "",
      titleKeyword: "",
      feedMessage: ""
    };
    this.getLatest = this.getLatest.bind(this);
  }

  // METHODS passed as props to posts

  // Get the latest posts created in CoffeeBook
  // - "items" : posts by descending order of their creation date
  getLatest = async () => {
    try {
        const latestReq = `http://localhost:${PORT}/latestposts`;
        const newPosts = await axios.post(latestReq);
        this.setState({
            posts: newPosts.data,
            news: true,
            best: false,
            myCat: "",
            myContact: "",
            titleKeyword: "",
            feedMassage: "Les dernières actualités"
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
          posts: bestPosts,
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
      posts: catPosts.items,
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
      posts: contactPosts.items,
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
      posts: keywordPosts,
      news: false,
      best: false,
      myCatId: 0,
      myContactId: 0,
      titleKeyword: keyword,
      feedMassage: `Les derniers posts avec ${keyword} en titre`
    })
  }


  // For Login and Subscribe, save user info
  saveUserInfo = ({userId, isAdmin}) => {
    this.setState({ ...this.state, userId, isAdmin });
  }

  // Save a new Post. The server should return the 
  saveNewPost = async (e) => {
    e.preventDefault();
    const newPostForm = new FormData(e.target);
    const newPost = {};
    for (let [key, value] of newPostForm) {
      newPost[key] = value;
    }
    const newPosts = await axios.post(`http://localhost:${PORT}/post/create`, { newPost });
    this.setState({
      posts: newPosts,
      news: true,
      best: false,
      myCat: "",
      myContact: "",
      titleKeyword: "",
      feedMassage: "Les dernières actualités"
    })  
  }

  componentDidMount() {
    this.getLatest();
  }


  render() {
    return (
      <div className="container">
        <Route exact path="/">
          <div className="row ">
            <div className="col-3 category maxHeight">
              <LogoCB />
              <CategoryFilter getLatest={this.getLatest} getBest={this.getBest} getCategoryPosts={this.getCategoryPosts}/>
              <MyCategories />
            </div>
            <div className="col-6 profilSection">
              <div className="headerProfil">
                <HeaderProfile />
              </div>
              <div className="sectionPost">
                <Post />
                <CreatePost saveNewPost={this.saveNewPost}/>
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
        <Route path="/login">
          <Login />
        </Route>
        <Route path="/subscribe">
          <Subscribe />
        </Route>
      </div>
    );
  }
}
export default App;
