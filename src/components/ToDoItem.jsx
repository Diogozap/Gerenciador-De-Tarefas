import React from 'react';
import styles from './ToDoItem.module.css';


function TodoItem(props) {
  return (
    <li className={styles.taskItem}>
      <span
        onClick={() => props.toggleTask(props.index)}
        className={props.task.completed ? styles.completed : ''}
      >
        {props.children}
      </span>
      <button onClick={() => props.removeTask(props.index)} className={styles.removeBtn}>
        Remover
      </button>
    </li>
  );
};

export default TodoItem;