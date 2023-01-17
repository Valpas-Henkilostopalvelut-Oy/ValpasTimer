/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

import * as React from "react";
import { GridProps, TextFieldProps } from "@aws-amplify/ui-react";
import { EscapeHatchProps } from "@aws-amplify/ui-react/internal";
export declare type ValidationResponse = {
    hasError: boolean;
    errorMessage?: string;
};
export declare type ValidationFunction<T> = (value: T, validationResponse: ValidationResponse) => ValidationResponse | Promise<ValidationResponse>;
export declare type UserCredentialsCreateFormInputValues = {
    userId?: string;
    activeTimeEntry?: string;
    status?: string;
    defaultWorkspace?: string;
    formChecked?: string[];
};
export declare type UserCredentialsCreateFormValidationValues = {
    userId?: ValidationFunction<string>;
    activeTimeEntry?: ValidationFunction<string>;
    status?: ValidationFunction<string>;
    defaultWorkspace?: ValidationFunction<string>;
    formChecked?: ValidationFunction<string>;
};
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type UserCredentialsCreateFormOverridesProps = {
    UserCredentialsCreateFormGrid?: PrimitiveOverrideProps<GridProps>;
    userId?: PrimitiveOverrideProps<TextFieldProps>;
    activeTimeEntry?: PrimitiveOverrideProps<TextFieldProps>;
    status?: PrimitiveOverrideProps<TextFieldProps>;
    defaultWorkspace?: PrimitiveOverrideProps<TextFieldProps>;
    formChecked?: PrimitiveOverrideProps<TextFieldProps>;
} & EscapeHatchProps;
export declare type UserCredentialsCreateFormProps = React.PropsWithChildren<{
    overrides?: UserCredentialsCreateFormOverridesProps | undefined | null;
} & {
    clearOnSuccess?: boolean;
    onSubmit?: (fields: UserCredentialsCreateFormInputValues) => UserCredentialsCreateFormInputValues;
    onSuccess?: (fields: UserCredentialsCreateFormInputValues) => void;
    onError?: (fields: UserCredentialsCreateFormInputValues, errorMessage: string) => void;
    onChange?: (fields: UserCredentialsCreateFormInputValues) => UserCredentialsCreateFormInputValues;
    onValidate?: UserCredentialsCreateFormValidationValues;
} & React.CSSProperties>;
export default function UserCredentialsCreateForm(props: UserCredentialsCreateFormProps): React.ReactElement;
