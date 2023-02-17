/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

import * as React from "react";
import { GridProps, TextFieldProps } from "@aws-amplify/ui-react";
import { EscapeHatchProps } from "@aws-amplify/ui-react/internal";
import { Worktravel } from "../models";
export declare type ValidationResponse = {
    hasError: boolean;
    errorMessage?: string;
};
export declare type ValidationFunction<T> = (value: T, validationResponse: ValidationResponse) => ValidationResponse | Promise<ValidationResponse>;
export declare type WorktravelUpdateFormInputValues = {
    userId?: string;
    created?: string;
    updated?: string;
    title?: string;
    comment?: string;
    departureDateTime?: string;
    returnDateTime?: string;
    routeCar?: string;
};
export declare type WorktravelUpdateFormValidationValues = {
    userId?: ValidationFunction<string>;
    created?: ValidationFunction<string>;
    updated?: ValidationFunction<string>;
    title?: ValidationFunction<string>;
    comment?: ValidationFunction<string>;
    departureDateTime?: ValidationFunction<string>;
    returnDateTime?: ValidationFunction<string>;
    routeCar?: ValidationFunction<string>;
};
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type WorktravelUpdateFormOverridesProps = {
    WorktravelUpdateFormGrid?: PrimitiveOverrideProps<GridProps>;
    userId?: PrimitiveOverrideProps<TextFieldProps>;
    created?: PrimitiveOverrideProps<TextFieldProps>;
    updated?: PrimitiveOverrideProps<TextFieldProps>;
    title?: PrimitiveOverrideProps<TextFieldProps>;
    comment?: PrimitiveOverrideProps<TextFieldProps>;
    departureDateTime?: PrimitiveOverrideProps<TextFieldProps>;
    returnDateTime?: PrimitiveOverrideProps<TextFieldProps>;
    routeCar?: PrimitiveOverrideProps<TextFieldProps>;
} & EscapeHatchProps;
export declare type WorktravelUpdateFormProps = React.PropsWithChildren<{
    overrides?: WorktravelUpdateFormOverridesProps | undefined | null;
} & {
    id?: string;
    worktravel?: Worktravel;
    onSubmit?: (fields: WorktravelUpdateFormInputValues) => WorktravelUpdateFormInputValues;
    onSuccess?: (fields: WorktravelUpdateFormInputValues) => void;
    onError?: (fields: WorktravelUpdateFormInputValues, errorMessage: string) => void;
    onChange?: (fields: WorktravelUpdateFormInputValues) => WorktravelUpdateFormInputValues;
    onValidate?: WorktravelUpdateFormValidationValues;
} & React.CSSProperties>;
export default function WorktravelUpdateForm(props: WorktravelUpdateFormProps): React.ReactElement;
