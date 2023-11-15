// index.js

import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import '././commetWidget/CommentWidget.css'; // Assuming you have a global CSS file for basic styling

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);
