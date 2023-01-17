/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

import * as React from "react";
import { GridProps, TextFieldProps } from "@aws-amplify/ui-react";
import { EscapeHatchProps } from "@aws-amplify/ui-react/internal";
import { Agreement } from "../models";
export declare type ValidationResponse = {
    hasError: boolean;
    errorMessage?: string;
};
export declare type ValidationFunction<T> = (value: T, validationResponse: ValidationResponse) => ValidationResponse | Promise<ValidationResponse>;
export declare type AgreementUpdateFormInputValues = {
    name?: string;
    workers?: string[];
    client?: string[];
    createdAt?: string;
    userId?: string;
    workspaceId?: string[];
};
export declare type AgreementUpdateFormValidationValues = {
    name?: ValidationFunction<string>;
    workers?: ValidationFunction<string>;
    client?: ValidationFunction<string>;
    createdAt?: ValidationFunction<string>;
    userId?: ValidationFunction<string>;
    workspaceId?: ValidationFunction<string>;
};
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type AgreementUpdateFormOverridesProps = {
    AgreementUpdateFormGrid?: PrimitiveOverrideProps<GridProps>;
    name?: PrimitiveOverrideProps<TextFieldProps>;
    workers?: PrimitiveOverrideProps<TextFieldProps>;
    client?: PrimitiveOverrideProps<TextFieldProps>;
    createdAt?: PrimitiveOverrideProps<TextFieldProps>;
    userId?: PrimitiveOverrideProps<TextFieldProps>;
    workspaceId?: PrimitiveOverrideProps<TextFieldProps>;
} & EscapeHatchProps;
export declare type AgreementUpdateFormProps = React.PropsWithChildren<{
    overrides?: AgreementUpdateFormOverridesProps | undefined | null;
} & {
    id?: string;
    agreement?: Agreement;
    onSubmit?: (fields: AgreementUpdateFormInputValues) => AgreementUpdateFormInputValues;
    onSuccess?: (fields: AgreementUpdateFormInputValues) => void;
    onError?: (fields: AgreementUpdateFormInputValues, errorMessage: string) => void;
    onChange?: (fields: AgreementUpdateFormInputValues) => AgreementUpdateFormInputValues;
    onValidate?: AgreementUpdateFormValidationValues;
} & React.CSSProperties>;
export default function AgreementUpdateForm(props: AgreementUpdateFormProps): React.ReactElement;
