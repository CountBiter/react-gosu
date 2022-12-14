const formatDuration = (d) => {
  d = Math.floor(Number(d) / 1000);
  const s = Number(d) % 60;
  d = Math.floor(Number(d) / 60);
  const m = Number(d) % 60;
  const h = Math.floor(Number(d) / 60);
  return [h > 0 ? h : null, m, s]
    .filter((x) => x !== null)
    .map((x) => (x < 10 ? "0" : "") + x)
    .join(":");
};
const formatDate = (date) => {
  const padTo2Digits = (num) => {
    return num.toString().padStart(2, "0");
  };
  const dateTime = new Date(Number(date));

  return (
    `${[padTo2Digits(dateTime.getHours()), padTo2Digits(dateTime.getMinutes())].join(
      ":"
    )} ` +
    `${[
      padTo2Digits(dateTime.getDate()),
      padTo2Digits(dateTime.getMonth() + 1),
      dateTime.getFullYear(),
    ].join(".")}`
  );
};

export {formatDuration, formatDate};
