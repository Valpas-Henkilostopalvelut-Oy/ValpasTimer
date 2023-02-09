// @ts-check
import { initSchema } from '@aws-amplify/datastore';
import { schema } from './schema';

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

const Classification = {
  "ADMINISTRATIVESERVICE": "ADMINISTRATIVESERVICE",
  "ITDEVICEANDSOFTWAREEXPENSES": "ITDEVICEANDSOFTWAREEXPENSES",
  "MARKETINGEXPENSES": "MARKETINGEXPENSES",
  "MEETINGEXPENSES": "MEETINGEXPENSES",
  "PREMISESEXPENSES": "PREMISESEXPENSES",
  "TRAVELEXPENSES": "TRAVELEXPENSES",
  "VEHICLEEXPENSES": "VEHICLEEXPENSES"
};

const UserAgreementStatus = {
  "ACTIVE": "ACTIVE",
  "DISABLED": "DISABLED",
  "DELETED": "DELETED"
};

const PaymentMethod = {
  "CASH": "CASH",
  "OWNCARD": "OWNCARD",
  "COMPANYCARD": "COMPANYCARD",
  "BANKTRANSFER": "BANKTRANSFER",
  "OTHER": "OTHER"
};

const Currency = {
  "EUR": "EUR",
  "USD": "USD",
  "GBP": "GBP",
  "CHF": "CHF",
  "SEK": "SEK",
  "NOK": "NOK"
};

const { Worktravel, Receipt, Agreement, Tasks, TimeEntry, AllWorkSpaces, UserCredentials, UserAgreement, User, AditionalInfo, Comment, Workplace, Profile, UserSettings, CostRate, UserMemberships, HourlyRate, TimeInterval, Break, WorkspaceSettings, Membership, Work, WorkCard, OwnCar, RoutePoints } = initSchema(schema);

export {
  Worktravel,
  Receipt,
  Agreement,
  Tasks,
  TimeEntry,
  AllWorkSpaces,
  UserCredentials,
  Status,
  Breakreason,
  Cardtype,
  Drivingtype,
  Classification,
  UserAgreementStatus,
  PaymentMethod,
  Currency,
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
  WorkCard,
  OwnCar,
  RoutePoints
};