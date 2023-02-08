export const sortData = (data, paid, start, end, all, workerId, workId) => {
  /*
    isSent = true, isConfirmed = true, isActive = false, isLocked = false
  */

  const isSent = true;
  const isConfirmed = true;
  const isActive = false;
  const isLocked = !!paid;

  let sorted = data
    .filter(
      (a) =>
        a.isSent === isSent &&
        a.isConfirmed === isConfirmed &&
        a.isActive === isActive &&
        a.isLocked === isLocked &&
        (workerId !== "" ? a.userId === workerId : true) &&
        (workId !== "" ? a.workspaceId === workId : true)
    )
    .sort((a, b) => {
      let d1 = new Date(a.timeInterval.start);
      let d2 = new Date(b.timeInterval.start);
      return d2 - d1;
    })
    .filter((item) => {
      if (all) return true;
      const date = new Date(item.timeInterval.start);
      return date >= start && date <= end;
    })
    .reduce((res, val) => {
      const d = new Date(val.timeInterval.start);
      const date = new Date(val.timeInterval.start).toDateString();
      const weekn = getWeekNumber(d);

      // check if workspaceId already exists in the result
      let workspace = res.find((w) => w.workspaceId === val.workspaceId);
      if (!workspace) {
        // create new workspace object if it does not exist
        workspace = {
          workspaceId: val.workspaceId,
          arr: [],
        };
        res.push(workspace);
      }

      // check if userId already exists in the workspace
      let user = workspace.arr.find((u) => u.userId === val.userId);
      if (!user) {
        // create new user object if it does not exist
        user = {
          userId: val.userId,
          arr: [],
        };
        workspace.arr.push(user);
      }

      // check if week already exists in the user
      let week = user.arr.find((w) => w.week === weekn);
      if (!week) {
        // create new week object if it does not exist
        week = {
          week: weekn,
          arr: [],
        };
        user.arr.push(week);
      }

      // check if day already exists in the week
      let day = week.arr.find((d) => d.day === date);
      if (!day) {
        // create new day object if it does not exist
        day = {
          day: date,
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

  return sorted;
};

function getWeekNumber(d) {
  d = new Date(Date.UTC(d.getFullYear(), d.getMonth(), d.getDate()));
  d.setUTCDate(d.getUTCDate() + 4 - (d.getUTCDay() || 7));
  var yearStart = new Date(Date.UTC(d.getUTCFullYear(), 0, 1));
  var weekNo = Math.ceil(((d - yearStart) / 86400000 + 1) / 7);
  return weekNo;
}
