import { DataStore, Auth } from "aws-amplify";
import { TimeEntry } from "../../../models/index.js";

export const confirmweek = (arr) => {
  const time = new Date().toISOString();

  arr = arr.arr;
  arr.forEach((arr) => {
    arr = arr.arr;
    arr.forEach(async (item) => {
      await DataStore.query(TimeEntry, item.id).then((item) => {
        DataStore.save(
          TimeEntry.copyOf(item, (update) => {
            update.isConfirmed = true;
            update.confirmedAt = time;
          })
        );
      });
    });
  });
};

export const confirmday = (arr) => {
  const time = new Date().toISOString();

  arr = arr.arr;
  arr.forEach(async (item) => {
    await DataStore.query(TimeEntry, item.id).then((item) => {
      DataStore.save(
        TimeEntry.copyOf(item, (update) => {
          update.isConfirmed = true;
          update.confirmedAt = time;
        })
      );
    });
  });
};

export const confirmtimeshift = async (item) => {
  const time = new Date().toISOString();

  await DataStore.query(TimeEntry, item.id).then((item) => {
    DataStore.save(
      TimeEntry.copyOf(item, (update) => {
        update.isConfirmed = true;
        update.confirmedAt = time;
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
          update.confirmedAt = null;
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
        update.confirmedAt = null;
      })
    );
  });
};
