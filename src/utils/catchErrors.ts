import type { ErrorResponse } from "../types/response/types.response";

const catchErrors = (error: any): ErrorResponse => {
  let customError: ErrorResponse;

  if (error.name === "SequelizeForeignKeyConstraintError") {
    // console.log(error.message);
    customError = { status: 400, error: error.message };

    return customError;
    // return res.status(400).json({ error: error.message });
  } else if (error.name === "SequelizeValidationError") {
    const errors = error.errors.map((e: any) => e.message);

    customError = { status: 400, error: errors };

    return customError;
  }

  customError = { status: 500, error: error.message };
  return customError;
};

export default catchErrors;
