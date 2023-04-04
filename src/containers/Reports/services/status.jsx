export const weekstatus = (arr) => {
  arr = arr.arr;
  for (let i = 0; i < arr.length; i++) {
    arr = arr[i].arr;
    for (let j = 0; j < arr.length; j++) {
      let timeshift = arr[j].timeshift;
      return { isConfirmed: timeshift.isConfirmed, isSent: timeshift.isSent };
    }
  }

  return { isConfirmed: false, isSent: true };
};

export const daystatus = (arr) => {
  arr = arr.arr;
  for (let i = 0; i < arr.length; i++) {
    let timeshift = arr[i].timeshift;
    return { isConfirmed: timeshift.isConfirmed, isSent: timeshift.isSent };
  }

  return { isConfirmed: false, isSent: true };
};

export const timeshiftstatus = (item) => {
  let timeshift = item;
  return { isConfirmed: timeshift.isConfirmed, isSent: timeshift.isSent };
};
