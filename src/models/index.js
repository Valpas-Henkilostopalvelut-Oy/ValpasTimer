// @ts-check
import { initSchema } from '@aws-amplify/datastore';
import { schema } from './schema';



const { TimeEntry, AllWorkSpaces, UserCredentials, OnBoardingForm, Profile, UserSettings, LastWorkspace, CostRate, UserMemberships, HourlyRate, TimeInterval, WorkspaceSettings, Membership, FormItem } = initSchema(schema);

export {
  TimeEntry,
  AllWorkSpaces,
  UserCredentials,
  OnBoardingForm,
  Profile,
  UserSettings,
  LastWorkspace,
  CostRate,
  UserMemberships,
  HourlyRate,
  TimeInterval,
  WorkspaceSettings,
  Membership,
  FormItem
};