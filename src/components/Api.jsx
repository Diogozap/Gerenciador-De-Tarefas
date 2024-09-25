import axios from 'axios';

const axiosInstance = axios.create({
    baseURL: 'https://jsonplaceholder.typicode.com',
    timeout: 5000,
    headers: {
        'Content-Type': 'application/json'
    }
});

const ToDoApi = {
    'getTasks': () => axiosInstance.get('/todos'),
    'getTask': (id) => axiosInstance.get(`/todos/${id}`),
    'createTask': (task) => axiosInstance.post('/todos', task),
    'updateTask': (id, task) => axiosInstance.put(`/todos/${id}`, task),
    'deleteTask': (id) => axiosInstance.delete(`/todos/${id}`)
}

export default ToDoApi