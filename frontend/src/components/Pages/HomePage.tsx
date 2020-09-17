import React, {useContext} from "react";
import Page from "./Page";
import { Typography, Container, Card } from "@material-ui/core";

import{ AuthContext } from '../util/AuthContext'

const HomePage = () => {
  // const name = localStorage.getItem("user")
  const {name} = useContext(AuthContext);
  return (
    <Page>
      <Container maxWidth="sm" component="main">
        <Card>
          <Typography variant="h2">
            {name ? `Welcome ${name}` : `Please sign in`}
          </Typography>

          <Typography variant="h5">
            This is just a super basic material-ui based react project I threw
            together, for a ctf.
          </Typography>
        </Card>
      </Container>
    </Page>
  );
};

export default HomePage;
