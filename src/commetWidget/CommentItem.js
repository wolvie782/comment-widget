// CommentItem.js
import React, { useState, useEffect } from 'react';
import CommentForm from './CommentForm';

const CommentItem = ({ comment, editComment, deleteComment, likeComment, addReply }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [isReplying, setIsReplying] = useState(false);
  const [showReplies, setShowReplies] = useState(false);
  const [replies, setReplies] = useState([]);

  useEffect(() => {
    const storedReplies = localStorage.getItem(`commentReplies_${comment.id}`);
    if (storedReplies) {
      setReplies(JSON.parse(storedReplies));
    }
  }, [comment.id]);

  const saveRepliesToLocalStorage = () => {
    localStorage.setItem(`commentReplies_${comment.id}`, JSON.stringify(replies));
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSaveEdit = (updatedText) => {
    editComment(comment.id, updatedText);
    setIsEditing(false);
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
  };

  const handleReply = () => {
    setIsReplying(true);
  };

  const handleCancelReply = () => {
    setIsReplying(false);
  };

  const handleAddReply = (text) => {
    const newReply = { id: Date.now(), text, likes: 0, date: new Date(), replies: [] };
    setReplies([...replies, newReply]);
    setIsReplying(false);
  };

  const handleToggleReplies = () => {
    setShowReplies(!showReplies);
  };

  const handleLikeComment = () => {
    likeComment(comment.id);
  };

  const handleDeleteComment = () => {
    deleteComment(comment.id);
  };

  const handleLikeReply = (replyId) => {
    const updatedReplies = replies.map((reply) =>
      reply.id === replyId ? { ...reply, likes: reply.likes + 1 } : reply
    );
    setReplies(updatedReplies);
  };

  const handleDeleteReply = (replyId) => {
    const updatedReplies = replies.filter((reply) => reply.id !== replyId);
    setReplies(updatedReplies);
  };

  useEffect(() => {
    saveRepliesToLocalStorage();
  }, [replies]);

  return (
    <li>
      {isEditing ? (
        <CommentForm
          addComment={handleSaveEdit}
          defaultText={comment.text}
          onCancel={handleCancelEdit}
        />
      ) : (
        <div>
          <div className="comment-details">
            <div className="avatar">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                xmlnsXlink="http://www.w3.org/1999/xlink"
                fill="#000000"
                height="80px"
                width="80px"
                version="1.1"
                id="Layer_1"
                viewBox="0 0 512 512"
                xmlSpace="preserve"
              >
                {/* Your provided SVG content goes here */}
                <g>
                  <g>
                    <path
                      d="M333.187,237.405c32.761-23.893,54.095-62.561,54.095-106.123C387.282,58.893,328.389,0,256,0    S124.718,58.893,124.718,131.282c0,43.562,21.333,82.23,54.095,106.123C97.373,268.57,39.385,347.531,39.385,439.795    c0,39.814,32.391,72.205,72.205,72.205H400.41c39.814,0,72.205-32.391,72.205-72.205    C472.615,347.531,414.627,268.57,333.187,237.405z M164.103,131.282c0-50.672,41.225-91.897,91.897-91.897    s91.897,41.225,91.897,91.897S306.672,223.18,256,223.18S164.103,181.954,164.103,131.282z M400.41,472.615H111.59    c-18.097,0-32.82-14.723-32.82-32.821c0-97.726,79.504-177.231,177.231-177.231s177.231,79.504,177.231,177.231    C433.231,457.892,418.508,472.615,400.41,472.615z"
                    />
                  </g>
                </g>
              </svg>
            </div>
            <p className="comment-text">{comment.text}</p>
            <div className="actions">
              <button className="action-button" onClick={handleEdit}>
                Edit
              </button>
              <button className="action-button" onClick={handleDeleteComment}>
                Delete
              </button>
              <button className="action-button" onClick={handleLikeComment}>
                Like
              </button>
              <button className="action-button" onClick={handleReply}>
                Reply
              </button>
              {replies.length > 0 && (
                <button className="action-button" onClick={handleToggleReplies}>
                  {showReplies ? 'Hide Replies' : 'View Replies'}
                </button>
              )}
            </div>
            <span className="like-count">{comment.likes} Likes</span>
          </div>
          {isReplying && (
            <CommentForm
              addComment={handleAddReply}
              onCancel={handleCancelReply}
              placeholder="Reply to this comment..."
            />
          )}
          {showReplies && replies.length > 0 && (
            <ul>
              {replies.map((reply) => (
                <CommentItem
                  key={reply.id}
                  comment={reply}
                  editComment={editComment}
                  deleteComment={handleDeleteReply}
                  likeComment={handleLikeReply}
                  addReply={handleAddReply}
                />
              ))}
            </ul>
          )}
        </div>
      )}
    </li>
  );
};

export default CommentItem;
