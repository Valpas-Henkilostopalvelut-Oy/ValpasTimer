export function groupBy(array) {
  //group by work name in work array and push in array
  return array
    .sort((date1, date2) => {
      let d1 = new Date(date2.timeInterval.start);
      let d2 = new Date(date1.timeInterval.start);
      return d1 - d2;
    })

    .reduce((res, val) => {
      const dat = new Date(val.timeInterval.start);
      const by = dat.toDateString();

      const week = getWeekNumber(dat);

      if (res.filter((w) => w.week === week).length === 0) {
        res.push({ week: week, arr: [{ date: by, arr: [val] }] });
      } else if (res.find((w) => w.week === week).arr.filter((f) => f.date === by).length === 0) {
        res.find((w) => w.week === week).arr.push({ date: by, arr: [val] });
      } else {
        res
          .find((w) => w.week === week)
          .arr.find((d) => d.date === by)
          .arr.push(val);
      }

      return res;
    }, []);

  function getWeekNumber(d) {
    d = new Date(Date.UTC(d.getFullYear(), d.getMonth(), d.getDate()));
    d.setUTCDate(d.getUTCDate() + 4 - (d.getUTCDay() || 7));
    var yearStart = new Date(Date.UTC(d.getUTCFullYear(), 0, 1));
    var weekNo = Math.ceil(((d - yearStart) / 86400000 + 1) / 7);
    return weekNo;
  }
}
