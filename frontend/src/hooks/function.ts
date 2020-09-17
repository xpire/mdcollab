import axios from 'axios'
import {TaskData} from '../components/Kanban/TaskData'


export const CODIMD_URL = 'http://0.0.0.0:3000'
export const BACKEND_URL = 'http://127.0.0.1:4433'

// export const generatePage = () => { 
//     fetch(`${CODIMD_URL}/new`, {
//         redirect: 'manual',
//     }).then(res => {
//         return(res.request.res.responseUrl); // has the uid I need
//     });
// }

export const createTask = ({category, task, assigned, points}:TaskData) => {
    const body = {
        category: category,
        task: task,
        assigned: assigned,
        points: points
    };
    axios.post(`${BACKEND_URL}/tasks`, body).then(res => {
        return res.data
    })
}

type editProps = {
    category: string;
    task: string;
    newTask: TaskData;
}

export const editTask = ({category, task, newTask}: editProps) => {
    axios.put(`${BACKEND_URL}/task/${category}/${task}`, newTask).then(res => {
        return res.data
    })
}

export const deleteTask = ({category, task}: TaskData) => {
    axios.delete(`${BACKEND_URL}/task/${category}/${task}`).then(res => {
        return res.data
    })
}