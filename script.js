window.onload = function () {
  const date = {
    days: document.getElementById("days"),
    hours: document.getElementById("hours"),
    minutes: document.getElementById("minutes"),
    seconds: document.getElementById("seconds"),
  };

  const data = {
    summer: "summer",
    winter: "winter",
    spring: "spring",
    autumn: "autumn",
  };

  let timeEnd;
  const text = document.getElementById("text");
  const TIME_UPDATE = 3;

  function diffTime(timeEnd = new Date(), timeStart) {
    return timeEnd.getTime() - timeStart.getTime();
  }

  function setData(millsec) {
    date.days.innerHTML = Math.floor(millsec / 1000 / 60 / 60 / 24);
    date.hours.innerHTML = Math.floor(millsec / 1000 / 60 / 60) % 24;
    date.minutes.innerHTML = Math.floor(millsec / 1000 / 60) % 60;
    date.seconds.innerHTML = Math.floor(millsec / 1000) % 60;
  }

  let count = 0;
  text.innerText = data.summer;


  function getTimeStartSeasons() {
    const today = new Date();

    const seasonsTimeStart = {
      summer: null,
      winter: null,
      spring: null,
      autumn: null,
    };
    if (today.getMonth() >= 2) {
      seasonsTimeStart.spring = new Date(today.getFullYear() + 1, 2);
    } else {
      seasonsTimeStart.spring = new Date(today.getFullYear(), 2);
    }
    if (today.getMonth() >= 5) {
      seasonsTimeStart.summer = new Date(today.getFullYear() + 1, 5);
    } else {
      seasonsTimeStart.summer = new Date(today.getFullYear(), 5);
    }
    if (today.getMonth() >= 8) {
      seasonsTimeStart.autumn = new Date(today.getFullYear() + 1, 8);
    } else {
      seasonsTimeStart.autumn = new Date(today.getFullYear(), 8);
    }
    if (today.getMonth() >= 11) {
      seasonsTimeStart.winter = new Date(today.getFullYear() + 1, 11);
    } else {
      seasonsTimeStart.winter = new Date(today.getFullYear(), 11);
    }
    return seasonsTimeStart;
  }

  setInterval(() => {
    count += 1;
    let today = new Date();
    if (count > TIME_UPDATE) {
      const seasonsTimeStart = getTimeStartSeasons();
      count = 0;
      switch (text.innerText) {
        case data.spring:
          text.innerText = data.summer;
          timeEnd = seasonsTimeStart.summer;
          break;

        case data.summer:
          text.innerText = data.autumn;
          timeEnd = seasonsTimeStart.autumn;
          break;

        case data.autumn:
          text.innerText = data.winter;
          timeEnd = seasonsTimeStart.winter;
          break;

        case data.winter:
          text.innerText = data.spring;
          timeEnd = seasonsTimeStart.spring;
          break;

        default:
          break;
      }
    }
    setData(diffTime(timeEnd, today));
  }, 1000);
};
