
export const timeMaker = (event, props) => {
  const arr = event.target.value.split("").filter((t) => t !== ":");
  const { setValue, time, updateValue } = props;

  if (arr.length === 1) {
    let h = String(arr[0]);
    let min = "00";

    updateValue({ h: Number(h), m: Number(min) },props);

    setValue(`${String("0" + h).slice(-2)}:${String("0" + min).slice(-2)}`);
  } else if (arr.length === 2) {
    let h = String(arr[0] + arr[1]);
    let min = "00";

    updateValue({ h: Number(h), m: Number(min) }, props);

    setValue(`${String("0" + h).slice(-2)}:${String("0" + min).slice(-2)}`);
  } else if (arr.length === 3) {
    let h = String(arr[0]);
    let min = String(arr[1] + arr[2]);

    if (Number(min) > 60) {
      Number(h++);
      min = Number(min - 60);
    }

    updateValue({ h: Number(h), m: Number(min) }, props);

    setValue(`${String("0" + h).slice(-2)}:${String("0" + min).slice(-2)}`);
  } else if (arr.length === 4) {
    let h = String(arr[0] + arr[1]);
    let min = String(arr[2] + arr[3]);

    if (Number(min) > 60) {
      Number(h++);
      min = Number(min - 60);
    }

    updateValue({ h: Number(h), m: Number(min) }, props);

    setValue(`${String("0" + h).slice(-2)}:${String("0" + min).slice(-2)}`);
  } else {
    let d = new Date(time);
    setValue(
      `${String("0" + d.getHours()).slice(-2)}:${String(
        "0" + d.getMinutes()
      ).slice(-2)}`
    );
  }
};


