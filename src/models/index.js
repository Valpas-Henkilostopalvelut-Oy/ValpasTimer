// @ts-check
import { initSchema } from '@aws-amplify/datastore';
import { schema } from './schema.js';

const Status = {
  "COMPLETE": "COMPLETE",
  "ACTIVE": "ACTIVE",
  "INWAITTING": "INWAITTING"
};

const Breakreason = {
  "LUNCH": "LUNCH",
  "DINNER": "DINNER",
  "SHORT": "SHORT",
  "LONG": "LONG",
  "GOING": "GOING"
};

const { Agreement, Tasks, TimeEntry, AllWorkSpaces, UserCredentials, UserAgreement, User, AditionalInfo, Comment, Workplace, Profile, UserSettings, CostRate, UserMemberships, HourlyRate, TimeInterval, Break, WorkspaceSettings, Membership, Work } = initSchema(schema);

export {
  Agreement,
  Tasks,
  TimeEntry,
  AllWorkSpaces,
  UserCredentials,
  Status,
  Breakreason,
  UserAgreement,
  User,
  AditionalInfo,
  Comment,
  Workplace,
  Profile,
  UserSettings,
  CostRate,
  UserMemberships,
  HourlyRate,
  TimeInterval,
  Break,
  WorkspaceSettings,
  Membership,
  Work
};