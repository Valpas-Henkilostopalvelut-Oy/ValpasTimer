import { ModelInit, MutableModel } from "@aws-amplify/datastore";
// @ts-ignore
import { LazyLoading, LazyLoadingDisabled } from "@aws-amplify/datastore";

export enum Status {
  COMPLETE = "COMPLETE",
  ACTIVE = "ACTIVE",
  INWAITTING = "INWAITTING"
}

export enum Breakreason {
  LUNCH = "LUNCH",
  LUNCH_L = "LUNCH_L",
  SHORT = "SHORT",
  LONG = "LONG",
  GOING = "GOING",
  ACCIDENT = "ACCIDENT"
}

export enum Cardtype {
  ID = "ID",
  PASSPORT = "PASSPORT",
  WORKCARD = "WORKCARD",
  DRIVING = "DRIVING",
  OTHER = "OTHER"
}

export enum Drivingtype {
  A = "A",
  A1 = "A1",
  A2 = "A2",
  B = "B",
  B1 = "B1",
  C = "C",
  C1 = "C1",
  CE = "CE",
  D = "D",
  D1 = "D1"
}

export enum Workcardtype {
  HYGIENEPASS = "HYGIENEPASS",
  WORKSAFETYPASS = "WORKSAFETYPASS",
  FIREWORKCARD = "FIREWORKCARD",
  ELECTRICALSAFETYPASS = "ELECTRICALSAFETYPASS"
}

type EagerUserAgreement = {
  readonly id?: string | null;
  readonly status?: Status | keyof typeof Status | null;
  readonly user?: User | null;
}

type LazyUserAgreement = {
  readonly id?: string | null;
  readonly status?: Status | keyof typeof Status | null;
  readonly user?: User | null;
}

export declare type UserAgreement = LazyLoading extends LazyLoadingDisabled ? EagerUserAgreement : LazyUserAgreement

export declare const UserAgreement: (new (init: ModelInit<UserAgreement>) => UserAgreement)

type EagerUser = {
  readonly userId?: string | null;
  readonly name?: string | null;
  readonly family_name?: string | null;
  readonly icon?: string | null;
}

type LazyUser = {
  readonly userId?: string | null;
  readonly name?: string | null;
  readonly family_name?: string | null;
  readonly icon?: string | null;
}

export declare type User = LazyLoading extends LazyLoadingDisabled ? EagerUser : LazyUser

export declare const User: (new (init: ModelInit<User>) => User)

type EagerAditionalInfo = {
  readonly name?: string | null;
  readonly description?: string | null;
  readonly id?: string | null;
}

type LazyAditionalInfo = {
  readonly name?: string | null;
  readonly description?: string | null;
  readonly id?: string | null;
}

export declare type AditionalInfo = LazyLoading extends LazyLoadingDisabled ? EagerAditionalInfo : LazyAditionalInfo

export declare const AditionalInfo: (new (init: ModelInit<AditionalInfo>) => AditionalInfo)

type EagerComment = {
  readonly user?: UserAgreement | null;
  readonly title?: string | null;
  readonly comment?: string | null;
}

type LazyComment = {
  readonly user?: UserAgreement | null;
  readonly title?: string | null;
  readonly comment?: string | null;
}

export declare type Comment = LazyLoading extends LazyLoadingDisabled ? EagerComment : LazyComment

export declare const Comment: (new (init: ModelInit<Comment>) => Comment)

type EagerWorkplace = {
  readonly workId?: string | null;
  readonly name?: string | null;
}

type LazyWorkplace = {
  readonly workId?: string | null;
  readonly name?: string | null;
}

export declare type Workplace = LazyLoading extends LazyLoadingDisabled ? EagerWorkplace : LazyWorkplace

export declare const Workplace: (new (init: ModelInit<Workplace>) => Workplace)

type EagerProfile = {
  readonly iban?: string | null;
  readonly id_number?: string | null;
  readonly profile_picture?: string | null;
  readonly first_name?: string | null;
  readonly last_name?: string | null;
  readonly email?: string | null;
  readonly email_verified?: boolean | null;
  readonly phone_number?: string | null;
  readonly birthdate?: string | null;
  readonly locale?: string | null;
  readonly nationality?: string | null;
}

type LazyProfile = {
  readonly iban?: string | null;
  readonly id_number?: string | null;
  readonly profile_picture?: string | null;
  readonly first_name?: string | null;
  readonly last_name?: string | null;
  readonly email?: string | null;
  readonly email_verified?: boolean | null;
  readonly phone_number?: string | null;
  readonly birthdate?: string | null;
  readonly locale?: string | null;
  readonly nationality?: string | null;
}

export declare type Profile = LazyLoading extends LazyLoadingDisabled ? EagerProfile : LazyProfile

export declare const Profile: (new (init: ModelInit<Profile>) => Profile)

type EagerUserSettings = {
  readonly timeFormat?: string | null;
  readonly timeZone?: string | null;
  readonly dateFormat?: string | null;
  readonly modalSendConfirm?: boolean | null;
  readonly modalConfirmConfirm?: boolean | null;
}

type LazyUserSettings = {
  readonly timeFormat?: string | null;
  readonly timeZone?: string | null;
  readonly dateFormat?: string | null;
  readonly modalSendConfirm?: boolean | null;
  readonly modalConfirmConfirm?: boolean | null;
}

export declare type UserSettings = LazyLoading extends LazyLoadingDisabled ? EagerUserSettings : LazyUserSettings

export declare const UserSettings: (new (init: ModelInit<UserSettings>) => UserSettings)

type EagerCostRate = {
  readonly amount?: number | null;
  readonly currency?: string | null;
}

type LazyCostRate = {
  readonly amount?: number | null;
  readonly currency?: string | null;
}

export declare type CostRate = LazyLoading extends LazyLoadingDisabled ? EagerCostRate : LazyCostRate

export declare const CostRate: (new (init: ModelInit<CostRate>) => CostRate)

type EagerUserMemberships = {
  readonly hourlyRate?: HourlyRate | null;
  readonly costRate?: CostRate | null;
  readonly membershipStatus?: string | null;
  readonly membershipType?: string | null;
  readonly userId?: string | null;
  readonly targetId?: string | null;
}

type LazyUserMemberships = {
  readonly hourlyRate?: HourlyRate | null;
  readonly costRate?: CostRate | null;
  readonly membershipStatus?: string | null;
  readonly membershipType?: string | null;
  readonly userId?: string | null;
  readonly targetId?: string | null;
}

export declare type UserMemberships = LazyLoading extends LazyLoadingDisabled ? EagerUserMemberships : LazyUserMemberships

export declare const UserMemberships: (new (init: ModelInit<UserMemberships>) => UserMemberships)

type EagerHourlyRate = {
  readonly amount?: number | null;
  readonly currency?: string | null;
}

type LazyHourlyRate = {
  readonly amount?: number | null;
  readonly currency?: string | null;
}

export declare type HourlyRate = LazyLoading extends LazyLoadingDisabled ? EagerHourlyRate : LazyHourlyRate

export declare const HourlyRate: (new (init: ModelInit<HourlyRate>) => HourlyRate)

type EagerTimeInterval = {
  readonly end?: string | null;
  readonly start?: string | null;
}

type LazyTimeInterval = {
  readonly end?: string | null;
  readonly start?: string | null;
}

export declare type TimeInterval = LazyLoading extends LazyLoadingDisabled ? EagerTimeInterval : LazyTimeInterval

export declare const TimeInterval: (new (init: ModelInit<TimeInterval>) => TimeInterval)

type EagerBreak = {
  readonly id?: string | null;
  readonly reason?: Breakreason | keyof typeof Breakreason | null;
  readonly end?: string | null;
  readonly start?: string | null;
}

type LazyBreak = {
  readonly id?: string | null;
  readonly reason?: Breakreason | keyof typeof Breakreason | null;
  readonly end?: string | null;
  readonly start?: string | null;
}

export declare type Break = LazyLoading extends LazyLoadingDisabled ? EagerBreak : LazyBreak

export declare const Break: (new (init: ModelInit<Break>) => Break)

type EagerWorkspaceSettings = {
  readonly shortBreak?: number | null;
  readonly dinnerBreak?: number | null;
}

type LazyWorkspaceSettings = {
  readonly shortBreak?: number | null;
  readonly dinnerBreak?: number | null;
}

export declare type WorkspaceSettings = LazyLoading extends LazyLoadingDisabled ? EagerWorkspaceSettings : LazyWorkspaceSettings

export declare const WorkspaceSettings: (new (init: ModelInit<WorkspaceSettings>) => WorkspaceSettings)

type EagerMembership = {
  readonly hourlyRate?: HourlyRate | null;
  readonly membershipType?: string | null;
  readonly membershipStatus?: string | null;
  readonly userId?: string | null;
  readonly targetId?: string | null;
}

type LazyMembership = {
  readonly hourlyRate?: HourlyRate | null;
  readonly membershipType?: string | null;
  readonly membershipStatus?: string | null;
  readonly userId?: string | null;
  readonly targetId?: string | null;
}

export declare type Membership = LazyLoading extends LazyLoadingDisabled ? EagerMembership : LazyMembership

export declare const Membership: (new (init: ModelInit<Membership>) => Membership)

type EagerWork = {
  readonly name?: string | null;
  readonly description?: string | null;
  readonly id?: string | null;
}

type LazyWork = {
  readonly name?: string | null;
  readonly description?: string | null;
  readonly id?: string | null;
}

export declare type Work = LazyLoading extends LazyLoadingDisabled ? EagerWork : LazyWork

export declare const Work: (new (init: ModelInit<Work>) => Work)

type EagerWorkCard = {
  readonly id?: string | null;
  readonly cardend?: string | null;
  readonly type?: Cardtype | keyof typeof Cardtype | null;
  readonly drivinglicense?: (Drivingtype | null)[] | keyof typeof Drivingtype | null;
  readonly owncar?: boolean | null;
  readonly workcard?: Workcardtype | keyof typeof Workcardtype | null;
  readonly othercard?: string | null;
}

type LazyWorkCard = {
  readonly id?: string | null;
  readonly cardend?: string | null;
  readonly type?: Cardtype | keyof typeof Cardtype | null;
  readonly drivinglicense?: (Drivingtype | null)[] | keyof typeof Drivingtype | null;
  readonly owncar?: boolean | null;
  readonly workcard?: Workcardtype | keyof typeof Workcardtype | null;
  readonly othercard?: string | null;
}

export declare type WorkCard = LazyLoading extends LazyLoadingDisabled ? EagerWorkCard : LazyWorkCard

export declare const WorkCard: (new (init: ModelInit<WorkCard>) => WorkCard)

type AgreementMetaData = {
  readOnlyFields: 'updatedAt';
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

type EagerAgreement = {
  readonly id: string;
  readonly name?: string | null;
  readonly workers?: (string | null)[] | null;
  readonly client?: (string | null)[] | null;
  readonly createdAt?: string | null;
  readonly userId?: string | null;
  readonly user?: User | null;
  readonly aditionalInfo?: (AditionalInfo | null)[] | null;
  readonly userAgreement?: (UserAgreement | null)[] | null;
  readonly workspaceId?: (string | null)[] | null;
  readonly updatedAt?: string | null;
}

type LazyAgreement = {
  readonly id: string;
  readonly name?: string | null;
  readonly workers?: (string | null)[] | null;
  readonly client?: (string | null)[] | null;
  readonly createdAt?: string | null;
  readonly userId?: string | null;
  readonly user?: User | null;
  readonly aditionalInfo?: (AditionalInfo | null)[] | null;
  readonly userAgreement?: (UserAgreement | null)[] | null;
  readonly workspaceId?: (string | null)[] | null;
  readonly updatedAt?: string | null;
}

export declare type Agreement = LazyLoading extends LazyLoadingDisabled ? EagerAgreement : LazyAgreement

export declare const Agreement: (new (init: ModelInit<Agreement, AgreementMetaData>) => Agreement) & {
  copyOf(source: Agreement, mutator: (draft: MutableModel<Agreement, AgreementMetaData>) => MutableModel<Agreement, AgreementMetaData> | void): Agreement;
}

type EagerTasks = {
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
}

type LazyTasks = {
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
}

export declare type Tasks = LazyLoading extends LazyLoadingDisabled ? EagerTasks : LazyTasks

export declare const Tasks: (new (init: ModelInit<Tasks, TasksMetaData>) => Tasks) & {
  copyOf(source: Tasks, mutator: (draft: MutableModel<Tasks, TasksMetaData>) => MutableModel<Tasks, TasksMetaData> | void): Tasks;
}

type EagerTimeEntry = {
  readonly id: string;
  readonly description?: string | null;
  readonly userId?: string | null;
  readonly workspaceId?: string | null;
  readonly timeInterval?: TimeInterval | null;
  readonly isActive?: boolean | null;
  readonly isLocked?: boolean | null;
  readonly isSent?: boolean | null;
  readonly isConfirmed?: boolean | null;
  readonly isPaused?: boolean | null;
  readonly pauseStart?: string | null;
  readonly break?: (Break | null)[] | null;
  readonly work?: Work | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

type LazyTimeEntry = {
  readonly id: string;
  readonly description?: string | null;
  readonly userId?: string | null;
  readonly workspaceId?: string | null;
  readonly timeInterval?: TimeInterval | null;
  readonly isActive?: boolean | null;
  readonly isLocked?: boolean | null;
  readonly isSent?: boolean | null;
  readonly isConfirmed?: boolean | null;
  readonly isPaused?: boolean | null;
  readonly pauseStart?: string | null;
  readonly break?: (Break | null)[] | null;
  readonly work?: Work | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

export declare type TimeEntry = LazyLoading extends LazyLoadingDisabled ? EagerTimeEntry : LazyTimeEntry

export declare const TimeEntry: (new (init: ModelInit<TimeEntry, TimeEntryMetaData>) => TimeEntry) & {
  copyOf(source: TimeEntry, mutator: (draft: MutableModel<TimeEntry, TimeEntryMetaData>) => MutableModel<TimeEntry, TimeEntryMetaData> | void): TimeEntry;
}

type EagerAllWorkSpaces = {
  readonly id: string;
  readonly hourlyRate?: HourlyRate | null;
  readonly imageUrl?: string | null;
  readonly memberships?: (Membership | null)[] | null;
  readonly name?: string | null;
  readonly workspaceSettings?: WorkspaceSettings | null;
  readonly workers?: (string | null)[] | null;
  readonly adminId?: (string | null)[] | null;
  readonly work?: (Work | null)[] | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

type LazyAllWorkSpaces = {
  readonly id: string;
  readonly hourlyRate?: HourlyRate | null;
  readonly imageUrl?: string | null;
  readonly memberships?: (Membership | null)[] | null;
  readonly name?: string | null;
  readonly workspaceSettings?: WorkspaceSettings | null;
  readonly workers?: (string | null)[] | null;
  readonly adminId?: (string | null)[] | null;
  readonly work?: (Work | null)[] | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

export declare type AllWorkSpaces = LazyLoading extends LazyLoadingDisabled ? EagerAllWorkSpaces : LazyAllWorkSpaces

export declare const AllWorkSpaces: (new (init: ModelInit<AllWorkSpaces, AllWorkSpacesMetaData>) => AllWorkSpaces) & {
  copyOf(source: AllWorkSpaces, mutator: (draft: MutableModel<AllWorkSpaces, AllWorkSpacesMetaData>) => MutableModel<AllWorkSpaces, AllWorkSpacesMetaData> | void): AllWorkSpaces;
}

type EagerUserCredentials = {
  readonly id: string;
  readonly userId?: string | null;
  readonly activeTimeEntry?: string | null;
  readonly status?: string | null;
  readonly defaultWorkspace?: string | null;
  readonly memberships?: (UserMemberships | null)[] | null;
  readonly profile?: Profile | null;
  readonly formChecked?: (string | null)[] | null;
  readonly settings?: UserSettings | null;
  readonly workcards?: (WorkCard | null)[] | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

type LazyUserCredentials = {
  readonly id: string;
  readonly userId?: string | null;
  readonly activeTimeEntry?: string | null;
  readonly status?: string | null;
  readonly defaultWorkspace?: string | null;
  readonly memberships?: (UserMemberships | null)[] | null;
  readonly profile?: Profile | null;
  readonly formChecked?: (string | null)[] | null;
  readonly settings?: UserSettings | null;
  readonly workcards?: (WorkCard | null)[] | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

export declare type UserCredentials = LazyLoading extends LazyLoadingDisabled ? EagerUserCredentials : LazyUserCredentials

export declare const UserCredentials: (new (init: ModelInit<UserCredentials, UserCredentialsMetaData>) => UserCredentials) & {
  copyOf(source: UserCredentials, mutator: (draft: MutableModel<UserCredentials, UserCredentialsMetaData>) => MutableModel<UserCredentials, UserCredentialsMetaData> | void): UserCredentials;
}