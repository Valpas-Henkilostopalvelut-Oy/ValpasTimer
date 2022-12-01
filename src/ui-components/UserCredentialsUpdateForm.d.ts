/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

import * as React from "react";
import { UserCredentials } from "../models";
import { EscapeHatchProps } from "@aws-amplify/ui-react/internal";
import { GridProps, TextFieldProps } from "@aws-amplify/ui-react";
export declare type ValidationResponse = {
    hasError: boolean;
    errorMessage?: string;
};
export declare type ValidationFunction<T> = (value: T, validationResponse: ValidationResponse) => ValidationResponse | Promise<ValidationResponse>;
export declare type UserCredentialsUpdateFormInputValues = {
    userId?: string;
    activeTimeEntry?: string;
    status?: string;
    defaultWorkspace?: string;
    formChecked?: string[];
};
export declare type UserCredentialsUpdateFormValidationValues = {
    userId?: ValidationFunction<string>;
    activeTimeEntry?: ValidationFunction<string>;
    status?: ValidationFunction<string>;
    defaultWorkspace?: ValidationFunction<string>;
    formChecked?: ValidationFunction<string>;
};
export declare type FormProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type UserCredentialsUpdateFormOverridesProps = {
    UserCredentialsUpdateFormGrid?: FormProps<GridProps>;
    userId?: FormProps<TextFieldProps>;
    activeTimeEntry?: FormProps<TextFieldProps>;
    status?: FormProps<TextFieldProps>;
    defaultWorkspace?: FormProps<TextFieldProps>;
    formChecked?: FormProps<TextFieldProps>;
} & EscapeHatchProps;
export declare type UserCredentialsUpdateFormProps = React.PropsWithChildren<{
    overrides?: UserCredentialsUpdateFormOverridesProps | undefined | null;
} & {
    id?: string;
    userCredentials?: UserCredentials;
    onSubmit?: (fields: UserCredentialsUpdateFormInputValues) => UserCredentialsUpdateFormInputValues;
    onSuccess?: (fields: UserCredentialsUpdateFormInputValues) => void;
    onError?: (fields: UserCredentialsUpdateFormInputValues, errorMessage: string) => void;
    onCancel?: () => void;
    onChange?: (fields: UserCredentialsUpdateFormInputValues) => UserCredentialsUpdateFormInputValues;
    onValidate?: UserCredentialsUpdateFormValidationValues;
} & React.CSSProperties>;
export default function UserCredentialsUpdateForm(props: UserCredentialsUpdateFormProps): React.ReactElement;
