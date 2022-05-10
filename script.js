var data;

window.onload = function () {
  const options = {
    year: "numeric",
    month: "long",
    day: "numeric",
    weekday: "long",
    timezone: "UTC",
    hour: "numeric",
    minute: "numeric",
    second: "numeric",
  };
  const TIME_UPDATE = 5;
  const TIME_ANIMATION = 1.5;

  const animationDate = `animationDate ${TIME_ANIMATION}s 2 alternate forwards`;
  const animationLine = `animationLine ${TIME_ANIMATION}s 2 alternate forwards`;
  const animationFilter = `animationFilter ${TIME_ANIMATION}s 2 alternate forwards`;
  const animationText = `animationText ${TIME_ANIMATION}s 2 alternate forwards`;

  const backgroundImage = {
    summer: `url("./img/summer.jpg")`,
    winter: `url("./img/winter.jpg")`,
    spring: `url("./img/spring.jpg")`,
    autumn: `url("./img/autumn.jpg")`,
  };

  const date = {
    days: document.getElementById("days"),
    hours: document.getElementById("hours"),
    minutes: document.getElementById("minutes"),
    seconds: document.getElementById("seconds"),
    date: document.getElementById("date"),
    line: document.getElementById("line"),
    filter: document.getElementById("filter"),
  };

  const nameSeason = document.getElementById("nameSeason");
  const textSeason = document.getElementById("textSeason");

  let seasonAndTimeEnd;
  let today;
  let count = 0;

  function diffTime(timeEnd = new Date(), timeStart) {
    return timeEnd.getTime() - timeStart.getTime();
  }

  function setData(millsec) {
    date.days.innerHTML = Math.floor(millsec / 1000 / 60 / 60 / 24);
    date.hours.innerHTML = Math.floor(millsec / 1000 / 60 / 60) % 24;
    date.minutes.innerHTML = Math.floor(millsec / 1000 / 60) % 60;
    date.seconds.innerHTML = Math.floor(millsec / 1000) % 60;
  }

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

  function getSeasonAndTimeEnd() {
    let season;
    let timeEnd;
    let backgroundImageSeasons;
    today = new Date();
    const seasonsTimeStart = getTimeStartSeasons();
    switch (nameSeason.innerText) {
      case data.spring:
        season = data.summer;
        timeEnd = seasonsTimeStart.summer;
        backgroundImageSeasons = backgroundImage.summer;
        break;

      case data.summer:
        season = data.autumn;
        timeEnd = seasonsTimeStart.autumn;
        backgroundImageSeasons = backgroundImage.autumn;
        break;

      case data.autumn:
        season = data.winter;
        timeEnd = seasonsTimeStart.winter;
        backgroundImageSeasons = backgroundImage.winter;
        break;

      case data.winter:
        season = data.spring;
        timeEnd = seasonsTimeStart.spring;
        backgroundImageSeasons = backgroundImage.spring;
        break;

      default:
        season = data.spring;
        timeEnd = seasonsTimeStart.spring;
        backgroundImageSeasons = backgroundImage.spring;
        break;
    }
    return {
      season: season,
      timeEnd: timeEnd,
      backgroundImageSeasons: backgroundImageSeasons,
    };
  }

  today = new Date();
  seasonAndTimeEnd = getSeasonAndTimeEnd();
  nameSeason.innerText = seasonAndTimeEnd.season;
  setData(diffTime(seasonAndTimeEnd.timeEnd, today));
  textSeason.innerText = `Today - ${today.toLocaleString("en-US", options)}`;
  document.body.style.backgroundImage = seasonAndTimeEnd.backgroundImageSeasons;

  setInterval(() => {
    today = new Date();
    textSeason.innerText = `Today - ${today.toLocaleString("en-US", options)}`;
    count += 1;

    if (count >= TIME_UPDATE - TIME_ANIMATION) {
      date.date.style.animation = animationDate;
      date.line.style.animation = animationLine;
      date.filter.style.animation = animationFilter;
      nameSeason.style.animation = animationText;
    }

    if (count === TIME_UPDATE) {
      seasonAndTimeEnd = getSeasonAndTimeEnd();
      nameSeason.innerText = seasonAndTimeEnd.season;
      document.body.style.backgroundImage =
        seasonAndTimeEnd.backgroundImageSeasons;
    }

    if (count >= TIME_UPDATE + TIME_ANIMATION) {
      count = 0;
      date.date.style.animation = "none";
      date.line.style.animation = "none";
      date.filter.style.animation = "none";
      nameSeason.style.animation = "none";
    }

    setData(diffTime(seasonAndTimeEnd.timeEnd, today));
  }, 1000);
};
