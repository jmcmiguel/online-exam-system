import React, { useEffect, useState } from "react";
import useStylesForgotPassword from "../components/styles/useStylesForgotPassword";
import { useForm } from "react-hook-form";
import ControlledTextField from "../components/ControlledTextField";
import { Grid, Button, Typography } from "@material-ui/core";
import ControlledSelect from "./ControlledSelect";
import Section from "../services/sections";

const ForgotPasswordForm = ({ submitExamDetails, handleNext }) => {
  const { handleSubmit, errors, control } = useForm();
  const classes = useStylesForgotPassword();
  const [sections, setSections] = useState([]);

  const submitHandle = formData => {
    submitExamDetails(formData);
    handleNext();
  };

  useEffect(() => {
    Section.getAllSection()
      .then(returnedData => {
        setSections(returnedData);
      })
      .catch(error => {
        console.log("Error :>> ", error);
      });
  }, []);

  return (
    <React.Fragment>
      <form
        className={classes.form}
        noValidate
        onSubmit={handleSubmit(submitHandle)}>
        <Typography variant="h6" gutterBottom>
          Basic Exam Details
        </Typography>
        <Grid container spacing={3}>
          {/* Exam name */}
          <Grid item xs={12}>
            <ControlledTextField
              name="examname"
              label="Exam Name"
              error={errors}
              control={control}
              required={true}
              rules={{ required: "this is required" }}
            />
          </Grid>

          {/* Exam description */}
          <Grid item xs={12}>
            <ControlledTextField
              name="examdesc"
              label="Exam Description"
              error={errors}
              control={control}
              required={true}
              rules={{ required: "this is required" }}
            />
          </Grid>

          {/* Section */}
          <Grid item xs={12}>
            <ControlledSelect
              name="section"
              error={errors}
              control={control}
              label="Section"
              menu={sections}
            />
          </Grid>
        </Grid>
        <div className={classes.buttons}>
          <Button
            variant="contained"
            color="primary"
            type="submit"
            className={classes.button}>
            Next
          </Button>
        </div>
      </form>
    </React.Fragment>
  );
};

export default ForgotPasswordForm;
