// src/Modal.js
import React from "react";
import "./Modal.css";

const Modal = ({ visible, onClose, date, events }) => {
  if (!visible) return null;

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <h3>Events on {date}</h3>
        {events.length === 0 ? (
          <p>No events.</p>
        ) : (
          events.map((event, idx) => (
            <div key={idx} className={`event ${event.type}`}>
              <strong>{event.title}</strong>
              <div>{event.time}</div>
              <div>{event.duration}</div>
              <div>{event.type}</div>
            </div>
          ))
        )}
        <button onClick={onClose} className="modal-close">
          Close
        </button>
      </div>
    </div>
  );
};

export default Modal;