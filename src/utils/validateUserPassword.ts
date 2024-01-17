import passwordComplexity from "joi-password-complexity";

const validateUserPassword = (password: string): boolean => {
  const complexityOptions = {
    min: 10,
    max: 30,
    lowerCase: 1,
    upperCase: 1,
    numeric: 1,
    symbol: 1,
    requirementCount: 6
  };

  const complexity = passwordComplexity(complexityOptions);
  const { error } = complexity.validate(password);

  if (error) return false;

  return true;
};

export default validateUserPassword;
