// @ts-check
import { initSchema } from '@aws-amplify/datastore';
import { schema } from './schema';

const Break = {
  "MIN15": "MIN15",
  "MIN30": "MIN30",
  "MIN45": "MIN45",
  "H1": "H1"
};

const Status = {
  "COMPLETE": "COMPLETE",
  "ACTIVE": "ACTIVE",
  "INWAITTING": "INWAITTING"
};

const { Agreement, Tasks, TimeEntry, AllWorkSpaces, UserCredentials, Breaks, UserAgreement, User, AditionalInfo, Comment, Workplace, TimeInterval, Profile, UserSettings, CostRate, UserMemberships, HourlyRate, WorkspaceSettings, Membership, FormItem } = initSchema(schema);

export {
  Agreement,
  Tasks,
  TimeEntry,
  AllWorkSpaces,
  UserCredentials,
  Break,
  Status,
  Breaks,
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