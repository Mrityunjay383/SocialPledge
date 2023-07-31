exports.getDate = (timestamp) => {
  const newDate = new Date(timestamp);

  return newDate.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    timeZone: "Asia/Kolkata",
  });
};

exports.getTime = (timestamp) => {
  let date = new Date(timestamp);

  return date.toLocaleTimeString("it-IT", { timeZone: "Asia/Kolkata" });
};
