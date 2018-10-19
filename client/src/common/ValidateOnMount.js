import PropTypes from "prop-types";
import React, { Component } from "react";

class ValidateOnMount extends Component {
  componentDidMount() {
    const {
      isValid,
      validateForm,
      values,
    } = this.props;

    if(isValid)
      return;

    validateForm(values);
  }

  render() {
    const {
      render,

      ...rest
    } = this.props;

    return render(rest);
  }
}

ValidateOnMount.propTypes = {
  isValid: PropTypes.bool.isRequired,
  render: PropTypes.func.isRequired,
  validateForm: PropTypes.func.isRequired,
  values: PropTypes.object.isRequired,
};

export default ValidateOnMount;
