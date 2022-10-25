export const totaldaytime = (day) => {
  //CALCULATE TOTAL TIME FOR EACH DAY

  let date = { h: 0, min: 0 };
  for (let i = 0; i < day.arr.length; i++) {
    const timeL = day.arr[i];
    let start = new Date(timeL.timeInterval.start).setMilliseconds(0);
    let end = new Date(timeL.timeInterval.end).setMilliseconds(0);

    let total = new Date(Math.abs(end - start));

    date = {
      h: date.h + total.getUTCHours(),
      min: date.min + total.getUTCMinutes(),
    };

    if (date.min > 60) {
      date.h += Math.floor(date.min / 60);
      date.min = date.min % 60;
    }
  }
  return date;
};

export const totalweektime = (array) => {
    //CALCULATE TOTAL TIME FOR EACH WEEK
    let date = { h: 0, min: 0 };
    for (let i = 0; i < array.arr.length; i++) {
      let arr = array.arr[i];
      for (let ii = 0; ii < arr.arr.length; ii++) {
        const timeL = arr.arr[ii];
        let start = new Date(timeL.timeInterval.start).setMilliseconds(0);
        let end = new Date(timeL.timeInterval.end).setMilliseconds(0);
        let total = new Date(Math.abs(end - start));
        date = {
          h: date.h + total.getUTCHours(),
          min: date.min + total.getUTCMinutes(),
        };
        if (date.min > 60) {
          date.h += Math.floor(date.min / 60);
          date.min = date.min % 60;
        }
      }
    }
    return date;
  };
