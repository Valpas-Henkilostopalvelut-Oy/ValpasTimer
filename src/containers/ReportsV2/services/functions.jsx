import { DataStore } from "aws-amplify";
import { TimeEntry } from "../../../models/index.js";

export const confirmweek = (arr) => {
  arr = arr.arr;
  arr.forEach((arr) => {
    arr = arr.arr;
    arr.forEach(async (item) => {
      await DataStore.query(TimeEntry, item.id).then((item) => {
        DataStore.save(
          TimeEntry.copyOf(item, (update) => {
            update.isConfirmed = true;
          })
        );
      });
    });
  });
};

export const confirmday = (arr) => {
  arr = arr.arr;
  arr.forEach(async (item) => {
    await DataStore.query(TimeEntry, item.id).then((item) => {
      DataStore.save(
        TimeEntry.copyOf(item, (update) => {
          update.isConfirmed = true;
        })
      );
    });
  });
};

export const confirmtimeshift = async (item) => {
  await DataStore.query(TimeEntry, item.id).then((item) => {
    DataStore.save(
      TimeEntry.copyOf(item, (update) => {
        update.isConfirmed = true;
      })
    );
  });
};

export const unconfirmday = (arr) => {
  arr = arr.arr;
  arr.forEach(async (item) => {
    await DataStore.query(TimeEntry, item.id).then((item) => {
      DataStore.save(
        TimeEntry.copyOf(item, (update) => {
          update.isConfirmed = false;
        })
      );
    });
  });
};

export const unconfirmtimeshift = async (item) => {
  await DataStore.query(TimeEntry, item.id).then((item) => {
    DataStore.save(
      TimeEntry.copyOf(item, (update) => {
        update.isConfirmed = false;
      })
    );
  });
};
