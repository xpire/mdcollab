import React, { useState, useContext } from "react";
import Page from "./Page";
import { useHistory } from "react-router-dom";
import Card from "@material-ui/core/Card";
import {
  Typography,
  TextField,
  Button,
  Grid,
  Container,
} from "@material-ui/core";

import {AuthContext} from '../util/AuthContext'

const LoginPage = () => {
  const {name, setName} = useContext(AuthContext);
  const [error, setError] = useState(false);
  const history = useHistory();

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if (!checkErrors(name)) {
      localStorage.setItem("user", name);
      history.push("/");
    } else {
      alert("error, fix name");
    }
  };

  const checkErrors = (s: string) => {
    if (s.length > 0) {
      setError(false);
      return false;
    } else {
      setError(true);
      return true;
    }
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value);
    checkErrors(event.target.value);
  };
  return (
    <Page>
      <Container maxWidth="sm" component="main">
        <Card>
          <Grid
            container
            direction="column"
            style={{
              margin: "auto",
              verticalAlign: "middle",
              textAlign: "center",
              padding: "20px",
            }}
          >
            <Grid item>
              <Typography variant="h3">Login</Typography>
            </Grid>
            <Grid item>
              <Typography>What is your name?</Typography>
            </Grid>

            <form onSubmit={handleSubmit}>
              <Grid item>
                <TextField
                  label="name"
                  type="text"
                  onChange={handleChange}
                  error={error ? true : false}
                  helperText={error ? "required" : ""}
                ></TextField>
              </Grid>
              <Grid item>
                <Button type="submit">Login</Button>
              </Grid>
            </form>
          </Grid>
        </Card>
      </Container>
    </Page>
  );
};

export default LoginPage;
