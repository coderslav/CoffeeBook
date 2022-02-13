import React from "react";
import SearchCategory from "./category/SearchCategory";
import CategoryFilter from "./category/CategoryFilter";
import MyCategories from "./category/MyCategories";
import Contact from "./contact/Contact";
import HeaderProfile from "./profileSection/HeaderProfile";
import Post from "./postSection/post/Post";
import Actualites from "./postSection/actualites/Actualites";
import LogoCB from "./logo/LogoCB";
import Home from "./home/Home";
import Login from "./login/Login";
import Subscribe from "./subscribe/Subscribe";
import { Route, Redirect } from "react-router-dom";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div className="container">
        <Route exact path="/">
          <div className="row ">
            <div className="col-3 category maxHeight">
              <LogoCB />
              <SearchCategory />
              <CategoryFilter />
              <MyCategories />
            </div>
            <div className="col-6 profilSection">
              <div className="headerProfil">
                <HeaderProfile />
              </div>
              <div className="sectionPost">
                <Post />
              </div>
              <div>
                <Actualites/>
              </div>
              {/* {this.state.user ? (
                <Redirect to={{ pathname: "/" }} />
            ) : (
              <Redirect to={{ pathname: "/login" }} />
            )} */}
            </div>
            <div className="col-3 contact d-flex flex-row justify-content-center align-items-start ">
                <Contact />
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
