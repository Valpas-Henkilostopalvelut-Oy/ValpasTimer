/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

import * as React from "react";
import { GridProps, SwitchFieldProps, TextFieldProps } from "@aws-amplify/ui-react";
import { EscapeHatchProps } from "@aws-amplify/ui-react/internal";
import { TimeEntry } from "../models";
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
};
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type TimeEntryUpdateFormOverridesProps = {
    TimeEntryUpdateFormGrid?: PrimitiveOverrideProps<GridProps>;
    description?: PrimitiveOverrideProps<TextFieldProps>;
    userId?: PrimitiveOverrideProps<TextFieldProps>;
    workspaceId?: PrimitiveOverrideProps<TextFieldProps>;
    isActive?: PrimitiveOverrideProps<SwitchFieldProps>;
    isLocked?: PrimitiveOverrideProps<SwitchFieldProps>;
    isSent?: PrimitiveOverrideProps<SwitchFieldProps>;
    isConfirmed?: PrimitiveOverrideProps<SwitchFieldProps>;
    isPaused?: PrimitiveOverrideProps<SwitchFieldProps>;
    pauseStart?: PrimitiveOverrideProps<TextFieldProps>;
} & EscapeHatchProps;
export declare type TimeEntryUpdateFormProps = React.PropsWithChildren<{
    overrides?: TimeEntryUpdateFormOverridesProps | undefined | null;
} & {
    id?: string;
    timeEntry?: TimeEntry;
    onSubmit?: (fields: TimeEntryUpdateFormInputValues) => TimeEntryUpdateFormInputValues;
    onSuccess?: (fields: TimeEntryUpdateFormInputValues) => void;
    onError?: (fields: TimeEntryUpdateFormInputValues, errorMessage: string) => void;
    onChange?: (fields: TimeEntryUpdateFormInputValues) => TimeEntryUpdateFormInputValues;
    onValidate?: TimeEntryUpdateFormValidationValues;
} & React.CSSProperties>;
export default function TimeEntryUpdateForm(props: TimeEntryUpdateFormProps): React.ReactElement;
