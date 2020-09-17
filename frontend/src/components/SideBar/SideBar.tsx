import React from "react";
import Drawer from "@material-ui/core/Drawer";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import HomeIcon from "@material-ui/icons/Home";
import MaterialLink from "@material-ui/core/Link";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import { Link } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";

const items = [
  { text: "Home", path: "/" },
  { text: "Board", path: "/board" },
  { text: "Sign In", path: "/login" },
];

type Props = {
  handleChange: any;
  isOpen: any;
};

const useStyles = makeStyles({
  list: {
    width: 250,
  },
  title: {
    padding: 10,
  },
});

const SideBar = ({ isOpen, handleChange }: Props) => {
  const classes = useStyles();
  return (
    <Drawer open={isOpen} onClose={handleChange}>
      <Grid container spacing={2} justify="space-evenly">
        <Grid item xs={12}>
          <Paper className={classes.title}>
            <Typography variant="h4">mdCollab</Typography>
          </Paper>
        </Grid>
      </Grid>
      <div className={classes.list}>
        <List onClick={handleChange} onKeyDown={handleChange}>
          {items.map(({ text, path }) => (
            <ListItem button key={text} component={Link} to={path}>
              <ListItemIcon>
                <HomeIcon />
              </ListItemIcon>
              <ListItemText>
                <MaterialLink color="textPrimary" underline="none">
                  {text}
                </MaterialLink>
              </ListItemText>
            </ListItem>
          ))}
        </List>
      </div>
    </Drawer>
  );
};

export default SideBar;
