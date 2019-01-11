import React from 'react';
import './comments.css';
import PropTypes from 'prop-types';
import {
  CommentsContainer,
  CommentsImg,
  Likes,
  UserComments,
  Comment,
} from '../styledComponets.js';

export const Comments = props => {
  return (
    <CommentsContainer>
      <div>
        <CommentsImg>
          <i
            className="far fa-heart"
            onClick={props.likesClick}
            data-tab={props.dataTab}
          />
          <i className="far fa-comment" />
        </CommentsImg>
        <Likes data-tab={props.dataTab}>{props.likes} likes</Likes>
      </div>

      {props.comments.map((comm, index) => {
        return (
          <UserComments key={comm.username + comm.text} onClick={props.delete}>
            <Comment
              font="bold"
              padding="1rem"
              data-select="userComUser"
              data-tab={index + props.dataTab}>
              {comm.username}
            </Comment>
            <Comment data-select="userComUser" data-tab={index + props.dataTab}>
              {comm.text}
            </Comment>
          </UserComments>
        );
      })}
      <div className="timeContainer">
        <p className="time" data-tab={props.dataTab}>
          {props.timePassed}
        </p>
      </div>
      <form
        className="addComment"
        data-tab={props.dataTab}
        onSubmit={props.addComment}>
        <input
          type="text"
          data-tab={props.dataTab}
          className="formInput"
          placeholder="Add Comment..."
          onChange={props.input}
        />
        <i className="fas fa-ellipsis-h" />
      </form>
    </CommentsContainer>
  );
};

Comments.propTypes = {
  likesClick: PropTypes.func,
  dataTab: PropTypes.string,
  likes: PropTypes.number,
  comments: PropTypes.array,
  delete: PropTypes.func,
  timePassed: PropTypes.string,
  addComment: PropTypes.func,
  input: PropTypes.func,
};
