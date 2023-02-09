/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

import * as React from "react";
import { GridProps, SwitchFieldProps, TextFieldProps } from "@aws-amplify/ui-react";
import { EscapeHatchProps } from "@aws-amplify/ui-react/internal";
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
    paidAt?: string;
    confirmedAt?: string;
    isSent?: boolean;
    isConfirmed?: boolean;
    isPaused?: boolean;
    pauseStart?: string;
};
export declare type TimeEntryCreateFormValidationValues = {
    description?: ValidationFunction<string>;
    userId?: ValidationFunction<string>;
    workspaceId?: ValidationFunction<string>;
    isActive?: ValidationFunction<boolean>;
    isLocked?: ValidationFunction<boolean>;
    paidAt?: ValidationFunction<string>;
    confirmedAt?: ValidationFunction<string>;
    isSent?: ValidationFunction<boolean>;
    isConfirmed?: ValidationFunction<boolean>;
    isPaused?: ValidationFunction<boolean>;
    pauseStart?: ValidationFunction<string>;
};
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type TimeEntryCreateFormOverridesProps = {
    TimeEntryCreateFormGrid?: PrimitiveOverrideProps<GridProps>;
    description?: PrimitiveOverrideProps<TextFieldProps>;
    userId?: PrimitiveOverrideProps<TextFieldProps>;
    workspaceId?: PrimitiveOverrideProps<TextFieldProps>;
    isActive?: PrimitiveOverrideProps<SwitchFieldProps>;
    isLocked?: PrimitiveOverrideProps<SwitchFieldProps>;
    paidAt?: PrimitiveOverrideProps<TextFieldProps>;
    confirmedAt?: PrimitiveOverrideProps<TextFieldProps>;
    isSent?: PrimitiveOverrideProps<SwitchFieldProps>;
    isConfirmed?: PrimitiveOverrideProps<SwitchFieldProps>;
    isPaused?: PrimitiveOverrideProps<SwitchFieldProps>;
    pauseStart?: PrimitiveOverrideProps<TextFieldProps>;
} & EscapeHatchProps;
export declare type TimeEntryCreateFormProps = React.PropsWithChildren<{
    overrides?: TimeEntryCreateFormOverridesProps | undefined | null;
} & {
    clearOnSuccess?: boolean;
    onSubmit?: (fields: TimeEntryCreateFormInputValues) => TimeEntryCreateFormInputValues;
    onSuccess?: (fields: TimeEntryCreateFormInputValues) => void;
    onError?: (fields: TimeEntryCreateFormInputValues, errorMessage: string) => void;
    onChange?: (fields: TimeEntryCreateFormInputValues) => TimeEntryCreateFormInputValues;
    onValidate?: TimeEntryCreateFormValidationValues;
} & React.CSSProperties>;
export default function TimeEntryCreateForm(props: TimeEntryCreateFormProps): React.ReactElement;
