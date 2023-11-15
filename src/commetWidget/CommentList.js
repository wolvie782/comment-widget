// CommentList.js

import React from 'react';
import CommentItem from './commetWidget/CommentItem';

const CommentList = ({ comments, editComment, deleteComment, likeComment, addReply, sortComments }) => {
  return (
    <div>
      <div>
        <label>Sort By:</label>
        <select onChange={(e) => sortComments(e.target.value)}>
          <option value="date">Date</option>
          <option value="likes">Likes</option>
        </select>
      </div>
      <ul>
        {comments.map((comment) => (
          <CommentItem
            key={comment.id}
            comment={comment}
            editComment={editComment}
            deleteComment={deleteComment}
            likeComment={likeComment}
            addReply={addReply}
          />
        ))}
      </ul>
    </div>
  );
};

export default CommentList;
