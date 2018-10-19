import { Formik } from "formik";
import PropTypes from "prop-types";
import React, { Component } from "react";

import validator from "./validator";

import ValidateOnMount from "../common/ValidateOnMount";

import * as c from "../components";

const NameForm = ({ name, onSubmit }) => (
  <Formik
    initialValues={{ name: name }}
    isInitialValid={({ initialValues }) => (
      Object.keys(validator(initialValues)).length === 0
    )}
    validate={validator}
    onSubmit={onSubmit}
  >
  {(props) => (
    <ValidateOnMount {...props} render={({
      errors,
      handleBlur, handleChange, handleSubmit,
      isSubmitting, isValid,
      values,
    }) => (
      <form onSubmit={handleSubmit}>
        <c.List>
        {errors.name && (
          <c.List.Item red light>{errors.name}</c.List.Item>
        )}
          <c.List.Item>
            <c.Horizontal>
              <c.Input type="text" autoFocus
                name="name" defaultValue={values.name}
                placeholder="your name"
                onBlur={handleBlur} onChange={handleChange} />
              <c.GreenButton type="submit" disabled={!isValid || isSubmitting}>Play</c.GreenButton>
            </c.Horizontal>
          </c.List.Item>
        </c.List>
      </form>
    )} />
  )}
  </Formik>
);

NameForm.propTypes = {
  name: PropTypes.string,
  onSubmit: PropTypes.func.isRequired,
};

export default NameForm;
