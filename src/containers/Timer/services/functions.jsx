import { DataStore } from "aws-amplify";
import { TimeEntry } from "../../../models/index.js";

export function maxText(text, count) {
  return text.slice(0, count) + (text.length > count ? "..." : "");
}

export const isSent = (data) => {
  const items = data.arr.length;
  const sent = data.arr.filter((item) => item.isSent === true).length;

  return sent === items;
};

export const sendweek = async (arr) => {
  for (let i = 0; i < arr.length; i++) {
    const work = arr[i].arr;

    for (let ii = 0; ii < work.length; ii++) {
      const items = work[ii].arr;

      for (let iii = 0; iii < items.length; iii++) {
        const element = items[iii];
        await DataStore.save(
          TimeEntry.copyOf(element, (updated) => {
            updated.isSent = true;
          })
        );
      }
    }
  }
};

export const weekissent = (arr) => {
  for (let i = 0; i < arr.length; i++) {
    const work = arr[i].arr;

    for (let ii = 0; ii < work.length; ii++) {
      const items = work[ii].arr;

      for (let iii = 0; iii < items.length; iii++) {
        const element = items[iii];
        if (element.isSent) return true;
      }
    }
  }

  return false;
};

export const weekisconformed = (arr) => {
  for (let i = 0; i < arr.length; i++) {
    const work = arr[i].arr;

    for (let ii = 0; ii < work.length; ii++) {
      const items = work[ii].arr;

      for (let iii = 0; iii < items.length; iii++) {
        const element = items[iii];
        if (element.isConfirmed) return true;
      }
    }
  }

  return false;
};
