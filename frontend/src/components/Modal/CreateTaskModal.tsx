import React, {useState} from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'

import { TaskData } from '../Kanban/TaskData'
import { createTask, editTask } from '../../hooks/function'

const CreateTaskModal = ({open, onClose, previousState={category: "", task: "", points: 0, assigned: ""}, updateState=false}:{open:boolean, onClose: ()=>void, previousState?: TaskData, updateState?: boolean}) => {
    const [state, setState] = useState(previousState)
    const handleChange = (currentState: string) => (event: React.ChangeEvent<HTMLInputElement>) => {
        setState({...state, [currentState]: event.target.value})
    }
    const handleClose = () => {
        if (updateState) {
            if (previousState.category.length != 0 && previousState.task.length != 0) {
                editTask({category: previousState.category, task: previousState.task, newTask: state});
            }
            onClose();
            return;
        } else {
            createTask(state);
            onClose();
            return;
        }
    }
    return (
        <Dialog open={open} onClose={handleClose}>
            <DialogTitle id="form-dialog-title">
                Create a new task
            </DialogTitle>
            <DialogContent>
                <DialogContentText>
                    Please enter the Category name, Task name, and optionally provide the Points and assignee.
                    <TextField
                        autoFocus
                        margin="dense"
                        id="category"
                        label="Category Name"
                        type="text"
                        fullWidth
                        value={state.category}
                        onChange={handleChange("category")}
                    />
                    <TextField
                        autoFocus
                        margin="dense"
                        id="task"
                        label="Task Name"
                        type="text"
                        fullWidth
                        value={state.task}
                        onChange={handleChange("task")}
                    />
                    <TextField
                        autoFocus
                        margin="dense"
                        id="points"
                        label="Points"
                        type="number"
                        fullWidth
                        value={state.points}
                        onChange={handleChange("points")}
                    />
                    <TextField
                        autoFocus
                        margin="dense"
                        id="assigned"
                        label="Assignee"
                        type="text"
                        fullWidth
                        value={state.assigned}
                        onChange={handleChange("assigned")}
                    />
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose} color="primary">
                    Cancel
                </Button>
                <Button onClick={handleClose} color="primary">
                    Subscribe
                </Button>
            </DialogActions>
        </Dialog>
    );
}

export default CreateTaskModal;