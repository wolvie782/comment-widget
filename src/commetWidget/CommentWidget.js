// CommentWidget.js
import React, { useState, useEffect } from 'react';
import CommentForm from './CommentForm';
import CommentItem from './CommentItem';

const CommentWidget = () => {
  const [comments, setComments] = useState([]);

  useEffect(() => {
    const storedComments = localStorage.getItem('comments');
    if (storedComments) {
      setComments(JSON.parse(storedComments));
    }
  }, []);

  const saveCommentsToLocalStorage = () => {
    localStorage.setItem('comments', JSON.stringify(comments));
  };

  const addComment = (text) => {
    const newComment = { id: Date.now(), text, likes: 0, date: new Date(), replies: [] };
    setComments([newComment, ...comments]);
  };

  const editComment = (id, updatedText) => {
    const updatedComments = comments.map((comment) =>
      comment.id === id ? { ...comment, text: updatedText } : comment
    );
    setComments(updatedComments);
  };

  const deleteComment = (id) => {
    const updatedComments = comments.filter((comment) => comment.id !== id);
    setComments(updatedComments);
  };

  const likeComment = (id) => {
    const updatedComments = comments.map((comment) =>
      comment.id === id ? { ...comment, likes: comment.likes + 1 } : comment
    );
    setComments(updatedComments);
  };

  const addReply = (commentId, text) => {
    const updatedComments = comments.map((comment) =>
      comment.id === commentId
        ? { ...comment, replies: [...comment.replies, { id: Date.now(), text }] }
        : comment
    );
    setComments(updatedComments);
  };

  useEffect(() => {
    saveCommentsToLocalStorage();
  }, [comments]);

  return (
    <div>
      <CommentForm addComment={addComment} />
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

export default CommentWidget;
