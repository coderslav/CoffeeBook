import React, { Component } from "react";
import { SearchCategory } from "./category/SearchCategory";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div className="containers d-flex">
        <div className="row align-items-start">
          <div className="col">
            <div>Category</div>
            <div>{SearchCategory}</div>
          </div>
          <div className="col">
            <div>Main</div>
          </div>
          <div className="col">
            <div>Contact</div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
