window.onload = function () {
  const date = {
    days: document.getElementById("days"),
    hours: document.getElementById("hours"),
    minutes: document.getElementById("minutes"),
    seconds: document.getElementById("seconds"),
  };

  const inputDate = {
    year: document.getElementById("input_year"),
    month: document.getElementById("input_month"),
    days: document.getElementById("input_days"),
    hours: document.getElementById("input_hours"),
    minutes: document.getElementById("input_minutes"),
    seconds: document.getElementById("input_seconds"),
  };

  let timeStart = new Date();

  function diffTime(timeEnd, timeStart) {
    return timeEnd.getTime() - timeStart.getTime();
  }

  function setData(millsec) {
    date.days.innerHTML = Math.floor(millsec / 1000 / 60 / 60 / 24);
    date.hours.innerHTML = Math.floor(millsec / 1000 / 60 / 60) % 24;
    date.minutes.innerHTML = Math.floor(millsec / 1000 / 60) % 60;
    date.seconds.innerHTML = Math.floor(millsec / 1000) % 60;
  }

  function getTimeEnd() {
    let dates = {};
    for (const key in inputDate) {
      dates[key] = inputDate[key].value;
    }
    return Object.values(dates);
  }

  setInterval(() => {
    timeStart = new Date();
    timeEnd = new Date(...getTimeEnd());
    if (timeStart.getTime() < timeEnd.getTime()) {
      setData(diffTime(timeEnd, timeStart));
    } else {
      setData(diffTime(timeStart, timeStart));
    }
  }, 1000);
};
