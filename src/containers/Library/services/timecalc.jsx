export const timeshifttotal = (data) => {
  let h = 0;
  let m = 0;
  let s = 0;

  const item = data.timeshift;
  const breaks = calculteBreaks(item.break);
  const start = new Date(item.timeInterval.start);
  const end = new Date(item.timeInterval.end);

  if (Date.parse(end) > Date.parse(start)) {
    const total = Date.parse(end) - Date.parse(start) - breaks;

    h = h + Math.floor(total / 1000 / 60 / 60);
    m = m + Math.floor((total / 1000 / 60) % 60);
    s = s + Math.floor((total / 1000) % 60);

    if (m >= 60) {
      h++;
      m = m % 60;
    }
    if (s >= 60) {
      m++;
      s = s % 60;
    }
  }

  return {
    hours: h,
    minutes: m,
    seconds: s,
  };
};

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

export const totalworkplacetime = (data, allweeks = true) => {
  let h = 0;
  let m = 0;
  let s = 0;

  for (let i = 0; i < data.length; i++) {
    const element1 = data[i].arr;
    for (let ii = 0; ii < element1.length; ii++) {
      const element2 = element1[ii].arr;
      for (let iii = 0; iii < element2.length; iii++) {
        const element3 = element2[iii].arr;
        for (let iiii = 0; iiii < element3.length; iiii++) {
          const item = element3[iiii].timeshift;
          const breaks = calculteBreaks(item.break);
          const start = new Date(item.timeInterval.start);
          const end = new Date(item.timeInterval.end);

          if (Date.parse(end) > Date.parse(start)) {
            const total = Date.parse(end) - Date.parse(start) - breaks;

            h = h + Math.floor(total / 1000 / 60 / 60);
            m = m + Math.floor((total / 1000 / 60) % 60);
            s = s + Math.floor((total / 1000) % 60);

            if (m >= 60) {
              h++;
              m = m % 60;
            }
            if (s >= 60) {
              m++;
              s = s % 60;
            }
          }
        }
      }
    }
  }

  return {
    hours: h,
    minutes: m,
    seconds: s,
  };
};

export const weektotal = (data) => {
  let h = 0;
  let m = 0;
  let s = 0;

  for (let i = 0; i < data.length; i++) {
    const element1 = data[i].arr;
    for (let ii = 0; ii < element1.length; ii++) {
      const item = element1[ii].timeshift;
      const breaks = calculteBreaks(item.break);
      const start = new Date(item.timeInterval.start);
      const end = new Date(item.timeInterval.end);

      if (Date.parse(end) > Date.parse(start)) {
        const total = Date.parse(end) - Date.parse(start) - breaks;

        h = h + Math.floor(total / 1000 / 60 / 60);
        m = m + Math.floor((total / 1000 / 60) % 60);
        s = s + Math.floor((total / 1000) % 60);

        if (m >= 60) {
          h++;
          m = m % 60;
        }
        if (s >= 60) {
          m++;
          s = s % 60;
        }
      }
    }
  }

  return {
    hours: h,
    minutes: m,
    seconds: s,
  };
};

export const daytotal = (data) => {
  let h = 0;
  let m = 0;
  let s = 0;

  for (let i = 0; i < data.length; i++) {
    const item = data[i].timeshift;
    const breaks = calculteBreaks(item.break);
    const start = new Date(item.timeInterval.start);
    const end = new Date(item.timeInterval.end);

    if (Date.parse(end) > Date.parse(start)) {
      const total = Date.parse(end) - Date.parse(start) - breaks;

      h = h + Math.floor(total / 1000 / 60 / 60);
      m = m + Math.floor((total / 1000 / 60) % 60);
      s = s + Math.floor((total / 1000) % 60);

      if (m >= 60) {
        h++;
        m = m % 60;
      }
      if (s >= 60) {
        m++;
        s = s % 60;
      }
    }
  }

  return {
    hours: h,
    minutes: m,
    seconds: s,
  };
};
