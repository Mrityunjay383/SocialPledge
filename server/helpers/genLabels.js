exports.genLabels = (period) => {
  let newDate = new Date();

  let len;
  if (period === "7L") {
    len = 7;
  } else if (period === "7T") {
    len = newDate.getDay() - 1;
  } else if (period === "30L") {
    len = 30;
  } else if (period === "30T") {
    len = newDate.getDate() - 1;
  }

  let labels = [];

  Array(len)
    .fill(1)
    .forEach((subDay) => {
      newDate.setDate(newDate.getDate() - subDay);
      labels.push(
        newDate.toLocaleDateString("en-US", {
          month: "short",
          day: "numeric",
        })
      );
    });
  return labels.reverse();
};
