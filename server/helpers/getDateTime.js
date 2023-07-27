exports.getDate = (timestamp) => {
  const newDate = new Date(timestamp);

  return newDate.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
};

exports.getTime = (timestamp) => {
  let date = new Date(timestamp);
  let hours = date.getHours();
  let minutes = "0" + date.getMinutes();
  let seconds = "0" + date.getSeconds();

  // Will display time in 10:30:23 format
  return hours + ":" + minutes.substr(-2) + ":" + seconds.substr(-2);
};
