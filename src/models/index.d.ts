import { ModelInit, MutableModel, PersistentModelConstructor } from "@aws-amplify/datastore";

export enum Status {
  COMPLETE = "COMPLETE",
  ACTIVE = "ACTIVE",
  INWAITTING = "INWAITTING"
}

export declare class Comment {
  readonly user?: User | null;
  readonly title?: string | null;
  readonly comment?: string | null;
  constructor(init: ModelInit<Comment>);
}

export declare class User {
  readonly userId?: string | null;
  readonly name?: string | null;
  readonly family_name?: string | null;
  readonly icon?: string | null;
  constructor(init: ModelInit<User>);
}

export declare class Workplace {
  readonly workId?: string | null;
  readonly name?: string | null;
  constructor(init: ModelInit<Workplace>);
}

export declare class TimeInterval {
  readonly duration?: string | null;
  readonly end?: string | null;
  readonly start?: string | null;
  constructor(init: ModelInit<TimeInterval>);
}

export declare class Profile {
  readonly profile_picture?: string | null;
  readonly first_name?: string | null;
  readonly last_name?: string | null;
  readonly email?: string | null;
  constructor(init: ModelInit<Profile>);
}

export declare class UserSettings {
  readonly timeFormat?: string | null;
  readonly timeZone?: string | null;
  readonly dateFormat?: string | null;
  readonly modalSendConfirm?: boolean | null;
  readonly modalConfirmConfirm?: boolean | null;
  constructor(init: ModelInit<UserSettings>);
}

export declare class CostRate {
  readonly amount?: number | null;
  readonly currency?: string | null;
  constructor(init: ModelInit<CostRate>);
}

export declare class UserMemberships {
  readonly hourlyRate?: HourlyRate | null;
  readonly costRate?: CostRate | null;
  readonly membershipStatus?: string | null;
  readonly membershipType?: string | null;
  readonly userId?: string | null;
  readonly targetId?: string | null;
  constructor(init: ModelInit<UserMemberships>);
}

export declare class HourlyRate {
  readonly amount?: number | null;
  readonly currency?: string | null;
  constructor(init: ModelInit<HourlyRate>);
}

export declare class WorkspaceSettings {
  readonly shortBreak?: number | null;
  readonly dinnerBreak?: number | null;
  constructor(init: ModelInit<WorkspaceSettings>);
}

export declare class Membership {
  readonly hourlyRate?: HourlyRate | null;
  readonly membershipType?: string | null;
  readonly membershipStatus?: string | null;
  readonly userId?: string | null;
  readonly targetId?: string | null;
  constructor(init: ModelInit<Membership>);
}

export declare class FormItem {
  readonly name?: string | null;
  readonly text?: string | null;
  constructor(init: ModelInit<FormItem>);
}

type TasksMetaData = {
  readOnlyFields: 'createdAt' | 'updatedAt';
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

export declare class Tasks {
  readonly id: string;
  readonly title?: string | null;
  readonly description?: string | null;
  readonly username?: string | null;
  readonly user?: User | null;
  readonly time?: string | null;
  readonly status?: Status | keyof typeof Status | null;
  readonly workplace?: Workplace | null;
  readonly interval?: TimeInterval | null;
  readonly comments?: (Comment | null)[] | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
  constructor(init: ModelInit<Tasks, TasksMetaData>);
  static copyOf(source: Tasks, mutator: (draft: MutableModel<Tasks, TasksMetaData>) => MutableModel<Tasks, TasksMetaData> | void): Tasks;
}

export declare class TimeEntry {
  readonly id: string;
  readonly description?: string | null;
  readonly userId?: string | null;
  readonly workspaceId?: string | null;
  readonly timeInterval?: TimeInterval | null;
  readonly isActive?: boolean | null;
  readonly isLocked?: boolean | null;
  readonly isSent?: boolean | null;
  readonly isConfirmed?: boolean | null;
  readonly billable?: boolean | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
  constructor(init: ModelInit<TimeEntry, TimeEntryMetaData>);
  static copyOf(source: TimeEntry, mutator: (draft: MutableModel<TimeEntry, TimeEntryMetaData>) => MutableModel<TimeEntry, TimeEntryMetaData> | void): TimeEntry;
}

export declare class AllWorkSpaces {
  readonly id: string;
  readonly hourlyRate?: HourlyRate | null;
  readonly imageUrl?: string | null;
  readonly memberships?: (Membership | null)[] | null;
  readonly name?: string | null;
  readonly workspaceSettings?: WorkspaceSettings | null;
  readonly clientId?: (string | null)[] | null;
  readonly adminId?: (string | null)[] | null;
  readonly managerId?: (string | null)[] | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
  constructor(init: ModelInit<AllWorkSpaces, AllWorkSpacesMetaData>);
  static copyOf(source: AllWorkSpaces, mutator: (draft: MutableModel<AllWorkSpaces, AllWorkSpacesMetaData>) => MutableModel<AllWorkSpaces, AllWorkSpacesMetaData> | void): AllWorkSpaces;
}

export declare class UserCredentials {
  readonly id: string;
  readonly userId: string;
  readonly activeTimeEntry?: string | null;
  readonly status?: string | null;
  readonly defaultWorkspace?: string | null;
  readonly memberships?: (UserMemberships | null)[] | null;
  readonly profile?: Profile | null;
  readonly formChecked?: (string | null)[] | null;
  readonly settings?: UserSettings | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
  constructor(init: ModelInit<UserCredentials, UserCredentialsMetaData>);
  static copyOf(source: UserCredentials, mutator: (draft: MutableModel<UserCredentials, UserCredentialsMetaData>) => MutableModel<UserCredentials, UserCredentialsMetaData> | void): UserCredentials;
}