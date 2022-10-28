import React, { useEffect, useState, Fragment } from "react";
import { Auth, DataStore } from "aws-amplify";
import { UserCredentials, TimeEntry, Break, AllWorkSpaces } from "../../../../models";

import { TextToTime } from "../../../../services/time.jsx";
