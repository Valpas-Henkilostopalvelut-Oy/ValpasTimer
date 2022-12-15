const duration = {
  MIN15: 15,
  MIN30: 30,
  MIN45: 45,
  H1: 60,
};

export const totaldaytime = (array) => {
  //CALCULATE TOTAL TIME FOR EACH DAY
  var h = 0;
  var min = 0;
  var sec = 0;

  array.arr.forEach((work) => {
    work.arr.forEach((day) => {
      let start = new Date(day.timeInterval.start);
      let end = new Date(day.timeInterval.end);

      let total = Date.parse(end) - Date.parse(start);

      h = h + Math.floor(total / 1000 / 60 / 60);
      min = min + Math.floor((total / 1000 / 60) % 60);
      sec = sec + Math.floor((total / 1000) % 60);

      if (min >= 60) {
        h++;
        min = min % 60;
      }
      if (sec >= 60) {
        min++;
        sec = sec % 60;
      }
    });
  });

  return {
    h: h,
    min: min,
    sec: sec,
  };
};

export const totalweektime = (array) => {
  //CALCULATE TOTAL TIME FOR EACH WEEK
  var h = 0;
  var min = 0;
  var sec = 0;

  array.arr.forEach((week) => {
    let weekArr = week.arr;

    weekArr.forEach((work) => {
      work.arr.forEach((day) => {
        let start = new Date(day.timeInterval.start);
        let end = new Date(day.timeInterval.end);

        let total = Date.parse(end) - Date.parse(start);

        h = h + Math.floor(total / (1000 * 60 * 60));
        min = min + Math.floor((total / (1000 * 60)) % 60);
        sec = sec + Math.floor((total / 1000) % 60);

        if (sec > 59) {
          min++;
          sec = sec % 60;
        }
        if (min > 59) {
          h++;
          min = min % 60;
        }
      });
    });
  });

  return {
    h: h,
    min: min,
    sec: sec,
  };
};
