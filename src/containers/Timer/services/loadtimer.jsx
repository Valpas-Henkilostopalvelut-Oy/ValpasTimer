import { DataStore, Auth } from "aws-amplify";
import { TimeEntry, UserCredentials } from "../../../models/index.js";

export const checkActive = async (setTimer, setTime, setSel, setDescription, setStarted, setIsPaused) => {
  await Auth.currentAuthenticatedUser().then(async (user) => {
    let userId = user.attributes["custom:UserCreditails"];

    await DataStore.query(UserCredentials, userId).then(async (userCred) => {
      await DataStore.query(TimeEntry, userCred.activeTimeEntry)
        .then(async (res) => {
          if (res.isActive) {
            setTimer(res);
            setSel(res.workspaceId);
            setDescription(res.description);
            setIsPaused(res.isPaused);

            var breaks = 0;
            var nTime = new Date();
            var sTime = new Date(res.timeInterval.start);

            if (res.isPaused) {
              nTime = new Date(res.pauseStart);
            }

            if (res.break.length > 0) {
              res.break.forEach((b) => {
                if (b.end !== null) breaks += Date.parse(b.end) - Date.parse(b.start);
              });
            }

            var diff = nTime.getTime() - sTime.getTime() - new Date(breaks).getTime();

            var seconds = Math.floor((diff / 1000) % 60);
            var minutes = Math.floor((diff / (1000 * 60)) % 60);
            var hours = Math.floor((diff / (1000 * 60 * 60)) % 24);

            setStarted(true);
            setTime({
              seconds: seconds,
              minutes: minutes,
              hours: hours,
            });
          } else {
            console.log("q");
            setStarted(false);
            await DataStore.save(
              UserCredentials.copyOf(userCred, (updated) => {
                updated.activeTimeEntry = null;
              })
            ).catch((err) => console.warn(err));
          }
        })
        .catch(async (e) => {
          await DataStore.save(
            UserCredentials.copyOf(userCred, (updated) => {
              updated.activeTimeEntry = null;
            })
          ).catch((err) => console.warn(err));
          console.warn(e);
        });
    });
  });
};

export const advanceTime = (time, setTime) => {
  setTimeout(() => {
    let nSeconds = time.seconds;
    let nMinutes = time.minutes;
    let nHours = time.hours;

    nSeconds++;

    if (nSeconds > 59) {
      nMinutes++;
      nSeconds = 0;
    }
    if (nMinutes > 59) {
      nHours++;
      nMinutes = 0;
    }
    if (nHours > 24) {
      nHours = 0;
    }

    setTime({ seconds: nSeconds, minutes: nMinutes, hours: nHours });
  }, 1000);
};
