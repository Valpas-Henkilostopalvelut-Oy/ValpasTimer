export function groupBy(array) {
  //group by work name in work array and push in array
  let sorted = array
    .sort((date1, date2) => {
      let d1 = new Date(date2.timeInterval.start);
      let d2 = new Date(date1.timeInterval.start);
      return d1 - d2;
    })

    .reduce((res, val) => {
      const d = new Date(val.timeInterval.start);
      const date = new Date(val.timeInterval.start).toDateString();
      const weekn = getWeekNumber(d);

      var startOfWeek = getDateOfISOWeek(weekn, d.getFullYear());
      var endOfWeek = getEndOfISOWeek(startOfWeek);

      let week = res.find((w) => w.week === weekn);
      if (!week) {
        // create new week object if it does not exist
        week = {
          week: weekn,
          period: `${startOfWeek.getDate()}.${startOfWeek.getMonth() + 1} - ${endOfWeek.getDate()}.${
            endOfWeek.getMonth() + 1
          }.${endOfWeek.getFullYear()}`,
          arr: [],
        };
        res.push(week);
      }

      // check if day already exists in the week
      let day = week.arr.find((d) => d.day === date);
      if (!day) {
        // create new day object if it does not exist
        day = {
          day: date,
          date: `${days[d.getUTCDay()]} ${d.getUTCDate()}.${d.getMonth() + 1}`,
          arr: [],
        };
        week.arr.push(day);
      }

      // push the timeshift object into the day array
      day.arr.push({
        id: val.id,
        timeshift: val,
      });

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

function getWeekNumber(d) {
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

const days = ["Su", "Ma", "Ti", "Ke", "To", "Pe", "La"];
