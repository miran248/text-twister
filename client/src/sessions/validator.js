export default (values) => {
  let errors = {};

  if(!values.word)
    errors.word = "Word is required";
  else if(values.word.length < 3 || values.word.length > 5)
    errors.word = "Word must be between [3, 5]";

  return errors;
};
