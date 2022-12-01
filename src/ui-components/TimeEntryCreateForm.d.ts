/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

import * as React from "react";
import { EscapeHatchProps } from "@aws-amplify/ui-react/internal";
import { GridProps, SelectFieldProps, SwitchFieldProps, TextFieldProps } from "@aws-amplify/ui-react";
export declare type ValidationResponse = {
    hasError: boolean;
    errorMessage?: string;
};
export declare type ValidationFunction<T> = (value: T, validationResponse: ValidationResponse) => ValidationResponse | Promise<ValidationResponse>;
export declare type TimeEntryCreateFormInputValues = {
    description?: string;
    userId?: string;
    workspaceId?: string;
    isActive?: boolean;
    isLocked?: boolean;
    isSent?: boolean;
    isConfirmed?: boolean;
    billable?: boolean;
    breaks?: string[];
};
export declare type TimeEntryCreateFormValidationValues = {
    description?: ValidationFunction<string>;
    userId?: ValidationFunction<string>;
    workspaceId?: ValidationFunction<string>;
    isActive?: ValidationFunction<boolean>;
    isLocked?: ValidationFunction<boolean>;
    isSent?: ValidationFunction<boolean>;
    isConfirmed?: ValidationFunction<boolean>;
    billable?: ValidationFunction<boolean>;
    breaks?: ValidationFunction<string>;
};
export declare type FormProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type TimeEntryCreateFormOverridesProps = {
    TimeEntryCreateFormGrid?: FormProps<GridProps>;
    description?: FormProps<TextFieldProps>;
    userId?: FormProps<TextFieldProps>;
    workspaceId?: FormProps<TextFieldProps>;
    isActive?: FormProps<SwitchFieldProps>;
    isLocked?: FormProps<SwitchFieldProps>;
    isSent?: FormProps<SwitchFieldProps>;
    isConfirmed?: FormProps<SwitchFieldProps>;
    billable?: FormProps<SwitchFieldProps>;
    breaks?: FormProps<SelectFieldProps>;
} & EscapeHatchProps;
export declare type TimeEntryCreateFormProps = React.PropsWithChildren<{
    overrides?: TimeEntryCreateFormOverridesProps | undefined | null;
} & {
    clearOnSuccess?: boolean;
    onSubmit?: (fields: TimeEntryCreateFormInputValues) => TimeEntryCreateFormInputValues;
    onSuccess?: (fields: TimeEntryCreateFormInputValues) => void;
    onError?: (fields: TimeEntryCreateFormInputValues, errorMessage: string) => void;
    onCancel?: () => void;
    onChange?: (fields: TimeEntryCreateFormInputValues) => TimeEntryCreateFormInputValues;
    onValidate?: TimeEntryCreateFormValidationValues;
} & React.CSSProperties>;
export default function TimeEntryCreateForm(props: TimeEntryCreateFormProps): React.ReactElement;
