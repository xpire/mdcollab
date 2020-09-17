import React, {useEffect, useState} from "react";
import MaterialCard from "@material-ui/core/Card";
import Page from "./Page";
import { Typography, Grid, Fab } from "@material-ui/core";
import { makeStyles, useTheme, Theme, createStyles } from '@material-ui/core/styles';
import AddIcon from '@material-ui/icons/Add';

import Card from '../Kanban/Card'
import Section from '../Kanban/Section'
import {TaskData} from '../Kanban/TaskData'
import axios from 'axios'
import {BACKEND_URL, createTask, editTask, deleteTask} from '../../hooks/function'
import CreateTaskModal from '../Modal/CreateTaskModal'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    fab: {
      position: 'absolute',
      bottom: "20px",
      right: "20px",
    },
  }),
);

const AboutPage = () => {
  const [data, setData] = useState([
      {"assigned": "justin", "category": "webs", "task": "two"}, 
      // {"category": "webs", "task": "more stuff"}, 
      // {"category": "webs", "task": "ssssssss stuff"}, 
      // {"category": "xss", "task": "ssssssssasdfasdfadsfas stuff"},
      // {"category": "xss", "task": "aaa"},
      // {"category": "xss", "task": "bbsb"},
      // {"category": "xss", "task": "bbbd"},
      // {"category": "xss", "task": "bbbc"},
      // {"category": "xss", "task": "cc"}
    ]);

  useEffect(() => {
    axios.get(`${BACKEND_URL}/tasks`).then(res => {
      const tasks = res.data;
      setData(tasks)
  })
  }, []);

  const getCategories = (data: TaskData[]) => {
    return Array.from(
      new Set(data.reduce((a: string[], c: TaskData) => [...a, c.category], []))
    );
  };

  const getTasksForCategory = (data: TaskData[], category: string) => {
    return data.filter((elem: TaskData) => elem.category === category)
  };
  
  const [open, setOpen] = useState(false);

  return (
    <Page>
      <Grid container direction="column">
        <Grid item>
          <MaterialCard style={{padding:"20px", margin: "10px"}}>
            <Typography variant="h3">Current Kanban Board</Typography>
          </MaterialCard>
        </Grid>
        {getCategories(data).map((elem) => {
          return (
          <Section name={elem} key={elem} clickHandler={()=>{}}>
            <Grid
            key={elem}
            container
            direction="row"
            justify="flex-start"
            alignItems="flex-start"
            spacing={3}
            >
              {getTasksForCategory(data, elem).map((e:TaskData) => (
                <Grid item key={e.task}>
                  <Card category={elem} task={e.task} points={500} assigned={e?.assigned}/>
                </Grid>
                ))}
            </Grid>
          </Section>
          );
        })}
      </Grid>
      <Fab color="primary"  variant="extended" aria-label="add" onClick={()=>setOpen(true)} style={{
          margin: 0,
          top: 'auto',
          right: 20,
          bottom: 20,
          left: 'auto',
          position: 'fixed',
      }}>
        <AddIcon />
        Add new task
      </Fab>
      <CreateTaskModal open={open} onClose={() => {
        setOpen(false)
        }}/>
    </Page>
  );
};

export default AboutPage;
