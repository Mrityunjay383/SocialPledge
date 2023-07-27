exports.genLabels = (period) => {
  let newDate = new Date();

  let len;
  if (period === "7L") {
    len = 6;
  } else if (period === "7T") {
    len = newDate.getDay() - 1;
  } else if (period === "30L") {
    len = 29;
  } else if (period === "30T") {
    len = newDate.getDate() - 1;
  }

  let labels = [];
  let tsArr = [];
  labels.push(
    newDate.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
    })
  );

  tsArr.push(newDate.getTime());

  newDate.setHours(0, 0, 0);
  tsArr.push(newDate.getTime());

  Array(len)
    .fill(1)
    .forEach((subDay) => {
      newDate.setDate(newDate.getDate() - subDay);
      tsArr.push(newDate.getTime());
      labels.push(
        newDate.toLocaleDateString("en-US", {
          month: "short",
          day: "numeric",
        })
      );
    });
  return { labels, tsArr };
};
