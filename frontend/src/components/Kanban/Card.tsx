import React, {useState} from "react";
import { Card, Typography, Button } from "@material-ui/core";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import { makeStyles } from '@material-ui/core/styles';

import {TaskData} from './TaskData'
import {CODIMD_URL, deleteTask} from '../../hooks/function'
import CreateTaskModal from '../Modal/CreateTaskModal'

const useStyles = makeStyles({
  root: {
    width: "min(400px, 85vw)",
  },
})

const KanbanCard = ({ category, task, points, assigned }: TaskData) => {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  return (
    <Card className={classes.root} style={{background: "darkOrange"}}>
      <CardActionArea href={`${CODIMD_URL}/${category}_${task}`}>
        <CardContent>
          <Typography variant="h4">{task}</Typography>
          <Typography variant="subtitle1">{points} pts</Typography>
          <Typography>{assigned ? `${assigned}` : "not assigned."}</Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Button onClick={() => setOpen(true)}>edit</Button>
        <Button onClick={() => deleteTask({category: category, task: task})}>remove</Button>
      </CardActions>
      <CreateTaskModal 
      open={open} 
      onClose={() => {
        setOpen(false)
        }}  
      previousState={{category: category, task: task, points: points, assigned: assigned}} 
      updateState={true}/>
    </Card>
  );
};

export default KanbanCard;
