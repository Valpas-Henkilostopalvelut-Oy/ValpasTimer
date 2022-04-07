export const timeMaker = (event, time) => {
  const arr = event.target.value.split("").filter((t) => t !== ":");

  if (arr.length === 1) {
    let h = String(arr[0]);
    let min = 0;

    return { h: Number(h), m: Number(min) };
  } else if (arr.length === 2) {
    let h = String(arr[0] + arr[1]);
    let min = 0;

    return { h: Number(h), m: Number(min) };
  } else if (arr.length === 3) {
    let h = String(arr[0]);
    let min = String(arr[1] + arr[2]);

    if (Number(min) > 60) {
      Number(h++);
      min = Number(min - 60);
    }

    return { h: Number(h), m: Number(min) };
  } else if (arr.length === 4) {
    let h = String(arr[0] + arr[1]);
    let min = String(arr[2] + arr[3]);

    if (Number(min) > 60) {
      Number(h++);
      min = Number(min - 60);
    }

    return { h: Number(h), m: Number(min) };
  } else {
    let d = new Date(time);

    return { h: Number(d.getHours()), m: Number(d.getMinutes()) };
  }
};
