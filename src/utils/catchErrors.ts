// const catchErrors = (error) => {
//   if (error.name === "SequelizeForeignKeyConstraintError") {
//     // console.log(error.message);
//     return res.status(400).json({ error: error.message });
//   } else if (error.name === "SequelizeValidationError") {
//     // console.log(error.message);
//     const errors = error.errors.map((e: any) => e.message);
//     return res.status(400).json({ error: errors });
//   }

//   return res.status(500).json({ message: error.message });
// };
