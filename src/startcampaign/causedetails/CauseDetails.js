import React, { useState } from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import { Dropdown } from "semantic-ui-react";
import CauseDetailsForm from "./forms/CauseDetailsForm";
import EducationForm from "./forms/EducationForm";
import HealthForm from "./forms/HealthForm";
import { ProgressBar } from "react-bootstrap";
import { withFormik } from "formik";
import * as Yup from "yup";
import { saveCauseDetails } from "../../store/actions/campaignActions";
import { connect } from "react-redux";

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

const causeType = [
  {
    key: "Education",
    text: "Education",
    value: "Education",
  },
  {
    key: "Health",
    text: "Health",
    value: "Health",
  },
  {
    key: "Other",
    text: "Other",
    value: "Other",
  },
];

const CauseDetails = (props) => {
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
          <Dropdown
            inline
            options={causeType}
            onChange={(e, { value }) => {
              props.setCauseDetails(value);
            }}
            value={props.causeDetails}
          />{" "}
          cause
        </span>
      </div>
      {props.causeDetails == "Education" ? (
        <EducationForm props={props} />
      ) : null}
      {props.causeDetails == "Health" ? <HealthForm props={props} /> : null}

      <CauseDetailsForm props={props} />

      <Grid item className={classes.submit}>
        <ProgressBar
          now={props.step}
          label={`${props.step * 20}%`}
          style={{ height: 25 }}
          min={0}
          max={4}
        />
      </Grid>
      <Grid container spacing={3}>
        <Grid item xs={6} sm={6}>
          <Button
            fullWidth
            variant="contained"
            className={classes.submit}
            onClick={props.prevStep}
          >
            Back
          </Button>
        </Grid>
        <Grid item xs={6} sm={6}>
          <Button
            variant="contained"
            color="primary"
            fullWidth
            className={classes.submit}
            onClick={props.handleSubmit}
            disabled={props.isSubmitting}
          >
            Next
          </Button>
        </Grid>
      </Grid>
    </Container>
  );
};

const phoneRegExp = /^((\+92)|(0092))-{0,1}\d{3}-{0,1}\d{7}$|^\d{11}$|^\d{4}-\d{7}$/;

const ammountRegex = /^([0-9]{1,3},([0-9]{3},)*[0-9]{3}|[0-9]+)(\.[0-9][0-9])?$/;

const CauseDetailsFormik = withFormik({
  mapPropsToValues(props) {
    return {
      ...props.campaign,
    };
  },
  handleSubmit(values, { props }) {
    setTimeout(() => {
      props.saveCauseDetails(values, props.causeDetails);
      props.nextStep();
    }, 500);
  },
  validationSchema(props) {
    if (props.causeDetails == "Education") {
      return Yup.object().shape({
        expiry: Yup.date().required("Must enter this field"),
        amount: Yup.string()
          .matches(ammountRegex, "Invalid Amount")
          .required("Must enter this field"),
        campaignType: Yup.string().required("Must enter this field"),
        schoolName: Yup.string()
          .min(1, "Must have a character")
          .max(255, "Must be shorter than 255 characters")
          .required("Must enter this field"),
        schoolEmail: Yup.string()
          .email()
          .max(255, "Must be shorter than 255 characters")
          .required("Must enter this field"),
        schoolId: Yup.string()
          .min(1, "ID should be greater than 1")
          .max(120, "ID should be less than 120")
          .required("Must enter this field"),
        schoolAddress: Yup.string()
          .min(5, "Musut be greater than 5 characters")
          .max(255, "Must be less than 255 characters")
          .required("Must enter this field"),
        schoolContact: Yup.string().matches(
          phoneRegExp,
          "Phone number is not valid"
        ),
      });
    } else if (props.causeDetails == "Health" && props.campaign.hospital) {
      return Yup.object().shape({
        expiry: Yup.date().required("Must enter this field"),
        amount: Yup.string()
          .matches(ammountRegex, "Invalid Amount")
          .required("Must enter this field"),
        campaignType: Yup.string().required("Must enter this field"),
        hospitalName: Yup.string()
          .min(1, "Must have a character")
          .max(255, "Must be shorter than 255 characters")
          .required("Must enter this field"),
        hospitalEmail: Yup.string()
          .email()
          .max(255, "Must be shorter than 255 characters")
          .required("Must enter this field"),
        hospitalAddress: Yup.string()
          .min(5, "Musut be greater than 5 characters")
          .max(255, "Must be less than 255 characters")
          .required("Must enter this field"),
        hospitalContact: Yup.string().matches(
          phoneRegExp,
          "Phone number is not valid"
        ),
        patientId: Yup.string()
          .min(1, "ID should be greater than 1")
          .max(120, "ID should be less than 120")
          .required("Must enter this field"),
      });
    } else {
      return Yup.object().shape({
        expiry: Yup.date().required("Must enter this field"),
        amount: Yup.string()
          .matches(ammountRegex, "Invalid Amount")
          .required("Must enter this field"),
        campaignType: Yup.string().required("Must enter this field"),
      });
    }
  },
})(CauseDetails);

const mapStateToProps = (state) => {
  return {
    campaign: state.campaign,
    auth: state.firebase.auth,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    saveCauseDetails: (values, condition) =>
      dispatch(saveCauseDetails(values, condition)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(CauseDetailsFormik);
