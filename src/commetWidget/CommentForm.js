// CommentForm.js
import React, { useState } from 'react';

const CommentForm = ({ addComment, defaultText, onCancel, placeholder }) => {
  const [text, setText] = useState(defaultText || '');

  const handleAddComment = () => {
    if (text.trim() !== '') {
        addComment(text);
        setText('');
      }
  };

  return (
    <div className="comment-form">
      <textarea
        rows="4"
        placeholder={placeholder || 'Add a comment...'}
        value={text}
        onChange={(e) => setText(e.target.value)}
      ></textarea>
      <div className="form-buttons">
        <button onClick={handleAddComment}>Add Comment</button>
        {onCancel && <button onClick={onCancel}>Cancel</button>}
      </div>
    </div>
  );
};

export default CommentForm;
