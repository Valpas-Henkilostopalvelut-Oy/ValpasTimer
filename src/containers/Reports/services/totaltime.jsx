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

export const totaldaytime = (day) => {
  //CALCULATE TOTAL TIME FOR EACH DAY
  var h = 0;
  var min = 0;
  var sec = 0;

  day.forEach((item) => {
    item = item.timeshift;
    let start = new Date(item.timeInterval.start);
    let end = new Date(item.timeInterval.end);
    let breaks = calculteBreaks(item.break);

    let total = Date.parse(end) - Date.parse(start) - breaks;

    if (Date.parse(end) > Date.parse(start)) {
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
    }
  });

  return {
    h: h,
    min: min,
    sec: sec,
  };
};

export const totalweektime = (array) => {
  //CALCULATE TOTAL TIME FOR EACH WEEK
  let h = 0;
  let min = 0;
  let sec = 0;

  array.forEach((week) => {
    week.arr.forEach((day) => {
      day = day.timeshift;
      let start = new Date(day.timeInterval.start);
      let end = new Date(day.timeInterval.end);
      let breaks = calculteBreaks(day.break);

      if (Date.parse(end) > Date.parse(start)) {
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
      }
    });
  });

  return {
    h: h,
    min: min,
    sec: sec,
  };
};

export const totaltimeshift = (date) => {
  //CALCULATE TOTAL TIME FOR EACH ROW
  let h = 0;
  let min = 0;
  let sec = 0;

  let start = new Date(date.timeInterval.start);
  let end = new Date(date.timeInterval.end);
  let breaks = calculteBreaks(date.break);

  if (Date.parse(end) > Date.parse(start)) {
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
  }

  return {
    h: h,
    min: min,
    sec: sec,
  };
};

export const totalbreak = (item) => {
  let h = 0;
  let min = 0;
  let sec = 0;

  let start = new Date(item.start);
  let end = new Date(item.end);

  if (Date.parse(end) > Date.parse(start)) {
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
  }

  return {
    h: h,
    min: min,
    sec: sec,
  };
};
