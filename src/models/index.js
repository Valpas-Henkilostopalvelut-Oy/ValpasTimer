// @ts-check
import { initSchema } from '@aws-amplify/datastore';
import { schema } from './schema';

const Status = {
  "COMPLETE": "COMPLETE",
  "ACTIVE": "ACTIVE",
  "INWAITTING": "INWAITTING"
};

const { Agreement, Tasks, TimeEntry, AllWorkSpaces, UserCredentials, UserAgreement, User, AditionalInfo, Comment, Workplace, TimeInterval, Profile, UserSettings, CostRate, UserMemberships, HourlyRate, WorkspaceSettings, Membership, FormItem } = initSchema(schema);

export {
  Agreement,
  Tasks,
  TimeEntry,
  AllWorkSpaces,
  UserCredentials,
  Status,
  UserAgreement,
  User,
  AditionalInfo,
  Comment,
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