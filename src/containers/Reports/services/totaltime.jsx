export const totaldaytime = (day) => {
  //CALCULATE TOTAL TIME FOR EACH DAY

  let date = { h: 0, min: 0, sec: 0 };
  for (let i = 0; i < day.arr.length; i++) {
    const timeL = day.arr[i];
    let start = new Date(timeL.timeInterval.start);
    let end = new Date(timeL.timeInterval.end);

    let total = Date.parse(end) - Date.parse(start);

    date = {
      h: date.h + Math.floor(total / (1000 * 60 * 60)),
      min: date.min + Math.floor((total / (1000 * 60)) % 60),
      sec: date.sec + Math.floor((total / 1000) % 60),
    };
  }

  return date;
};

export const totalweektime = (array) => {
  //CALCULATE TOTAL TIME FOR EACH WEEK
  let date = { h: 0, min: 0, sec: 0 };
  for (let i = 0; i < array.arr.length; i++) {
    let arr = array.arr[i];
    for (let ii = 0; ii < arr.arr.length; ii++) {
      const timeL = arr.arr[ii];
      const breaks = timeL.breaks;
      const breaksL = 0;

      if (breaks) {
        breaks.forEach((element) => {
          let bstart = new Date(element.start);
          let bend = new Date(element.end);

          let btotal = Date.parse(bend) - Date.parse(bstart);

          breaksL += btotal;
        });
      }

      let start = new Date(timeL.timeInterval.start);
      let end = new Date(timeL.timeInterval.end);

      let total = Date.parse(end) - Date.parse(start) - breaksL;

      date = {
        h: date.h + Math.floor(total / (1000 * 60 * 60)),
        min: date.min + Math.floor((total / (1000 * 60)) % 60),
        sec: date.sec + Math.floor((total / 1000) % 60),
      };
    }
  }
  return date;
};
