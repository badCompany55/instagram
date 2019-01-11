import React, {Component} from 'react';
import './App.css';
import dummyData from './dummy-data.js';
import {PostsPage} from './comps/postContainer/post.js';
import {highOrderFunc} from './comps/authentication/authenticate.js';
import {
  MainApp,
  RightHeading,
  SearchBar,
  LeftHeading,
} from './comps/styledComponets.js';

class App extends Component {
  constructor(props) {
    super(props);
    this.local = window.localStorage;
    this.posts = JSON.parse(this.local.getItem('posts'));
    this.login = JSON.parse(this.local.getItem('login'));
    this.state = {
      data: dummyData,
      revertData: dummyData,
      user: this.login[0].username,
    };
  }

  componentDidMount() {
    // this.setState({data: dummyData});
    // this.setState({revertData: dummyData});

    this.setState({data: this.formatDate()});
    this.setState({revertData: this.formatDate()});
  }

  updateState = newData => {
    this.setState({data: newData});
    this.setLocal();
  };

  // updateLoginState = logIn => {
  //   this.setState({logInInfo: logIn});
  // };
  //

  logout = () => {
    this.local.setItem('login', '');
    window.location.reload();
  };

  formatDate = () => {
    let finalData;
    if (this.posts !== null) {
      let newData = this.posts.map(post => {
        let timestamp = post.timestamp;
        timestamp = new Date(timestamp);
        post.timestamp = timestamp;
        return post;
      });
      finalData = newData;
    } else {
      let newData = this.state.data.map(post => {
        let timestamp = post.timestamp;
        timestamp = new Date(timestamp);
        post.timestamp = timestamp;
        return post;
      });
      finalData = newData;
    }
    return finalData;
  };

  setLocal = () => {
    let posts = JSON.stringify(this.state.data);
    this.local.setItem('posts', posts);
  };

  // setLocalLogin = info => {
  //   let login = JSON.stringify(info);
  //   this.local.setItem('login', login);
  // };

  captureSearchInput = (event, call) => {
    let cInput = event.target.value;
    this.setState({currentInput: cInput});
    if (event.target.value !== '') {
      this.searchPosts();
    } else this.setState({data: this.state.revertData});
  };

  searchPosts = () => {
    let newData = this.state.revertData.slice();
    let finalData = newData.filter(post => {
      if (post.username.includes(this.state.currentInput)) {
        return post;
      }
    });
    this.setState({data: finalData});
  };

  render() {
    return (
      // <div className="App">
      <div>
        <MainApp>
          <header>
            {/* <div className="insta"> */}
            <RightHeading>
              <i className="fab fa-instagram" />
              <h1>Instagram</h1>
            </RightHeading>
            {/* </div> */}
            {/* <div className="search"> */}
            <SearchBar>
              <input
                type="text"
                className="fas"
                placeholder="&#xf002; Search"
                onChange={this.captureSearchInput}
              />
            </SearchBar>
            {/* </div> */}

            {/* <div className="options"> */}
            <LeftHeading>
              <div>
                <i className="far fa-compass" />
                <i className="far fa-heart" />
                <i className="far fa-user" onClick={this.logout} />
              </div>
            </LeftHeading>
            {/* </div> */}
          </header>

          <PostsPage
            data={this.state.data}
            updateStateCB={this.updateState}
            user={this.state.user}
          />
        </MainApp>
      </div>
    );
  }
}

// export const Authenticate = highOrderFunc(App);
export default highOrderFunc(App);
// export default App;
