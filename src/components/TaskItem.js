import React from 'react';
import './styles/TaskItem.css';

const TaskItem = ({ task, onEdit, onDelete, onToggleStatus }) => {
  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'High':
        return 'red';
      case 'Medium':
        return 'orange';
      case 'Low':
        return 'green';
      default:
        return '#007bff'; // Default color
    }
  };

  return (
    <div className={`task-item ${task.status === 'Completed' ? 'completed' : ''}`}>
      <div className="task-details">
        <h3>{task.title}</h3>
        <p className="description">{task.description}</p>
        <p className="priority">
          Priority: <span style={{ color: getPriorityColor(task.priority) }}>{task.priority}</span>
        </p>
      </div>
      <div className="task-actions">
        <button
          className={`status-btn ${task.status === 'Completed' ? 'incomplete-btn' : 'complete-btn'}`}
          onClick={() => onToggleStatus(task.id)}
        >
          {task.status === 'Incomplete' ? 'Mark Complete' : 'Mark Incomplete'}
        </button>
        <button className="edit-btn" onClick={() => onEdit(task)}>Edit</button>
        <button className="delete-btn" onClick={() => onDelete(task.id)}>Delete</button>
      </div>
    </div>
  );
};

export default TaskItem;

