import React, { useState } from 'react';
import { FaTimes } from 'react-icons/fa';
import './styles/Modal.css';

const EditTaskModal = ({ task, onClose, onEditTask }) => {
  const [title, setTitle] = useState(task.title);
  const [description, setDescription] = useState(task.description);
  const [priority, setPriority] = useState(task.priority);

  const handleSubmit = (e) => {
    e.preventDefault();
    onEditTask({ ...task, title, description, priority });
    onClose();
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <div className="modal-header">
          <h2>Edit Task</h2>
          <FaTimes className="close-icon" onClick={onClose} />
        </div>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Edit task title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
          <textarea
            placeholder="Edit task description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          <select value={priority} onChange={(e) => setPriority(e.target.value)}>
            <option value="High">High</option>
            <option value="Medium">Medium</option>
            <option value="Low">Low</option>
          </select>
          <button type="submit">Save Changes</button>
        </form>
      </div>
    </div>
  );
};

export default EditTaskModal;
