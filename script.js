window.onload = function () {
  const date = {
    days: document.getElementById("days"),
    hours: document.getElementById("hours"),
    minutes: document.getElementById("minutes"),
    seconds: document.getElementById("seconds"),
  };

  const inputDate = {
    year: document.getElementById("year"),
    month: document.getElementById("month"),
    days: document.getElementById("days"),
    hours: document.getElementById("hours"),
    minutes: document.getElementById("minutes"),
    seconds: document.getElementById("seconds"),
  };

  let timeStart = new Date();

  function diffTime(timeEnd, timeStart) {
    return timeEnd.getTime() - timeStart.getTime();
  }

  function setData(millsec) {
    date.days.innerHTML = Math.floor(millsec / 1000 / 60 / 60 / 24);
    
    console.log(Math.floor(millsec / 1000 / 60 / 60 / 24));


    date.hours.innerHTML = '22'; //Math.floor(millsec / 1000 / 60 / 60) % 24;
    //console.log(Math.floor(millsec / 1000 / 60 / 60) % 24);
    date.minutes.innerHTML = Math.floor(millsec / 1000 / 60) % 60;
    //console.log(Math.floor(millsec / 1000) % 60);
    date.seconds.innerHTML = Math.floor(millsec / 1000) % 60;
    //console.log(Math.floor(millsec / 1000) % 60);
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
    setData(diffTime(timeEnd, timeStart));
  }, 1000);
};
