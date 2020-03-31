import React, { useState } from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import { Dropdown } from "semantic-ui-react";
import CauseDetailsForm from "./forms/CauseDetailsForm";

const useStyles = makeStyles(theme => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center"
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1)
  },
  submit: {
    margin: theme.spacing(3, 0, 2)
  }
}));

const causeType = [
  {
    key: "Education",
    text: "Education",
    value: "Education"
  },
  {
    key: "Health",
    text: "Health",
    value: "Health"
  },
  {
    key: "Other",
    text: "Other",
    value: "Other"
  }
];

const CauseDetails = () => {
  const classes = useStyles();
  return (
    <Container component="main" maxWidth="xs">
      <div className={classes.paper}>
        <Avatar className={classes.avatar}></Avatar>
        <Typography component="h1" variant="h5">
          Cause Details
        </Typography>
        <span className="mt-3">
          Raising Funds for{" "}
          <Dropdown inline options={causeType} value={"Education"} />
          {" "}cause
        </span>
      </div>


      <CauseDetailsForm />
      <Grid container spacing={3}>
        <Grid item xs={6} sm={6}>
          <Button fullWidth variant="contained" className={classes.submit}>
            Back
          </Button>
        </Grid>
        <Grid item xs={6} sm={6}>
          <Button
            variant="contained"
            color="primary"
            fullWidth
            className={classes.submit}
          >
            Submit
          </Button>
        </Grid>
      </Grid>
    </Container>
  );
};

export default CauseDetails;