import { ModelInit, MutableModel, PersistentModelConstructor } from "@aws-amplify/datastore";



export declare class UserSettings {
  readonly timeFormat?: string;
  readonly timeZone?: string;
  readonly dateFormat?: string;
  constructor(init: ModelInit<UserSettings>);
}

export declare class CostRate {
  readonly amount?: number;
  readonly currency?: string;
  constructor(init: ModelInit<CostRate>);
}

export declare class UserMemberships {
  readonly hourlyRate?: HourlyRate;
  readonly costRate?: CostRate;
  readonly membershipStatus?: string;
  readonly membershipType?: string;
  readonly userId?: string;
  constructor(init: ModelInit<UserMemberships>);
}

export declare class HourlyRate {
  readonly amount?: string;
  readonly currency?: number;
  constructor(init: ModelInit<HourlyRate>);
}

export declare class TimeInterval {
  readonly duration?: string;
  readonly end?: string;
  readonly start?: string;
  constructor(init: ModelInit<TimeInterval>);
}

export declare class WorkspaceSettings {
  readonly shortBreak?: number;
  readonly dinnerBreak?: number;
  constructor(init: ModelInit<WorkspaceSettings>);
}

export declare class Membership {
  readonly NewField?: string;
  readonly hourlyRate?: HourlyRate;
  readonly membershipType?: string;
  readonly membershipStatus?: string;
  readonly userId?: string;
  constructor(init: ModelInit<Membership>);
}

export declare class FormItem {
  readonly name?: string;
  readonly text?: string;
  constructor(init: ModelInit<FormItem>);
}

type TimeEntryMetaData = {
  readOnlyFields: 'createdAt' | 'updatedAt';
}

type AllWorkSpacesMetaData = {
  readOnlyFields: 'createdAt' | 'updatedAt';
}

type UserCredentialsMetaData = {
  readOnlyFields: 'createdAt' | 'updatedAt';
}

type OnBoardingFormMetaData = {
  readOnlyFields: 'createdAt' | 'updatedAt';
}

export declare class TimeEntry {
  readonly id: string;
  readonly billable?: boolean;
  readonly description?: string;
  readonly userId?: string;
  readonly workspaceId?: string;
  readonly timeInterval?: TimeInterval;
  readonly isActive?: boolean;
  readonly createdAt?: string;
  readonly updatedAt?: string;
  constructor(init: ModelInit<TimeEntry, TimeEntryMetaData>);
  static copyOf(source: TimeEntry, mutator: (draft: MutableModel<TimeEntry, TimeEntryMetaData>) => MutableModel<TimeEntry, TimeEntryMetaData> | void): TimeEntry;
}

export declare class AllWorkSpaces {
  readonly id: string;
  readonly hourlyRate?: HourlyRate;
  readonly imageUrl?: string;
  readonly memberships?: (Membership | null)[];
  readonly name?: string;
  readonly workspaceSettings?: WorkspaceSettings;
  readonly createdAt?: string;
  readonly updatedAt?: string;
  constructor(init: ModelInit<AllWorkSpaces, AllWorkSpacesMetaData>);
  static copyOf(source: AllWorkSpaces, mutator: (draft: MutableModel<AllWorkSpaces, AllWorkSpacesMetaData>) => MutableModel<AllWorkSpaces, AllWorkSpacesMetaData> | void): AllWorkSpaces;
}

export declare class UserCredentials {
  readonly id: string;
  readonly username?: string;
  readonly formChecked?: (string | null)[];
  readonly email?: string;
  readonly memberships?: (UserMemberships | null)[];
  readonly name?: string;
  readonly activeTimeEntry?: string;
  readonly profilePicture?: string;
  readonly settings?: UserSettings;
  readonly status?: string;
  readonly defaultWorkspace?: string;
  readonly createdAt?: string;
  readonly updatedAt?: string;
  constructor(init: ModelInit<UserCredentials, UserCredentialsMetaData>);
  static copyOf(source: UserCredentials, mutator: (draft: MutableModel<UserCredentials, UserCredentialsMetaData>) => MutableModel<UserCredentials, UserCredentialsMetaData> | void): UserCredentials;
}

export declare class OnBoardingForm {
  readonly id: string;
  readonly title?: string;
  readonly data?: (FormItem | null)[];
  readonly createdAt?: string;
  readonly updatedAt?: string;
  constructor(init: ModelInit<OnBoardingForm, OnBoardingFormMetaData>);
  static copyOf(source: OnBoardingForm, mutator: (draft: MutableModel<OnBoardingForm, OnBoardingFormMetaData>) => MutableModel<OnBoardingForm, OnBoardingFormMetaData> | void): OnBoardingForm;
}