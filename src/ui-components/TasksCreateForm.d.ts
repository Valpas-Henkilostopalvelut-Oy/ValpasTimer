/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

import * as React from "react";
import { GridProps, SelectFieldProps, TextFieldProps } from "@aws-amplify/ui-react";
import { EscapeHatchProps } from "@aws-amplify/ui-react/internal";
export declare type ValidationResponse = {
    hasError: boolean;
    errorMessage?: string;
};
export declare type ValidationFunction<T> = (value: T, validationResponse: ValidationResponse) => ValidationResponse | Promise<ValidationResponse>;
export declare type TasksCreateFormInputValues = {
    title?: string;
    description?: string;
    username?: string;
    time?: string;
    status?: string;
};
export declare type TasksCreateFormValidationValues = {
    title?: ValidationFunction<string>;
    description?: ValidationFunction<string>;
    username?: ValidationFunction<string>;
    time?: ValidationFunction<string>;
    status?: ValidationFunction<string>;
};
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type TasksCreateFormOverridesProps = {
    TasksCreateFormGrid?: PrimitiveOverrideProps<GridProps>;
    title?: PrimitiveOverrideProps<TextFieldProps>;
    description?: PrimitiveOverrideProps<TextFieldProps>;
    username?: PrimitiveOverrideProps<TextFieldProps>;
    time?: PrimitiveOverrideProps<TextFieldProps>;
    status?: PrimitiveOverrideProps<SelectFieldProps>;
} & EscapeHatchProps;
export declare type TasksCreateFormProps = React.PropsWithChildren<{
    overrides?: TasksCreateFormOverridesProps | undefined | null;
} & {
    clearOnSuccess?: boolean;
    onSubmit?: (fields: TasksCreateFormInputValues) => TasksCreateFormInputValues;
    onSuccess?: (fields: TasksCreateFormInputValues) => void;
    onError?: (fields: TasksCreateFormInputValues, errorMessage: string) => void;
    onChange?: (fields: TasksCreateFormInputValues) => TasksCreateFormInputValues;
    onValidate?: TasksCreateFormValidationValues;
} & React.CSSProperties>;
export default function TasksCreateForm(props: TasksCreateFormProps): React.ReactElement;
