import React from 'react';
import TaskItem from './TaskItem';
import './styles/TaskList.css';

const TaskList = ({ tasks, onEdit, onDelete, onToggleStatus }) => {
  return (
    <div className="task-list">
      {tasks.length > 0 ? (
        tasks.map((task) => (
          <TaskItem
            key={task.id}
            task={task}
            onEdit={onEdit}
            onDelete={onDelete}
            onToggleStatus={onToggleStatus}
          />
        ))
      ) : (
        <p className="no-tasks">No tasks available. Please add a task!</p>
      )}
    </div>
  );
};

export default TaskList;
