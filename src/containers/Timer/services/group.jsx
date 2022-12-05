export function groupBy(array, works = Array(), lang = Object()) {
  //group by work name in work array and push in array
  let sorted = array
    .sort((date1, date2) => {
      let d1 = new Date(date2.timeInterval.start);
      let d2 = new Date(date1.timeInterval.start);
      return d1 - d2;
    })

    .reduce((res, val) => {
      const dat = new Date(val.timeInterval.start);
      const by = dat.toDateString();
      const week = getWeekNumber(dat);

      var startOfWeek = getDateOfISOWeek(week, dat.getFullYear());
      var endOfWeek = getEndOfISOWeek(startOfWeek);

      if (res.filter((w) => w.week === week).length === 0) {
        res.push({
          week: week,
          period: getMonthName(startOfWeek.getMonth(), lang) + " " + startOfWeek.getDate() + " - " + getMonthName(endOfWeek.getMonth(), lang) + " " + endOfWeek.getDate(),
          arr: [{ date: by, arr: [{ workId: val.workspaceId, arr: [val] }] }],
        });
      } else if (res.find((w) => w.week === week).arr.filter((f) => f.date === by).length === 0) {
        res.find((w) => w.week === week).arr.push({ date: by, arr: [{ workId: val.workspaceId, arr: [val] }] });
      } else if (
        res
          .find((w) => w.week === week)
          .arr.find((f) => f.date === by)
          .arr.filter((f) => f.workId === val.workspaceId).length === 0
      ) {
        res
          .find((w) => w.week === week)
          .arr.find((f) => f.date === by)
          .arr.push({ workId: val.workspaceId, arr: [val] });
      } else {
        res
          .find((w) => w.week === week)
          .arr.find((f) => f.date === by)
          .arr.find((f) => f.workId === val.workspaceId)
          .arr.push(val);
      }

      //sort by monday to sunday

      return res;
    }, []);

  sorted.forEach((w) => {
    w.arr.sort((a, b) => {
      let d1 = new Date(a.date);
      let d2 = new Date(b.date);
      return d1 - d2;
    });
  });

  return sorted;
}

export function getWeekNumber(d) {
  d = new Date(Date.UTC(d.getFullYear(), d.getMonth(), d.getDate()));
  d.setUTCDate(d.getUTCDate() + 4 - (d.getUTCDay() || 7));
  var yearStart = new Date(Date.UTC(d.getUTCFullYear(), 0, 1));
  var weekNo = Math.ceil(((d - yearStart) / 86400000 + 1) / 7);
  return weekNo;
}

function getDateOfISOWeek(w, y) {
  var simple = new Date(Date.UTC(y, 0, 1 + (w - 1) * 7));
  var dow = simple.getUTCDay();
  var ISOweekStart = simple;
  if (dow <= 4) ISOweekStart.setUTCDate(simple.getUTCDate() - simple.getUTCDay() + 1);
  else ISOweekStart.setUTCDate(simple.getUTCDate() + 8 - simple.getUTCDay());
  return ISOweekStart;
}

function getEndOfISOWeek(d) {
  var endOfISOWeek = new Date(d.getTime());
  endOfISOWeek.setUTCDate(endOfISOWeek.getUTCDate() + 5); // six days
  endOfISOWeek.setUTCHours(23);
  endOfISOWeek.setUTCMinutes(59);
  endOfISOWeek.setUTCSeconds(59);
  return endOfISOWeek;
}

function getMonthName(month, lang = Object()) {
  const months = lang.months;
  return months[month];
}
