const calculteBreaks = (breaks) => {
  let total = 0;
  if (breaks === null) return total;
  breaks.forEach((b) => {
    let start = new Date(b.start);
    let end = new Date(b.end);
    total += Date.parse(end) - Date.parse(start);
  });

  return total;
};

export const totaldaytime = (array) => {
  //CALCULATE TOTAL TIME FOR EACH DAY
  var h = 0;
  var min = 0;
  var sec = 0;

  array.arr.forEach((work) => {
    work.arr.forEach((day) => {
      let breaks = calculteBreaks(day.break);
      let start = new Date(day.timeInterval.start);
      let end = new Date(day.timeInterval.end);

      let total = Date.parse(end) - Date.parse(start) - breaks;

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
        let breaks = calculteBreaks(day.break);
        let start = new Date(day.timeInterval.start);
        let end = new Date(day.timeInterval.end);

        let total = Date.parse(end) - Date.parse(start) - breaks;

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
