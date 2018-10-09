export default (values) => {
  let errors = {};

  if(!values.name)
    errors.name = "Name is required";
  else if(values.name.length < 3 || values.name.length > 10)
    errors.name = "Name must be between [3, 10]";

  return errors;
};
