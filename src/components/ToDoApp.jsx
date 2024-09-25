import { useEffect, useState } from 'react';
import styles from './ToDoApp.module.css';
import TodoItem from './ToDoItem.jsx';
import ToDoApi from './Api.jsx';


function TodoApp() {
  const [task, setTask] = useState('');
  const [tasks, setTasks] = useState([]);
  const [editingTaskId, setEditingTaskId] = useState(null); // Armazena a ID da tarefa sendo editada
  const [editTitle, setEditTitle] = useState('');

  useEffect(() => {
    ToDoApi.getTasks()
      .then((response) => {
        // Limita o número de tarefas exibidas para, por exemplo, 10
        const filteredTasks = response.data.slice(0, 0); // Exibe apenas as 10 primeiras tarefas
        setTasks(filteredTasks);
      })
      .catch((error) => console.log(error));
  }, []);
  
  const addTask = () => {
    if (task.trim()) {
      ToDoApi.createTask({
        title: task,
        completed: false,
      })
        .then((response) => {
          setTasks([...tasks, response.data]); // Adiciona a nova tarefa à lista
        })
        .catch((error) => console.log(error));
      setTask('');
    }
  };

  const removeTask = (id) => {
    ToDoApi.deleteTask(id)
      .then(() => {
        const newTasks = tasks.filter((task) => task.id !== id);
        setTasks(newTasks); // Remove a tarefa do estado
      })
      .catch((error) => console.log(error));
  };

  const toggleTask = (id) => {
    const updatedTasks = tasks.map((task) =>
      task.id === id ? { ...task, completed: !task.completed } : task
    );
    setTasks(updatedTasks); // Alterna o estado da tarefa
  };

  const startEditing = (id) => {
    const taskToEdit = tasks.find((task) => task.id === id);
    if (taskToEdit) {
      setEditingTaskId(id);
      setEditTitle(taskToEdit.title); // Preenche o título da tarefa que está sendo editada
    }
  };

  const cancelEditing = () => {
    setEditingTaskId(null);
    setEditTitle(''); // Limpa os campos de edição
  };

  const saveTask = (id) => {
    ToDoApi.updateTask(id, { title: editTitle})
      .then(() => {
        const updatedTasks = tasks.map((task) =>
          task.id === id ? { ...task, title: editTitle } : task
        );
        setTasks(updatedTasks); // Atualiza o título da tarefa no estado
        setEditingTaskId(null);
        setEditTitle(''); // Limpa os campos de edição após salvar
      })
      .catch((error) => console.log(error));
  };

  return (
    <div className={styles.container}>
      <h1>Lista de Tarefas</h1>
      <div className={styles.inputContainer}>
        <input
          type="text"
          value={task}
          onChange={(e) => setTask(e.target.value)}
          placeholder="Adicione uma nova tarefa"
        />
        <button onClick={addTask}>Adicionar</button>
      </div>
      <ul className={styles.taskList}>
        {tasks.map((task) => (
          <li key={task.id} className={styles.taskItem}>
            {editingTaskId === task.id ? (
              <div>
                <input
                  type="text"
                  value={editTitle}
                  onChange={(e) => setEditTitle(e.target.value)}
                />
                <button onClick={() => saveTask(task.id)}>Salvar</button>
                <button onClick={cancelEditing} className={styles.cancelBtn}>Cancelar</button>
              </div>
            ) : (
              <div>
                <span
                  onClick={() => toggleTask(task.id)}
                  className={task.completed ? styles.completed : ''}
                >
                  {task.title}
                </span>
                <button onClick={() => startEditing(task.id)} className={styles.editBtn}>Editar</button>
                <button onClick={() => removeTask(task.id)} className={styles.removeBtn}>
                  Remover
                </button>
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default TodoApp;
