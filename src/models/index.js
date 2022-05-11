// @ts-check
import { initSchema } from '@aws-amplify/datastore';
import { schema } from './schema';

const Status = {
  "COMPLETE": "COMPLETE",
  "ACTIVE": "ACTIVE",
  "INWAITTING": "INWAITTING"
};

const { Tasks, TimeEntry, AllWorkSpaces, UserCredentials, Comment, User, Workplace, TimeInterval, Profile, UserSettings, CostRate, UserMemberships, HourlyRate, WorkspaceSettings, Membership, FormItem } = initSchema(schema);

export {
  Tasks,
  TimeEntry,
  AllWorkSpaces,
  UserCredentials,
  Status,
  Comment,
  User,
  Workplace,
  TimeInterval,
  Profile,
  UserSettings,
  CostRate,
  UserMemberships,
  HourlyRate,
  WorkspaceSettings,
  Membership,
  FormItem
};