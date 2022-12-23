/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

import * as React from "react";
import { TimeEntry } from "../models";
import { EscapeHatchProps } from "@aws-amplify/ui-react/internal";
import { GridProps, SwitchFieldProps, TextFieldProps } from "@aws-amplify/ui-react";
export declare type ValidationResponse = {
    hasError: boolean;
    errorMessage?: string;
};
export declare type ValidationFunction<T> = (value: T, validationResponse: ValidationResponse) => ValidationResponse | Promise<ValidationResponse>;
export declare type TimeEntryUpdateFormInputValues = {
    description?: string;
    userId?: string;
    workspaceId?: string;
    isActive?: boolean;
    isLocked?: boolean;
    isSent?: boolean;
    isConfirmed?: boolean;
    isPaused?: boolean;
    pauseStart?: string;
    nextEntry?: string;
    lastEntry?: string;
    work?: string;
};
export declare type TimeEntryUpdateFormValidationValues = {
    description?: ValidationFunction<string>;
    userId?: ValidationFunction<string>;
    workspaceId?: ValidationFunction<string>;
    isActive?: ValidationFunction<boolean>;
    isLocked?: ValidationFunction<boolean>;
    isSent?: ValidationFunction<boolean>;
    isConfirmed?: ValidationFunction<boolean>;
    isPaused?: ValidationFunction<boolean>;
    pauseStart?: ValidationFunction<string>;
    nextEntry?: ValidationFunction<string>;
    lastEntry?: ValidationFunction<string>;
    work?: ValidationFunction<string>;
};
export declare type FormProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type TimeEntryUpdateFormOverridesProps = {
    TimeEntryUpdateFormGrid?: FormProps<GridProps>;
    description?: FormProps<TextFieldProps>;
    userId?: FormProps<TextFieldProps>;
    workspaceId?: FormProps<TextFieldProps>;
    isActive?: FormProps<SwitchFieldProps>;
    isLocked?: FormProps<SwitchFieldProps>;
    isSent?: FormProps<SwitchFieldProps>;
    isConfirmed?: FormProps<SwitchFieldProps>;
    isPaused?: FormProps<SwitchFieldProps>;
    pauseStart?: FormProps<TextFieldProps>;
    nextEntry?: FormProps<TextFieldProps>;
    lastEntry?: FormProps<TextFieldProps>;
    work?: FormProps<TextFieldProps>;
} & EscapeHatchProps;
export declare type TimeEntryUpdateFormProps = React.PropsWithChildren<{
    overrides?: TimeEntryUpdateFormOverridesProps | undefined | null;
} & {
    id?: string;
    timeEntry?: TimeEntry;
    onSubmit?: (fields: TimeEntryUpdateFormInputValues) => TimeEntryUpdateFormInputValues;
    onSuccess?: (fields: TimeEntryUpdateFormInputValues) => void;
    onError?: (fields: TimeEntryUpdateFormInputValues, errorMessage: string) => void;
    onCancel?: () => void;
    onChange?: (fields: TimeEntryUpdateFormInputValues) => TimeEntryUpdateFormInputValues;
    onValidate?: TimeEntryUpdateFormValidationValues;
} & React.CSSProperties>;
export default function TimeEntryUpdateForm(props: TimeEntryUpdateFormProps): React.ReactElement;
