import axios from 'axios'
import {TaskData} from '../components/Kanban/TaskData'

const HOST = 'A.B.C.D'
export const CODIMD_URL = `http://${HOST}:3000`
export const BACKEND_URL = `http://${HOST}:4433`

// export const CODIMD_PATH = '/codimd'
// export const BACKEND_PATH = ['/task', '/tasks']

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
