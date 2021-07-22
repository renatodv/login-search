import React from "react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import { Helmet } from "react-helmet";

import LoginProvider from "./providers/LoginProvider";
import IndexPage from "./pages/";

function App() {
  return (
    <LoginProvider>
      <div className="App">
        <Helmet>
          <title>Login Github Search</title>
        </Helmet>
        <AppBar position="static">
          <Toolbar>
            <Typography variant="h6">Login Search</Typography>
          </Toolbar>
        </AppBar>
        <br />
        <Container maxWidth="md">
          <IndexPage />
        </Container>
      </div>
    </LoginProvider>
  );
}

export default App;
