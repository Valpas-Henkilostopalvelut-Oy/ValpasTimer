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
  "LUNCH_L": "LUNCH_L",
  "SHORT": "SHORT",
  "LONG": "LONG",
  "GOING": "GOING",
  "ACCIDENT": "ACCIDENT"
};

const Cardtype = {
  "ID": "ID",
  "PASSPORT": "PASSPORT",
  "DRIVING": "DRIVING",
  "HYGIENEPASS": "HYGIENEPASS",
  "WORKSAFETYPASS": "WORKSAFETYPASS",
  "FIREWORKCARD": "FIREWORKCARD",
  "ELECTRICALSAFETYPASS": "ELECTRICALSAFETYPASS",
  "VISA": "VISA",
  "OTHER": "OTHER"
};

const Drivingtype = {
  "A": "A",
  "A1": "A1",
  "A2": "A2",
  "B": "B",
  "B1": "B1",
  "C": "C",
  "C1": "C1",
  "CE": "CE",
  "D": "D",
  "D1": "D1"
};

const UserAgreementStatus = {
  "ACTIVE": "ACTIVE",
  "DISABLED": "DISABLED",
  "DELETED": "DELETED"
};

const { Agreement, Tasks, TimeEntry, AllWorkSpaces, UserCredentials, UserAgreement, User, AditionalInfo, Comment, Workplace, Profile, UserSettings, CostRate, UserMemberships, HourlyRate, TimeInterval, Break, WorkspaceSettings, Membership, Work, WorkCard } = initSchema(schema);

export {
  Agreement,
  Tasks,
  TimeEntry,
  AllWorkSpaces,
  UserCredentials,
  Status,
  Breakreason,
  Cardtype,
  Drivingtype,
  UserAgreementStatus,
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
  Work,
  WorkCard
};