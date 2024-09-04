import React from 'react';
import './CommentsSection.css';

const CommentsSection = ({ comments }) => {
  return (
    <div className="comments-section">
      <h3>Comentários ({comments.length})</h3>
      <div className="add-comment">
        <input type="text" placeholder="Adicione um comentário..." />
        <button className="btn-send">Enviar</button>
      </div>
      <ul className="comments-list">
        {comments.map((comment, index) => (
          <li key={index} className="comment">
            <img src={comment.userAvatar} alt={comment.userName} className="comment-avatar" />
            <div className="comment-content">
              <strong>{comment.userName}</strong>
              <p>{comment.text}</p>
              <div className="comment-actions">
                <button>Responder</button>
                <span>{comment.likes} curtidas</span>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CommentsSection;
