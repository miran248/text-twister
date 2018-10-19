import { Formik } from "formik";
import PropTypes from "prop-types";
import React from "react";

import validator from "./validator";

import ValidateOnMount from "../common/ValidateOnMount";

import * as c from "../components";

const GuessForm = ({ onChange, onSubmit }) => (
  <Formik
    initialValues={{ word: "" }}
    isInitialValid={({ initialValues }) => (
      Object.keys(validator(initialValues)).length === 0
    )}
    validate={(values) => {
      const errors = validator(values);

      if(Object.keys(errors).length === 0)
        onChange();

      return errors;
    }}
    onSubmit={(values, options) => {
      onSubmit(values, options);

      options.resetForm();
      options.setSubmitting(false);
    }}
  >
  {(props) => (
    <ValidateOnMount {...props} render={({
      errors,
      handleChange, handleSubmit,
      isSubmitting, isValid,
      values,
    }) => (
      <form onSubmit={handleSubmit}>
        <c.List>
        {errors.word && (
          <c.List.Item red light>{errors.word}</c.List.Item>
        )}
          <c.List.Item>
            <c.Horizontal>
              <c.Input type="text" autoFocus
                name="word" value={values.word}
                placeholder="guess the word"
                onChange={handleChange}
              />
              <c.GreenButton type="submit" disabled={!isValid || isSubmitting}>Guess</c.GreenButton>
            </c.Horizontal>
          </c.List.Item>
        </c.List>
      </form>
    )} />
  )}
  </Formik>
);

GuessForm.propTypes = {
  onChange: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
};

export default GuessForm;
