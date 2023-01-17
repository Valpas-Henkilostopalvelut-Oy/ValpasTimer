/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

import * as React from "react";
import { GridProps, SelectFieldProps, TextFieldProps } from "@aws-amplify/ui-react";
import { EscapeHatchProps } from "@aws-amplify/ui-react/internal";
import { Tasks } from "../models";
export declare type ValidationResponse = {
    hasError: boolean;
    errorMessage?: string;
};
export declare type ValidationFunction<T> = (value: T, validationResponse: ValidationResponse) => ValidationResponse | Promise<ValidationResponse>;
export declare type TasksUpdateFormInputValues = {
    title?: string;
    description?: string;
    username?: string;
    time?: string;
    status?: string;
};
export declare type TasksUpdateFormValidationValues = {
    title?: ValidationFunction<string>;
    description?: ValidationFunction<string>;
    username?: ValidationFunction<string>;
    time?: ValidationFunction<string>;
    status?: ValidationFunction<string>;
};
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type TasksUpdateFormOverridesProps = {
    TasksUpdateFormGrid?: PrimitiveOverrideProps<GridProps>;
    title?: PrimitiveOverrideProps<TextFieldProps>;
    description?: PrimitiveOverrideProps<TextFieldProps>;
    username?: PrimitiveOverrideProps<TextFieldProps>;
    time?: PrimitiveOverrideProps<TextFieldProps>;
    status?: PrimitiveOverrideProps<SelectFieldProps>;
} & EscapeHatchProps;
export declare type TasksUpdateFormProps = React.PropsWithChildren<{
    overrides?: TasksUpdateFormOverridesProps | undefined | null;
} & {
    id?: string;
    tasks?: Tasks;
    onSubmit?: (fields: TasksUpdateFormInputValues) => TasksUpdateFormInputValues;
    onSuccess?: (fields: TasksUpdateFormInputValues) => void;
    onError?: (fields: TasksUpdateFormInputValues, errorMessage: string) => void;
    onChange?: (fields: TasksUpdateFormInputValues) => TasksUpdateFormInputValues;
    onValidate?: TasksUpdateFormValidationValues;
} & React.CSSProperties>;
export default function TasksUpdateForm(props: TasksUpdateFormProps): React.ReactElement;
