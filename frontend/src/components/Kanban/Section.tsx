import React, {FunctionComponent} from "react";
import { Card, Typography, Grid, Button } from "@material-ui/core";

type CardProps = {
  name: string;
  clickHandler: any;
};

const Section: FunctionComponent<CardProps> = ({ name, clickHandler, children }) => {
  return (
    <Card style={{padding:"20px", margin: "10px"}}>
      <Grid container justify="space-between" alignItems="center">
        <Grid item>
          <Typography variant="h3">{name}</Typography>
        </Grid>
        {/* <Grid item>
          <Button onClick={clickHandler}>
            Add one more
          </Button>
        </Grid> */}
      </Grid>
        {children}
    </Card>
  );
};

export default Section;
