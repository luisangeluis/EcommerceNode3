const getCurrentDate = () => {
  const currentDate = new Date();
  const month = currentDate.getMonth() + 1;
  const day = currentDate.getDate();
  const year = currentDate.getFullYear();

  return `${month}/${day}/${year}`;
};

export default getCurrentDate;
