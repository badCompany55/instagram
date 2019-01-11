import React from 'react';
import {Comments} from '../commentSection/comments.js';
import './post.css';
import moment from 'moment';
import PropTypes from 'prop-types';
import {Post, InnerPostCont, PostHeading} from '../styledComponets.js';

export class PostsPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: props.user,
      currentInput: ' ',
      timePassed: [],
    };
  }

  componentDidMount() {
    this.initialTime(this.initialTimeSet);
    this.updateTime(this.initialTimeSet);
  }

  captureInput = event => {
    let input = event.target.value;
    this.setState({currentInput: input});
  };

  captureLikes = event => {
    let newData = this.props.data.slice();
    newData.forEach(post => {
      if (post.thumbnailUrl === event.target.dataset.tab) {
        post.likes += 1;
      }
    });
    this.props.updateStateCB(newData);
  };

  enterKeyPressComments = event => {
    let form = document.querySelector('.addComment');
    let newData = this.props.data.slice();
    let newTimeAndComment = newData.map(post => {
      if (post.thumbnailUrl === event.target.dataset.tab) {
        let newComment = {
          username: this.state.user,
          text: this.state.currentInput,
        };
        const timestamp = moment();
        const timePassed = timestamp.fromNow();
        post.timePassed = timePassed;
        post.comments.push(newComment);
        post.timestamp = timestamp;
      }
      return post;
    });
    this.props.updateStateCB(newTimeAndComment);
    event.preventDefault();
    form.reset();
  };

  deleteKeyPressComments = event => {
    let newData = this.props.data.slice();
    if (event.target.dataset.select === 'userComUser') {
      newData = newData.map(post => {
        let newComments = post.comments.filter((comment, index) => {
          if (
            index.toString() + post.thumbnailUrl !==
            event.target.dataset.tab
          ) {
            return comment;
          }
        });
        post.comments = newComments;
        return post;
      });

      const deleteConfirmation = event => {
        let confirmation = prompt(
          'Are you sure you want to delete the comment? Y/N?',
        );
        if (confirmation === null) {
          confirmation = 'n';
        }
        if (confirmation.toLowerCase() === 'y') {
          this.props.updateStateCB(newData);
        }
      };
      deleteConfirmation();
    }
  };

  updateTime = timeSet => {
    window.setInterval(timeSet, 900000);
  };

  initialTime = timeSet => {
    window.setTimeout(timeSet, 10);
  };

  initialTimeSet = () => {
    const newData = this.props.data.slice();
    let newTimePassed = newData.map(post => {
      const timestamp = post.timestamp;
      let dateObject = moment(timestamp, 'MMMM-DD-YYYY HH:mm:ss');
      dateObject = JSON.stringify(dateObject);
      dateObject = JSON.parse(dateObject);
      dateObject = new Date(dateObject);
      dateObject = moment(dateObject);
      const timePassed = dateObject.fromNow();
      post.timePassed = timePassed;
      return post;
    });
    this.props.updateStateCB(newTimePassed);
  };

  render() {
    return (
      // <div className="postContainer">

      <div>
        <Post>
          {this.props.data.map(post => {
            return (
              <InnerPostCont key={post.thumbnailUrl}>
                <PostHeading>
                  <img
                    className="thumb"
                    src={post.thumbnailUrl}
                    alt="${post.username} thumbnail"
                  />
                  <h2>{post.username}</h2>
                </PostHeading>
                <img
                  src={post.imageUrl}
                  className="postImage"
                  alt="{post.username} image"
                />
                <div>
                  <Comments
                    comments={post.comments}
                    likes={post.likes}
                    dataTab={post.thumbnailUrl}
                    likesClick={this.captureLikes}
                    input={this.captureInput}
                    addComment={this.enterKeyPressComments}
                    timePassed={post.timePassed}
                    delete={this.deleteKeyPressComments}
                  />
                </div>
              </InnerPostCont>
            );
          })}
        </Post>
      </div>
    );
  }
}

PostsPage.propTypes = {
  data: PropTypes.array,
  updateStateCB: PropTypes.func,
  user: PropTypes.string,
};
